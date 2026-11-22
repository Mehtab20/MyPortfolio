import { useState } from 'react';
import { Link } from 'react-router-dom';
import { work } from '../../data/site';
import ProjectDiagram from './ProjectDiagram';
import SectionHead from './SectionHead';
import { Icon } from './Icons';

export function StatusBadge({ status }) {
  const cls = status.tone === 'idle' ? 's-badge s-badge--muted' : 's-badge';
  return (
    <span className={cls}>
      <span className={`s-dot${status.tone === 'live' ? ' s-dot--pulse' : ''}`} />
      {status.label}
    </span>
  );
}

function ProjectCard({ project, i }) {
  const href = project.caseStudy ? `/work/${project.slug}` : null;
  const shown = project.stack.slice(0, 4);
  const extra = project.stack.length - shown.length;
  return (
    <article className="s-card s-card--hover s-project" data-reveal style={{ '--d': `${0.05 * (i % 2)}s` }} aria-labelledby={`p-${project.slug}`}>
      <div className="s-project__media">
        <ProjectDiagram project={project} hideCaption />
        <div className="s-project__badges">
          {project.featured && (
            <span className="s-badge s-badge--solid"><Icon name="star" /> Featured</span>
          )}
        </div>
      </div>
      <div className="s-project__body">
        <h3 id={`p-${project.slug}`} className="s-project__title">{project.title}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 14px' }}>
          {project.year && (
            <p className="s-project__date"><Icon name="calendar" /> {project.year}</p>
          )}
          <StatusBadge status={project.status} />
        </div>
        <p className="s-body">{project.summary}</p>
        {shown.length > 0 && (
          <ul className="s-chips" aria-label="Technologies">
            {shown.map((t) => <li key={t} className="s-chip s-chip--teal">{t}</li>)}
            {extra > 0 && <li className="s-chip s-chip--teal">+{extra}</li>}
          </ul>
        )}
        <div className="s-project__foot">
          {href ? (
            <Link to={href} className="s-btn s-btn--outline s-btn--block s-btn--sm" aria-label={`View details: ${project.title}`}>
              <Icon name="eye" /> View Details
            </Link>
          ) : (
            <span className="s-btn s-btn--outline s-btn--block s-btn--sm" aria-disabled="true" style={{ opacity: 0.6, cursor: 'default' }}>
              <Icon name="info" /> Details coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [filter, setFilter] = useState('all');
  const list = filter === 'featured' ? work.filter((p) => p.featured) : work;
  return (
    <section id="projects" className="s-section" aria-labelledby="projects-title">
      <div className="s-container">
        <SectionHead
          id="projects-title"
          eyebrow="My work"
          title={['Featured ', { g: 'Projects' }]}
          subtitle="Real systems across healthcare, personal AI and small business, each with a write-up of how it’s built."
        />
        <div className="s-tabs" role="group" aria-label="Filter projects">
          {[['all', 'All'], ['featured', 'Featured']].map(([k, label]) => (
            <button key={k} type="button" className="s-tab" aria-pressed={filter === k} onClick={() => setFilter(k)}>
              {label}
            </button>
          ))}
        </div>
        <div className="s-grid-2">
          {list.map((p, i) => <ProjectCard key={p.slug} project={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
