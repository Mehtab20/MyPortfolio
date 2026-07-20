export default function About() {
  const personalInfo = [
    { label: 'Experience', value: '3+ Years' },
    { label: 'Location', value: 'Rawalpindi, Pakistan' },
    { label: 'Nationality', value: 'Pakistani' },
    { label: 'Born', value: '2004' },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32" aria-label="About section">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>About </span>
            <span className="gradient-text">Me</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            A passionate developer building exceptional digital experiences.
          </p>
        </div>

        <div className="reveal flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Bio */}
          <div className="flex-1">
            <p
              className="text-base sm:text-lg leading-relaxed mb-6"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              I&apos;m a Software Engineering student with a keen interest in web, mobile development,
              cloud computing, and turning complex ideas into impactful applications.
              Active in the tech community and always exploring new tools, technologies, and frameworks
              that push the boundary of what&apos;s possible in software engineering.
            </p>
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              Currently focused on expanding my knowledge in Cloud Computing, DevOps, and modern
              software architecture while continuously building production-ready applications.
            </p>
          </div>

          {/* Personal Info Grid */}
          <div
            className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden min-w-[280px] sm:min-w-[320px]"
            style={{ backgroundColor: 'var(--theme-border)' }}
          >
            {personalInfo.map((info) => (
              <div
                key={info.label}
                className="p-4 sm:p-5 text-center transition-colors duration-300 hover:bg-white/[0.02]"
                style={{ backgroundColor: 'var(--theme-surface-card)' }}
              >
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--theme-text-muted)' }}>
                  {info.label}
                </div>
                <div className="text-sm sm:text-base font-semibold" style={{ color: 'var(--theme-text)' }}>
                  {info.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
