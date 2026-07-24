import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

const sections = [
  {
    title: 'Summary',
    content:
      'Full-Stack Software Engineer specializing in AI-powered healthcare systems, cloud computing, and scalable SaaS platforms. Experienced in building production applications with React, Flutter, FastAPI, and modern DevOps practices. Passionate about leveraging technology to solve real-world problems in healthcare and enterprise.',
    icon: '👤',
  },
  {
    title: 'Education',
    content: [
      { line: 'B.Sc. Software Engineering — Iqra University, Islamabad (2022–2026)', sub: 'CGPA: 8+ / Active in tech community' },
      { line: 'Intermediate in Computer Science — Punjab College, Rawalpindi (2020–2022)', sub: 'Strong foundation in programming and DSA' },
    ],
    icon: '🎓',
  },
  {
    title: 'Technical Skills',
    content: [
      { line: 'Frontend: React 19, Next.js, Tailwind CSS, Framer Motion, Material Design 3' },
      { line: 'Mobile: Flutter, Dart, TensorFlow Lite, Firebase' },
      { line: 'Backend: Python, FastAPI, Node.js, Express.js, REST APIs' },
      { line: 'Databases: PostgreSQL, MySQL, Redis, Supabase, Prisma' },
      { line: 'Cloud & DevOps: AWS, GCP, Docker, CI/CD, Linux, Git/GitHub' },
      { line: 'AI/ML: TensorFlow, NLP, Transfer Learning, Data Pipelines' },
    ],
    icon: '⚡',
  },
  {
    title: 'Experience',
    content: [
      {
        line: 'Freelance Full Stack Developer (2024–Present)',
        sub: 'Delivered 5+ production applications for clients. Built hospital management systems, AI-powered diagnostic tools, and SaaS platforms using React, Flutter, Node.js, and cloud deployment.',
      },
      {
        line: 'Gohar Medical Trust — Hospital Management System (2024–2025)',
        sub: 'Designed and deployed a comprehensive digital hospital system serving 500+ daily patients. Reduced patient registration time by 83% and eliminated double-booking entirely.',
      },
    ],
    icon: '💼',
  },
  {
    title: 'Projects',
    content: [
      {
        line: 'Medical Referral Agent (FYP) — AI Diagnostic & Referral System',
        sub: 'ML model achieving 92% accuracy. Flutter mobile app with offline inference via TensorFlow Lite. FastAPI backend with encrypted health records.',
      },
      {
        line: 'AI SaaS Starter Kit — Production-Ready SaaS Foundation',
        sub: 'Complete auth, AI chat with 5+ providers, subscription management, admin dashboard, analytics — all open source.',
      },
    ],
    icon: '🚀',
  },
  {
    title: 'Certifications',
    content: [
      { line: 'Google Cloud Digital Leader — 2025' },
      { line: 'AWS Cloud Practitioner — 2025' },
      { line: 'Meta Front-End Developer — 2024' },
      { line: 'GitHub Actions & CI/CD — 2024' },
    ],
    icon: '🏅',
  },
  {
    title: 'Languages',
    content: [
      { line: 'English — Professional Working Proficiency' },
      { line: 'Urdu — Native' },
    ],
    icon: '🌐',
  },
];

function ResumeSection({ section, index }) {
  const color = '#14b8a6';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="mb-8 last:mb-0"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: `${color}12`, color }}>
          {section.icon}
        </div>
        <h3 className="text-base font-bold" style={{ color: 'var(--theme-text)' }}>{section.title}</h3>
      </div>

      {typeof section.content === 'string' ? (
        <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
          {section.content}
        </p>
      ) : (
        <div className="space-y-3">
          {section.content.map((item, i) => (
            <div key={i}>
              <p className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>
                {item.line}
              </p>
              {item.sub && (
                <p className="text-xs mt-0.5" style={{ color: 'var(--theme-text-secondary)' }}>
                  {item.sub}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Resume() {
  const { theme, toggleTheme } = useTheme();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen font-sans">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Actions */}
          <motion.div
            className="flex items-center justify-between mb-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--theme-text)' }}>
                <span className="gradient-text">Resume</span>
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--theme-text-secondary)' }}>
                Mehtab Akbar — Full-Stack Software Engineer
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-xs font-semibold"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
                Print / Save PDF
              </button>
            </div>
          </motion.div>

          {/* Resume Paper */}
          <motion.div
            className="card-surface rounded-2xl overflow-hidden golden-border print:shadow-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Header */}
            <div
              className="p-6 sm:p-10 text-center"
              style={{ backgroundColor: 'rgba(20, 184, 166, 0.03)' }}
            >
              <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
                style={{ color: 'var(--theme-text)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Mehtab <span className="gradient-text">Akbar</span>
              </motion.h1>
              <motion.p
                className="text-sm mb-3"
                style={{ color: 'var(--color-primary)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Full-Stack Software Engineer
              </motion.p>
              <motion.div
                className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs"
                style={{ color: 'var(--theme-text-muted)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span>Rawalpindi, Pakistan</span>
                <span>mehtabakbar5656@gmail.com</span>
                <span>+92 340 8575834</span>
                <a href="https://github.com/Mehtab20" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
                  github.com/Mehtab20
                </a>
                <a href="https://linkedin.com/in/mehtab-akbar-385024267" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
                  linkedin.com/in/mehtab-akbar
                </a>
              </motion.div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-10">
              {sections.map((section, i) => (
                <ResumeSection key={section.title} section={section} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
