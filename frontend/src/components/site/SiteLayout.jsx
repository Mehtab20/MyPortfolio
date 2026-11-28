import { useEffect, useRef } from 'react';
import '../../styles/site.css';
import { useTheme } from '../../context/ThemeContext';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';

export default function SiteLayout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const barRef = useRef(null);

  // Thin gold scroll-progress line.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
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
      <div ref={barRef} className="s-progress" aria-hidden="true" />
      <a href="#main" className="s-skip">Skip to content</a>
      <SiteNav theme={theme} toggleTheme={toggleTheme} />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
