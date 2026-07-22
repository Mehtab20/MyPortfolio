import { useState, useEffect } from 'react';
import profilePhoto from '../assets/profile-photo.png';
import { useTilt } from '../lib/hooks';

const roles = [
  'Software Engineering Student',
  'Cloud & DevOps Engineer',
  'Full Stack Developer',
  'UI/UX Enthusiast',
];

function TypewriterRoles() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayRole, setDisplayRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayRole === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayRole === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
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
  }, [displayRole, isDeleting, roleIndex]);

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

function ProfileImage() {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt(8);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex-shrink-0">
      {/* Glow ring */}
      <div
        className={`absolute -inset-4 rounded-full transition-all duration-1000 ${
          isHovered ? 'opacity-60 scale-110' : 'opacity-20 scale-100'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.3), transparent 70%)',
          filter: 'blur(20px)',
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
          {/* Golden ring */}
          <div
            className={`w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full p-[3px] transition-all duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, #2dd4bf, #14b8a6, #06b6d4, #14b8a6)'
                : 'linear-gradient(135deg, #14b8a6, #2dd4bf, #14b8a6)',
              backgroundSize: '200% 200%',
              animation: isHovered ? 'gradient-shift 2s ease infinite' : 'none',
            }}
          >
            <div
              className="w-full h-full rounded-full p-[3px] overflow-hidden"
              style={{ backgroundColor: 'var(--theme-bg)' }}
            >
              <img
                src={profilePhoto}
                alt="Mehtab Akbar - Software Engineering Student"
                className="w-full h-full rounded-full object-cover transition-transform duration-700 hover:scale-110"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium mb-5 glass animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span style={{ color: 'var(--theme-text-muted)' }}>Available</span>
            </div>

            {/* Name */}
            <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 tracking-tight">
              <span style={{ color: 'var(--theme-text)' }}>Mehtab</span>
              <br className="sm:hidden" />
              <span className="gradient-text"> Akbar</span>
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
                <TypewriterRoles />
                <span className="opacity-50" style={{ color: 'var(--theme-text-muted)' }}>/&gt;</span>
              </span>
            </div>

            {/* Tagline */}
            <p
              className="animate-fade-in-up delay-300 max-w-xl text-base sm:text-lg leading-relaxed mb-8"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              Crafting exceptional digital experiences through cloud-native architectures and modern software engineering.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href="#about"
                onClick={(e) => handleScroll(e, '#about')}
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl btn-primary text-sm font-semibold"
              >
                <span>Get To Know Me</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#projects"
                onClick={(e) => handleScroll(e, '#projects')}
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl btn-outline text-sm font-semibold"
              >
                <span>View My Work</span>
              </a>
            </div>

            {/* Hero Stats */}
            <div className="animate-fade-in-up delay-500 mt-10 grid grid-cols-3 gap-6 sm:gap-10 max-w-sm lg:max-w-none mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-bold gradient-text">10+</div>
                <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--theme-text-muted)' }}>Projects</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-bold gradient-text">3+</div>
                <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--theme-text-muted)' }}>Years Active</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-bold gradient-text">100%</div>
                <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--theme-text-muted)' }}>Dedication</div>
              </div>
            </div>
          </div>

          {/* ── Right: Profile Photo ── */}
          <div className="animate-fade-in-up delay-200 order-1 lg:order-2">
            <ProfileImage />
          </div>
        </div>
      </div>
    </section>
  );
}
