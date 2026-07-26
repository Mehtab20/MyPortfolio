import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthGuard from './AuthGuard';
import LoadingScreen from '../layout/LoadingScreen';

export default function AdminGuard({ children }) {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <AuthGuard>{children}</AuthGuard>;
}
