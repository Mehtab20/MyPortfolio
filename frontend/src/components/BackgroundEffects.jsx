import { useState, useEffect, useMemo } from 'react';

/**
 * BackgroundEffects — Premium interactive dark technical background.
 *
 * Layers (z-index order):
 *   1. Theme-aware background gradient (CSS)
 *   2. Subtle technical graph-paper grid, muted dark teal (CSS)
 *   3. Floating ambient particles with slow random drift (CSS)
 *   4. Cursor-following glow spotlight on grid intersections (JS + CSS)
 *
 * Designed to be minimal, premium, and professional — like Vercel/Linear.
 * Works with glassmorphism, respects prefers-reduced-motion,
 * and disables cursor effects on touch devices.
 */

const PARTICLE_COUNT = 18;

const DRIFT_PATHS = [
  'particle-drift-1',
  'particle-drift-2',
  'particle-drift-3',
  'particle-drift-4',
];

/* ── Particle generator (stable across renders) ── */
function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const size = 1 + (i % 3); // 1px, 2px, or 3px
    const opacity = 0.015 + (i % 5) * 0.003; // 1.5% – 2.7%
    return {
      id: i,
      // Spread across full viewport
      left: `${(i * 5.5 + 3.7) % 100}%`,
      top: `${(i * 7.3 + 1.2) % 100}%`,
      size,
      opacity,
      // Vary timing so no two particles move in sync
      duration: 20 + (i % 7) * 4, // 20s – 44s
      delay: -(i * 3.7), // staggered negative delay for instant offset
      drift: DRIFT_PATHS[i % DRIFT_PATHS.length],
      // Tiny horizontal/vertical offset range per particle
      dx: 30 + (i % 5) * 15,
      dy: 20 + (i % 4) * 12,
    };
  });
}

/* ── Floating ambient particles ── */
function FloatingParticles() {
  const particles = useMemo(() => generateParticles(), []);

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            opacity: p.opacity,
            backgroundColor: 'var(--color-primary)',
            animation: `${p.drift} ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}

/* ── Cursor glow spotlight ── */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    if ('ontouchstart' in window) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[3] pointer-events-none transition-opacity duration-500"
      aria-hidden="true"
      style={{
        background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, 
          rgba(20, 184, 166, 0.06) 0%, 
          rgba(6, 182, 212, 0.03) 40%, 
          transparent 70%)`,
        willChange: 'background',
      }}
    />
  );
}

/* ── Main export ── */
export default function BackgroundEffects() {
  return (
    <>
      {/* Layer 1: Theme-aware background gradient */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-colors duration-500"
        style={{
          background: 'linear-gradient(180deg, var(--theme-bg-gradient-start) 0%, var(--theme-bg-gradient-mid) 50%, var(--theme-bg-gradient-end) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Subtle technical grid — muted dark teal, graph-paper style */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(var(--theme-grid-color) 1px, transparent 1px)',
            'linear-gradient(90deg, var(--theme-grid-color) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Floating ambient particles */}
      <FloatingParticles />

      {/* Layer 4: Cursor-following glow */}
      <CursorGlow />
    </>
  );
}
