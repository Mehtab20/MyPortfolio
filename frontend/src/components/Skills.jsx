import { motion } from 'framer-motion';

const skillCategories = [
  {
    key: 'languages',
    label: 'Languages',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'Java', icon: '☕' },
      { name: 'JavaScript', icon: '⚡' },
      { name: 'C++', icon: '🔧' },
      { name: 'Dart', icon: '🎯' },
      { name: 'SQL', icon: '🗄️' },
    ],
  },
  {
    key: 'frameworks',
    label: 'Frameworks',
    skills: [
      { name: 'Flutter', icon: '📱' },
      { name: 'React', icon: '⚛️' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'Express.js', icon: '🚂' },
      { name: 'REST APIs', icon: '🔗' },
    ],
  },
  {
    key: 'databases',
    label: 'Databases',
    skills: [
      { name: 'MySQL', icon: '🐬' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Oracle', icon: '🏛️' },
    ],
  },
  {
    key: 'tools',
    label: 'Tools & DevOps',
    skills: [
      { name: 'Git & GitHub', icon: '🐙' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Linux', icon: '🐧' },
      { name: 'CI/CD', icon: '🔄' },
      { name: 'Cloud', icon: '☁️' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 18, stiffness: 100 } },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32" aria-label="Skills section">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>What I Work </span>
            <span className="gradient-text">With</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {skillCategories.map((category) => (
          <div key={category.key} className="mb-12 last:mb-0">
            <motion.h3
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: 'var(--theme-text-muted)' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {category.label}
            </motion.h3>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
            >
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={cardVariants}
                  className="group card-surface rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 golden-border-hover cursor-default"
                  whileHover={{ y: -4, boxShadow: '0 8px 25px rgba(20,184,166,0.1)' }}
                >
                  <motion.div
                    className="text-xl sm:text-2xl mb-2"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <div className="text-xs sm:text-sm font-medium" style={{ color: 'var(--theme-text)' }}>
                    {skill.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
