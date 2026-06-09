import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const FullPageSpinner = () => (
  <div className="flex h-screen w-full items-center justify-center bg-slate-900">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
  </div>
);

export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
 
  if (isLoading) return <FullPageSpinner />;
 
  if (isAuthenticated) {
    const from = (location.state as { from?: { pathname?: string } } | null)
      ?.from?.pathname ?? '/dashboard';
    return <Navigate to={from} replace />;
  }
 
  return <Outlet />;
};