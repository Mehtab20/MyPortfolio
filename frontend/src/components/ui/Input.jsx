export default function Input({
  label,
  type = 'text',
  error,
  className = '',
  id,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-bold uppercase tracking-wider"
          style={{ color: 'var(--theme-text-secondary)' }}
        >
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={inputId}
          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50 resize-none ${className}`}
          style={{
            backgroundColor: 'var(--theme-input-bg)',
            borderColor: error ? '#ef4444' : 'var(--theme-border)',
            color: 'var(--theme-text)',
          }}
          {...props}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50 ${className}`}
          style={{
            backgroundColor: 'var(--theme-input-bg)',
            borderColor: error ? '#ef4444' : 'var(--theme-border)',
            color: 'var(--theme-text)',
          }}
          {...props}
        />
      )}
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
