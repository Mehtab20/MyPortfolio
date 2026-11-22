/**
 * Centred section header: eyebrow, title with one gradient word, bar, subtitle.
 * `title` is an array of parts; strings render plain, { g: 'word' } renders gradient.
 */
export default function SectionHead({ id, eyebrow, title, subtitle }) {
  return (
    <header className="s-head" data-reveal>
      <p className="s-eyebrow">{eyebrow}</p>
      <h2 id={id} className="s-title">
        {title.map((part, i) =>
          typeof part === 'string' ? (
            <span key={i}>{part}</span>
          ) : (
            <span key={i} className="s-gradient-text">{part.g}</span>
          ),
        )}
      </h2>
      <span className="s-bar" aria-hidden="true" />
      {subtitle && <p className="s-subtitle">{subtitle}</p>}
    </header>
  );
}
