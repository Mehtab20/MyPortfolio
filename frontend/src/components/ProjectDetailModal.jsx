import { motion, AnimatePresence } from 'framer-motion';

/* ── Section Header ── */
function SectionHeading({ label, icon, color }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: `${color}15`, color }}>
        {icon}
      </div>
      <h3 className="text-base font-bold" style={{ color: 'var(--theme-text)' }}>{label}</h3>
    </div>
  );
}

/* ── Challenge Card ── */
function ChallengeCard({ challenge, index, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="rounded-xl p-5 border-l-2"
      style={{
        backgroundColor: `${color}06`,
        borderColor: `${color}40`,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <h4 className="text-sm font-bold mb-2 flex items-start gap-2" style={{ color: 'var(--theme-text)' }}>
        <span className="text-base shrink-0">⚠️</span>
        {challenge.problem}
      </h4>
      <div className="flex items-start gap-2">
        <span className="text-base shrink-0 mt-0.5">💡</span>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
          {challenge.solution}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Process Timeline ── */
function ProcessTimeline({ stages, color }) {
  return (
    <div className="relative space-y-6">
      <div className="absolute left-4 top-2 bottom-2 w-px" style={{ backgroundColor: `${color}20` }} />
      {stages.map((stage, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="relative pl-10"
        >
          <div
            className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2"
            style={{ backgroundColor: `${color}20`, borderColor: color }}
          />
          <div className="card-surface rounded-xl p-4 golden-border-hover">
            <div className="flex items-center justify-between gap-3 mb-2">
              <h4 className="text-sm font-bold" style={{ color: 'var(--theme-text)' }}>{stage.phase}</h4>
              <span
                className="text-[10px] font-mono font-medium px-2 py-0.5 rounded whitespace-nowrap"
                style={{ backgroundColor: `${color}10`, color: 'var(--theme-text-muted)' }}
              >
                {stage.period}
              </span>
            </div>
            <ul className="space-y-1">
              {stage.details.map((d, j) => (
                <li key={j} className="flex items-start gap-2 text-xs" style={{ color: 'var(--theme-text-secondary)' }}>
                  <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Architecture Diagram ── */
function ArchitectureDiagram({ items, color }) {
  return (
    <div className="card-surface rounded-xl p-5 sm:p-6 golden-border">
      <div className="flex flex-wrap gap-3 justify-center">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-mono"
            style={{
              backgroundColor: `${color}08`,
              border: `1px solid ${color}20`,
              color: 'var(--theme-text-secondary)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
            {item}
            {i < items.length - 1 && (
              <span className="ml-1 text-muted" style={{ color: `${color}30` }}>→</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Results List ── */
function ResultsList({ items, color }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {items.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3 }}
          className="flex items-start gap-2.5 p-3.5 rounded-lg"
          style={{ backgroundColor: `${color}06` }}
        >
          <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{r}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Features List ── */
function FeaturesList({ items, color }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {items.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          className="flex items-start gap-2.5 p-3.5 rounded-lg"
          style={{ backgroundColor: `${color}06`, border: `1px solid ${color}10` }}
        >
          <span className="text-sm shrink-0 mt-0.5">✦</span>
          <span className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{f}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Objectives List ── */
function ObjectivesList({ items, color }) {
  return (
    <ul className="space-y-2">
      {items.map((obj, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3 }}
          className="flex items-start gap-2.5 text-xs"
          style={{ color: 'var(--theme-text-secondary)' }}
        >
          <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0" style={{ backgroundColor: `${color}15`, color }}>
            {i + 1}
          </span>
          {obj}
        </motion.li>
      ))}
    </ul>
  );
}

/* ── Main Modal ── */
export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  const color = project.statusColor;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal Content */}
        <div className="relative z-10 min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-20">
          <motion.div
            className="w-full max-w-4xl card-surface rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header Image */}
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] via-transparent to-transparent" />
              
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm z-10"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'var(--theme-text)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close case study"
              >
                ✕
              </motion.button>

              {/* Title on image */}
              <div className="absolute bottom-4 left-6 z-10">
                <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--theme-text)' }}>
                  {project.title}
                </h2>
                <p className="text-sm" style={{ color }}>{project.tagline}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-8 space-y-10">

              {/* Meta Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase" style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}30` }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                  {project.status}
                </span>
                <span className="text-[11px] font-mono" style={{ color: 'var(--theme-text-muted)' }}>{project.year}</span>
                <span className="text-[11px]" style={{ color: 'var(--theme-text-muted)' }}>•</span>
                <span className="text-[11px]" style={{ color: 'var(--theme-text-muted)' }}>{project.role}</span>
                <span className="text-[11px]" style={{ color: 'var(--theme-text-muted)' }}>•</span>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold hover:underline" style={{ color }}>
                  View on GitHub →
                </a>
              </div>

              {/* Summary */}
              <div>
                <SectionHeading label="Overview" icon="📋" color={color} />
                <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                  {project.summary}
                </p>
              </div>

              {/* Problem Statement */}
              {project.problem && (
                <div>
                  <SectionHeading label="Problem Statement" icon="🎯" color={color} />
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Background */}
              {project.background && (
                <div>
                  <SectionHeading label="Background" icon="📖" color={color} />
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                    {project.background}
                  </p>
                </div>
              )}

              {/* Objectives */}
              {project.objectives && (
                <div>
                  <SectionHeading label="Objectives" icon="✅" color={color} />
                  <ObjectivesList items={project.objectives} color={color} />
                </div>
              )}

              {/* Features */}
              {project.features && (
                <div>
                  <SectionHeading label="Key Features" icon="✨" color={color} />
                  <FeaturesList items={project.features} color={color} />
                </div>
              )}

              {/* System Architecture */}
              {project.architecture && (
                <div>
                  <SectionHeading label="System Architecture" icon="🏗️" color={color} />
                  <ArchitectureDiagram items={project.architecture} color={color} />
                </div>
              )}

              {/* Technology Stack */}
              {project.techStack && (
                <div>
                  <SectionHeading label="Technology Stack" icon="⚡" color={color} />
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-medium"
                        style={{ backgroundColor: `${color}08`, color: 'var(--color-primary-light)', border: `1px solid ${color}18` }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Development Process */}
              {project.process && (
                <div>
                  <SectionHeading label="Development Process" icon="🔄" color={color} />
                  <ProcessTimeline stages={project.process} color={color} />
                </div>
              )}

              {/* Challenges & Solutions */}
              {project.challenges && (
                <div>
                  <SectionHeading label="Challenges & Solutions" icon="🧩" color={color} />
                  <div className="space-y-3">
                    {project.challenges.map((ch, i) => (
                      <ChallengeCard key={i} challenge={ch} index={i} color={color} />
                    ))}
                  </div>
                </div>
              )}

              {/* Results & Impact */}
              {project.results && (
                <div>
                  <SectionHeading label="Results & Impact" icon="📊" color={color} />
                  <ResultsList items={project.results} color={color} />
                </div>
              )}

              {/* GitHub & Demo */}
              <div>
                <SectionHeading label="Repository" icon="🔗" color={color} />
                <div className="flex flex-wrap gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-outline text-xs font-semibold"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Source Code on GitHub
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-xs font-semibold"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Future Improvements */}
              {project.future && (
                <div>
                  <SectionHeading label="Future Improvements" icon="🚀" color={color} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.future.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="flex items-start gap-2.5 p-3 rounded-lg"
                        style={{ backgroundColor: `${color}04` }}
                      >
                        <span className="text-xs shrink-0 mt-0.5">🔮</span>
                        <span className="text-xs" style={{ color: 'var(--theme-text-secondary)' }}>{f}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom spacer */}
              <div className="h-4" />
            </div>

            {/* Sticky Close Footer */}
            <div
              className="sticky bottom-0 p-4 flex justify-center border-t"
              style={{ backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}
            >
              <motion.button
                onClick={onClose}
                className="px-8 py-2.5 rounded-xl btn-outline text-xs font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close Case Study
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
