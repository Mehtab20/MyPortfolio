const coursework = [
  'Data Structures & Algorithms',
  'Database Management Systems (DBMS)',
  'Software Design Patterns',
  'Human-Computer Interaction (HCI)',
  'Software Requirement Engineering',
];

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32" aria-label="Education section">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 reveal">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
            style={{
              border: '1px solid var(--theme-border)',
              color: 'var(--color-primary)',
            }}
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342"
              />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>Education</span>
          </h2>
        </div>

        {/* Education Details Card */}
        <div className="max-w-2xl mx-auto reveal">
          <div className="group card-surface rounded-2xl p-6 sm:p-10 transition-all duration-500 hover:-translate-y-1 golden-border-hover relative overflow-hidden">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-dashed" style={{ borderColor: 'var(--theme-border)' }}>
              <div>
                <h3
                  className="text-xl sm:text-2xl font-bold mb-1 transition-colors duration-300"
                  style={{ color: 'var(--theme-text)' }}
                >
                  Bachelor of Science in Software Engineering
                </h3>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                  Iqra University, Islamabad Campus
                </p>
              </div>
              <div className="shrink-0">
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
                  style={{
                    backgroundColor: 'rgba(212, 165, 34, 0.1)',
                    color: 'var(--color-primary-light)',
                  }}
                >
                  2022 – Present (Expected 2026)
                </span>
              </div>
            </div>

            {/* Coursework list */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--theme-text-muted)' }}>
                Relevant Coursework
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coursework.map((course, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2.5 text-sm"
                    style={{ color: 'var(--theme-text-secondary)' }}
                  >
                    {/* Golden dot indicator */}
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-primary)' }} />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
}
