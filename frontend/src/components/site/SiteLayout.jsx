import '../../styles/site.css';
import { useTheme } from '../../context/ThemeContext';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';

export default function SiteLayout({ children }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="site" id="top">
      <a href="#main" className="s-skip">Skip to content</a>
      <SiteNav theme={theme} toggleTheme={toggleTheme} />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
