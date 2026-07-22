import { motion } from 'framer-motion';

const personalInfo = [
  { label: 'Experience', value: '3+ Years' },
  { label: 'Location', value: 'Rawalpindi, Pakistan' },
  { label: 'Nationality', value: 'Pakistani' },
  { label: 'Born', value: '2004' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32" aria-label="About section">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>About </span>
            <span className="gradient-text">Me</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            A passionate developer building exceptional digital experiences.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row gap-10 lg:gap-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Bio */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: 'var(--theme-text-secondary)' }}>
              I&apos;m a Software Engineering student with a keen interest in web, mobile development,
              cloud computing, and turning complex ideas into impactful applications.
              Active in the tech community and always exploring new tools, technologies, and frameworks
              that push the boundary of what&apos;s possible in software engineering.
            </p>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              Currently focused on expanding my knowledge in Cloud Computing, DevOps, and modern
              software architecture while continuously building production-ready applications.
            </p>
          </motion.div>

          {/* Personal Info Grid */}
          <motion.div
            className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden min-w-[280px] sm:min-w-[320px]"
            style={{ backgroundColor: 'var(--theme-border)' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {personalInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
                className="p-4 sm:p-5 text-center transition-colors duration-300 hover:bg-white/[0.02]"
                style={{ backgroundColor: 'var(--theme-surface-card)' }}
              >
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--theme-text-muted)' }}>
                  {info.label}
                </div>
                <div className="text-sm sm:text-base font-semibold" style={{ color: 'var(--theme-text)' }}>
                  {info.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
