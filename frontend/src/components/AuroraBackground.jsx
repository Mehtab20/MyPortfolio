import { useEffect, useRef } from 'react';

/**
 * AuroraBackground — Dynamic animated aurora/mesh gradient background.
 * Uses a canvas to render smooth, morphing gradient blobs that respond to theme.
 * Performance-optimized with requestAnimationFrame and canvas compositing.
 */
export default function AuroraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Color palettes — adapt to theme
    const getColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      return isDark
        ? [
            { r: 20, g: 184, b: 166, a: 0.15 },  // Teal
            { r: 6, g: 182, b: 212, a: 0.10 },    // Cyan
            { r: 16, g: 185, b: 129, a: 0.08 },   // Emerald
            { r: 59, g: 130, b: 246, a: 0.06 },   // Blue
          ]
        : [
            { r: 20, g: 184, b: 166, a: 0.08 },
            { r: 6, g: 182, b: 212, a: 0.05 },
            { r: 16, g: 185, b: 129, a: 0.04 },
            { r: 59, g: 130, b: 246, a: 0.03 },
          ];
    };

    const blobs = Array.from({ length: 4 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 300 + Math.random() * 400,
      speedX: 0.1 + Math.random() * 0.2,
      speedY: 0.1 + Math.random() * 0.15,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const colors = getColors();

      blobs.forEach((blob, i) => {
        const color = colors[i % colors.length];
        const x = blob.x + Math.sin(time * blob.speedX + blob.phaseX) * 200;
        const y = blob.y + Math.cos(time * blob.speedY + blob.phaseY) * 150;
        const pulseRadius = blob.radius + Math.sin(time * 0.3 + i) * 80;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseRadius);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.4})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Re-draw on theme change
    const observer = new MutationObserver(() => {
      // Colors will refresh on next frame
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  );
}
