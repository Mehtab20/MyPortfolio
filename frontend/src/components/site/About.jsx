import { Link } from 'react-router-dom';
import { about, glance } from '../../data/site';
import SectionHead from './SectionHead';
import { Icon } from './Icons';

export default function About() {
  return (
    <section id="about" className="s-section" aria-labelledby="about-title">
      <div className="s-container">
        <SectionHead
          id="about-title"
          eyebrow="Get to know me"
          title={['About ', { g: 'Me' }]}
          subtitle="A software engineer who builds complete systems, from the data model to the screen."
        />

        <div className="s-about">
          <div className="s-card s-about__story" data-reveal>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="s-body" style={i === 0 ? { color: 'var(--s-text)', fontSize: 17 } : undefined}>{p}</p>
            ))}
            <h3 className="s-label-caps" style={{ marginTop: 8 }}>What I bring</h3>
            <ol className="s-points">
              {about.principles.map((pr, i) => (
                <li key={pr.title} className="s-point">
                  <span className="s-point__n">0{i + 1}</span>
                  <div>
                    <h4>{pr.title}</h4>
                    <p>{pr.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="s-card" data-reveal style={{ '--d': '0.1s' }}>
            <h3 className="s-h3" style={{ marginBottom: 6 }}>At a glance</h3>
            <ul className="s-glance">
              {glance.map((g) => (
                <li key={g.k}>
                  <span className="s-iconbox"><Icon name={g.icon} /></span>
                  <div>
                    <p className="s-glance__k">{g.k}</p>
                    <p className="s-glance__v">
                      {g.href ? <Link to={g.href} style={{ color: 'var(--s-primary)' }}>{g.v}</Link> : g.v}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
