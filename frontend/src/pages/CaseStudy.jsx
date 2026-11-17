import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SiteLayout from '../components/site/SiteLayout';
import ProjectDiagram from '../components/site/ProjectDiagram';
import { Arrow } from '../components/site/Icons';
import { useReveal, usePageMeta } from '../components/site/hooks';
import { getProject, work } from '../data/site';

function Block({ label, children }) {
  return (
    <section className="s-grid s-cs-block" data-reveal>
      <h2 className="s-label s-cs-block__label">{label}</h2>
      <div className="s-cs-block__body">{children}</div>
    </section>
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
  const tone = project.status.tone === 'live' ? ' s-status--live' : project.status.tone === 'done' ? ' s-status--done' : '';

  return (
    <SiteLayout>
      <article>
        <header className="s-container s-cs-hero">
          <Link to="/#work" className="s-cs-back s-link">
            <Arrow dir="left" /> All work
          </Link>
          <p className="s-label s-fade-in" style={{ '--d': '0.05s', marginBottom: 20 }}>
            Case study {project.index} — {project.year}
          </p>
          <h1 className="s-cs-title">
            <span className="s-rise"><span style={{ '--d': '0.1s' }}>{project.title}</span></span>
          </h1>
          <p className="s-cs-kind s-serif s-fade-in" style={{ '--d': '0.3s' }}>{project.kind}</p>

          <ul className="s-cs-facts s-fade-in" style={{ '--d': '0.45s' }}>
            <li>
              <p className="s-label">Role</p>
              <p className="s-meta__value">{project.role}</p>
            </li>
            <li>
              <p className="s-label">Timeline</p>
              <p className="s-meta__value">{project.year}</p>
            </li>
            <li>
              <p className="s-label">Status</p>
              <p className="s-meta__value"><span className={`s-status${tone}`} style={{ fontSize: 14, color: 'var(--s-ink)' }}>{project.status.label}</span></p>
            </li>
            <li>
              <p className="s-label">Links</p>
              <p className="s-meta__value" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                {project.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="s-link s-link--underlined">
                    {l.label} <Arrow dir="ne" />
                  </a>
                ))}
              </p>
            </li>
          </ul>
        </header>

        <div className="s-container">
          <div className="s-cs-visual s-fade-in" style={{ '--d': '0.55s' }}>
            <div className="s-card__frame">
              <ProjectDiagram project={project} />
            </div>
          </div>

          <Block label="Overview">
            <p className="s-lead" style={{ color: 'var(--s-ink)' }}>{project.summary}</p>
            <ul className="s-tags" aria-label="Technologies">
              {project.stack.map((t) => <li key={t} className="s-tag">{t}</li>)}
            </ul>
          </Block>

          <Block label="The problem">
            {cs.problem.map((p, i) => <p key={i} className="s-body" style={{ fontSize: 17 }}>{p}</p>)}
          </Block>

          <Block label="The approach">
            {cs.approach.map((p, i) => <p key={i} className="s-body" style={{ fontSize: 17 }}>{p}</p>)}
          </Block>

          <Block label="Architecture">
            <ul className="s-arch">
              {cs.architecture.map((a) => (
                <li key={a.layer}>
                  <span className="s-arch__layer">{a.layer}</span>
                  <span className="s-arch__detail">{a.detail}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block label="Engineering decisions">
            <div className="s-decisions">
              {cs.decisions.map((d) => (
                <div key={d.title} className="s-decision">
                  <h3 className="s-h4">{d.title}</h3>
                  <p className="s-body" style={{ fontSize: 15 }}>{d.body}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block label="What I did">
            <ul className="s-list">
              {cs.contribution.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </Block>

          <Block label="Where it stands">
            <div className="s-split">
              <div>
                <h3 className="s-h4" style={{ marginBottom: 16 }}>Built</h3>
                <ul className="s-list s-list--check">
                  {cs.built.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="s-h4" style={{ marginBottom: 16 }}>Next</h3>
                <ul className="s-list s-list--next">
                  {cs.next.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
            </div>
            {cs.note && <p className="s-note">{cs.note}</p>}
          </Block>
        </div>

        {next && next.slug !== slug && (
          <div className="s-container">
            <Link to={`/work/${next.slug}`} className="s-next-project">
              <span className="s-label">Next case study</span>
              <span className="s-next-project__title">
                {next.title} <Arrow />
              </span>
            </Link>
          </div>
        )}
      </article>
    </SiteLayout>
  );
}
