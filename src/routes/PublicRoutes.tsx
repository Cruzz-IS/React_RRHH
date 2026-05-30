import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
 
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
 
  if (isAuthenticated) {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard';
    return <Navigate to={from} replace />;
  }
 
  return <Outlet />;
};