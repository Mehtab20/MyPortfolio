import { Link } from 'react-router-dom';
import { journey } from '../../data/site';
import { Arrow } from './Icons';

export default function Journey() {
  return (
    <section id="journey" className="s-section" aria-labelledby="journey-title">
      <div className="s-container">
        <header className="s-grid s-section-head">
          <p className="s-label" data-reveal>04 — Journey</p>
          <h2 id="journey-title" className="s-section-title" data-reveal style={{ '--d': '0.05s' }}>
            How I got here, <span className="s-serif">most recent first.</span>
          </h2>
        </header>

        <ol className="s-journey">
          {journey.map((j) => (
            <li key={j.what} className="s-journey__item" data-reveal>
              <p className="s-label s-journey__when">{j.when}</p>
              <div className="s-journey__what">
                <h3 className="s-h4">
                  {j.href ? (
                    <Link to={j.href} className="s-link">
                      {j.what} <Arrow />
                    </Link>
                  ) : (
                    j.what
                  )}
                </h3>
                <p className="s-journey__org">{j.org}</p>
              </div>
              <p className="s-body s-journey__detail" style={{ fontSize: 15 }}>{j.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
