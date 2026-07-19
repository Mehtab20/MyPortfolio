import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/auth/AuthGuard';
import AdminGuard from './components/auth/AdminGuard';
import DashboardLayout from './components/layout/DashboardLayout';
import PageTransition from './components/layout/PageTransition';

// ─── Eager-loaded (critical path) ──
import Landing from './pages/Landing';

// ─── Lazy-loaded (code-split) ──
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const AiChat = lazy(() => import('./pages/dashboard/AiChat'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));
const Settings = lazy(() => import('./pages/dashboard/Settings'));
const Subscription = lazy(() => import('./pages/dashboard/Subscription'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));

function PageSuspense({ children }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--theme-bg)' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }} />
          <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>Loading…</p>
        </div>
      </div>
    }>
      {children}
    </Suspense>
  );
}

function withPageTransition(children) {
  return <PageTransition>{children}</PageTransition>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingWrapper />} />
            <Route path="/login" element={<SuspenseRoute><Login /></SuspenseRoute>} />
            <Route path="/signup" element={<SuspenseRoute><Signup /></SuspenseRoute>} />
            <Route path="/forgot-password" element={<SuspenseRoute><ForgotPassword /></SuspenseRoute>} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<AuthGuard><DashboardLayout><PageSuspense><PageTransition><Dashboard /></PageTransition></PageSuspense></DashboardLayout></AuthGuard>} />
            <Route path="/dashboard/chat" element={<AuthGuard><DashboardLayout><PageSuspense><PageTransition><AiChat /></PageTransition></PageSuspense></DashboardLayout></AuthGuard>} />
            <Route path="/dashboard/profile" element={<AuthGuard><DashboardLayout><PageSuspense><PageTransition><Profile /></PageTransition></PageSuspense></DashboardLayout></AuthGuard>} />
            <Route path="/dashboard/settings" element={<AuthGuard><DashboardLayout><PageSuspense><PageTransition><Settings /></PageTransition></PageSuspense></DashboardLayout></AuthGuard>} />
            <Route path="/dashboard/subscription" element={<AuthGuard><DashboardLayout><PageSuspense><PageTransition><Subscription /></PageTransition></PageSuspense></DashboardLayout></AuthGuard>} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<AdminGuard><DashboardLayout><PageSuspense><PageTransition><AdminDashboard /></PageTransition></PageSuspense></DashboardLayout></AdminGuard>} />
            <Route path="/admin/analytics" element={<AdminGuard><DashboardLayout><PageSuspense><PageTransition><Analytics /></PageTransition></PageSuspense></DashboardLayout></AdminGuard>} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

/* ── Helpers ── */
import { useTheme } from './context/ThemeContext';

function LandingWrapper() {
  const { theme, toggleTheme } = useTheme();
  return <Landing theme={theme} toggleTheme={toggleTheme} />;
}

function SuspenseRoute({ children }) {
  return <PageSuspense><PageTransition>{children}</PageTransition></PageSuspense>;
}
