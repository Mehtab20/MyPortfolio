const certifications = [
  {
    title: 'Google Cloud Digital Leader',
    issuer: 'Google Cloud',
    year: '2025',
    icon: '☁️',
  },
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2025',
    icon: '📘',
  },
  {
    title: 'Meta Front-End Developer',
    issuer: 'Meta (Coursera)',
    year: '2024',
    icon: '⚛️',
  },
  {
    title: 'GitHub Actions & CI/CD',
    issuer: 'GitHub',
    year: '2024',
    icon: '🔄',
  },
];

const stats = [
  { value: '4', suffix: '+', label: 'Certifications' },
  { value: '3', suffix: '+', label: 'Years Active' },
  { value: '100', suffix: '%', label: 'Commitment' },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32" aria-label="Certifications section">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>Professional </span>
            <span className="gradient-text">Growth</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            Professional certifications that validate my expertise.
            I believe in continuous learning and staying updated with the latest technologies.
          </p>
        </div>

        {/* Stats */}
        <div className="reveal grid grid-cols-3 gap-6 sm:gap-10 max-w-lg mx-auto mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs mt-1 font-medium" style={{ color: 'var(--theme-text-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="group card-surface rounded-xl p-5 sm:p-6 text-center transition-all duration-300 hover:-translate-y-1 golden-border-hover cursor-default"
            >
              <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">
                {cert.icon}
              </div>
              <h3
                className="text-sm font-bold mb-1 leading-snug"
                style={{ color: 'var(--theme-text)' }}
              >
                {cert.title}
              </h3>
              <p className="text-xs mb-2" style={{ color: 'var(--color-primary)' }}>
                {cert.issuer}
              </p>
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium"
                style={{
                  backgroundColor: 'rgba(20, 184, 166, 0.06)',
                  color: 'var(--theme-text-muted)',
                }}
              >
                {cert.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
