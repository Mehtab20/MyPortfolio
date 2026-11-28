import { Link } from 'react-router-dom';
import { experience, education } from '../../data/site';
import SectionHead from './SectionHead';

export default function Path() {
  return (
    <section id="path" className="s-section" aria-labelledby="path-title">
      <div className="s-container">
        <SectionHead id="path-title" n="04" label="Experience & education" title={['Where the work ', { em: 'happened.' }]} />
        <div className="s-path">
          <div>
            <h3 className="s-label">Experience</h3>
            {experience.map((x) => (
              <article key={x.title} className="s-entry" data-reveal>
                <div className="s-entry__top">
                  <h4>{x.href ? <Link to={x.href}>{x.title}</Link> : x.title}</h4>
                  <span className="s-entry__when">{x.when}</span>
                </div>
                <p className="s-entry__org">{x.org} · {x.where}</p>
                <p className="s-entry__body">{x.body}</p>
                <p className="s-tags">{x.tags.map((t) => <span key={t}>{t}</span>)}</p>
              </article>
            ))}
          </div>
          <div>
            <h3 className="s-label">Education</h3>
            {education.map((e) => (
              <article key={e.degree} className="s-entry" data-reveal>
                <div className="s-entry__top">
                  <h4>{e.degree}</h4>
                  <span className="s-entry__when">{e.when}</span>
                </div>
                <p className="s-entry__org">{e.school}</p>
                <p className="s-entry__body">{e.body}</p>
                {e.courses.length > 0 && <p className="s-tags">{e.courses.map((c) => <span key={c}>{c}</span>)}</p>}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
