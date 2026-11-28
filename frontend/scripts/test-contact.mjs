/* Scenario tests for api/contact.js (no dependencies). Run: node scripts/test-contact.mjs */
import { Readable } from 'node:stream';
import assert from 'node:assert/strict';

const { default: handler } = await import('../api/contact.js');
const call = async (body, { method = 'POST', ip = '1.1.1.1' } = {}) => {
  const req = Readable.from([Buffer.from(JSON.stringify(body))]);
  req.method = method;
  req.headers = { 'x-forwarded-for': ip };
  let status, out;
  const res = { setHeader() {}, set statusCode(v) { status = v; }, end(b) { out = JSON.parse(b); } };
  await handler(req, res);
  return { status, out };
};
const good = { name: 'Ali', email: 'ali@example.com', subject: 'Role', message: 'Hello Mehtab, we have a role.', startedAt: Date.now() - 10000 };
const sent = [];
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, opts) => { sent.push(JSON.parse(opts.body)); return { ok: true, json: async () => ({}), text: async () => '' }; };
const origErr = console.error; console.error = () => {};
let ip = 0; const nextIp = () => `10.0.0.${++ip}`;

try {
  delete process.env.RESEND_API_KEY;
  assert.equal((await call({}, { method: 'GET', ip: nextIp() })).status, 405, 'GET rejected');
  assert.equal((await call(good, { ip: nextIp() })).status, 503, 'unconfigured → 503 so the form shows the email fallback');
  process.env.RESEND_API_KEY = 'test';
  assert.equal((await call({ ...good, company: 'x' }, { ip: nextIp() })).status, 200); assert.equal(sent.length, 0, 'honeypot dropped');
  assert.equal((await call({ ...good, startedAt: Date.now() }, { ip: nextIp() })).status, 200); assert.equal(sent.length, 0, 'too-fast dropped');
  assert.equal((await call({ ...good, email: 'nope' }, { ip: nextIp() })).status, 422, 'invalid email');
  assert.equal((await call(good, { ip: nextIp() })).status, 200); assert.equal(sent.length, 1); assert.equal(sent[0].reply_to, good.email);
  await call({ ...good, name: '<script>x</script>' }, { ip: nextIp() }); assert.ok(sent[1].html.includes('&lt;script&gt;'), 'HTML escaped');
  const same = nextIp(); let last; for (let i = 0; i < 6; i++) last = await call(good, { ip: same }); assert.equal(last.status, 429, 'rate limited');
  globalThis.fetch = async () => ({ ok: false, status: 500, text: async () => 'boom' });
  assert.equal((await call(good, { ip: nextIp() })).status, 502, 'provider down → 502');
  console.log('✓ contact function: 9 scenarios pass');
} finally {
  globalThis.fetch = realFetch; console.error = origErr; delete process.env.RESEND_API_KEY;
}
