import { Link } from 'react-router-dom';
import { experience } from '../../data/site';
import SectionHead from './SectionHead';
import { Icon } from './Icons';

export default function Experience() {
  return (
    <section id="experience" className="s-section" aria-labelledby="experience-title">
      <div className="s-container">
        <SectionHead
          id="experience-title"
          eyebrow="Career journey"
          title={['Work ', { g: 'Experience' }]}
          subtitle="Products and systems I’ve designed and built, most recent first."
        />
        <ol className="s-timeline">
          {experience.map((x, i) => (
            <li key={x.title} className="s-timeline__item" data-reveal style={{ '--d': `${0.04 * i}s` }}>
              <span className="s-timeline__dot" aria-hidden="true" />
              <article className="s-card s-card--edge s-card--hover">
                <h3 className="s-h3">{x.title}</h3>
                <p className="s-company"><Icon name="building" /> {x.org}</p>
                <div className="s-meta-row">
                  <span className="s-pill"><Icon name="calendar" /> {x.when}</span>
                  <span className="s-pill"><Icon name="pin" /> {x.where}</span>
                </div>
                <p className="s-body">{x.body}</p>
                <ul className="s-chips" style={{ marginTop: 16 }}>
                  {x.tags.map((t) => <li key={t} className="s-chip">{t}</li>)}
                </ul>
                {x.href && (
                  <Link to={x.href} className="s-link" style={{ marginTop: 18 }}>
                    Read the case study <Icon name="chevronRight" />
                  </Link>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
