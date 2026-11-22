import { Link } from 'react-router-dom';
import { profile } from '../../data/site';
import { NAV_ITEMS, useSectionNav } from './SiteNav';
import { Icon } from './Icons';

export default function SiteFooter() {
  const goTo = useSectionNav();
  const quick = NAV_ITEMS.filter((n) => ['top', 'about', 'projects', 'experience', 'contact'].includes(n.id));
  return (
    <footer className="s-footer">
      <div className="s-container">
        <div className="s-footer__grid">
          <div>
            <p className="s-brand__name s-gradient-text" style={{ display: 'inline-block' }}>{profile.name}</p>
            <p className="s-body" style={{ marginTop: 10, maxWidth: '38ch' }}>
              Software engineer building AI-native products and full-stack systems for web and mobile.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <a className="s-round" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
              <a className="s-round" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
              <a className="s-round" href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" /></a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="s-footer__links">
              {quick.map((n) => (
                <li key={n.id}><a href={n.id === 'top' ? '/' : `/#${n.id}`} onClick={(e) => goTo(e, n.id)}>{n.label}</a></li>
              ))}
              <li><Link to={profile.resume}>Résumé</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="s-footer__links">
              <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a></li>
              <li>{profile.location}</li>
            </ul>
          </div>
        </div>
        <div className="s-footer__base">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <Icon name="chevronUp" size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
