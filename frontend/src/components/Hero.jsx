import { useState, useEffect } from 'react';
import profilePhoto from '../assets/profile-photo.png';
import { useTilt } from '../lib/hooks';
import { useHero } from '../hooks/useCmsData';

function TypewriterRoles({ roles }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayRole, setDisplayRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const roleList = Array.isArray(roles) && roles.length > 0 ? roles : ['Full-Stack Software Engineer'];

  useEffect(() => {
    const currentRole = roleList[roleIndex];
    let timeout;

    if (!isDeleting && displayRole === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayRole === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roleList.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayRole(
            isDeleting
              ? currentRole.slice(0, displayRole.length - 1)
              : currentRole.slice(0, displayRole.length + 1)
          );
        },
        isDeleting ? 30 : 60
      );
    }

    return () => clearTimeout(timeout);
  }, [displayRole, isDeleting, roleIndex, roleList]);

  return (
    <span className="inline-flex items-center">
      <span>{displayRole}</span>
      <span
        className="ml-0.5 w-[2px] h-[1em] animate-pulse"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />
    </span>
  );
}

function ProfileImage({ imageSrc }) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt(8);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex-shrink-0">
      {/* Multi-layer glow effect */}
      <div
        className={`absolute -inset-6 rounded-full transition-all duration-1000 ${
          isHovered ? 'opacity-70 scale-110' : 'opacity-30 scale-100'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.25), rgba(212,165,34,0.1), transparent 70%)',
          filter: 'blur(25px)',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />

      {/* Secondary gold glow */}
      <div
        className={`absolute -inset-3 rounded-full transition-all duration-1000 ${
          isHovered ? 'opacity-50' : 'opacity-15'
        }`}
        style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(212,165,34,0.2), transparent 60%)',
          filter: 'blur(15px)',
          animation: 'pulse 4s ease-in-out infinite 2s',
        }}
      />

      {/* Floating container */}
      <div className="animate-float-slow" style={{ animationDelay: '0.5s' }}>
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { handleMouseLeave(); setIsHovered(false); }}
          onMouseEnter={() => setIsHovered(true)}
          className="relative cursor-pointer"
          style={style}
        >
          {/* Photo dimensions container — does NOT rotate */}
          <div
            className={`w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full transition-all duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          >
            {/* Rotating ring — absolutely positioned, does NOT wrap the photo */}
            <div
              className="absolute -inset-[3px] sm:-inset-[3.5px] lg:-inset-[4px] rounded-full pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, #14b8a6, #d4a522, #2dd4bf, #06b6d4, #d4a522, #14b8a6)',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
                animation: 'spin-slow 6s linear infinite',
              }}
            />

            {/* Photo container */}
            <div
              className="w-full h-full rounded-full overflow-hidden relative"
              style={{ backgroundColor: 'var(--theme-bg)' }}
            >
              <img
                src={imageSrc || profilePhoto}
                alt="Mehtab Akbar - Software Engineering Student"
                className="w-full h-full rounded-full object-cover transition-transform duration-700 hover:scale-110"
                loading="eager"
              />
              {/* Seamless edge blend overlay — melts photo background into dark theme */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 45%, transparent 35%, var(--theme-bg) 85%)',
                }}
              />
              {/* Hover overlay */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  isHovered ? 'opacity-40' : 'opacity-0'
                }`}
                style={{
                  background: 'radial-gradient(circle at center, rgba(20,184,166,0.15), transparent 70%)',
                }}
              />
            </div>
          </div>

          {/* Golden sparkle particle */}
          <div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-float-slow"
            style={{
              background: 'radial-gradient(circle, rgba(212,165,34,0.8), transparent)',
              filter: 'blur(2px)',
              animationDelay: '1s',
            }}
          />
          <div
            className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full animate-float-slow"
            style={{
              background: 'radial-gradient(circle, rgba(20,184,166,0.6), transparent)',
              filter: 'blur(2px)',
              animationDelay: '2.5s',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { data, loading } = useHero();
  const hero = data || {};
  const firstName = hero.first_name || 'Mehtab';
  const lastName = hero.last_name || 'Akbar';
  const tagline = hero.tagline || 'Full-Stack Software Engineer specializing in AI-powered healthcare systems, cloud computing, cross-platform mobile apps (Flutter), and scalable SaaS platforms using React, FastAPI, and modern DevOps practices.';
  const heroStats = Array.isArray(hero.stats)
    ? hero.stats
    : [
        { value: '4+', label: 'Projects' },
        { value: '3+', label: 'Years Coding' },
        { value: '8+', label: 'Tech Stacks' },
        { value: '10+', label: 'Open Source' },
      ];
  const ctaButtons = Array.isArray(hero.cta_buttons)
    ? hero.cta_buttons
    : [
        { label: 'View Projects', href: '#projects', variant: 'primary' },
        { label: 'View Resume', href: '/resume', variant: 'outline' },
        { label: 'Hire Me', href: '#contact', variant: 'ghost' },
      ];
  const isAvailable = hero.available_status !== false;
  const profileImg = hero.profile_image || '';

  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCtaClick = (e, href) => {
    if (href.startsWith('#')) {
      handleScroll(e, href);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 sm:pt-28"
      aria-label="Hero section"
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(20,184,166,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* ── Left: Text Content ── */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            {/* Available badge */}
            {isAvailable && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium mb-5 glass animate-fade-in-up">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span style={{ color: 'var(--theme-text-muted)' }}>Available</span>
              </div>
            )}

            {/* Name */}
            <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 tracking-tight">
              <span style={{ color: 'var(--theme-text)' }}>{firstName}</span>
              <br className="sm:hidden" />
              <span className="gradient-text"> {lastName}</span>
            </h1>

            {/* Code-style role badge */}
            <div className="animate-fade-in-up delay-200 mb-4">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-mono font-medium"
                style={{
                  backgroundColor: 'rgba(20,184,166,0.06)',
                  border: '1px solid rgba(20,184,166,0.15)',
                  color: 'var(--color-primary-light)',
                }}
              >
                <span className="opacity-50" style={{ color: 'var(--theme-text-muted)' }}>&lt;</span>
                <TypewriterRoles roles={hero.roles} />
                <span className="opacity-50" style={{ color: 'var(--theme-text-muted)' }}>/&gt;</span>
              </span>
            </div>

            {/* Tagline */}
            <p
              className="animate-fade-in-up delay-300 max-w-xl text-base sm:text-lg leading-relaxed mb-8"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              {tagline}
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              {ctaButtons.map((btn, i) => {
                const btnClass = btn.variant === 'primary'
                  ? 'btn-primary'
                  : btn.variant === 'outline'
                  ? 'btn-outline'
                  : 'btn-ghost';
                return (
                  <a
                    key={i}
                    href={btn.href}
                    onClick={(e) => handleCtaClick(e, btn.href)}
                    className={`group inline-flex items-center gap-2 px-7 py-3 rounded-xl ${btnClass} text-sm font-semibold`}
                  >
                    <span>{btn.label}</span>
                    {btn.variant === 'primary' && (
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    )}
                    {btn.variant === 'outline' && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Hero Stats */}
            <div className="animate-fade-in-up delay-500 mt-10 grid grid-cols-4 gap-4 sm:gap-6 max-w-sm lg:max-w-none mx-auto lg:mx-0">
              {heroStats.map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--theme-text-muted)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Profile Photo ── */}
          <div className="animate-fade-in-up delay-200 order-1 lg:order-2">
            <ProfileImage imageSrc={profileImg} />
          </div>
        </div>
      </div>
    </section>
  );
}
