import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SiteLayout from '../components/site/SiteLayout';
import ProjectDiagram from '../components/site/ProjectDiagram';
import { StatusBadge } from '../components/site/Work';
import { Icon } from '../components/site/Icons';
import { useReveal, usePageMeta } from '../components/site/hooks';
import { getProject, work } from '../data/site';

export const GRADES = {
  verified: { label: 'Verified · ran it', note: 'I ran this code against sample inputs while reviewing it.' },
  implemented: { label: 'Implemented · not run here', note: 'The code is in the repository and was reviewed, but not run for this write-up.' },
  partial: { label: 'Partial', note: 'Present in the code but incomplete or dependent on files that aren’t in the repository.' },
  planned: { label: 'Planned', note: 'Designed or documented, not built yet.' },
};

export function Grade({ level }) {
  const g = GRADES[level];
  if (!g) return null;
  return <span className={`s-grade s-grade--${level}`}>{g.label}</span>;
}

function Block({ n, label, title, children }) {
  return (
    <section className="s-cs__block" data-reveal>
      <header>
        <p className="s-label"><b>{n}</b> — {label}</p>
        {title && <h2 className="s-display">{title}</h2>}
      </header>
      <div>{children}</div>
    </section>
  );
}

function Explorer({ layers }) {
  const [picked, setPicked] = useState(0);
  const cur = layers[picked];
  const used = [...new Set(layers.map((l) => l.evidence).filter(Boolean))];
  const onKey = (e) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    e.preventDefault();
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
    const next = (picked + d + layers.length) % layers.length;
    setPicked(next);
    e.currentTarget.querySelectorAll('[role="tab"]')[next]?.focus();
  };
  return (
    <>
      <div className="s-explorer">
        <div className="s-explorer__list" role="tablist" aria-label="Architecture layers" aria-orientation="vertical" onKeyDown={onKey}>
          {layers.map((l, i) => (
            <button
              key={l.layer}
              type="button"
              role="tab"
              id={`layer-${i}`}
              aria-selected={i === picked}
              aria-controls="layer-panel"
              tabIndex={i === picked ? 0 : -1}
              className="s-layer"
              onClick={() => setPicked(i)}
            >
              <span className="s-layer__name">{l.layer}</span>
              <Grade level={l.evidence} />
            </button>
          ))}
        </div>
        <div className="s-explorer__panel" role="tabpanel" id="layer-panel" aria-labelledby={`layer-${picked}`}>
          <p className="s-label">Layer {String(picked + 1).padStart(2, '0')} of {String(layers.length).padStart(2, '0')}</p>
          <h3>{cur.layer}</h3>
          <p>{cur.detail}</p>
          {cur.evidence && <p style={{ fontSize: 14 }}><Grade level={cur.evidence} /> <span style={{ marginLeft: 8 }}>{GRADES[cur.evidence].note}</span></p>}
          {cur.source && (
            <a className="s-explorer__src" href={cur.source} target="_blank" rel="noreferrer">
              <Icon name="github" /> {cur.source.replace('https://github.com/Mehtab20/', '').replace(/\/(blob|tree)\/main\//, ' / ')}
            </a>
          )}
        </div>
      </div>
      {used.length > 0 && (
        <p className="s-legend">
          Evidence grades: {used.map((u) => <Grade key={u} level={u} />)}
        </p>
      )}
    </>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);
  const cs = project?.caseStudy;

  usePageMeta({
    title: project ? `${project.title}: case study — Mehtab Akbar` : 'Case study — Mehtab Akbar',
    description: project?.summary,
    path: `/work/${slug}`,
  });
  useReveal([slug]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project || !cs) return <Navigate to="/#work" replace />;

  const withStudies = work.filter((p) => p.caseStudy);
  const next = withStudies[(withStudies.findIndex((p) => p.slug === slug) + 1) % withStudies.length];
  let n = 0;
  const num = () => String(++n).padStart(2, '0');

  return (
    <SiteLayout>
      <article className="s-container s-cs">
        <Link to="/#work" className="s-cs__back"><Icon name="arrowLeft" /> All work</Link>

        <header className="s-cs__hero">
          <div className="s-enter">
            <p className="s-label"><b>{project.index}</b> — Case study</p>
            <h1 className="s-display s-cs__title">{project.title}</h1>
            <p className="s-lede s-cs__kind">{project.summary}</p>
          </div>
          <dl className="s-cs__facts s-enter" style={{ '--d': '0.15s' }}>
            <div><dt>What</dt><dd>{project.kind}</dd></div>
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>When</dt><dd>{project.year}</dd></div>
            <div><dt>Status</dt><dd><StatusBadge status={project.status} /></dd></div>
            {project.links.length > 0 && (
              <div>
                <dt>Code</dt>
                <dd style={{ display: 'grid', gap: 6 }}>
                  {project.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer"><Icon name="github" /> {l.label}</a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </header>

        <figure className="s-figure s-enter" style={{ '--d': '0.25s' }}>
          <ProjectDiagram project={project} />
          <figcaption className="s-label">Architecture · {project.stack.join(' · ')}</figcaption>
        </figure>

        <Block n={num()} label="Context" title="Problem and approach">
          <div className="s-cs__prose s-cs__prose--2">
            <div>
              <h3 className="s-label">The problem</h3>
              {cs.problem.map((p, i) => <p key={i} className="s-body">{p}</p>)}
            </div>
            <div>
              <h3 className="s-label">The approach</h3>
              {cs.approach.map((p, i) => <p key={i} className="s-body">{p}</p>)}
            </div>
          </div>
        </Block>

        <Block n={num()} label="Architecture" title="Explore the layers">
          <Explorer layers={cs.architecture} />
        </Block>

        {cs.gallery && (
          <Block n={num()} label="Screens" title="Prototype screens">
            <div className="s-gallery" tabIndex={0} role="region" aria-label="Prototype screens, scrollable">
              {cs.gallery.images.map((im) => (
                <figure key={im.src}><img src={im.src} alt={im.alt} width="390" height="844" loading="lazy" /></figure>
              ))}
            </div>
            <p className="s-note">{cs.gallery.caption}</p>
          </Block>
        )}

        <Block n={num()} label="Decisions" title="Engineering decisions">
          <div className="s-decisions">
            {cs.decisions.map((d) => (
              <div key={d.title} className="s-decision">
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block n={num()} label="Status" title="Where it stands">
          <div className="s-cs__prose s-cs__prose--2">
            <div>
              <h3 className="s-label">My contribution</h3>
              <ul className="s-list">{cs.contribution.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
            <div>
              <h3 className="s-label">Built</h3>
              <ul className="s-list">{cs.built.map((c) => <li key={c}>{c}</li>)}</ul>
              <h3 className="s-label" style={{ marginTop: 28 }}>Next</h3>
              <ul className="s-list s-list--next">{cs.next.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          </div>
          {cs.note && <p className="s-note">{cs.note}</p>}
        </Block>

        {next && next.slug !== slug && (
          <Link to={`/work/${next.slug}`} className="s-cs__next">
            <span>
              <span className="s-label">Next case study · {next.index}</span>
              <strong>{next.title}</strong>
            </span>
            <Icon name="arrowRight" />
          </Link>
        )}
      </article>
    </SiteLayout>
  );
}
