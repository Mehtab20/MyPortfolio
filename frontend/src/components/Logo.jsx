import profilePhoto from '../assets/profile-photo.png';

export default function Logo({ size = 9, showText = true, className = '' }) {
  const dimensions = {
    8: 'w-8 h-8',
    9: 'w-9 h-9',
    10: 'w-10 h-10',
    12: 'w-12 h-12',
  };

  const wrapperSize = dimensions[size] || dimensions[9];
  const textVisible = showText ? 'flex' : 'hidden sm:flex';

  return (
    <a
      href="/"
      className={`relative group flex items-center gap-2 ${className}`}
      aria-label="Mehtab Akbar - Home"
    >
      {/* Animated ring around profile photo */}
      <div className={`relative ${wrapperSize} flex-shrink-0`}>
        {/* Outer glow - visible on hover */}
        <div
          className="absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700 scale-75 group-hover:scale-100"
          style={{
            background: 'radial-gradient(circle, rgba(20,184,166,0.3), transparent 70%)',
            filter: 'blur(6px)',
          }}
        />
        {/* Rotating gradient ring */}
        <div
          className="absolute -inset-[2px] rounded-full animate-spin-slow"
          style={{
            background: 'conic-gradient(from 0deg, #14b8a6, #d4a522, #2dd4bf, #14b8a6)',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
          }}
        />
        {/* Photo container */}
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-transparent relative z-10">
          <img
            src={profilePhoto}
            alt="Mehtab Akbar"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Subtle edge blend overlay */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 45%, transparent 30%, var(--theme-bg) 100%)',
            }}
          />
        </div>
      </div>
      {showText && (
        <span className={`text-lg font-semibold ${textVisible}`} style={{ color: 'var(--theme-text)' }}>
          Mehtab
          <span className="gradient-text ml-1">Akbar</span>
        </span>
      )}
    </a>
  );
}
