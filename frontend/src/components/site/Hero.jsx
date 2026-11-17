import { Link } from 'react-router-dom';
import { profile } from '../../data/site';
import { useLocalTime } from './hooks';
import { useSectionNav } from './SiteNav';
import { Arrow } from './Icons';

export default function Hero() {
  const time = useLocalTime(profile.timeZone);
  const goTo = useSectionNav();

  return (
    <section className="s-hero" aria-labelledby="hero-title">
      <div className="s-container" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="s-hero__top s-fade-in" style={{ '--d': '0.1s' }}>
          <p className="s-label" style={{ margin: 0 }}>
            <b>{profile.name}</b>
          </p>
          <p className="s-label" style={{ margin: 0 }}>{profile.positioning.join('  ·  ')}</p>
        </div>

        <h1 id="hero-title" className="s-display s-hero__title">
          <span className="s-rise"><span style={{ '--d': '0.15s' }}>I build AI-native</span></span>
          <span className="s-rise"><span style={{ '--d': '0.25s' }}>products, <span className="s-serif">from</span></span></span>
          <span className="s-rise"><span style={{ '--d': '0.35s' }}><span className="s-serif">schema to screen.</span></span></span>
        </h1>

        <div className="s-grid s-hero__body">
          <p className="s-lead s-hero__lead s-fade-in" style={{ '--d': '0.6s' }}>
            I’m Mehtab, a software engineer in Pakistan. I design and build complete systems:{' '}
            <strong>healthcare software</strong>, an <strong>AI life companion</strong>, and the data models, APIs and interfaces underneath them.
          </p>
          <div className="s-hero__ctas s-fade-in" style={{ '--d': '0.75s' }}>
            <a href="/#work" className="s-btn" onClick={(e) => goTo(e, 'work')}>
              See selected work <Arrow dir="down" />
            </a>
            <Link to={profile.resume} className="s-btn s-btn--ghost">
              Résumé
            </Link>
          </div>
        </div>

        <div className="s-hero__meta s-fade-in" style={{ '--d': '0.9s' }}>
          <ul className="s-meta">
            <li>
              <p className="s-label">Based in</p>
              <p className="s-meta__value">{profile.location}</p>
            </li>
            <li>
              <p className="s-label">Local time</p>
              <p className="s-meta__value">
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span> PKT · UTC+5
              </p>
            </li>
            <li>
              <p className="s-label">Now building</p>
              <p className="s-meta__value">
                <Link to={profile.nowBuilding.href} className="s-status s-status--live s-link" style={{ fontFamily: 'inherit', fontSize: 'inherit', color: 'var(--s-ink)' }}>
                  {profile.nowBuilding.label}
                </Link>
              </p>
            </li>
            <li>
              <p className="s-label">Education</p>
              <p className="s-meta__value">{profile.education}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
