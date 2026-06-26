import { useState, useEffect } from 'react';
import { fetchCV } from '../api/index.js';

export default function Hero() {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCV = async () => {
      try {
        const data = await fetchCV();
        setCvData(data);
      } catch (err) {
        setError('Failed to load profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCV();
  }, []);

  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-purple/15 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[128px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating code particles */}
        <div className="absolute top-20 left-[10%] text-primary/20 text-sm font-mono animate-float select-none">{'<div>'}</div>
        <div className="absolute top-40 right-[15%] text-accent-purple/20 text-xs font-mono animate-float-delayed select-none">{'{ }'}</div>
        <div className="absolute bottom-32 left-[20%] text-accent-cyan/15 text-sm font-mono animate-float select-none">{'</>'}</div>
        <div className="absolute top-1/3 right-[8%] text-primary/10 text-lg font-mono animate-float-delayed select-none">{'( )'}</div>
        <div className="absolute bottom-1/4 right-[25%] text-accent-purple/10 text-xs font-mono animate-float select-none">{'=> {}'}</div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {loading ? (
           <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-48 bg-surface-light rounded mb-6"></div>
              <div className="h-16 w-3/4 bg-surface-light rounded mb-4"></div>
              <div className="h-24 w-full max-w-2xl bg-surface-light rounded"></div>
           </div>
        ) : error ? (
           <div className="text-red-400">{error}</div>
        ) : (
          <>
            {/* Greeting badge */}
            <div className="animate-fade-in-up mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-text-secondary border border-border">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
              </span>
            </div>

            {/* Greeting */}
            <p className="animate-fade-in-up-delay-1 text-text-secondary text-lg sm:text-xl font-light mb-3">
              Hello, I&apos;m
            </p>

            {/* Name */}
            <h1 className="animate-fade-in-up-delay-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              <span className="text-text-primary">{cvData.name.split(' ')[0]} </span>
              <span className="gradient-text">{cvData.name.split(' ')[1] || ''}</span>
            </h1>

            {/* Title */}
            <div className="animate-fade-in-up-delay-3 mb-6">
              <span className="inline-block font-mono text-xl sm:text-2xl md:text-3xl text-accent-cyan font-medium">
                {'<'}
                <span className="text-primary-light">{cvData.title}</span>
                {' />'}
              </span>
            </div>

            {/* Bio */}
            <p className="animate-fade-in-up-delay-4 max-w-2xl mx-auto text-text-secondary text-base sm:text-lg leading-relaxed mb-10">
              {cvData.summary}
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#projects"
                onClick={(e) => handleScroll(e, '#projects')}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View Projects</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, '#contact')}
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass border border-border text-text-primary font-medium text-sm transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5 hover:glow-sm active:translate-y-0"
              >
                <span>Contact Me</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </>
        )}

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2.5 rounded-full bg-text-muted/50 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
