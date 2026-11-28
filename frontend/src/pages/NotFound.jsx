import { Link } from 'react-router-dom';
import SiteLayout from '../components/site/SiteLayout';
import { usePageMeta } from '../components/site/hooks';

export default function NotFound() {
  usePageMeta({ title: 'Page not found — Mehtab Akbar' });
  return (
    <SiteLayout>
      <section className="s-container s-404">
        <p className="s-label"><b>404</b> — Page not found</p>
        <h1 className="s-display">This page isn’t <em>here.</em></h1>
        <p className="s-lede" style={{ marginTop: 20 }}>The link may be old, or the page may have moved.</p>
        <div className="s-hero__ctas">
          <Link to="/" className="s-btn">Back to home <span className="s-btn__arrow" aria-hidden="true">→</span></Link>
          <Link to="/#work" className="s-btn s-btn--outline">Selected work</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
