import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectDetailModal from './ProjectDetailModal';

/* ── Animation Variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', damping: 20, stiffness: 100, mass: 1 },
  },
};

/* ── Tech Badge ── */
function TechBadge({ tech, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium"
      style={{
        backgroundColor: 'rgba(20, 184, 166, 0.08)',
        color: 'var(--color-primary-light)',
        border: '1px solid rgba(20, 184, 166, 0.18)',
      }}
    >
      {tech}
    </motion.span>
  );
}

/* ── Single Project Card ── */
function ProjectCard({ project, index, onOpen }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group card-surface rounded-2xl overflow-hidden transition-all duration-500 golden-border-hover"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 sm:h-52">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />

        {/* Animated Status Badge */}
        <motion.div
          className="absolute top-3 right-3"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
        >
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${project.statusColor}15`,
              color: project.statusColor,
              border: `1px solid ${project.statusColor}30`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: project.statusColor }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {project.status}
          </span>
        </motion.div>

        {/* Year badge */}
        <motion.div
          className="absolute bottom-3 left-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
        >
          <span
            className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium"
            style={{
              backgroundColor: 'rgba(3, 7, 18, 0.7)',
              color: 'var(--theme-text-muted)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {project.year}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3
          className="text-lg font-bold mb-1 transition-colors duration-300"
          style={{ color: isHovered ? 'var(--color-primary)' : 'var(--theme-text)' }}
        >
          {project.title}
        </h3>
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--color-primary)' }}>
          {project.tagline}
        </p>

        {/* Summary */}
        <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--theme-text-secondary)' }}>
          {project.summary}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 6).map((t, i) => (
            <TechBadge key={t} tech={t} index={i} />
          ))}
          {project.techStack.length > 6 && (
            <span className="text-[11px] self-center" style={{ color: 'var(--theme-text-muted)' }}>
              +{project.techStack.length - 6}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 mb-3">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-semibold btn-outline"
            aria-label={`View ${project.title} on GitHub`}
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Source Code
          </motion.a>
          <motion.button
            onClick={() => onOpen(project)}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-semibold btn-primary"
            aria-label={`View case study for ${project.title}`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Case Study
          </motion.button>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--theme-border)' }}>
          <span className="text-[10px]" style={{ color: 'var(--theme-text-muted)' }}>
            {project.features?.length || 0} Features
          </span>
          <span className="text-[10px]" style={{ color: 'var(--theme-text-muted)' }}>
            {project.challenges?.length || 0} Challenges
          </span>
          <span className="text-[10px]" style={{ color: 'var(--theme-text-muted)' }}>
            {project.process?.length || 0} Phases
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Projects Section ── */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section id="projects" className="relative py-24 sm:py-32" aria-label="Projects section">
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
              <span style={{ color: 'var(--theme-text)' }}>Featured </span>
              <span className="gradient-text">Projects</span>
            </h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
              Real-world systems I&apos;ve built — from AI-powered medical diagnosis to production-ready SaaS platforms.
              Click <strong>Case Study</strong> on any project for the full details.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedProject} />
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.a
              href="https://github.com/Mehtab20"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl btn-outline text-sm"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View All on GitHub
              <motion.svg
                className="w-4 h-4"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Full Case Study Modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
