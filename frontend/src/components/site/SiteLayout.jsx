import { useEffect, useRef, useState } from 'react';
import '../../styles/site.css';
import { useTheme } from '../../context/ThemeContext';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import { Icon } from './Icons';

export default function SiteLayout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const barRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  // Scroll progress bar + back-to-top button.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      setShowTop(window.scrollY > 600);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="site" id="top">
      <div className="s-orbs" aria-hidden="true">
        <span className="s-orb s-orb--a" />
        <span className="s-orb s-orb--b" />
        <span className="s-orb s-orb--c" />
      </div>
      <div ref={barRef} className="s-progress" aria-hidden="true" />
      <a href="#main" className="s-skip">Skip to content</a>
      <SiteNav theme={theme} toggleTheme={toggleTheme} />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        {children}
      </main>
      <SiteFooter />
      <button
        type="button"
        className={`s-fab${showTop ? ' is-shown' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <Icon name="chevronUp" />
      </button>
    </div>
  );
}
