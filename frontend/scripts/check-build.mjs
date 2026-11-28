/*
 * Post-build smoke test (no dependencies). Run after `npm run build`.
 * Checks that every public route was pre-rendered with real text and its own
 * metadata, that crawler files exist, and that no secret-looking value or the
 * Supabase client leaked into public pages.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const errors = [];
const read = (p) => fs.readFileSync(path.join(dist, p), 'utf8');
const textOf = (html) => (html.split('<div id="root">')[1] || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

const routes = { 'index.html': 'Mehtab Akbar', 'resume/index.html': 'Experience', 'work/mehzu-ai/index.html': 'MehZu AI', 'work/medref/index.html': 'MedRef', 'work/gohar-hms/index.html': 'Gohar' };
for (const [file, must] of Object.entries(routes)) {
  if (!fs.existsSync(path.join(dist, file))) { errors.push(`missing ${file}`); continue; }
  const html = read(file);
  const text = textOf(html);
  if (text.length < 1500) errors.push(`${file}: only ${text.length} chars of pre-rendered text`);
  if (!text.includes(must)) errors.push(`${file}: expected "${must}" in pre-rendered text`);
  if (!/<link rel="canonical" href="https:\/\/www\.mehtabakbar\.com/.test(html)) errors.push(`${file}: canonical missing`);
  if (!html.includes('application/ld+json')) errors.push(`${file}: JSON-LD missing`);
  if (/modulepreload[^>]+supabase/.test(html)) errors.push(`${file}: Supabase is preloaded on a public page`);
}
for (const f of ['llms.txt', 'sitemap.xml', 'robots.txt', 'app.html']) if (!fs.existsSync(path.join(dist, f))) errors.push(`missing ${f}`);

// No server secrets in client assets.
for (const f of fs.readdirSync(path.join(dist, 'assets')).filter((n) => n.endsWith('.js'))) {
  const js = fs.readFileSync(path.join(dist, 'assets', f), 'utf8');
  if (/re_[A-Za-z0-9]{20,}|service_role|RESEND_API_KEY|sk-[A-Za-z0-9]{20,}/.test(js)) errors.push(`assets/${f}: secret-looking value`);
}

if (errors.length) { console.error(errors.map((e) => `✗ ${e}`).join('\n')); process.exit(1); }
console.log(`✓ build OK (${Object.keys(routes).length} pre-rendered routes)`);
