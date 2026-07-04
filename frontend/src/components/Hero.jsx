import profilePhoto from '../assets/profile-photo.png';

export default function Hero() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Left: Text Content ── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Greeting */}
            <p
              className="animate-fade-in-up text-lg sm:text-xl font-light mb-3"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              Hello, I&apos;m
            </p>

            {/* Name */}
            <h1 className="animate-fade-in-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              <span style={{ color: 'var(--theme-text)' }}>Mehtab </span>
              <span className="gradient-text">Akbar</span>
            </h1>

            {/* Subtitle */}
            <div className="animate-fade-in-up-delay-2 mb-6">
              <p className="text-lg sm:text-xl md:text-2xl font-medium" style={{ color: 'var(--color-primary)' }}>
                Software Engineering Student &amp;
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-medium" style={{ color: 'var(--color-primary)' }}>
                Future <span className="gradient-text">Cloud &amp; DevOps Engineer</span>
              </p>
            </div>

            {/* Description */}
            <p
              className="animate-fade-in-up-delay-3 max-w-xl text-base sm:text-lg leading-relaxed mb-8"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              Passionate about building scalable cloud architectures,
              infrastructure, and turning complex ideas into impactful
              applications with software industry standards and robust solutions.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up-delay-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                onClick={(e) => handleScroll(e, '#projects')}
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl btn-primary text-sm"
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
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl btn-outline text-sm"
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
          </div>

          {/* ── Right: Profile Photo ── */}
          <div className="animate-fade-in-up-delay-2 flex-shrink-0">
            <div className="relative">
              {/* Golden ring */}
              <div
                className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-[3px]"
                style={{
                  background: 'linear-gradient(135deg, #d4a522, #e8b92e, #d4a522)',
                }}
              >
                <div
                  className="w-full h-full rounded-full p-[3px]"
                  style={{ backgroundColor: 'var(--theme-bg)' }}
                >
                  <img
                    src={profilePhoto}
                    alt="Mehtab Akbar - Software Engineering Student"
                    className="w-full h-full rounded-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
              {/* Subtle glow behind photo */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-20 -z-10"
                style={{ background: 'radial-gradient(circle, #d4a522, transparent 70%)' }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
