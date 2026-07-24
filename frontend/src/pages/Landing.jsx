import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import CareerJourney from '../components/CareerJourney';
import Certifications from '../components/Certifications';
import Philosophy from '../components/Philosophy';
import CurrentlyBuilding from '../components/CurrentlyBuilding';
import GitHubHighlights from '../components/GitHubHighlights';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AuroraBackground from '../components/AuroraBackground';
import { useScrollReveal } from '../lib/hooks';

/* ── Scroll-to-Top ── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full btn-primary flex items-center justify-center shadow-lg transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}

/* ── Technical Blog Section ── */
function Blog() {
  const posts = [
    {
      title: 'Building an AI-Powered Medical Diagnostic System with FastAPI and TensorFlow Lite',
      excerpt: 'A deep dive into the architecture, ML pipeline, and deployment strategy behind my final year project — an intelligent medical referral system achieving 92% diagnostic accuracy on mobile devices.',
      date: '2026',
      tags: ['AI/ML', 'FastAPI', 'TensorFlow', 'Healthcare'],
    },
    {
      title: 'Digital Transformation at Gohar Medical Trust: A Full-Stack Case Study',
      excerpt: 'How I designed and deployed a comprehensive hospital management system serving 500+ daily patients — covering the architecture, challenges, and the human side of technology adoption in healthcare.',
      date: '2026',
      tags: ['Full Stack', 'React', 'PostgreSQL', 'Healthcare IT'],
    },
    {
      title: 'From Idea to Open Source: Architecting a Production-Ready AI SaaS Starter Kit',
      excerpt: 'Lessons learned from building a complete AI SaaS foundation with multi-provider support, auth, subscriptions, and analytics — and what I\'d do differently next time.',
      date: '2026',
      tags: ['SaaS', 'Architecture', 'Supabase', 'React'],
    },
  ];

  return (
    <section id="blog" className="relative py-24 sm:py-32" aria-label="Technical Blog section">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>Technical </span>
            <span className="gradient-text">Articles</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            In-depth technical write-ups based on real projects I&apos;ve built.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {posts.map((post, i) => (
            <div key={i} className="group card-surface rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 golden-border-hover">
              <div className="h-2" style={{ background: 'linear-gradient(90deg, #14b8a6, #06b6d4, #2dd4bf)' }} />
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ backgroundColor: 'rgba(20,184,166,0.08)', color: 'var(--color-primary-light)', border: '1px solid rgba(20,184,166,0.18)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold mb-2 transition-colors duration-300" style={{ color: 'var(--theme-text)' }}>
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--theme-text-secondary)' }}>
                  {post.excerpt}
                </p>
                <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
                  Read Article &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Main Landing Page ── */
export default function Landing({ theme, toggleTheme }) {
  useScrollReveal();

  return (
    <div className="relative min-h-screen font-sans">
      {/* Dynamic animated background */}
      <AuroraBackground />

      {/* Theme overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: 'var(--theme-overlay)' }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <CareerJourney />
          <Certifications />
          <Philosophy />
          <CurrentlyBuilding />
          <GitHubHighlights />
          <Blog />
          <Contact />
        </main>

        <Footer />
      </div>

      <ScrollToTop />
    </div>
  );
}
