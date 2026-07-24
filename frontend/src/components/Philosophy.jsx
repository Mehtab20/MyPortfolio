import { motion } from 'framer-motion';

const principles = [
  {
    number: '01',
    title: 'Start with the Problem',
    description:
      'Every great system begins with a clear understanding of the problem. I spend as much time understanding the domain and user needs as I do writing code — whether it is digitizing a hospital\'s paper records or building an ML diagnostic model.',
    icon: '🎯',
  },
  {
    number: '02',
    title: 'Ship Simple, Then Optimize',
    description:
      'I believe in building the simplest possible solution first, measuring its performance, then iterating. Over-engineering upfront leads to wasted effort. The Gohar Medical system started with basic patient registration and grew into a full hospital OS.',
    icon: '🚀',
  },
  {
    number: '03',
    title: 'Architecture Over Frameworks',
    description:
      'Frameworks come and go. Clean architecture — separation of concerns, dependency injection, error boundaries, and testable interfaces — outlasts any technology trend. I design systems that can survive framework migrations.',
    icon: '🏗️',
  },
  {
    number: '04',
    title: 'Code for Humans First',
    description:
      'Code is read far more often than it is written. I prioritize readability, meaningful variable names, consistent patterns, and thorough documentation. A codebase should tell a story that the next developer can pick up in minutes, not days.',
    icon: '👥',
  },
  {
    number: '05',
    title: 'Measure What Matters',
    description:
      'If you cannot measure it, you cannot improve it. From ML model accuracy metrics to hospital patient wait times, I instrument everything. Data-driven decisions separate production systems from prototypes.',
    icon: '📊',
  },
  {
    number: '06',
    title: 'Security by Design',
    description:
      'Security is not an afterthought — it is baked into the architecture from day one. Encryption at rest, RBAC, input validation, and audit logging should be table stakes, not premium features.',
    icon: '🔒',
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative py-24 sm:py-32" aria-label="Engineering Philosophy section">
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
            <span style={{ color: 'var(--theme-text)' }}>Engineering </span>
            <span className="gradient-text">Philosophy</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            Six principles that guide every system I design, every line of code I write, and every team I work with.
          </p>
        </motion.div>

        {/* Principles Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {principles.map((p, i) => (
            <motion.div
              key={p.number}
              className="group card-surface rounded-2xl p-6 transition-all duration-500 golden-border-hover"
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: {
                  opacity: 1, y: 0, scale: 1,
                  transition: { type: 'spring', damping: 20, stiffness: 100, delay: i * 0.05 },
                },
              }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ backgroundColor: 'rgba(20, 184, 166, 0.08)' }}
                >
                  {p.icon}
                </div>
                <span
                  className="text-[10px] font-mono font-bold opacity-30"
                  style={{ color: 'var(--theme-text-muted)' }}
                >
                  {p.number}
                </span>
              </div>
              <h3
                className="text-base font-bold mb-2 transition-colors duration-300 group-hover:text-primary"
                style={{ color: 'var(--theme-text)' }}
              >
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                {p.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
