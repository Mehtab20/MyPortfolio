import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import bgWallpaper from './assets/bg-wallpaper.png';

/* ──────────────────────────────────────────────
   Scroll-to-Top Button
   ────────────────────────────────────────────── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      id="scroll-to-top"
      onClick={scrollUp}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full btn-primary flex items-center justify-center shadow-lg transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}

/* ──────────────────────────────────────────────
   Scroll Reveal Hook
   ────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    // Slight delay to let DOM paint first
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}

/* ──────────────────────────────────────────────
   Main App
   ────────────────────────────────────────────── */
export default function App() {
  /* ── Theme state ── */
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark';
    }
    return 'dark';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', next);
      return next;
    });
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /* ── Scroll reveal ── */
  useScrollReveal();

  return (
    <div className="relative min-h-screen font-sans">
      {/* ── Fixed background wallpaper ── */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <img
          src={bgWallpaper}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Overlay adapts to theme */}
        <div
          className="absolute inset-0 transition-colors duration-500"
          style={{ backgroundColor: 'var(--theme-overlay)' }}
        />
      </div>

      {/* ── Page content ── */}
      <div className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>

      <ScrollToTop />
    </div>
  );
}
