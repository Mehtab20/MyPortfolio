import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/auth/AuthGuard';
import AdminGuard from './components/auth/AdminGuard';
import DashboardLayout from './components/layout/DashboardLayout';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import AiChat from './pages/dashboard/AiChat';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';
import Subscription from './pages/dashboard/Subscription';
import AdminDashboard from './pages/admin/AdminDashboard';
import Analytics from './pages/admin/Analytics';

function Layout({ children }) {
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingWrapper />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <AuthGuard>
                    <DashboardLayout>
                      <Dashboard />
                    </DashboardLayout>
                  </AuthGuard>
                }
              />
              <Route
                path="/dashboard/chat"
                element={
                  <AuthGuard>
                    <DashboardLayout>
                      <AiChat />
                    </DashboardLayout>
                  </AuthGuard>
                }
              />
              <Route
                path="/dashboard/profile"
                element={
                  <AuthGuard>
                    <DashboardLayout>
                      <Profile />
                    </DashboardLayout>
                  </AuthGuard>
                }
              />
              <Route
                path="/dashboard/settings"
                element={
                  <AuthGuard>
                    <DashboardLayout>
                      <Settings />
                    </DashboardLayout>
                  </AuthGuard>
                }
              />
              <Route
                path="/dashboard/subscription"
                element={
                  <AuthGuard>
                    <DashboardLayout>
                      <Subscription />
                    </DashboardLayout>
                  </AuthGuard>
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminGuard>
                    <DashboardLayout>
                      <AdminDashboard />
                    </DashboardLayout>
                  </AdminGuard>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <AdminGuard>
                    <DashboardLayout>
                      <Analytics />
                    </DashboardLayout>
                  </AdminGuard>
                }
              />
            </Routes>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

/* ── Landing wrapper that gets theme from context ── */
import { useTheme } from './context/ThemeContext';

function LandingWrapper() {
  const { theme, toggleTheme } = useTheme();
  return <Landing theme={theme} toggleTheme={toggleTheme} />;
}
