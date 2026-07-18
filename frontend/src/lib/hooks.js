import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useScrollReveal — IntersectionObserver-based scroll reveal animation.
 * Elements with .reveal class animate in when they enter the viewport.
 */
export function useScrollReveal(threshold = 0.08, rootMargin = '0px 0px -40px 0px') {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add('revealed');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold, rootMargin]);
}

/**
 * useTypewriter — Creates a typing animation effect.
 * @param {string} text - The text to type out
 * @param {number} speed - Typing speed in ms per character
 * @param {number} delay - Delay before starting in ms
 * @returns {string} The currently typed text
 */
export function useTypewriter(text, speed = 50, delay = 500) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (indexRef.current >= text.length) return;

    timeoutRef.current = setTimeout(() => {
      setDisplayed(text.slice(0, indexRef.current + 1));
      indexRef.current++;
    }, speed);

    return () => clearTimeout(timeoutRef.current);
  }, [started, text, speed]);

  return displayed;
}

/**
 * useTilt — 3D tilt effect on hover for cards/images.
 * @param {number} maxTilt - Maximum tilt angle in degrees
 * @returns {Object} { ref, style }
 */
export function useTilt(maxTilt = 10) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
    });
  }, []);

  return { ref, style, handleMouseMove, handleMouseLeave };
}

/**
 * useCountUp — Animates a number from 0 to target.
 * @param {number} end - Target number
 * @param {number} duration - Duration in ms
 * @param {boolean} start - Whether to start counting
 * @returns {number} Current animated value
 */
export function useCountUp(end, duration = 2000, start = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, start]);

  return count;
}

/**
 * useParallax — Creates a parallax effect based on scroll position.
 * @param {number} speed - Parallax speed factor (1 = same as scroll, 0.5 = half)
 * @returns {Object} { ref, style }
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = (elementCenter - viewportCenter) * speed;
      setOffset(distance);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, style: { transform: `translateY(${offset * 0.1}px)` } };
}

/**
 * useInView — Returns true when element enters viewport.
 * @param {number} threshold - Intersection threshold
 * @returns {Array} [ref, isInView]
 */
export function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
