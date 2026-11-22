import { education } from '../../data/site';
import SectionHead from './SectionHead';
import { Icon } from './Icons';

export default function Education() {
  return (
    <section id="education" className="s-section" aria-labelledby="education-title">
      <div className="s-container">
        <SectionHead
          id="education-title"
          eyebrow="Academic background"
          title={[{ g: 'Education' }, ' & Training']}
          subtitle="Where I studied, and what I focused on."
        />
        <div className="s-grid-2">
          {education.map((e, i) => (
            <article key={e.degree} className="s-card s-card--edge s-card--hover s-edu" data-reveal style={{ '--d': `${0.05 * i}s` }}>
              <div className="s-edu__top">
                <div className="s-card-head">
                  <span className="s-iconbox s-iconbox--lg"><Icon name="graduation" /></span>
                  <div className="s-card-head__text">
                    <h3 className="s-h3">{e.degree}</h3>
                    <p className="s-body" style={{ marginTop: 4 }}>{e.school}</p>
                  </div>
                </div>
                <div className="s-meta-row" style={{ marginBottom: 0 }}>
                  <span className="s-pill"><Icon name="calendar" /> {e.when}</span>
                  <span className="s-pill"><Icon name="pin" /> {e.where}</span>
                </div>
              </div>
              <div className="s-edu__bottom">
                <p className="s-body">{e.body}</p>
                {e.courses.length > 0 && (
                  <>
                    <hr className="s-card__divider" style={{ margin: '4px 0' }} />
                    <p className="s-label-caps">Key courses</p>
                    <ul className="s-chips">
                      {e.courses.map((c) => <li key={c} className="s-chip">{c}</li>)}
                    </ul>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
