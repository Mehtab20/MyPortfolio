import { Link } from 'react-router-dom';
import { profile, work } from '../../data/site';
import { NAV_ITEMS, useSectionNav } from './SiteNav';
import { Arrow } from './Icons';

export default function SiteFooter() {
  const goTo = useSectionNav();
  const year = new Date().getFullYear();

  return (
    <footer className="s-footer">
      <div className="s-container">
        <p className="s-footer__big" aria-hidden="true">
          Let’s build <span className="s-serif">something real.</span>
        </p>

        <div className="s-grid s-footer__cols">
          <div className="s-footer__col s-footer__col--wide">
            <p className="s-label">Mehtab Akbar</p>
            <p className="s-body" style={{ maxWidth: '38ch' }}>
              Software engineer building AI-native products and full-stack systems. Based in {profile.location}.
            </p>
          </div>
          <div className="s-footer__col">
            <p className="s-label">Site</p>
            <ul>
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <a className="s-link" href={`/#${n.id}`} onClick={(e) => goTo(e, n.id)}>{n.label}</a>
                </li>
              ))}
              <li><Link className="s-link" to={profile.resume}>Résumé</Link></li>
            </ul>
          </div>
          <div className="s-footer__col">
            <p className="s-label">Work</p>
            <ul>
              {work.filter((p) => p.caseStudy).map((p) => (
                <li key={p.slug}><Link className="s-link" to={`/work/${p.slug}`}>{p.title}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="s-footer__base">
          <p className="s-label">© {year} {profile.name}</p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <a className="s-label s-link" href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow dir="ne" /></a>
            <a className="s-label s-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow dir="ne" /></a>
            <a className="s-label s-link" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
