import { motion } from 'framer-motion';
import { useSkills } from '../hooks/useCmsData';

const fallbackSkills = [
  {
    key: 'fullstack', label: 'Full Stack Development',
    context: 'Building production web apps with React, Node.js, and scalable APIs for hospital systems and SaaS platforms.',
    skills: [
      { name: 'React', icon: '⚛️' }, { name: 'Node.js', icon: '🟢' }, { name: 'Express.js', icon: '🚂' },
      { name: 'REST APIs', icon: '🔗' }, { name: 'Next.js', icon: '▲' }, { name: 'Tailwind CSS', icon: '🎨' },
    ],
  },
  {
    key: 'mobile', label: 'Mobile & Cross-Platform',
    context: 'Shipping cross-platform mobile apps with Flutter/Dart covering patient-facing healthcare interfaces and real-time dashboards.',
    skills: [
      { name: 'Flutter', icon: '📱' }, { name: 'Dart', icon: '🎯' }, { name: 'Material Design 3', icon: '🎨' },
      { name: 'Firebase', icon: '🔥' }, { name: 'TensorFlow Lite', icon: '🧠' },
    ],
  },
  {
    key: 'ai', label: 'AI & Machine Learning',
    context: 'Building production ML pipelines — symptom classification models achieving 92% accuracy, deployed on-device via TensorFlow Lite.',
    skills: [
      { name: 'Python', icon: '🐍' }, { name: 'FastAPI', icon: '⚡' }, { name: 'TensorFlow', icon: '🧠' },
      { name: 'NLP', icon: '💬' }, { name: 'Transfer Learning', icon: '🔄' }, { name: 'Data Pipelines', icon: '📊' },
    ],
  },
  {
    key: 'cloud', label: 'Cloud & DevOps',
    context: 'Deploying and monitoring production systems on AWS/GCP with Docker, CI/CD pipelines, and Linux server management.',
    skills: [
      { name: 'Docker', icon: '🐳' }, { name: 'AWS/GCP', icon: '☁️' }, { name: 'CI/CD', icon: '🔄' },
      { name: 'Linux', icon: '🐧' }, { name: 'Git & GitHub', icon: '🐙' }, { name: 'PostgreSQL', icon: '🐘' },
    ],
  },
  {
    key: 'databases', label: 'Databases & Backend',
    context: 'Designing normalized schemas, encrypted health records, and optimized queries handling 500+ concurrent users in production.',
    skills: [
      { name: 'PostgreSQL', icon: '🐘' }, { name: 'MySQL', icon: '🐬' }, { name: 'Redis', icon: '🔴' },
      { name: 'Supabase', icon: '🔥' }, { name: 'Prisma', icon: '🔗' }, { name: 'SQL', icon: '🗄️' },
    ],
  },
  {
    key: 'languages', label: 'Programming Languages',
    context: 'Professional proficiency across the stack — from systems programming to scripting and data analysis.',
    skills: [
      { name: 'Python', icon: '🐍' }, { name: 'JavaScript', icon: '⚡' }, { name: 'Dart', icon: '🎯' },
      { name: 'Java', icon: '☕' }, { name: 'C++', icon: '🔧' }, { name: 'SQL', icon: '🗄️' },
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
  const { data: cmsSkills } = useSkills();
  
  // Map CMS data to component format, with fallback
  const skillCategories = Array.isArray(cmsSkills) && cmsSkills.length > 0
    ? cmsSkills.map(cat => ({
        key: cat.category_key || cat.id,
        label: cat.category,
        context: cat.context || '',
        skills: Array.isArray(cat.skills) ? cat.skills : [],
      }))
    : fallbackSkills;
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
          <div key={category.key} className="mb-14 last:mb-0">
            <motion.div
              className="mb-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'var(--theme-text-muted)' }}
              >
                {category.label}
              </h3>
              {category.context && (
                <p className="text-xs leading-relaxed max-w-lg" style={{ color: 'var(--theme-text-secondary)' }}>
                  {category.context}
                </p>
              )}
            </motion.div>
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
