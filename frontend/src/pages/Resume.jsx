import SiteLayout from '../components/site/SiteLayout';
import { Icon } from '../components/site/Icons';
import { usePageMeta, useReveal } from '../components/site/hooks';
import { profile, experience, education, work, toolkit } from '../data/site';

/*
 * Résumé generated from src/content — the same verified facts as the site.
 * Nothing here is typed by hand, so it cannot drift from the portfolio.
 * "Print / save as PDF" uses the print stylesheet in styles/site.css.
 */
export default function Resume() {
  usePageMeta({
    title: `Résumé — ${profile.name}`,
    description: `${profile.name}: ${profile.positioning.join(', ')}. Experience, projects, skills and education.`,
    path: '/resume',
  });
  useReveal([]);
  const skills = toolkit.filter((g) => !g.learning);
  const learning = toolkit.find((g) => g.learning);

  return (
    <SiteLayout>
      <article className="s-container s-cv">
        <div className="s-cv__actions s-no-print">
          <button type="button" className="s-btn" onClick={() => window.print()}>
            <Icon name="download" /> Print / save as PDF
          </button>
          <a className="s-btn s-btn--outline" href="/resume.pdf" download>
            <Icon name="file" /> Download PDF
          </a>
        </div>

        <header className="s-cv__head">
          <h1 className="s-cv__name">{profile.name}</h1>
          <p className="s-cv__role">{profile.positioning.join(' · ')}</p>
          <p className="s-cv__contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span aria-hidden="true"> · </span>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            <span aria-hidden="true"> · </span>
            <span>{profile.location}</span>
            <span aria-hidden="true"> · </span>
            <a href={profile.github}>github.com/Mehtab20</a>
            <span aria-hidden="true"> · </span>
            <a href="https://mehtabakbar.com">mehtabakbar.com</a>
          </p>
          <p className="s-cv__summary">{profile.tagline}</p>
        </header>

        <section className="s-cv__section" aria-labelledby="cv-exp">
          <h2 id="cv-exp" className="s-cv__h">Experience and projects</h2>
          {experience.map((x) => (
            <div key={x.title} className="s-cv__item">
              <div className="s-cv__row">
                <h3>{x.title}</h3>
                <span>{x.when}</span>
              </div>
              <p className="s-cv__org">{x.org} · {x.where}</p>
              <p>{x.body}</p>
              <p className="s-cv__tags">{x.tags.join(' · ')}</p>
            </div>
          ))}
        </section>

        <section className="s-cv__section" aria-labelledby="cv-proj">
          <h2 id="cv-proj" className="s-cv__h">Project status</h2>
          <ul className="s-cv__status">
            {work.map((p) => (
              <li key={p.slug}>
                <strong>{p.title}</strong> — {p.status.label}
                {p.caseStudy ? <> · <a href={`https://mehtabakbar.com/work/${p.slug}`}>case study</a></> : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="s-cv__section" aria-labelledby="cv-skills">
          <h2 id="cv-skills" className="s-cv__h">Skills</h2>
          <dl className="s-cv__skills">
            {skills.map((g) => (
              <div key={g.name}>
                <dt>{g.name}</dt>
                <dd>{g.items.join(', ')}</dd>
              </div>
            ))}
            {learning && (
              <div>
                <dt>{learning.name}</dt>
                <dd>{learning.items.join(', ')}</dd>
              </div>
            )}
          </dl>
        </section>

        <section className="s-cv__section" aria-labelledby="cv-edu">
          <h2 id="cv-edu" className="s-cv__h">Education</h2>
          {education.map((e) => (
            <div key={e.degree} className="s-cv__item">
              <div className="s-cv__row">
                <h3>{e.degree}</h3>
                <span>{e.when}</span>
              </div>
              <p className="s-cv__org">{e.school}</p>
            </div>
          ))}
        </section>
      </article>
    </SiteLayout>
  );
}
