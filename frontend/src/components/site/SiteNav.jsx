import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon, Arrow } from './Icons';
import { profile } from '../../data/site';

export const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

/** Scroll to a section on the landing page, or navigate there from another page. */
export function useSectionNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return (e, id) => {
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        e?.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${id}`);
      }
    } else {
      e?.preventDefault();
      navigate(`/#${id}`);
    }
  };
}

export default function SiteNav({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const location = useLocation();
  const goTo = useSectionNav();
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const isHome = location.pathname === '/';

  // Background on scroll; hide while scrolling down, show when scrolling up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 480 && y > lastY + 4);
      if (y < lastY - 4 || y < 480) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section (landing only).
  useEffect(() => {
    if (!isHome || !('IntersectionObserver' in window)) return undefined;
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  // Close menu on route change.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  // Lock scroll, close on Escape, move focus into the menu.
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => menuRef.current?.querySelector('a')?.focus(), 60);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open]);

  const onItem = (e, id) => {
    if (!open) return goTo(e, id);
    // Menu is open and the page is scroll-locked: close first, then scroll.
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => goTo(null, id), 30);
  };

  const isDark = theme !== 'light';

  return (
    <>
      <header className={`s-nav${scrolled || open ? ' is-scrolled' : ''}${hidden && !open ? ' is-hidden' : ''}`}>
        <nav className="s-container s-nav__inner" aria-label="Main">
          <Link to="/" className="s-wordmark" aria-label={`${profile.name}, home`} onClick={() => isHome && window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="s-wordmark__mark" aria-hidden="true">ma</span>
            <span>{profile.name}</span>
          </Link>

          <ul className="s-nav__links">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`/#${item.id}`}
                  className="s-nav__link"
                  aria-current={isHome && active === item.id ? 'true' : undefined}
                  onClick={(e) => onItem(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link to={profile.resume} className="s-nav__link">Résumé</Link>
            </li>
          </ul>

          <div className="s-nav__actions">
            <button
              type="button"
              className="s-icon-btn"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              title={isDark ? 'Light theme' : 'Dark theme'}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="/#contact" className="s-btn s-nav__cta" onClick={(e) => onItem(e, 'contact')}>
              Get in touch
            </a>
            <button
              ref={btnRef}
              type="button"
              className="s-icon-btn s-nav__menu-btn"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      <div id="site-menu" ref={menuRef} className={`s-menu${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <ul className="s-menu__list">
          {NAV_ITEMS.map((item, i) => (
            <li className="s-menu__item" key={item.id}>
              <a href={`/#${item.id}`} className="s-menu__link" onClick={(e) => onItem(e, item.id)}>
                {item.label}
                <span className="s-label">0{i + 1}</span>
              </a>
            </li>
          ))}
          <li className="s-menu__item">
            <Link to={profile.resume} className="s-menu__link">
              Résumé
              <span className="s-label">CV</span>
            </Link>
          </li>
        </ul>
        <div className="s-menu__foot">
          <a className="s-link s-link--underlined" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="s-link s-link--underlined" href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow dir="ne" /></a>
          <a className="s-link s-link--underlined" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow dir="ne" /></a>
        </div>
      </div>
    </>
  );
}
