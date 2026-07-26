import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { checkTablesExist } from '../../../api/cms';

const cmsNavItems = [
  { id: 'hero', label: 'Hero', icon: '🏠', desc: 'Name, roles, tagline, stats, CTAs' },
  { id: 'about', label: 'About', icon: '👤', desc: 'Bio, personal info, tagline' },
  { id: 'skills', label: 'Skills', icon: '⚡', desc: 'Skill categories & technologies' },
  { id: 'experience', label: 'Experience', icon: '💼', desc: 'Career journey timeline' },
  { id: 'certifications', label: 'Certifications', icon: '🏅', desc: 'Professional certs & credentials' },
  { id: 'projects', label: 'Projects', icon: '💻', desc: 'Project case studies with CRUD' },
  { id: 'blog', label: 'Blog', icon: '📝', desc: 'Technical articles & posts' },
  { id: 'contact', label: 'Contact', icon: '📧', desc: 'Contact info & social links' },
  { id: 'resume', label: 'Resume', icon: '📄', desc: 'Resume sections & PDF upload' },
  { id: 'seo', label: 'SEO', icon: '🔍', desc: 'SEO metadata & Open Graph' },
  { id: 'settings', label: 'Settings', icon: '⚙️', desc: 'Site-wide configuration' },
];

export default function AdminCMS({ activeSection, onNavigate, children }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--theme-text)' }}>
          Portfolio CMS
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
          Manage every section of your portfolio from here. Changes save to Supabase and update instantly.
        </p>
      </div>

      {/* CMS Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {cmsNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`relative p-3 rounded-xl text-left transition-all duration-300 ${
              activeSection === item.id
                ? 'btn-primary shadow-lg'
                : 'card-surface hover:border-primary/40 golden-border-hover'
            }`}
            title={item.desc}
          >
            <span className="text-lg">{item.icon}</span>
            <p className="text-xs font-medium mt-1" style={{ color: activeSection === item.id ? '#030712' : 'var(--theme-text)' }}>
              {item.label}
            </p>
          </button>
        ))}
      </div>

      {/* Active Section Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function CMSSetup() {
  const [tablesExist, setTablesExist] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const exists = await checkTablesExist();
        setTablesExist(exists);
      } catch {
        setTablesExist(false);
      }
      setChecking(false);
    })();
  }, []);

  if (checking) {
    return (
      <div className="card-surface rounded-2xl p-8 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }} />
        <p className="text-sm mt-3" style={{ color: 'var(--theme-text-muted)' }}>Checking database...</p>
      </div>
    );
  }

  if (tablesExist) {
    return (
      <div className="card-surface rounded-2xl p-8 text-center golden-border">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
          <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--theme-text)' }}>Database Connected</h3>
        <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
          All CMS tables are available. Start managing your content from the sections above.
        </p>
      </div>
    );
  }

  return (
    <div className="card-surface rounded-2xl p-8 golden-border">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
          <svg className="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--theme-text)' }}>Database Setup Required</h3>
        <p className="text-sm mb-6" style={{ color: 'var(--theme-text-secondary)' }}>
          The CMS tables haven't been created yet. Run the SQL below in your Supabase SQL Editor.
        </p>
        <ol className="text-left text-sm space-y-2 mb-6" style={{ color: 'var(--theme-text-secondary)' }}>
          <li>1. Go to your <a href="https://supabase.com/dashboard/project/spfsnxfvyvebwcldhknm/sql/new" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Supabase SQL Editor</a></li>
          <li>2. Copy and paste the SQL from <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ backgroundColor: 'var(--theme-surface-light)' }}>database/cms_schema.sql</code></li>
          <li>3. Click <strong>Run</strong></li>
          <li>4. Refresh this page</li>
        </ol>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 rounded-xl btn-primary text-sm font-semibold"
        >
          Refresh After Setup
        </button>
      </div>
    </div>
  );
}
