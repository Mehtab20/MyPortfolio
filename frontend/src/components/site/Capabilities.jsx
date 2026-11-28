import { services, toolkit } from '../../data/site';
import SectionHead from './SectionHead';

export default function Capabilities() {
  return (
    <section id="capabilities" className="s-section" aria-labelledby="cap-title">
      <div className="s-container">
        <SectionHead
          id="cap-title"
          n="03"
          label="Capabilities"
          title={['What I ', { em: 'build.' }]}
          lede="Web, mobile and backend work, designed from the data model up. The toolkit below lists only what the projects actually use."
        />
        <div className="s-caps">
          {services.map((s, i) => (
            <div key={s.title} className="s-cap" data-reveal style={{ '--d': `${0.05 * (i % 2)}s` }}>
              <span className="s-label">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul>{s.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </div>
          ))}
        </div>
        <dl className="s-toolkit" aria-label="Toolkit">
          {toolkit.map((g) => (
            <div key={g.name} data-reveal>
              <dt>{g.name}<small>{g.note}</small></dt>
              <dd>{g.items.map((it) => <span key={it}>{it}</span>)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
