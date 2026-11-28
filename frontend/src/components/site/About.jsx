import portrait from '../../assets/portrait.webp';
import { about, profile } from '../../data/site';
import SectionHead from './SectionHead';

export default function About() {
  return (
    <section id="about" className="s-section" aria-labelledby="about-title">
      <div className="s-container">
        <SectionHead id="about-title" n="02" label="About" title={['The part before the ', { em: 'screens.' }]} />
        <div className="s-about">
          <figure className="s-portrait" data-reveal>
            <img src={portrait} alt={`Portrait of ${profile.name}`} width="244" height="305" loading="lazy" />
            <figcaption className="s-label">{profile.location}</figcaption>
          </figure>
          <div className="s-about__text" data-reveal style={{ '--d': '0.08s' }}>
            {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
        <ul className="s-principles">
          {about.principles.map((pr, i) => (
            <li key={pr.title} className="s-principle" data-reveal style={{ '--d': `${0.06 * i}s` }}>
              <span className="s-label">Principle {String(i + 1).padStart(2, '0')}</span>
              <h3>{pr.title}</h3>
              <p>{pr.body}</p>
              <p className="s-proof">{pr.proof}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
