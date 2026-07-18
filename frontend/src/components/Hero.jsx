import { useState, useEffect } from 'react';
import profilePhoto from '../assets/profile-photo.png';
import { useTypewriter, useTilt, useInView } from '../lib/hooks';

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
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayRole === '') {
      // Move to next role
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

function AnimatedStat({ value, label, suffix = '' }) {
  const [ref, inView] = useInView(0.5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime;
    const duration = 2000;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-bold gradient-text">
        {count}{suffix}
      </div>
      <div className="text-xs mt-1 font-medium" style={{ color: 'var(--theme-text-muted)' }}>
        {label}
      </div>
    </div>
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
          background: 'radial-gradient(circle, rgba(212,165,34,0.3), transparent 70%)',
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
            className={`w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-[3px] transition-all duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, #f0c840, #d4a522, #e8b92e, #d4a522)'
                : 'linear-gradient(135deg, #d4a522, #e8b92e, #d4a522)',
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

      {/* Floating decorative dots */}
      <div
        className="absolute -top-2 -right-2 w-3 h-3 rounded-full animate-pulse-slow"
        style={{ backgroundColor: 'var(--color-primary)', opacity: 0.5 }}
      />
      <div
        className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full animate-float"
        style={{ backgroundColor: 'var(--color-primary)', opacity: 0.3 }}
      />
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
          background: 'radial-gradient(ellipse at 50% 0%, rgba(212,165,34,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* ── Left: Text Content ── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Greeting with badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 glass animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span style={{ color: 'var(--theme-text-muted)' }}>
                Available for opportunities
              </span>
            </div>

            {/* Name with gradient */}
            <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 tracking-tight">
              <span style={{ color: 'var(--theme-text)' }}>Hi, I&apos;m </span>
              <span className="gradient-text">Mehtab Akbar</span>
            </h1>

            {/* Typing animation subtitle */}
            <div className="animate-fade-in-up delay-200 mb-6">
              <p className="text-lg sm:text-xl md:text-2xl font-medium" style={{ color: 'var(--theme-text-secondary)' }}>
                <TypewriterRoles />
              </p>
            </div>

            {/* Description */}
            <p
              className="animate-fade-in-up delay-300 max-w-xl text-base sm:text-lg leading-relaxed mb-8"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              Passionate about building scalable cloud architectures,
              infrastructure, and turning complex ideas into impactful
              applications with industry standards and robust solutions.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                onClick={(e) => handleScroll(e, '#projects')}
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl btn-primary text-sm font-semibold"
              >
                <span>View My Work</span>
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
                href="#contact"
                onClick={(e) => handleScroll(e, '#contact')}
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl btn-outline text-sm font-semibold"
              >
                <span>Contact Me</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up delay-500 mt-12 pt-8 border-t" style={{ borderColor: 'var(--theme-border)' }}>
              <div className="grid grid-cols-3 gap-8 sm:gap-12">
                <AnimatedStat value={10} suffix="+" label="Projects" />
                <AnimatedStat value={8} suffix="+" label="CGPA" />
                <AnimatedStat value={3} suffix="+" label="Technologies" />
              </div>
            </div>
          </div>

          {/* ── Right: Profile Photo ── */}
          <div className="animate-fade-in-up delay-200">
            <ProfileImage />
          </div>
        </div>
      </div>
    </section>
  );
}
