/* Server entry used only at build time to pre-render public pages to HTML. */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import CaseStudy from './pages/CaseStudy';
import Resume from './pages/Resume';

export { pageMeta, prerenderRoutes, llmsTxt, sitemapXml } from './seo';

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </ThemeProvider>
    </StaticRouter>,
  );
}
