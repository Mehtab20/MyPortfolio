/*
 * Content lint (no dependencies). Fails the build if public content contains
 * claims that were removed for lack of evidence, or required fields are missing.
 * Run: node scripts/check-content.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src/content');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
const errors = [];

// Phrases that must never return without evidence (see docs and content/README.md).
const BANNED = [/92\s*%/, /500\+?\s*(daily\s*)?patients/i, /99\.9\s*%/, /\b35\s*%/, /production[- ]ready/i, /\btestimonial/i, /certified/i];

for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8');
  let data;
  try { data = JSON.parse(raw); } catch (e) { errors.push(`${f}: invalid JSON (${e.message})`); continue; }
  for (const re of BANNED) if (re.test(raw)) errors.push(`${f}: contains unverified claim matching ${re}`);
  if (f === 'projects.json') {
    const slugs = new Set();
    for (const p of data) {
      for (const k of ['slug', 'title', 'kind', 'summary', 'status']) if (!p[k]) errors.push(`projects.json: ${p.slug || '?'} missing ${k}`);
      if (slugs.has(p.slug)) errors.push(`projects.json: duplicate slug ${p.slug}`);
      slugs.add(p.slug);
      // Every architecture layer must state its evidence grade and, unless planned, where the code is.
      for (const a of p.caseStudy?.architecture || []) {
        if (!['verified', 'implemented', 'partial', 'planned'].includes(a.evidence)) errors.push(`projects.json: ${p.slug} / ${a.layer} has no valid evidence grade`);
        if (a.evidence !== 'planned' && !/^https:\/\/github\.com\//.test(a.source || '')) errors.push(`projects.json: ${p.slug} / ${a.layer} needs a source link`);
      }
      for (const im of p.caseStudy?.gallery?.images || []) {
        if (!fs.existsSync(path.join(root, 'public', im.src))) errors.push(`projects.json: ${p.slug} gallery image missing: ${im.src}`);
        if (!im.alt) errors.push(`projects.json: ${p.slug} gallery image needs alt text: ${im.src}`);
      }
    }
  }
}

// public/resume.pdf is printed from /resume (see docs/LEGACY.md); it is checked
// when regenerated, since PDF text can't be searched reliably without a library.

if (errors.length) { console.error(errors.map((e) => `✗ ${e}`).join('\n')); process.exit(1); }
console.log(`✓ content OK (${files.length} files)`);
