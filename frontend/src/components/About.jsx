const stats = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    value: '8+ CGPA',
    label: 'Sophomore',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    value: 'Cloud & DevOps',
    label: 'Enthusiast',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    value: 'Projects',
    label: '10+ Completed',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    value: 'JavaScript',
    label: '& Modern Stack',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32" aria-label="About section">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 reveal">
          {/* Icon */}
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
            style={{
              border: '1px solid var(--theme-border)',
              color: 'var(--color-primary)',
            }}
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>About </span>
            <span className="gradient-text">Me</span>
          </h2>
        </div>

        {/* Bio */}
        <div className="reveal max-w-3xl mx-auto text-center mb-14">
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--theme-text-secondary)' }}
          >
            I&apos;m a Software Engineering student with a keen interest in web, mobile development,
            cloud computing, and turning complex ideas into impactful applications.
            Active in the tech community and always exploring new tools, technologies, and frameworks
            that push the boundary of what&apos;s possible in software engineering.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group card-surface rounded-2xl p-5 sm:p-6 text-center transition-all duration-500 hover:-translate-y-1 golden-border-hover cursor-default"
            >
              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 transition-colors duration-300"
                style={{
                  backgroundColor: 'rgba(212, 165, 34, 0.08)',
                  color: 'var(--color-primary)',
                }}
              >
                {stat.icon}
              </div>

              {/* Value */}
              <h3
                className="text-lg sm:text-xl font-bold mb-1"
                style={{ color: 'var(--theme-text)' }}
              >
                {stat.value}
              </h3>

              {/* Label */}
              <p
                className="text-xs sm:text-sm font-medium"
                style={{ color: 'var(--theme-text-muted)' }}
              >
                {stat.label}
              </p>

              {/* Bottom accent line */}
              <div
                className="mt-4 h-0.5 rounded-full mx-auto transition-all duration-500 group-hover:w-full w-0"
                style={{ background: 'linear-gradient(90deg, transparent, #d4a522, transparent)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
