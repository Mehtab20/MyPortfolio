import { toolkit } from '../../data/site';

export default function Toolkit() {
  return (
    <section id="toolkit" className="s-section" aria-labelledby="toolkit-title">
      <div className="s-container">
        <header className="s-grid s-section-head">
          <p className="s-label" data-reveal>03 — Toolkit</p>
          <h2 id="toolkit-title" className="s-section-title" data-reveal style={{ '--d': '0.05s' }}>
            Tools I’ve <span className="s-serif">shipped with</span>, grouped by the job they do.
          </h2>
          <p className="s-body s-section-intro" data-reveal style={{ '--d': '0.1s' }}>
            Everything listed is used in my own projects, including this site. The last row is what I’m learning now.
          </p>
        </header>

        <ul className="s-toolkit">
          {toolkit.map((g) => (
            <li key={g.name} className={`s-toolkit__row${g.learning ? ' s-toolkit__row--learning' : ''}`} data-reveal>
              <h3 className="s-h4 s-toolkit__name">{g.name}</h3>
              <p className="s-toolkit__note">{g.note}</p>
              <ul className="s-tags s-toolkit__items">
                {g.items.map((t) => (
                  <li key={t} className="s-tag">{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
