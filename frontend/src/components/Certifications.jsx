import { motion } from 'framer-motion';

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
    <motion.section
      id="certifications" className="relative py-24 sm:py-32" aria-label="Certifications section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>Professional </span>
            <span className="gradient-text">Growth</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            Professional certifications that validate my expertise.
            I believe in continuous learning and staying updated with the latest technologies.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-6 sm:gap-10 max-w-lg mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 12, stiffness: 150, delay: 0.3 }}
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs mt-1 font-medium" style={{ color: 'var(--theme-text-muted)' }}>
                {stat.label}
              </div>              </motion.div>
            ))}
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              className="group card-surface rounded-xl p-5 sm:p-6 text-center transition-all duration-300 golden-border-hover cursor-default"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 120 } },
              }}
              whileHover={{ y: -4, boxShadow: '0 8px 25px rgba(20,184,166,0.08)' }}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
