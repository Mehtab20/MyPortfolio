import { motion } from 'framer-motion';

const currentProjects = [
  {
    title: 'Medical Referral Agent — FYP',
    status: 'Final Phase',
    statusColor: '#14b8a6',
    description:
      'Completing the capstone with TensorFlow Lite deployment for on-device ML inference, FastAPI backend optimization, and comprehensive testing documentation.',
    milestones: [
      { label: 'ML Model', progress: 95, color: '#14b8a6' },
      { label: 'Mobile App', progress: 88, color: '#06b6d4' },
      { label: 'Backend API', progress: 92, color: '#8b5cf6' },
    ],
    tech: ['Flutter', 'FastAPI', 'TensorFlow Lite'],
  },
  {
    title: 'AI SaaS Starter Kit',
    status: 'Open Source',
    statusColor: '#06b6d4',
    description:
      'Adding Stripe checkout integration, Supabase Edge Functions for AI proxy, blog CMS with markdown editor, and comprehensive test suite.',
    milestones: [
      { label: 'Stripe', progress: 65, color: '#06b6d4' },
      { label: 'Edge Functions', progress: 40, color: '#8b5cf6' },
      { label: 'Tests', progress: 25, color: '#f97316' },
    ],
    tech: ['React 19', 'Supabase', 'Stripe'],
  },
  {
    title: 'Cloud & DevOps Learning',
    status: 'In Progress',
    statusColor: '#f59e0b',
    description:
      'Pursuing AWS Solutions Architect certification and building practical DevOps projects — monitoring dashboards, auto-scaling pipelines, and infrastructure as code.',
    milestones: [
      { label: 'AWS SA', progress: 60, color: '#f59e0b' },
      { label: 'Docker/K8s', progress: 45, color: '#3b82f6' },
      { label: 'CI/CD', progress: 70, color: '#10b981' },
    ],
    tech: ['AWS', 'Docker', 'GitHub Actions'],
  },
];

function ProgressBar({ label, progress, color }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium" style={{ color: 'var(--theme-text-muted)' }}>
          {label}
        </span>
        <span className="text-[10px] font-mono" style={{ color: 'var(--theme-text-muted)' }}>
          {progress}%
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: 'var(--theme-surface-lighter)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="relative py-24 sm:py-32" aria-label="Currently Building section">
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
            <span style={{ color: 'var(--theme-text)' }}>Currently </span>
            <span className="gradient-text">Building</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            What I am working on right now — live progress on active projects and learning goals.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {currentProjects.map((project) => (
            <motion.div
              key={project.title}
              className="card-surface rounded-2xl p-6 golden-border-hover"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } },
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-bold" style={{ color: 'var(--theme-text)' }}>
                  {project.title}
                </h3>
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase whitespace-nowrap"
                  style={{
                    backgroundColor: `${project.statusColor}15`,
                    color: project.statusColor,
                    border: `1px solid ${project.statusColor}30`,
                  }}
                >
                  <motion.span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: project.statusColor }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--theme-text-secondary)' }}>
                {project.description}
              </p>

              {/* Progress Bars */}
              <div className="space-y-3 mb-5">
                {project.milestones.map((m) => (
                  <ProgressBar key={m.label} {...m} />
                ))}
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[9px] font-medium"
                    style={{
                      backgroundColor: 'rgba(20, 184, 166, 0.08)',
                      color: 'var(--color-primary-light)',
                      border: '1px solid rgba(20, 184, 166, 0.18)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
