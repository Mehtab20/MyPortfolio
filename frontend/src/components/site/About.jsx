import portrait from '../../assets/portrait.webp';
import { about, profile } from '../../data/site';

export default function About() {
  return (
    <section id="about" className="s-section" aria-labelledby="about-title">
      <div className="s-container">
        <header className="s-grid s-section-head">
          <p className="s-label" data-reveal>02 — About</p>
          <h2 id="about-title" className="s-section-title" data-reveal style={{ '--d': '0.05s' }}>
            Engineer first, <span className="s-serif">product thinker</span> by habit.
          </h2>
        </header>

        <div className="s-grid s-about">
          <figure className="s-about__portrait" data-reveal>
            <div className="s-portrait">
              <img src={portrait} alt={`Portrait of ${profile.name}`} width="320" height="400" loading="lazy" decoding="async" />
            </div>
            <figcaption className="s-label" style={{ marginTop: 12 }}>{profile.name} — {profile.location}</figcaption>
          </figure>

          <div className="s-about__text">
            {about.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 's-lead' : 's-body'} data-reveal style={{ '--d': `${0.05 * i}s`, color: i === 0 ? 'var(--s-ink)' : undefined }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <ol className="s-principles" aria-label="How I work">
          {about.principles.map((pr, i) => (
            <li key={pr.title} className="s-principle" data-reveal style={{ '--d': `${0.06 * i}s` }}>
              <span className="s-principle__n">0{i + 1}</span>
              <h3 className="s-h4">{pr.title}</h3>
              <p className="s-body" style={{ fontSize: 15 }}>{pr.body}</p>
              <p className="s-principle__proof">↳ {pr.proof}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
