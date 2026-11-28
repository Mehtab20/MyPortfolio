import { Link } from 'react-router-dom';
import { profile } from '../../data/site';
import { NAV_ITEMS, useSectionNav } from './SiteNav';

export default function SiteFooter() {
  const goTo = useSectionNav();
  return (
    <footer className="s-footer">
      <div className="s-container">
        <div className="s-footer__grid">
          <p className="s-label">{profile.positioning.join(' · ')}</p>
          <ul className="s-footer__links">
            {NAV_ITEMS.map((n) => (
              <li key={n.id}><a href={`/#${n.id}`} onClick={(e) => goTo(e, n.id)}>{n.label}</a></li>
            ))}
            <li><Link to={profile.resume}>Résumé</Link></li>
            <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>
        <div className="s-footer__base">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>Content is generated from verified project sources</p>
        </div>
      </div>
    </footer>
  );
}
