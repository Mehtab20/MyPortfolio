import { Link } from 'react-router-dom';
import { profile, getProject } from '../../data/site';
import { useSectionNav } from './SiteNav';
import { Icon } from './Icons';
import { useLocalTime } from './hooks';

/* Small live-path schematic for the "Now building" panel, drawn from the project's diagram data. */
function NowFlow({ project }) {
  const cols = project.diagram.columns.map((c) => ({ t: c.label, hot: c.nodes.some((n) => n.hot) }));
  const w = 360;
  const step = (w - 8) / cols.length;
  const bw = step - 18;
  return (
    <svg className="s-now__flow" viewBox={`0 0 ${w} 64`} aria-hidden="true">
      {cols.slice(1).map((_, i) => (
        <path key={i} className="f-edge" d={`M${4 + i * step + bw},32 L${4 + (i + 1) * step},32`} />
      ))}
      {cols.map((n, i) => (
        <g key={n.t}>
          <rect className={`f-node${n.hot ? ' f-node--hot' : ''}`} x={4 + i * step} y="14" width={bw} height="36" rx="10" />
          <text x={4 + i * step + bw / 2} y="36" textAnchor="middle">{n.t}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Hero() {
  const goTo = useSectionNav();
  const time = useLocalTime(profile.timeZone);
  const now = getProject(profile.nowBuilding.href.split('/').pop());

  return (
    <section id="hero" className="s-hero" aria-labelledby="hero-title">
      <div className="s-container">
        <div className="s-hero__grid">
          <div>
            <p className="s-label s-enter" style={{ '--d': '0.05s' }}>
              {profile.positioning.map((p, i) => (
                <span key={p}>{i > 0 && <b> / </b>}{p}</span>
              ))}
            </p>
            <h1 id="hero-title" className="s-display s-hero__title s-enter" style={{ '--d': '0.15s' }}>
              <span className="s-sr">{profile.name}: </span>
              Engineering software from the <em>schema</em> to the screen.
            </h1>
            <p className="s-lede s-hero__lede s-enter" style={{ '--d': '0.3s' }}>
              {profile.intro}
            </p>
            <div className="s-hero__ctas s-enter" style={{ '--d': '0.42s' }}>
              <a href="/#work" className="s-btn" onClick={(e) => goTo(e, 'work')}>
                View selected work <span className="s-btn__arrow" aria-hidden="true">→</span>
              </a>
              <a href="/#contact" className="s-btn s-btn--outline" onClick={(e) => goTo(e, 'contact')}>
                Start a conversation
              </a>
            </div>
          </div>

          {now && (
            <aside className="s-now s-enter" style={{ '--d': '0.5s' }} aria-label="Now building">
              <div className="s-now__head">
                <span className="s-ai-label"><span className="s-orb" aria-hidden="true" />Now building · AI</span>
                <span className={`s-status s-status--${now.status.tone}`}>{now.status.label}</span>
              </div>
              <div className="s-now__body">
                <p className="s-now__title">{now.title}</p>
                <p className="s-now__kind">{now.kind}</p>
                <NowFlow project={now} />
                <dl className="s-now__facts">
                  <div><dt>Stack</dt><dd>{now.stack.slice(0, 4).join(' · ')}</dd></div>
                  <div><dt>Role</dt><dd>{now.role}</dd></div>
                  <div><dt>Evidence</dt><dd>Code reviewed · no automated tests yet</dd></div>
                </dl>
              </div>
              <div className="s-now__foot">
                <span className="s-label">Case study {now.index}</span>
                <Link to={`/work/${now.slug}`}>Read it <Icon name="arrowRight" size={16} /></Link>
              </div>
            </aside>
          )}
        </div>

        <dl className="s-meta s-enter" style={{ '--d': '0.6s' }}>
          <div><dt>Based in</dt><dd>{profile.location}</dd></div>
          <div><dt>Local time</dt><dd>{time ? `${time} · UTC+5` : 'UTC+5'}</dd></div>
          <div><dt>Education</dt><dd>{profile.education}</dd></div>
          <div><dt>Contact</dt><dd><a className="s-link" href={`mailto:${profile.email}`}>Email me</a></dd></div>
        </dl>
      </div>
    </section>
  );
}
