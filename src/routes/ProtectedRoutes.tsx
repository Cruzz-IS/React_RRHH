import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
 
const FullPageSpinner = () => (
  <div className="flex h-screen w-full items-center justify-center bg-slate-900">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
  </div>
);
 
interface ProtectedRouteProps {
  allowedRoles?: string[];
}
 
export const ProtectedRoutes = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
 
  if (isLoading) return <FullPageSpinner />;
 
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
 
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
 
  return <Outlet />;
};