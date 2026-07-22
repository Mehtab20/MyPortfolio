import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectMedRef from '../assets/project-medref.svg';
import projectGohar from '../assets/project-gohar.svg';
import projectSaaS from '../assets/project-saas.svg';
import projectPortfolio from '../assets/project-portfolio.svg';

/* ── Real Project Data ── */
const projects = [
  {
    id: 'medref',
    title: 'Medical Referral Agent',
    tagline: 'AI-Based Diagnostic & Specialist Referral System',
    image: projectMedRef,
    gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent',
    status: 'Final Year Project',
    statusColor: '#14b8a6',
    description:
      'An intelligent AI-powered medical diagnostic and specialist referral system that bridges the gap between primary symptoms and specialized healthcare. The system uses machine learning to analyze patient symptoms, suggest probable diagnoses, and recommend appropriate medical specialists — reducing referral time from weeks to seconds.',
    features: [
      'AI-powered symptom analysis with multi-class classification at 92% accuracy',
      'Intelligent specialist referral matching based on diagnosis confidence',
      'Patient history tracking and longitudinal health records management',
      'Secure HIPAA-compliant data architecture with end-to-end encryption',
      'Real-time consultation scheduling with partnered specialists',
      'Analytics dashboard for healthcare administrators with trend insights',
    ],
    architecture: [
      'Flutter cross-platform mobile frontend (Android + iOS)',
      'Python FastAPI backend with ML inference pipeline',
      'PostgreSQL database with encrypted patient records (AES-256)',
      'TensorFlow Lite on-device inference for offline diagnostic mode',
      'RESTful API with JWT-based authentication and role-based access',
    ],
    tech: ['Flutter', 'Python', 'FastAPI', 'TensorFlow', 'PostgreSQL', 'JWT', 'Dart'],
    github: 'https://github.com/Mehtab20',
    demo: null,
    year: '2025–2026',
    role: 'Lead Developer & ML Engineer',
    challenges: [
      'Achieving 92% diagnostic accuracy with limited publicly available medical datasets',
      'Implementing real-time ML inference on mobile devices under 200ms latency',
      'Designing secure, encrypted health data storage compliant with healthcare regulations',
    ],
  },
  {
    id: 'gohar',
    title: 'Gohar Medical Trust',
    tagline: 'Hospital & Trust Management System',
    image: projectGohar,
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    status: 'Production',
    statusColor: '#8b5cf6',
    description:
      'A comprehensive hospital and trust management system designed for Gohar Medical Trust. The platform digitizes patient registration, appointment scheduling, pharmacy inventory, billing, donor management, and trust fund accounting — serving 500+ daily patients across multiple departments with zero downtime.',
    features: [
      'Patient registration with QR-code based medical records and instant lookup',
      'Appointment scheduling with auto-notifications via SMS and Email',
      'Pharmacy inventory management with expiry tracking and low-stock alerts',
      'Billing and insurance claim processing with automated reconciliation',
      'Donor management and trust fund accounting with audit trails',
      'Multi-role dashboard (admin, doctor, pharmacist, accountant) with granular permissions',
    ],
    architecture: [
      'Flutter mobile app for patient-facing registration and appointment booking',
      'React web dashboard for hospital administration and real-time monitoring',
      'Node.js/Express backend with PostgreSQL for transactional data',
      'Redis caching layer for high-traffic appointment slots (handles 500+ concurrent users)',
      'Supabase Realtime subscriptions for live bed availability and ER updates',
    ],
    tech: ['Flutter', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Supabase', 'Dart'],
    github: 'https://github.com/Mehtab20',
    demo: null,
    year: '2024–2025',
    role: 'Full Stack Developer',
    challenges: [
      'Handling 500+ concurrent users during peak morning clinic hours without degradation',
      'Designing a fault-tolerant appointment booking system with double-booking prevention',
      'Migrating 10,000+ legacy paper-based patient records to the digital system',
    ],
  },
  {
    id: 'saas',
    title: 'AI SaaS Starter Kit',
    tagline: 'Production-Ready AI SaaS Foundation',
    image: projectSaaS,
    gradient: 'from-cyan-500/20 via-teal-500/10 to-transparent',
    status: 'Open Source',
    statusColor: '#06b6d4',
    description:
      'A commercial-grade AI SaaS starter kit designed to accelerate building AI-powered applications. Features complete authentication (email, Google OAuth), subscription management, AI chat with multi-provider support (OpenAI, Anthropic, Gemini, Groq), admin panel, analytics dashboard, and a premium portfolio landing page — all production-ready with React 19, Supabase, and Tailwind CSS.',
    features: [
      'Multi-provider AI abstraction layer (OpenAI, Gemini, Anthropic, Groq, OpenRouter)',
      'Complete auth system: email/password + Google OAuth + password reset flow',
      'Role-based access control (user/admin) with AuthGuard and AdminGuard route protection',
      'Subscription management with Stripe-ready billing architecture and pricing tiers',
      'Admin dashboard with user management, analytics (Recharts bar/line/pie charts)',
      'AI Chat with streaming, conversation history, multi-model provider switching',
    ],
    architecture: [
      'React 19 + Vite 8 + Tailwind CSS 4 frontend (SPA with code splitting)',
      'Supabase PostgreSQL database with Row Level Security policies',
      'Provider abstraction design pattern for 5+ AI API integrations',
      'React.lazy + Suspense for route-level code splitting (optimal bundle)',
      'Dark/light theme engine with 50+ CSS custom properties and CSS variables',
    ],
    tech: ['React 19', 'Vite', 'Supabase', 'Tailwind CSS', 'Stripe', 'Recharts', 'JavaScript'],
    github: 'https://github.com/Mehtab20/MyPortfolio',
    demo: null,
    year: '2026',
    role: 'Creator & Architect',
    challenges: [
      'Designing a provider-agnostic AI abstraction that supports 5+ providers with completely different APIs',
      'Building a complete design system from scratch supporting both dark and light themes',
      'Implementing secure auth flow with Supabase including email confirmation and OAuth integration',
    ],
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    tagline: 'Premium Developer Portfolio & Case Study',
    image: projectPortfolio,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    status: 'Live',
    statusColor: '#10b981',
    description:
      'This very portfolio — a meticulously crafted showcase of engineering excellence. Built with React 19, Vite, and Tailwind CSS, featuring an animated aurora background, 3D tilt profile image, multi-role typewriter animation, scroll-triggered animated counters, and a comprehensive dark/light design system. The portfolio doubles as a marketing landing page for the AI SaaS Starter Kit, with integrated pricing, testimonials, FAQ, and blog sections.',
    features: [
      'GPU-accelerated animated aurora background using Canvas API (stable 60fps)',
      '3D perspective tilt profile photo with glowing gradient border animation',
      'Multi-role typewriter animation with blinking cursor and role cycling',
      'Scroll-triggered animated stat counters with IntersectionObserver',
      'Complete dark/light theme with 50+ CSS custom properties and smooth transitions',
      'Responsive mobile-first design across all breakpoints and screen sizes',
      'Expandable project case studies with features, architecture, and challenges',
      'Contact form with Supabase persistence and success/error feedback',
    ],
    architecture: [
      'React 19 functional components with hooks (useState, useEffect, useCallback)',
      'Custom IntersectionObserver-based scroll reveal animation system',
      'CSS custom properties architecture for complete dynamic theming',
      'Canvas-based aurora background animation with requestAnimationFrame loop',
      'Supabase PostgreSQL for contact form persistence and dynamic project data',
    ],
    tech: ['React 19', 'Vite', 'Tailwind CSS 4', 'Supabase', 'Framer Motion', 'JavaScript'],
    github: 'https://github.com/Mehtab20/MyPortfolio',
    demo: null,
    year: '2026',
    role: 'Designer & Developer',
    challenges: [
      'Creating a performant canvas aurora animation that runs at 60fps without impacting scroll performance',
      'Building a complete design system that looks premium in both dark and light modes (50+ tokens)',
      'Achieving zero-build-error production bundle with optimized code splitting (669 modules / 808ms build)',
    ],
  },
];

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
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
      mass: 1,
    },
  },
};

