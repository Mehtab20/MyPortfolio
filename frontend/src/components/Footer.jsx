const currentYear = new Date().getFullYear();

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative transition-colors duration-500"
      style={{
        backgroundColor: 'var(--theme-surface)',
        borderTop: '1px solid var(--theme-border)',
      }}
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-lg border flex items-center justify-center font-bold text-sm"
                style={{
                  backgroundColor: 'var(--theme-surface-light)',
                  borderColor: 'var(--theme-border)',
                }}
              >
                <span className="gradient-text">MA</span>
              </div>
              <span className="text-lg font-semibold" style={{ color: 'var(--theme-text)' }}>
                Mehtab
                <span className="gradient-text ml-1">Akbar</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              Guiding the future, one line at a time. Passionate about Cloud, DevOps, automation, and building high-performance software systems.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: 'var(--theme-text-muted)' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Career', href: '#career' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm transition-colors duration-300 hover:underline"
                    style={{ color: 'var(--theme-text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Expertise / Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: 'var(--theme-text-muted)' }}>
              Expertise
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
              <li>Web Development</li>
              <li>Cloud Deployment</li>
              <li>DevOps Automation</li>
              <li>Mobile Development</li>
              <li>Database Architecture</li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: 'var(--theme-text-muted)' }}>
              Newsletter
            </h4>
            <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
              Stay updated with my latest additions and technical releases.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="px-3.5 py-2 rounded-lg border text-sm w-full focus:outline-none transition-all duration-300"
                style={{
                  backgroundColor: 'var(--theme-input-bg)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text)',
                }}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg btn-primary text-xs font-bold whitespace-nowrap cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: '1px solid var(--theme-border)',
            color: 'var(--theme-text-muted)',
          }}
        >
          <p>&copy; {currentYear} Mehtab Akbar. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with{' '}
            <span style={{ color: 'var(--color-primary)' }}>&hearts;</span> in Rawalpindi, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
