import { useState, useEffect } from 'react';
import { fetchProjects } from '../api/index.js';
import projectComplaint from '../assets/project-complaint.png';
import projectFood from '../assets/project-food.png';
import projectLibrary from '../assets/project-library.png';

const fallbackProjects = [
  {
    id: 1,
    title: 'University Complaint System',
    description:
      'A full-stack complaint management platform for university students and administration, featuring real-time tracking, automated routing, and analytics dashboard.',
    image: projectComplaint,
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/Mehtab20',
    demo: '#',
  },
  {
    id: 2,
    title: 'Food Delivery App',
    description:
      'A cross-platform food delivery application built with Flutter. Features restaurant discovery, real-time order tracking, payment integration, and rider management.',
    image: projectFood,
    tech: ['Flutter', 'Firebase', 'Dart'],
    github: 'https://github.com/Mehtab20',
    demo: '#',
  },
  {
    id: 3,
    title: 'Library Management System',
    description:
      'A comprehensive library management system with book cataloging, member management, fine tracking, and automated return reminders for educational institutions.',
    image: projectLibrary,
    tech: ['Java', 'MySQL', 'JavaFX'],
    github: 'https://github.com/Mehtab20',
    demo: '#',
  },
];

const getProjectImage = (title) => {
  const t = (title || '').toLowerCase();
  if (t.includes('complaint') || t.includes('university')) return projectComplaint;
  if (t.includes('food') || t.includes('ecommerce') || t.includes('delivery') || t.includes('shop') || t.includes('store')) return projectFood;
  if (t.includes('library') || t.includes('portfolio') || t.includes('bot') || t.includes('task') || t.includes('reference') || t.includes('medref')) return projectLibrary;
  return projectLibrary; // default fallback
};


function TechBadge({ tech }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: 'rgba(212, 165, 34, 0.1)',
        color: 'var(--color-primary-light)',
        border: '1px solid rgba(212, 165, 34, 0.2)',
      }}
    >
      {tech}
    </span>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="group card-surface rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 golden-border-hover">
      {/* Project Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3
          className="text-lg font-bold mb-2 transition-colors duration-300"
          style={{ color: 'var(--theme-text)' }}
        >
          {project.title}
        </h3>

        <p
          className="text-sm leading-relaxed mb-4 line-clamp-3"
          style={{ color: 'var(--theme-text-secondary)' }}
        >
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={project.github}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold btn-outline"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href={project.demo}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo of ${project.title}`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        if (active) {
          if (data && data.length > 0) {
            setProjectList(data);
          } else {
            setProjectList(fallbackProjects);
          }
        }
      } catch (err) {
        console.error('Failed to fetch projects, using fallback.', err);
        if (active) {
          setProjectList(fallbackProjects);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    loadProjects();
    return () => {
      active = false;
    };
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32" aria-label="Projects section">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            Deep dive into functional systems and custom-engineered software solutions
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {projectList.map((project) => {
            const parsedTech = Array.isArray(project.tech)
              ? project.tech
              : typeof project.tech === 'string'
              ? project.tech.startsWith('[')
                ? JSON.parse(project.tech)
                : project.tech.split(',').map((item) => item.trim())
              : [];

            return (
              <ProjectCard
                key={project.id || project.title}
                project={{
                  ...project,
                  image: project.image || getProjectImage(project.title),
                  tech: parsedTech,
                  demo: project.demo || '#',
                }}
              />
            );
          })}
        </div>

        {/* View All Button */}
        <div className="reveal text-center">
          <a
            href="https://github.com/Mehtab20"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl btn-outline text-sm"
            onClick={handleScroll}
          >
            View All Projects
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
