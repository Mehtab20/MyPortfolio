import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './Icons';
import { profile } from '../../data/site';

export const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'path', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

/** Scroll to a section on the landing page, or navigate there from another page. */
export function useSectionNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return (e, id) => {
    e?.preventDefault();
    if (location.pathname === '/') {
      if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', id === 'top' ? '/' : `#${id}`);
    } else {
      navigate(id === 'top' ? '/' : `/#${id}`);
    }
  };
}

function Mark({ onClick }) {
  return (
    <Link to="/" className="s-mono-mark" onClick={onClick} aria-label={`${profile.name}, home`}>
      <span className="s-mono-mark__glyph" aria-hidden="true">ma</span>
      <span className="s-mono-mark__name">{profile.name}</span>
    </Link>
  );
}

export default function SiteNav({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const location = useLocation();
  const goTo = useSectionNav();
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const isHome = location.pathname === '/';
  const isDark = theme !== 'light';

  // Highlight the section in view on the landing page.
  useEffect(() => {
    if (!isHome || !('IntersectionObserver' in window)) return undefined;
    const els = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Full-screen menu: lock scroll, Escape closes, focus moves inside.
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
    const t = setTimeout(() => menuRef.current?.querySelector('button, a')?.focus(), 60);
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
  const themeLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <>
      <header className="s-nav">
        <nav className="s-container s-nav__inner" aria-label="Main">
          <Mark onClick={(e) => isHome && onItem(e, 'top')} />
          <ul className="s-nav__links">
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <a href={`/#${n.id}`} className="s-nav__link" aria-current={current(n.id)} onClick={(e) => onItem(e, n.id)}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="s-nav__actions">
            <button type="button" className="s-icon-btn" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
              <Icon name={isDark ? 'sun' : 'moon'} />
            </button>
            <Link to={profile.resume} className="s-btn s-btn--outline s-btn--sm s-nav__resume">Résumé</Link>
            <button
              ref={btnRef}
              type="button"
              className="s-icon-btn s-nav__menu-btn"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </nav>
      </header>

      <div id="site-menu" ref={menuRef} className={`s-menu${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open} inert={!open}>
        <div className="s-menu__head">
          <Mark onClick={(e) => onItem(e, 'top')} />
          <button type="button" className="s-icon-btn" onClick={() => setOpen(false)} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>
        <nav className="s-menu__list" aria-label="Sections">
          {NAV_ITEMS.map((n, i) => (
            <a key={n.id} href={`/#${n.id}`} className="s-menu__item" style={{ '--i': i }} aria-current={current(n.id)} onClick={(e) => onItem(e, n.id)}>
              <small>{String(i + 1).padStart(2, '0')}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="s-menu__foot">
          <Link to={profile.resume} className="s-btn s-btn--sm">Résumé</Link>
          <button type="button" className="s-btn s-btn--outline s-btn--sm" onClick={toggleTheme}>
            <Icon name={isDark ? 'sun' : 'moon'} /> {isDark ? 'Light theme' : 'Dark theme'}
          </button>
        </div>
      </div>
    </>
  );
}
