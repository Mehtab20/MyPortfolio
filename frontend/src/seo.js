/* Page metadata and structured data, shared by the client and the pre-renderer. */
import { profile, work, toolkit, education } from './data/site';

export const SITE_URL = 'https://mehtabakbar.com';

const HOME_TITLE = `${profile.name} — ${profile.positioning.join(', ')}`;
const HOME_DESC =
  'Mehtab Akbar is a software engineer in Pakistan who builds AI-native products and full-stack systems: MehZu AI, the MedRef referral system and a hospital management system for Gohar Medical Trust.';

function personLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    jobTitle: 'Software Engineer',
    description: profile.tagline,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Rawalpindi', addressCountry: 'PK' },
    alumniOf: education.map((e) => ({ '@type': 'EducationalOrganization', name: e.school })),
    knowsAbout: toolkit.filter((g) => !g.learning).flatMap((g) => g.items),
    sameAs: [profile.github, profile.linkedin],
  };
}

function projectLd(p) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: p.title,
    description: p.summary,
    url: `${SITE_URL}/work/${p.slug}`,
    ...(p.links?.[0] ? { codeRepository: p.links[0].href } : {}),
    programmingLanguage: p.stack,
    creativeWorkStatus: p.status?.label,
    author: { '@type': 'Person', name: profile.name, url: SITE_URL },
  };
}

/** Metadata for a path: { title, description, path, jsonLd[] } */
export function pageMeta(path) {
  const m = path.match(/^\/work\/([^/]+)\/?$/);
  if (m) {
    const p = work.find((x) => x.slug === m[1] && x.caseStudy);
    if (p) {
      return {
        title: `${p.title}: case study — ${profile.name}`,
        description: p.summary,
        path: `/work/${p.slug}`,
        jsonLd: [projectLd(p)],
      };
    }
  }
  if (/^\/resume\/?$/.test(path)) {
    return {
      title: `Résumé — ${profile.name}`,
      description: `${profile.name}: ${profile.positioning.join(', ')}. Experience, projects, skills and education.`,
      path: '/resume',
      jsonLd: [personLd()],
    };
  }
  return {
    title: HOME_TITLE,
    description: HOME_DESC,
    path: '/',
    jsonLd: [
      personLd(),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Featured projects',
        itemListElement: work.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: p.caseStudy ? `${SITE_URL}/work/${p.slug}` : SITE_URL, name: p.title })),
      },
    ],
  };
}

export const prerenderRoutes = () => ['/', ...work.filter((p) => p.caseStudy).map((p) => `/work/${p.slug}`), '/resume'];

/** Plain-text summary for AI tools (https://llmstxt.org). */
export function llmsTxt() {
  const lines = [];
  lines.push(`# ${profile.name}`, '');
  lines.push(`> ${profile.positioning.join(' · ')}. ${profile.tagline} Based in ${profile.location}.`, '');
  lines.push('All facts below come from the projects\' own code and documentation. Statuses are stated as they are: in development means in development.', '');
  lines.push('## Projects', '');
  for (const p of work) {
    const url = p.caseStudy ? `${SITE_URL}/work/${p.slug}` : SITE_URL;
    lines.push(`- [${p.title}](${url}): ${p.kind}. ${p.summary} Status: ${p.status.label}.${p.stack.length ? ` Stack: ${p.stack.join(', ')}.` : ''}`);
  }
  lines.push('', '## Skills', '');
  for (const g of toolkit) lines.push(`- ${g.name}: ${g.items.join(', ')}`);
  lines.push('', '## Education', '');
  for (const e of education) lines.push(`- ${e.degree}, ${e.school} (${e.when})`);
  lines.push('', '## Contact', '');
  lines.push(`- Email: ${profile.email}`, `- GitHub: ${profile.github}`, `- LinkedIn: ${profile.linkedin}`, `- Website: ${SITE_URL}`, '');
  return lines.join('\n');
}

export function sitemapXml() {
  const urls = prerenderRoutes().map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc><changefreq>monthly</changefreq><priority>${r === '/' ? '1.0' : r === '/resume' ? '0.5' : '0.8'}</priority></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}
