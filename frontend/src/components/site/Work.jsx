import { Link } from 'react-router-dom';
import { work } from '../../data/site';
import ProjectDiagram from './ProjectDiagram';
import { Arrow } from './Icons';

function Status({ status }) {
  const tone = status.tone === 'live' ? ' s-status--live' : status.tone === 'done' ? ' s-status--done' : '';
  return <span className={`s-status${tone}`}>{status.label}</span>;
}

export function ProjectCard({ project, flip }) {
  const href = project.caseStudy ? `/work/${project.slug}` : null;
  const Frame = href ? Link : 'div';

  return (
    <article className={`s-card${flip ? ' s-card--flip' : ''}`} aria-labelledby={`p-${project.slug}`}>
      <div className="s-card__visual" data-reveal>
        <Frame
          {...(href ? { to: href, 'aria-label': `${project.title} case study`, tabIndex: -1 } : {})}
          className="s-card__frame"
        >
          <ProjectDiagram project={project} />
        </Frame>
      </div>

      <div className="s-card__text" data-reveal style={{ '--d': '0.1s' }}>
        <div className="s-card__index">
          <span className="s-label">
            {project.index}
            {project.year ? ` — ${project.year}` : ''}
          </span>
          <Status status={project.status} />
        </div>
        <h3 id={`p-${project.slug}`} className="s-h3 s-card__title">
          {href ? <Link to={href}>{project.title}</Link> : project.title}
        </h3>
        <p className="s-card__kind">{project.kind}</p>
        <p className="s-body s-card__summary">{project.summary}</p>
        {project.stack.length > 0 && (
          <ul className="s-tags" aria-label="Technologies">
            {project.stack.slice(0, 6).map((t) => (
              <li key={t} className="s-tag">{t}</li>
            ))}
            {project.stack.length > 6 && <li className="s-tag">+{project.stack.length - 6}</li>}
          </ul>
        )}
        {href && (
          <p className="s-card__more">
            <Link to={href} className="s-link s-link--underlined">
              Read the case study <Arrow />
            </Link>
          </p>
        )}
      </div>
    </article>
  );
}

export default function Work() {
  const featured = work.filter((p) => p.diagram);
  const more = work.filter((p) => !p.diagram);
  return (
    <section id="work" className="s-section" aria-labelledby="work-title">
      <div className="s-container">
        <header className="s-grid s-section-head">
          <p className="s-label" data-reveal>01 — Selected work</p>
          <h2 id="work-title" className="s-section-title" data-reveal style={{ '--d': '0.05s' }}>
            Real systems for <span className="s-serif">real problems</span>: healthcare, personal AI and small business.
          </h2>
          <p className="s-body s-section-intro" data-reveal style={{ '--d': '0.1s' }}>
            Each case study covers the problem, how the system is designed, the decisions behind it, and what’s built
            versus what’s still in progress.
          </p>
        </header>

        <div className="s-work">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} flip={i % 2 === 1} />
          ))}
        </div>

        {more.length > 0 && (
          <ul className="s-more" aria-label="More work">
            {more.map((p) => (
              <li key={p.slug} className="s-more__row" data-reveal>
                <span className="s-label">{p.index}</span>
                <div className="s-more__main">
                  <h3 className="s-h4">{p.title}</h3>
                  <p className="s-body">{p.summary}</p>
                </div>
                <span className="s-more__kind s-serif">{p.kind}</span>
                <Status status={p.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
