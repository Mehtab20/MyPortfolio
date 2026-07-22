const journey = [
  {
    type: 'work',
    title: 'Freelance Full Stack Developer',
    organization: 'Self-Employed',
    period: '2024 – Present',
    description: 'Building web and mobile applications for clients using React, Flutter, Node.js, and cloud deployment.',
    highlights: ['Delivered 5+ production applications', 'Cloud deployment on Vercel & Netlify', 'Full-stack architecture & API design'],
  },
  {
    type: 'education',
    title: 'B.Sc. Software Engineering',
    organization: 'Iqra University, Islamabad Campus',
    period: '2022 – Present (Expected 2026)',
    description: 'Pursuing a degree in Software Engineering with a focus on cloud computing, HCI, and modern software architecture.',
    highlights: ['8+ CGPA Maintained', 'Active in tech community & events', 'Relevant coursework: DSA, DBMS, HCI, Design Patterns'],
  },
  {
    type: 'education',
    title: 'Intermediate in Computer Science',
    organization: 'Punjab College, Rawalpindi',
    period: '2020 – 2022',
    description: 'Completed intermediate education with a focus on computer science fundamentals.',
    highlights: ['Strong foundation in programming', 'Developed interest in software development', 'Built first programming projects'],
  },
];

function TimelineDot({ type }) {
  const color = type === 'work' ? 'var(--color-primary)' : 'var(--color-primary-light)';
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center z-10"
        style={{
          backgroundColor: type === 'work'
            ? 'rgba(20, 184, 166, 0.15)'
            : 'rgba(6, 182, 212, 0.12)',
          border: `2px solid ${color}`,
        }}
      >
        {type === 'work' ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default function CareerJourney() {
  return (
    <section id="career" className="relative py-24 sm:py-32" aria-label="Career Journey section">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>Career </span>
            <span className="gradient-text">Journey</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            Building impactful digital solutions through continuous learning.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto reveal">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px"
            style={{ backgroundColor: 'var(--theme-border)' }}
          />

          <div className="space-y-10">
            {journey.map((item, index) => (
              <div key={index} className="relative flex gap-6">
                {/* Dot */}
                <div className="relative z-10">
                  <TimelineDot type={item.type} />
                </div>

                {/* Content Card */}
                <div className="flex-1 card-surface rounded-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 golden-border-hover">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3
                        className="text-base sm:text-lg font-bold"
                        style={{ color: 'var(--theme-text)' }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                        {item.organization}
                      </p>
                    </div>
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap shrink-0"
                      style={{
                        backgroundColor: 'rgba(20, 184, 166, 0.08)',
                        color: 'var(--color-primary-light)',
                        border: '1px solid rgba(20, 184, 166, 0.15)',
                      }}
                    >
                      {item.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--theme-text-secondary)' }}>
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                        <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'var(--color-primary)' }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
