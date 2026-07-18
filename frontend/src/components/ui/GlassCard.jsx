export default function GlassCard({ children, className = '', hover = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`card-surface rounded-2xl p-5 sm:p-6 transition-all duration-500 ${
        hover ? 'hover:-translate-y-1 golden-border-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
