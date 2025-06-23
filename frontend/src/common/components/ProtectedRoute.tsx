import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
