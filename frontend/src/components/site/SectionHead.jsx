/**
 * Section header: numbered mono label, serif title, optional lede.
 * `title` is an array of parts; strings render plain, { em: 'word' } renders gold italic.
 */
export default function SectionHead({ id, n, label, title, lede }) {
  return (
    <header className="s-sec-head" data-reveal>
      <div>
        <p className="s-label"><b>{n}</b> — {label}</p>
        <h2 id={id} className="s-display">
          {title.map((part, i) => (typeof part === 'string' ? <span key={i}>{part}</span> : <em key={i}>{part.em}</em>))}
        </h2>
      </div>
      {lede && <p className="s-lede">{lede}</p>}
    </header>
  );
}
