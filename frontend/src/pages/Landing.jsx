import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
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

/* ── Pricing Section ── */
function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for getting started',
      features: ['3 AI projects', '50 messages/month', 'Basic support', 'Community access'],
      cta: 'Get Started',
      href: '/signup',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/mo',
      description: 'For professionals and teams',
      features: ['Unlimited projects', '1,000 messages/month', 'Priority support', 'API access', 'Advanced analytics'],
      cta: 'Start Free Trial',
      href: '/signup',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/mo',
      description: 'For large organizations',
      features: ['Everything in Pro', 'Unlimited messages', '24/7 support', 'Custom integrations', 'SSO', 'Dedicated manager'],
      cta: 'Contact Sales',
      href: '#contact',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 sm:py-32" aria-label="Pricing section">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>Simple </span>
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card-surface rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 ${
                plan.popular ? 'golden-border relative' : 'golden-border-hover'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider btn-primary">
                  Most Popular
                </div>
              )}
              <div className={plan.popular ? 'mt-4' : ''}>
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--theme-text)' }}>{plan.name}</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--theme-text-secondary)' }}>{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>{plan.price}</span>
                  {plan.period && <span className="text-sm ml-1" style={{ color: 'var(--theme-text-muted)' }}>{plan.period}</span>}
                </div>
                <Link
                  to={plan.href}
                  className={`block w-full text-center px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    plan.popular ? 'btn-primary' : 'btn-outline'
                  } mb-6`}
                >
                  {plan.cta}
                </Link>
                <ul className="space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
                      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-primary)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials Section ── */
function Testimonials() {
  const testimonials = [
    {
      quote: "This platform revolutionized how I build and deploy AI applications. The starter kit gave me everything I needed to launch in days, not months.",
      author: 'Alex Chen',
      role: 'Founder, TechFlow',
    },
    {
      quote: "The Supabase integration and auth setup alone saved us weeks of development time. The code is clean, well-documented, and production-ready.",
      author: 'Sarah Johnson',
      role: 'CTO, DataSync Inc.',
    },
    {
      quote: "I've used many starter kits, but this one stands out. The attention to detail in the UI and the architecture decisions show real engineering maturity.",
      author: 'Marcus Williams',
      role: 'Lead Developer, CloudStack',
    },
  ];

  return (
    <section id="testimonials" className="relative py-24 sm:py-32" aria-label="Testimonials section">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>What People </span>
            <span className="gradient-text">Say</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            Trusted by developers and teams building the next generation of AI applications.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card-surface rounded-2xl p-6 golden-border-hover transition-all duration-500 hover:-translate-y-1">
              <svg className="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(212,165,34,0.3)' }}>
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.164 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179zm10 0c-1.03-1.094-1.583-2.321-1.583-4.31 0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.164 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179z" />
              </svg>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--theme-text-secondary)' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'rgba(212,165,34,0.15)', color: 'var(--color-primary)' }}>
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--theme-text)' }}>{t.author}</p>
                  <p className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ Section ── */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q: 'What is this AI SaaS starter kit?', a: 'This is a complete, production-ready starter kit for building AI-powered SaaS applications. It includes authentication, subscription management, AI chat capabilities, admin dashboard, analytics, and more — all built with React, Supabase, and Tailwind CSS.' },
    { q: 'Do I need coding experience to use this?', a: 'Yes, this is a developer starter kit. You should have basic knowledge of React, JavaScript, and command-line tools to set up and customize the application.' },
    { q: 'What do I need to set up Supabase?', a: 'You need a Supabase account (free tier available). Create a project, get your URL and anon key, and add them as environment variables. The database schema is provided in the documentation.' },
    { q: 'How do I add AI capabilities?', a: 'The AI Chat page is pre-built with placeholder integration. You can connect it to any AI provider (OpenAI, Anthropic, etc.) by adding their API key and updating the API call in the chat component.' },
    { q: 'Can I customize the design?', a: 'Absolutely! The entire UI is built with Tailwind CSS and custom CSS variables. You can easily customize colors, fonts, spacing, and more by editing the theme in index.css.' },
    { q: 'Is Stripe integration included?', a: 'Stripe checkout placeholders are included in the subscription page. You need to create a Stripe account, set up products and prices, and connect the frontend to create checkout sessions.' },
  ];

  return (
    <section id="faq" className="relative py-24 sm:py-32" aria-label="FAQ section">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>Frequently Asked </span>
            <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div className="reveal space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card-surface rounded-2xl overflow-hidden transition-all duration-300 golden-border-hover"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
              >
                <span className="text-sm sm:text-base font-semibold pr-4" style={{ color: 'var(--theme-text)' }}>
                  {faq.q}
                </span>
                <svg
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ color: 'var(--color-primary)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p
                  className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm leading-relaxed"
                  style={{ color: 'var(--theme-text-secondary)' }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Blog Preview Section ── */
function BlogPreview() {
  const posts = [
    {
      title: 'Getting Started with AI SaaS Development',
      excerpt: 'Learn how to build and deploy your first AI-powered SaaS application using our starter kit and modern web technologies.',
      date: 'July 15, 2026',
      author: 'Mehtab Akbar',
      tags: ['AI', 'SaaS', 'Tutorial'],
    },
    {
      title: 'Building Scalable Applications with Supabase',
      excerpt: 'Discover best practices for using Supabase as your backend — from authentication to real-time subscriptions and Row Level Security.',
      date: 'July 10, 2026',
      author: 'Mehtab Akbar',
      tags: ['Supabase', 'Database', 'Backend'],
    },
    {
      title: 'The Future of AI-Powered Development Tools',
      excerpt: 'Exploring how AI is transforming the software development lifecycle and what it means for developers building the next generation of tools.',
      date: 'July 5, 2026',
      author: 'Mehtab Akbar',
      tags: ['AI', 'Development', 'Trends'],
    },
  ];

  return (
    <section id="blog" className="relative py-24 sm:py-32" aria-label="Blog section">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>Latest </span>
            <span className="gradient-text">Blog Posts</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            Insights, tutorials, and updates from our team.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {posts.map((post, i) => (
            <div key={i} className="group card-surface rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 golden-border-hover">
              <div className="h-2" style={{ background: 'linear-gradient(90deg, #d4a522, #e8b92e)' }} />
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ backgroundColor: 'rgba(212,165,34,0.1)', color: 'var(--color-primary-light)', border: '1px solid rgba(212,165,34,0.2)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold mb-2 transition-colors duration-300 group-hover:text-primary" style={{ color: 'var(--theme-text)' }}>
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--theme-text-secondary)' }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                    {post.date} • {post.author}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
                    Read More →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ── */
function CTABanner() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <div className="card-surface rounded-3xl p-10 sm:p-16 golden-border relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ background: 'radial-gradient(circle at 50% 50%, #d4a522, transparent 70%)' }} />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
              Ready to Build Your{' '}
              <span className="gradient-text">AI SaaS?</span>
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--theme-text-secondary)' }}>
              Get started with a production-ready starter kit that includes authentication, AI chat, subscription management, and more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl btn-primary text-sm"
              >
                Get Started Free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl btn-outline text-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
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
          <Education />
          <Pricing />
          <Testimonials />
          <FAQ />
          <BlogPreview />
          <CTABanner />
          <Contact />
        </main>

        <Footer />
      </div>

      <ScrollToTop />
    </div>
  );
}
