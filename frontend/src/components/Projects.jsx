import { useState, useEffect } from 'react';
import { fetchProjects } from '../api/index.js';

function TechBadge({ tech }) {
  const colorMap = {
    Firebase: 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/20',
    Firestore: 'from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-500/20',
    Flutter: 'from-violet-500/20 to-purple-500/20 text-violet-300 border-violet-500/20',
    Python: 'from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/20',
    React: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/20',
    Node: 'from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/20',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r border ${
        colorMap[tech] || 'from-primary/20 to-accent-purple/20 text-primary-light border-primary/20'
      }`}
    >
      {tech}
    </span>
  );
}

function ProjectCard({ project }) {
  const techList = project.tech || [];
  return (
    <div className="group relative rounded-3xl glass overflow-hidden transition-all duration-500 hover:glow-border mb-8">
      <div className="p-6 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-accent-cyan block mb-1">Featured Case Study</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary group-hover:gradient-text transition-all duration-300">
              {project.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {techList.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 border-t border-border/40 pt-6">
          <a
            href={project.github || '#'}
            className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-sm font-semibold text-text-primary transition-all duration-300 hover:border-primary/50 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View Codebase
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <section id="projects" className="relative py-24 sm:py-32" aria-label="Projects section">
      {/* Background Accent glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-primary-light tracking-wider uppercase mb-4">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-text-primary">Featured </span>
            <span className="gradient-text">Project Spotlight</span>
          </h2>
          <p className="max-w-lg mx-auto text-text-secondary text-base">
            Deep dive into functional systems and custom-engineered software solutions
          </p>
        </div>

        {/* Case Study display */}
        <div className="max-w-4xl mx-auto">
          {loading ? (
             <div className="space-y-8 animate-pulse">
               {[1, 2].map((i) => (
                 <div key={i} className="h-64 bg-surface-light rounded-3xl w-full"></div>
               ))}
             </div>
          ) : error ? (
             <div className="text-center text-red-400">{error}</div>
          ) : (
            projects.map((project) => (
              <ProjectCard key={project.id || project.title} project={project} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
