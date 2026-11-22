/*
 * Pre-render public pages to static HTML after `vite build`.
 *
 *   vite build                                   → dist/ (client)
 *   vite build --ssr src/entry-server.jsx        → dist-ssr/ (renderer)
 *   node scripts/prerender.mjs                   → writes HTML per route,
 *                                                  sitemap.xml and llms.txt
 *
 * Crawlers and AI tools that don't run JavaScript then get the full page.
 * The client app still boots normally on top of it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const entry = fs.readdirSync(ssrDir).find((f) => /^entry-server\.(m?js)$/.test(f));
if (!entry) throw new Error('dist-ssr/entry-server.js not found; run the SSR build first.');
const { render, pageMeta, prerenderRoutes, llmsTxt, sitemapXml } = await import(pathToFileURL(path.join(ssrDir, entry)).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
// Untouched SPA shell for every other route (/admin, /dashboard, /resume…), so they
// never flash the pre-rendered home page while the app loads.
fs.writeFileSync(path.join(dist, 'app.html'), template);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const SITE = 'https://mehtabakbar.com';

function setMeta(html, re, replacement) {
  if (!re.test(html)) throw new Error(`Template is missing ${re}`);
  return html.replace(re, typeof replacement === 'function' ? replacement : () => replacement);
}

let count = 0;
for (const route of prerenderRoutes()) {
  const appHtml = render(route);
  const meta = pageMeta(route);
  const url = `${SITE}${meta.path === '/' ? '' : meta.path}`;
  let html = template;
  html = setMeta(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = setMeta(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(meta.description)}" />`);
  html = setMeta(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(meta.title)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(meta.description)}" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(meta.title)}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(meta.description)}" />`);
  // Replace the hand-written Person JSON-LD with generated data for this page.
  html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  const ld = meta.jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n    ');
  html = html.replace('</head>', `    ${ld}\n  </head>`);
  // Swap the loading spinner for the rendered page.
  html = setMeta(html, /<div id="root">[\s\S]*?<\/style>\s*<\/div>/, () => `<div id="root">${appHtml}</div>`);

  const out = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  count++;
  console.log(`prerendered ${route} (${(html.length / 1024).toFixed(1)} KB)`);
}

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemapXml());
fs.writeFileSync(path.join(dist, 'llms.txt'), llmsTxt());
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`done: ${count} pages, sitemap.xml, llms.txt`);
