import { Link } from 'react-router-dom';
import { work } from '../../data/site';
import SectionHead from './SectionHead';
import { Icon } from './Icons';

export function StatusBadge({ status }) {
  return <span className={`s-status s-status--${status.tone}`}>{status.label}</span>;
}

function Row({ project, i }) {
  const href = project.caseStudy ? `/work/${project.slug}` : null;
  const inner = (
    <>
      <span className="s-row__idx">{project.index}</span>
      <div>
        <h3 id={`p-${project.slug}`} className="s-row__title">{project.title}</h3>
        <p className="s-row__kind">{project.kind}</p>
      </div>
      <p className="s-row__summary">{project.summary}</p>
      <div className="s-row__meta">
        <StatusBadge status={project.status} />
        {project.year && <span className="s-label">{project.year}</span>}
        {project.stack.length > 0 && <span className="s-label">{project.stack.slice(0, 3).join(' · ')}</span>}
      </div>
      {href && <span className="s-row__go" aria-hidden="true"><Icon name="arrowRight" /></span>}
    </>
  );
  return (
    <li data-reveal style={{ '--d': `${0.05 * i}s` }}>
      {href ? (
        <Link to={href} className="s-row" aria-labelledby={`p-${project.slug}`}>{inner}</Link>
      ) : (
        <div className="s-row s-row--idle">{inner}</div>
      )}
    </li>
  );
}

export default function Work() {
  return (
    <section id="work" className="s-section" aria-labelledby="work-title">
      <div className="s-container">
        <SectionHead
          id="work-title"
          n="01"
          label="Selected work"
          title={['Systems, not ', { em: 'screenshots.' }]}
          lede="Each project has a write-up of how it’s built, with every architecture claim graded by the evidence behind it."
        />
        <ol className="s-rows">
          {work.map((p, i) => <Row key={p.slug} project={p} i={i} />)}
        </ol>
      </div>
    </section>
  );
}
