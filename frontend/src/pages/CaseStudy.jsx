import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SiteLayout from '../components/site/SiteLayout';
import ProjectDiagram from '../components/site/ProjectDiagram';
import { StatusBadge } from '../components/site/Work';
import { Icon } from '../components/site/Icons';
import { useReveal, usePageMeta } from '../components/site/hooks';
import { getProject, work } from '../data/site';

function Section({ icon, title, children }) {
  return (
    <section className="s-card s-cs__section" data-reveal>
      <h2><span className="s-iconbox"><Icon name={icon} /></span>{title}</h2>
      {children}
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

  if (!project || !cs) return <Navigate to="/#projects" replace />;

  const withStudies = work.filter((p) => p.caseStudy);
  const next = withStudies[(withStudies.findIndex((p) => p.slug === slug) + 1) % withStudies.length];

  return (
    <SiteLayout>
      <article className="s-container s-cs">
        <Link to="/#projects" className="s-cs__back"><Icon name="arrowLeft" /> Back to projects</Link>

        <header className="s-card s-cs__hero s-enter">
          <div className="s-project__media">
            <ProjectDiagram project={project} />
          </div>
          <div className="s-cs__head">
            <p className="s-eyebrow" style={{ marginBottom: 0 }}>Case study {project.index}</p>
            <h1 className="s-cs__title">{project.title}</h1>
            <p className="s-cs__kind">{project.kind}</p>
            <div className="s-meta-row" style={{ margin: '4px 0 0' }}>
              <span className="s-pill"><Icon name="calendar" /> {project.year}</span>
              <span className="s-pill"><Icon name="user" /> {project.role}</span>
              <StatusBadge status={project.status} />
            </div>
            <ul className="s-chips">
              {project.stack.map((t) => <li key={t} className="s-chip s-chip--teal">{t}</li>)}
            </ul>
            {project.links.length > 0 && (
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 6 }}>
                {project.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="s-btn s-btn--outline s-btn--sm">
                    <Icon name="github" /> {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="s-cs__sections">
          <Section icon="info" title="Overview">
            <p className="s-body" style={{ color: 'var(--s-text)', fontSize: 17 }}>{project.summary}</p>
          </Section>

          <div className="s-grid-2">
            <Section icon="flag" title="The Problem">
              {cs.problem.map((p, i) => <p key={i} className="s-body">{p}</p>)}
            </Section>
            <Section icon="target" title="The Approach">
              {cs.approach.map((p, i) => <p key={i} className="s-body">{p}</p>)}
            </Section>
          </div>

          <Section icon="layers" title="Architecture">
            <ul className="s-arch">
              {cs.architecture.map((a) => (
                <li key={a.layer}>
                  <span className="s-arch__layer">{a.layer}</span>
                  <span className="s-arch__detail">{a.detail}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon="wrench" title="Engineering Decisions">
            <div className="s-decisions">
              {cs.decisions.map((d) => (
                <div key={d.title} className="s-decision">
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              ))}
            </div>
          </Section>

          <div className="s-grid-2">
            <Section icon="user" title="My Contribution">
              <ul className="s-checks">
                {cs.contribution.map((c) => <li key={c}><span className="s-check"><Icon name="check" /></span>{c}</li>)}
              </ul>
            </Section>
            <Section icon="list" title="Where It Stands">
              <p className="s-label-caps" style={{ marginBottom: 12 }}>Built</p>
              <ul className="s-checks">
                {cs.built.map((c) => <li key={c}><span className="s-check"><Icon name="check" /></span>{c}</li>)}
              </ul>
              <p className="s-label-caps" style={{ margin: '20px 0 12px' }}>Next</p>
              <ul className="s-checks">
                {cs.next.map((c) => <li key={c}><span className="s-check"><Icon name="arrowRight" /></span>{c}</li>)}
              </ul>
              {cs.note && <p className="s-note" style={{ marginTop: 18 }}>{cs.note}</p>}
            </Section>
          </div>

          {next && next.slug !== slug && (
            <Link to={`/work/${next.slug}`} className="s-card s-card--hover s-cs__next">
              <div>
                <p className="s-eyebrow" style={{ marginBottom: 0 }}>Next case study</p>
                <p className="s-h3">{next.title}</p>
              </div>
              <Icon name="arrowRight" />
            </Link>
          )}
        </div>
      </article>
    </SiteLayout>
  );
}
