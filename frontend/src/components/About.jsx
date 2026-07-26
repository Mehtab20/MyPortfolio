import { motion } from 'framer-motion';
import { useAbout } from '../hooks/useCmsData';

export default function About() {
  const { data, loading } = useAbout();
  const about = data || {};
  const paragraphs = Array.isArray(about.bio_paragraphs) && about.bio_paragraphs.length > 0
    ? about.bio_paragraphs
    : [
        "I'm a Software Engineering student at Iqra University Islamabad, passionate about building AI-powered healthcare systems, cross-platform mobile applications, and scalable cloud solutions. My work bridges the gap between cutting-edge technology and real-world impact — from digitizing hospital operations to developing intelligent medical diagnostic tools.",
        "Currently focused on expanding my expertise in Cloud Computing (AWS/GCP), DevOps automation, and production-grade full-stack development. I believe in building software that not only works beautifully but makes a tangible difference in people's lives.",
      ];
  const info = Array.isArray(about.personal_info) && about.personal_info.length > 0
    ? about.personal_info
    : [
        { label: 'Experience', value: '3+ Years' },
        { label: 'Location', value: 'Rawalpindi, Pakistan' },
        { label: 'Nationality', value: 'Pakistani' },
        { label: 'Born', value: '2004' },
      ];
  const tagline = about.tagline || 'A passionate developer building exceptional digital experiences.';
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
            {tagline}
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
          >            {paragraphs.map((p, i) => (
              <p key={i} className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: 'var(--theme-text-secondary)' }}>
                {p}
              </p>
            ))}
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
            {info.map((info, i) => (
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
