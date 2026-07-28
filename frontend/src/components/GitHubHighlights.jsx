import { motion } from 'framer-motion';

const repos = [
  {
    name: 'MyPortfolio',
    description: 'Premium software engineering portfolio with AI chat, auth, dashboard, admin panel, and case studies.',
    stars: 0,
    forks: 0,
    language: 'JavaScript',
    languageColor: '#f7df1e',
    url: 'https://github.com/Mehtab20/MyPortfolio',
    topics: ['react', 'portfolio', 'supabase', 'tailwind-css', 'framer-motion'],
  },
  {
    name: 'final_year_project',
    description: 'AI-Based Medical Diagnostic & Specialist Referral System — Flutter + FastAPI + TensorFlow Lite.',
    stars: 0,
    forks: 0,
    language: 'Python',
    languageColor: '#3572A5',
    url: 'https://github.com/Mehtab20/final_year_project',
    topics: ['flutter', 'fastapi', 'tensorflow', 'healthcare', 'ai'],
  },
  {
    name: 'devops-monitoring-dashboard',
    description: 'Real-time infrastructure monitoring dashboard with container metrics, alerts, and auto-scaling visualization.',
    stars: 0,
    forks: 0,
    language: 'JavaScript',
    languageColor: '#f7df1e',
    url: 'https://github.com/Mehtab20/devops-monitoring-dashboard',
    topics: ['devops', 'monitoring', 'docker', 'dashboard'],
  },
  {
    name: 'Java-Data-Structures-and-Algorithms',
    description: 'Curated collection of DSA implementations in Java — covering arrays, graphs, trees, dynamic programming, and more.',
    stars: 0,
    forks: 0,
    language: 'Java',
    languageColor: '#b07219',
    url: 'https://github.com/Mehtab20/Java-Data-Structures-and-Algorithms',
    topics: ['java', 'data-structures', 'algorithms', 'interview-prep'],
  },
];

export default function GitHubHighlights() {
  return (
    <section id="opensource" className="relative py-24 sm:py-32" aria-label="Open Source section">
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
            <span style={{ color: 'var(--theme-text)' }}>Open Source </span>
            <span className="gradient-text">Contributions</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            Projects I have built and shared with the community. Every repo is production-tested and documented.
          </p>
        </motion.div>

        {/* Repos Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
        >
          {repos.map((repo) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group card-surface rounded-2xl p-5 sm:p-6 transition-all duration-500 golden-border-hover block"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.97 },
                visible: {
                  opacity: 1, y: 0, scale: 1,
                  transition: { type: 'spring', damping: 20, stiffness: 100 },
                },
              }}
              whileHover={{ y: -4 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--theme-text-muted)' }}>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <h3
                    className="text-sm font-bold transition-colors duration-300 group-hover:text-primary"
                    style={{ color: 'var(--theme-text)' }}
                  >
                    {repo.name}
                  </h3>
                </div>
                <svg
                  className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ color: 'var(--color-primary)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--theme-text-secondary)' }}>
                {repo.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {repo.topics.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-0.5 rounded text-[9px] font-medium"
                    style={{
                      backgroundColor: 'rgba(20, 184, 166, 0.06)',
                      color: 'var(--color-primary-light)',
                      border: '1px solid rgba(20, 184, 166, 0.12)',
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-[10px]" style={{ color: 'var(--theme-text-muted)' }}>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.517 1.48-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21l-8-9h6v-12h4v12h6l-8 9z" />
                  </svg>
                  {repo.forks}
                </span>
              </div>
            </motion.a>
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
