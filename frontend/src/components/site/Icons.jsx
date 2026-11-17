const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false' };

export const SunIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
  </svg>
);

export const MenuIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const CloseIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const CopyIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a1 1 0 0 1 1-1h9" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export function Arrow({ dir = 'right' }) {
  const cls = dir === 'down' ? 's-arrow s-arrow--down' : dir === 'ne' ? 's-arrow s-arrow--ne' : dir === 'left' ? 's-arrow' : 's-arrow';
  return (
    <span className={cls} aria-hidden="true">
      {dir === 'left' ? '←' : '→'}
    </span>
  );
}
