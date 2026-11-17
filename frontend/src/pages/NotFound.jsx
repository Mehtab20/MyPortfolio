import { Link } from 'react-router-dom';
import SiteLayout from '../components/site/SiteLayout';
import { usePageMeta } from '../components/site/hooks';
import { Arrow } from '../components/site/Icons';

export default function NotFound() {
  usePageMeta({ title: 'Page not found — Mehtab Akbar' });
  return (
    <SiteLayout>
      <section className="s-container s-cs-hero" style={{ minHeight: '70vh' }}>
        <p className="s-label" style={{ marginBottom: 20 }}>Error 404</p>
        <h1 className="s-cs-title">
          This page <span className="s-serif">doesn’t exist.</span>
        </h1>
        <p className="s-lead" style={{ marginTop: 24, maxWidth: '40ch' }}>
          The link may be old, or the page may have moved. The work is still where it was.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 36 }}>
          <Link to="/" className="s-btn">Back to home <Arrow /></Link>
          <Link to="/#work" className="s-btn s-btn--ghost">Selected work</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
