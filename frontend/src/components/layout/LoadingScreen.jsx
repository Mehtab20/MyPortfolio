import { useEffect, useState } from 'react';

const PAPER_PATTERNS = [
  // Parchment swirl
  'radial-gradient(circle at 20% 30%, rgba(212,165,34,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(20,184,166,0.03) 0%, transparent 50%), repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212,165,34,0.01) 2px, rgba(212,165,34,0.01) 4px)',
  // Linen texture
  'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px), repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px)',
  // Aged paper spots
  'radial-gradient(circle at 15% 45%, rgba(212,165,34,0.04) 0%, transparent 30%), radial-gradient(circle at 75% 25%, rgba(212,165,34,0.03) 0%, transparent 25%), radial-gradient(circle at 50% 80%, rgba(20,184,166,0.02) 0%, transparent 35%)',
  // Golden speckle
  'radial-gradient(circle at 30% 60%, rgba(212,165,34,0.05) 0%, transparent 20%), radial-gradient(circle at 70% 40%, rgba(212,165,34,0.03) 0%, transparent 15%), radial-gradient(circle at 50% 50%, rgba(20,184,166,0.02) 0%, transparent 40%)',
];

const LOADING_MESSAGES = [
  'Warming up the compilers...',
  'Polishing the pixels...',
  'Brewing digital coffee...',
  'Untangling the wires...',
  'Dusting off the archives...',
  'Summoning the stack...',
  'Aligning the stars...',
  'Loading the matrix...',
  'Calibrating the flux capacitor...',
  'Optimizing the universe...',
];

export default function LoadingScreen({ text: _text = 'Loading...', fullScreen = true }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [patternIndex, setPatternIndex] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000);
    const patternInterval = setInterval(() => {
      setPatternIndex((prev) => (prev + 1) % PAPER_PATTERNS.length);
    }, 6000);

    return () => {
      clearInterval(msgInterval);
      clearInterval(patternInterval);
    };
  }, []);

  const container = (
    <div
      className={fullScreen ? 'min-h-screen flex items-center justify-center' : 'flex items-center justify-center py-12'}
      style={{
        backgroundColor: '#030712',
        backgroundImage: PAPER_PATTERNS[patternIndex],
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(3,7,18,0.6) 100%)',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-16 h-16 pointer-events-none">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full opacity-20">
          <path d="M2 2h20M2 2v20M2 2l20 20" stroke="#d4a522" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute top-8 right-8 w-16 h-16 pointer-events-none">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full opacity-20">
          <path d="M62 2H42M62 2v20M62 2L42 22" stroke="#d4a522" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute bottom-8 left-8 w-16 h-16 pointer-events-none">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full opacity-20">
          <path d="M2 62h20M2 62V42M2 62l20-20" stroke="#d4a522" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full opacity-20">
          <path d="M62 62H42M62 62V42M62 62l-20-20" stroke="#d4a522" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated logo */}
        <div className="relative">
          {/* Outer glow */}
          <div
            className="absolute -inset-6 rounded-full opacity-20 animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(212,165,34,0.3), transparent 70%)',
            }}
          />
          {/* MA Monogram */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(212,165,34,0.15), rgba(20,184,166,0.1))',
              border: '1px solid rgba(212,165,34,0.2)',
            }}
          >
            {/* Animated fill */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(212,165,34,0.08), rgba(20,184,166,0.05))',
                animation: 'shimmer 3s ease-in-out infinite',
              }}
            />
            <span
              className="relative text-2xl font-bold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #d4a522, #14b8a6, #d4a522)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-shift 3s ease infinite',
              }}
            >
              MA
            </span>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-px opacity-30" style={{ background: 'linear-gradient(90deg, transparent, #d4a522)' }} />
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: '#14b8a6', animationDelay: '0.5s' }}
          />
          <div className="w-8 h-px opacity-30" style={{ background: 'linear-gradient(90deg, #d4a522, transparent)' }} />
        </div>

        {/* Animated loading indicator */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: i === 1 ? '#d4a522' : '#14b8a6',
                animation: `loading-bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* Message */}
        <p
          className="text-sm font-medium transition-all duration-500"
          style={{ color: 'rgba(212,165,34,0.6)' }}
        >
          {LOADING_MESSAGES[messageIndex]}
        </p>
      </div>
    </div>
  );

  return container;
}
