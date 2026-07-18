import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="relative group flex items-center gap-2"
            aria-label="Mehtab Akbar - Home"
          >
            <div className="w-9 h-9 rounded-lg bg-[#111119] border border-primary/30 flex items-center justify-center font-bold text-sm transition-transform duration-300 group-hover:scale-110">
              <span className="gradient-text">MA</span>
            </div>
            <span className="text-lg font-semibold hidden sm:block" style={{ color: 'var(--theme-text)' }}>
              Mehtab
              <span className="gradient-text ml-1">Akbar</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'text-primary'
                    : ''
                }`}
                style={{
                  color:
                    activeSection === link.href.slice(1)
                      ? 'var(--color-primary)'
                      : 'var(--theme-text-secondary)',
                }}
              >
                {activeSection === link.href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary" />
                )}
                <span className="relative">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Right side: Auth + Theme Toggle + Download Resume */}
          <div className="flex items-center gap-2">
            {/* Sign In - Desktop */}
            <Link
              to="/login"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/5"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              Sign In
            </Link>

            {/* Get Started - Desktop */}
            <Link
              to="/signup"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg btn-primary text-sm font-semibold"
            >
              Get Started
            </Link>

            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                color: 'var(--theme-text-secondary)',
                background: 'transparent',
              }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                /* Sun icon */
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                /* Moon icon */
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>

            {/* Download Resume - Desktop */}
            <a
              href="#"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg btn-outline text-sm"
              aria-label="Download Resume"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Resume
            </a>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: 'var(--theme-text)' }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full rounded-full transition-all duration-300 origin-center ${
                    isOpen ? 'rotate-45 translate-y-[7px]' : ''
                  }`}
                  style={{ backgroundColor: 'var(--theme-text)' }}
                />
                <span
                  className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                    isOpen ? 'opacity-0 scale-0' : ''
                  }`}
                  style={{ backgroundColor: 'var(--theme-text)' }}
                />
                <span
                  className={`block h-0.5 w-full rounded-full transition-all duration-300 origin-center ${
                    isOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
                  style={{ backgroundColor: 'var(--theme-text)' }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-strong mx-4 mb-4 rounded-xl p-2" style={{ borderTop: '1px solid var(--theme-border)' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300"
              style={{
                color:
                  activeSection === link.href.slice(1)
                    ? 'var(--color-primary)'
                    : 'var(--theme-text-secondary)',
                background:
                  activeSection === link.href.slice(1)
                    ? 'rgba(212, 165, 34, 0.08)'
                    : 'transparent',
              }}
            >
              {link.label}
            </a>
          ))}
          {/* Mobile Auth Links */}
          <div className="flex gap-2 mt-3">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex-1 block px-4 py-2.5 rounded-lg text-sm font-semibold text-center btn-outline"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="flex-1 block px-4 py-2.5 rounded-lg text-sm font-semibold text-center btn-primary"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Resume Link */}
          <a
            href="#"
            className="block px-4 py-3 rounded-lg text-sm font-semibold text-center mt-2 btn-outline"
          >
            Download Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
