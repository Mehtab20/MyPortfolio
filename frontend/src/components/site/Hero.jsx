import { Link } from 'react-router-dom';
import portrait from '../../assets/portrait.webp';
import { profile } from '../../data/site';
import { useSectionNav } from './SiteNav';
import { Icon } from './Icons';

export default function Hero() {
  const goTo = useSectionNav();
  const [first, ...rest] = profile.name.split(' ');

  return (
    <section id="hero" className="s-hero" aria-labelledby="hero-title">
      <div className="s-container s-hero__inner">
        <div className="s-hero__photo s-enter" style={{ '--d': '0.05s' }}>
          <img src={portrait} alt={`Portrait of ${profile.name}`} width="200" height="200" fetchpriority="high" />
        </div>

        <p className="s-hero__role s-enter" style={{ '--d': '0.15s' }}>
          <Icon name="sparkles" />
          <span>&lt;{profile.positioning.join(' | ')} /&gt;</span>
        </p>

        <h1 id="hero-title" className="s-hero__name s-enter" style={{ '--d': '0.25s' }}>
          {first} <span className="s-gradient-text">{rest.join(' ')}</span>
        </h1>

        <p className="s-hero__tagline s-enter" style={{ '--d': '0.35s' }}>{profile.tagline}</p>

        <div className="s-hero__ctas s-enter" style={{ '--d': '0.45s' }}>
          <a href="/#contact" className="s-btn" onClick={(e) => goTo(e, 'contact')}>
            <Icon name="chat" /> Let’s Talk <Icon name="chevronRight" />
          </a>
          <a href="/#projects" className="s-btn s-btn--outline" onClick={(e) => goTo(e, 'projects')}>
            <Icon name="external" /> View Projects
          </a>
          <Link to={profile.resume} className="s-btn s-btn--text">
            <Icon name="download" /> Download CV
          </Link>
        </div>

        <div className="s-hero__socials s-enter" style={{ '--d': '0.55s' }}>
          <a className="s-round" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Icon name="github" />
          </a>
          <a className="s-round" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Icon name="linkedin" />
          </a>
          <a className="s-round" href={`mailto:${profile.email}`} aria-label="Email">
            <Icon name="mail" />
          </a>
        </div>
      </div>
    </section>
  );
}