const caseStudyVariants = {
  collapsed: { height: 0, opacity: 0, overflow: 'hidden' },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
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

/* ── Expandable Case Study Section ── */
function CaseStudy({ project, isOpen }) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="casestudy"
          variants={caseStudyVariants}
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
        >
          <div className="pt-4 space-y-5 border-t" style={{ borderColor: 'var(--theme-border)' }}>
            {/* Features */}
            {project.features && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--theme-text-muted)' }}>
                  Key Features
                </h4>
                <ul className="space-y-1.5">
                  {project.features.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.04, duration: 0.3 }}
                      className="flex items-start gap-2 text-xs"
                      style={{ color: 'var(--theme-text-secondary)' }}
                    >
                      <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-primary)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Architecture */}
            {project.architecture && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--theme-text-muted)' }}>
                  Architecture Highlights
                </h4>
                <ul className="space-y-1.5">
                  {project.architecture.map((a, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.05, duration: 0.3 }}
                      className="flex items-start gap-2 text-xs font-mono"
                      style={{ color: 'var(--theme-text-secondary)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'var(--color-accent)' }} />
                      {a}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Challenges */}
            {project.challenges && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--theme-text-muted)' }}>
                  Key Challenges
                </h4>
                <ul className="space-y-1.5">
                  {project.challenges.map((c, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.06, duration: 0.3 }}
                      className="flex items-start gap-2 text-xs"
                      style={{ color: 'var(--theme-text-secondary)' }}
                    >
                      <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-accent)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      {c}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Single Project Card ── */
function ProjectCard({ project, index }) {
  const [isOpen, setIsOpen] = useState(false);
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
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Project Image with Animated Gradient Overlay */}
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
          <motion.span
            whileHover={{ scale: 1.05 }}
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
          </motion.span>
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
      <motion.div
        className="p-5 sm:p-6"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Title & Tagline */}
        <motion.h3
          className="text-lg font-bold mb-1"
          style={{ color: 'var(--theme-text)' }}
          animate={{ color: isHovered ? 'var(--color-primary)' : 'var(--theme-text)' }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--color-primary)' }}>
          {project.tagline}
        </p>

        {/* Role */}
        <motion.div
          className="flex items-center gap-1.5 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ color: 'var(--theme-text-muted)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span className="text-[11px] font-medium" style={{ color: 'var(--theme-text-muted)' }}>
            {project.role}
          </span>
        </motion.div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--theme-text-secondary)' }}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t, i) => (
            <TechBadge key={t} tech={t} index={i} />
          ))}
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
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Source Code
          </motion.a>
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-semibold btn-primary"
              aria-label={`Live demo of ${project.title}`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              Live Demo
            </motion.a>
          )}
        </div>

        {/* Case Study Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold transition-all duration-300"
          style={{ color: 'var(--color-primary)' }}
          aria-expanded={isOpen}
          aria-label={`Toggle case study for ${project.title}`}
          whileHover={{ gap: '8px' }}
        >
          <motion.svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </motion.svg>
          {isOpen ? 'Hide Case Study' : 'View Case Study'}
        </motion.button>

        {/* Expandable Case Study */}
        <CaseStudy project={project} isOpen={isOpen} />
      </motion.div>

      {/* Premium hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(20,184,166,0.06), transparent 40%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

/* ── Main Projects Section ── */
export default function Projects() {
  return (
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
            Real-world systems I&apos;ve built — from AI-powered medical diagnosis to production-ready SaaS platforms. Each project includes a detailed case study with architecture highlights and key challenges.
          </p>
        </motion.div>

        {/* Projects Grid — Staggered Entrance */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
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
  );
}
