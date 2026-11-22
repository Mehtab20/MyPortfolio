import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './Icons';
import { profile } from '../../data/site';
import portrait from '../../assets/portrait.webp';

export const NAV_ITEMS = [
  { id: 'top', label: 'Home', icon: 'home' },
  { id: 'about', label: 'About', icon: 'userCircle' },
  { id: 'services', label: 'Services', icon: 'layers' },
  { id: 'skills', label: 'Skills', icon: 'code' },
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'education', label: 'Education', icon: 'graduation' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
];

/** Scroll to a section on the landing page, or navigate there from another page. */
export function useSectionNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return (e, id) => {
    if (location.pathname === '/') {
      e?.preventDefault();
      if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', id === 'top' ? '/' : `#${id}`);
    } else {
      e?.preventDefault();
      navigate(id === 'top' ? '/' : `/#${id}`);
    }
  };
}

function Brand({ onClick }) {
  return (
    <Link to="/" className="s-brand" onClick={onClick} aria-label={`${profile.name}, home`}>
      <span className="s-avatar"><img src={portrait} alt="" width="40" height="40" /></span>
      <span className="s-brand__name s-gradient-text">{profile.name}</span>
    </Link>
  );
}

export default function SiteNav({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('top');
  const location = useLocation();
  const goTo = useSectionNav();
  const drawerRef = useRef(null);
  const btnRef = useRef(null);
  const isHome = location.pathname === '/';
  const isDark = theme !== 'light';

  // Active section while scrolling the landing page.
  useEffect(() => {
    if (!isHome || !('IntersectionObserver' in window)) return undefined;
    const els = NAV_ITEMS.map((n) => (n.id === 'top' ? document.getElementById('hero') : document.getElementById(n.id))).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id === 'hero' ? 'top' : e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Drawer: lock scroll, Escape to close, focus inside.
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => drawerRef.current?.querySelector('button, a')?.focus(), 60);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open]);

  const onItem = (e, id) => {
    if (!open) return goTo(e, id);
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => goTo(null, id), 30);
  };

  const current = (id) => (isHome && active === id ? 'true' : undefined);

  return (
    <>
      <header className="s-nav">
        <nav className="s-container s-nav__inner" aria-label="Main">
          <Brand onClick={(e) => isHome && onItem(e, 'top')} />

          <ul className="s-nav__links">
            {NAV_ITEMS.filter((n) => n.id !== 'top').map((n) => (
              <li key={n.id}>
                <a href={`/#${n.id}`} className="s-nav__link" aria-current={current(n.id)} onClick={(e) => onItem(e, n.id)}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="s-nav__actions">
            <button type="button" className="s-icon-btn s-nav__theme" onClick={toggleTheme} aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}>
              <Icon name={isDark ? 'sun' : 'moon'} />
            </button>
            <Link to={profile.resume} className="s-icon-btn" aria-label="Résumé" title="Résumé">
              <Icon name="user" />
            </Link>
            <button
              ref={btnRef}
              type="button"
              className="s-icon-btn s-nav__menu-btn"
              aria-expanded={open}
              aria-controls="site-drawer"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </nav>
      </header>

      <div className={`s-scrim${open ? ' is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside
        id="site-drawer"
        ref={drawerRef}
        className={`s-drawer${open ? ' is-open' : ''}`}
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="s-drawer__head">
          <Brand onClick={(e) => onItem(e, 'top')} />
          <button type="button" className="s-icon-btn" onClick={() => setOpen(false)} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>
        <nav className="s-drawer__nav" aria-label="Sections">
          {NAV_ITEMS.map((n) => (
            <a key={n.id} href={n.id === 'top' ? '/' : `/#${n.id}`} className="s-drawer__item" aria-current={current(n.id)} onClick={(e) => onItem(e, n.id)}>
              <Icon name={n.icon} />
              {n.label}
              <span className="s-drawer__arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </nav>
        <div className="s-drawer__foot">
          <Link to={profile.resume} className="s-drawer__item">
            <Icon name="file" /> Résumé
          </Link>
          <button type="button" className="s-drawer__item s-drawer__theme" onClick={toggleTheme}>
            <Icon name={isDark ? 'sun' : 'moon'} /> Toggle theme
          </button>
        </div>
      </aside>
    </>
  );
}
