import { services } from '../../data/site';
import SectionHead from './SectionHead';
import { useSectionNav } from './SiteNav';
import { Icon } from './Icons';

export default function Services() {
  const goTo = useSectionNav();
  return (
    <section id="services" className="s-section" aria-labelledby="services-title">
      <div className="s-container">
        <SectionHead
          id="services-title"
          eyebrow="What I offer"
          title={['My ', { g: 'Services' }]}
          subtitle="How I can help you design, build and ship your product."
        />
        <div className="s-grid-2">
          {services.map((s, i) => (
            <article key={s.title} className="s-card s-card--hover" data-reveal style={{ '--d': `${0.05 * i}s` }}>
              <span className="s-card-num">0{i + 1}</span>
              <span className="s-iconbox s-iconbox--lg" aria-hidden="true">{s.emoji}</span>
              <h3 className="s-h3" style={{ marginTop: 22 }}>{s.title}</h3>
              <p className="s-body" style={{ marginTop: 10 }}>{s.body}</p>
              <hr className="s-card__divider" />
              <ul className="s-checks">
                {s.points.map((p) => (
                  <li key={p}>
                    <span className="s-check"><Icon name="check" /></span>
                    {p}
                  </li>
                ))}
              </ul>
              <a href="/#contact" className="s-link" style={{ marginTop: 22 }} onClick={(e) => goTo(e, 'contact')}>
                Start a project <Icon name="chevronRight" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
