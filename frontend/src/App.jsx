import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import CaseStudy from './pages/CaseStudy';
import ErrorBoundary from './components/ErrorBoundary';

/*
 * Public site only.
 *
 * The template's auth, dashboard, admin and CMS pages (pages/auth, pages/dashboard,
 * pages/admin, context/AuthContext, supabase.js…) are DORMANT: still in the repo,
 * no longer routed, so Supabase is not loaded on public pages. See docs/LEGACY.md.
 * Their old URLs fall through to the 404 page.
 */
const Resume = lazy(() => import('./pages/Resume'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
