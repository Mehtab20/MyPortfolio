/*
 * POST /api/contact — portfolio contact form (Vercel serverless function).
 *
 * Pipeline: validate → spam checks → email to Mehtab (Resend) → optional copy
 * in Supabase. No npm dependencies; uses the platform fetch.
 *
 * Environment variables (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY            required to send email (https://resend.com, free tier)
 *   CONTACT_TO                inbox to deliver to (default: mehtabakbar5656@gmail.com)
 *   CONTACT_FROM              verified sender (default: Portfolio <onboarding@resend.dev>;
 *                             resend.dev can only deliver to the Resend account's own email)
 *   TURNSTILE_SECRET_KEY      optional: Cloudflare Turnstile verification
 *   SUPABASE_URL              optional: also store messages in the `contacts` table
 *   SUPABASE_SERVICE_ROLE_KEY optional: server-only key for the insert above
 */

const MAX = { name: 100, email: 200, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map(); // best-effort per-instance rate limit

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
};

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (raw.length > 20000) throw new Error('too_large');
  return JSON.parse(raw || '{}');
}

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > LIMIT;
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = await r.json().catch(() => ({}));
  return Boolean(data.success);
}

async function sendEmail(m) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { skipped: true };
  const to = process.env.CONTACT_TO || 'mehtabakbar5656@gmail.com';
  const from = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>';
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#131720">
      <p style="margin:0 0 4px;color:#23a997;font-weight:600">New message from mehtabakbar.com</p>
      <h2 style="margin:0 0 16px">${esc(m.subject)}</h2>
      <p style="margin:0"><b>${esc(m.name)}</b> &lt;${esc(m.email)}&gt;</p>
      <hr style="border:0;border-top:1px solid #e5ebe9;margin:16px 0" />
      <p style="white-space:pre-wrap;margin:0">${esc(m.message)}</p>
      <hr style="border:0;border-top:1px solid #e5ebe9;margin:16px 0" />
      <p style="margin:0;color:#656c7b;font-size:13px">Reply to this email to answer ${esc(m.name)} directly.</p>
    </div>`;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: m.email,
      subject: `Portfolio: ${m.subject}`,
      html,
      text: `${m.name} <${m.email}>\n\n${m.message}`,
    }),
  });
  if (!r.ok) throw new Error(`resend_${r.status}: ${(await r.text()).slice(0, 200)}`);
  return { sent: true };
}

async function storeMessage(m) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { skipped: true };
  const r = await fetch(`${url.replace(/\/$/, '')}/rest/v1/contacts`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ name: m.name, email: m.email, subject: m.subject, message: m.message }),
  });
  if (!r.ok) throw new Error(`supabase_${r.status}`);
  return { stored: true };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'method_not_allowed' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return json(res, 429, { error: 'rate_limited' });

  let body;
  try {
    body = await readBody(req);
  } catch {
    return json(res, 400, { error: 'bad_request' });
  }

  // Spam traps: a hidden field humans never fill, and a minimum time on page.
  const startedAt = Number(body.startedAt) || 0;
  if (body.company || (startedAt && Date.now() - startedAt < 2500)) {
    return json(res, 200, { ok: true }); // pretend success; drop silently
  }

  const m = {
    name: String(body.name || '').trim().slice(0, MAX.name),
    email: String(body.email || '').trim().slice(0, MAX.email),
    subject: String(body.subject || '').trim().slice(0, MAX.subject) || 'Portfolio enquiry',
    message: String(body.message || '').trim().slice(0, MAX.message),
  };
  if (!m.name || !EMAIL_RE.test(m.email) || m.message.length < 10) {
    return json(res, 422, { error: 'invalid' });
  }

  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return json(res, 403, { error: 'challenge_failed' });
  }

  if (!process.env.RESEND_API_KEY && !(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)) {
    return json(res, 503, { error: 'not_configured' });
  }

  const results = await Promise.allSettled([sendEmail(m), storeMessage(m)]);
  const delivered = results.some((r) => r.status === 'fulfilled' && (r.value.sent || r.value.stored));
  results.forEach((r) => r.status === 'rejected' && console.error('[contact]', r.reason?.message || r.reason));

  if (!delivered) return json(res, 502, { error: 'delivery_failed' });
  return json(res, 200, { ok: true });
}
