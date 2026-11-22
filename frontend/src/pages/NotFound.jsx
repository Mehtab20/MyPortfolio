import { Link } from 'react-router-dom';
import SiteLayout from '../components/site/SiteLayout';
import { usePageMeta } from '../components/site/hooks';
import { Icon } from '../components/site/Icons';

export default function NotFound() {
  usePageMeta({ title: 'Page not found — Mehtab Akbar' });
  return (
    <SiteLayout>
      <section className="s-container s-404">
        <div className="s-head" style={{ marginBottom: 0 }}>
          <p className="s-eyebrow">Error 404</p>
          <h1 className="s-title">Page <span className="s-gradient-text">Not Found</span></h1>
          <span className="s-bar" aria-hidden="true" />
          <p className="s-subtitle">The link may be old, or the page may have moved.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 28 }}>
            <Link to="/" className="s-btn"><Icon name="home" /> Back to home</Link>
            <Link to="/#projects" className="s-btn s-btn--outline"><Icon name="folder" /> View Projects</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
