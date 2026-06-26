const educationData = [
  {
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'Iqra University Islamabad Campus',
    status: '2022 – 2026 (Expected)',
    focus: 'Software Engineering Focus',
    narrative: 'Throughout my academic progression at Iqra University, I have focused on building a solid theoretical and practical foundation in software engineering principles. I have designed custom database architectures, worked on web/mobile platforms, and gained fundamental experience with cloud environments. Active participation in projects has allowed me to apply class theories to solve real-world problems, positioning me as a versatile software engineer ready for industry challenges.',
    areas: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Software Design Patterns',
      'Human Computer Interaction',
      'Software Requirement Engineering',
      'Mobile Application Development',
    ],
  },
];

function TimelineCard({ item }) {
  return (
    <div className="relative group">
      {/* Timeline connector */}
      <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent-purple/30 to-transparent" aria-hidden="true" />

      <div className="relative flex gap-5 sm:gap-8">
        {/* Timeline dot */}
        <div className="relative shrink-0 z-10" aria-hidden="true">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-purple p-[1px]">
            <div className="w-full h-full rounded-2xl bg-surface flex items-center justify-center group-hover:bg-surface-light transition-colors duration-300">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="flex-1 glass rounded-2xl p-6 sm:p-8 transition-all duration-500 group-hover:glow-border group-hover:-translate-y-0.5 mt-1">
          {/* Status Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {item.status}
          </span>

          {/* Degree */}
          <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 group-hover:gradient-text transition-all duration-300">
            {item.degree}
          </h3>

          {/* Institution */}
          <p className="text-text-secondary font-medium mb-1 flex items-center gap-2">
            <svg className="w-4 h-4 text-primary-light shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {item.institution}
          </p>

          {/* Focus */}
          <p className="text-text-muted text-sm mb-4">{item.focus}</p>

          {/* Narrative */}
          <p className="text-text-secondary text-sm leading-relaxed mb-6 bg-surface/50 border border-border/40 p-4 rounded-xl">
            {item.narrative}
          </p>

          {/* Relevant Areas */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              Relevant Coursework
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.areas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-lighter text-text-secondary border border-border transition-all duration-300 hover:border-primary/30 hover:text-primary-light"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32" aria-label="Education section">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-primary-light tracking-wider uppercase mb-4">
            Education
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-text-primary">Academic </span>
            <span className="gradient-text">Background</span>
          </h2>
          <p className="max-w-lg mx-auto text-text-secondary text-base">
            Building a strong foundation in software engineering
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto space-y-8">
          {educationData.map((item) => (
            <TimelineCard key={item.degree} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
