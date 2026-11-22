import { toolkit } from '../../data/site';
import SectionHead from './SectionHead';
import { Icon } from './Icons';

export default function Skills() {
  return (
    <section id="skills" className="s-section s-section--plain" aria-labelledby="skills-title">
      <div className="s-container">
        <SectionHead
          id="skills-title"
          eyebrow="What I work with"
          title={[{ g: 'Skills' }, ' & Technologies']}
          subtitle="Technologies I’ve used in my own projects, grouped by what they’re for."
        />
        <div className="s-grid-3">
          {toolkit.map((g, i) => (
            <article key={g.name} className="s-card s-card--hover s-skill" data-reveal style={{ '--d': `${0.05 * (i % 3)}s` }}>
              <div className="s-card-head">
                <span className="s-iconbox s-iconbox--lg"><Icon name={g.icon} /></span>
                <div className="s-card-head__text">
                  <h3 className="s-h3">{g.name}</h3>
                  <p className="s-small" style={{ marginTop: 2 }}>
                    {g.items.length} {g.learning ? 'in progress' : g.items.length === 1 ? 'technology' : 'technologies'}
                  </p>
                </div>
              </div>
              <ul className="s-chips">
                {g.items.map((t) => (
                  <li key={t} className={`s-chip${g.learning ? ' s-chip--teal' : ''}`}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
