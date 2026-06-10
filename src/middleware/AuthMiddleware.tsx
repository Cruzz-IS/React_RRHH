import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAuth } from '../hooks/useAuth';
import TokenService from '../services/token.service';
import AuthApi from '../api/endpoints/auth.api';

// Verifica  el estado del token y lo refresca cada 7 minutos de forma silenciosa antes de que expire.
interface AuthMiddlewareProps {
  children: ReactNode;
}
 
export const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const { logout } = useAuth();
  const navigate   = useNavigate();
 
  useEffect(() => {
    const checkToken = async () => {
      const accessToken  = TokenService.getAccessToken();
      const refreshToken = TokenService.getRefreshToken();
 
      if (!refreshToken) return;
 
      if (!accessToken || TokenService.isTokenExpired(accessToken)) {
        try {
          const { data } = await AuthApi.refreshToken({
            accessToken:  accessToken ?? '',
            refreshToken,
          });
          if (data.success && data.accessToken && data.refreshToken) {
            TokenService.setAccessToken(data.accessToken);
            TokenService.setRefreshToken(data.refreshToken);
            if (data.user) TokenService.setUserInfo(data.user);
          } else {
            await logout();
            navigate('/login', { replace: true });
          }
        } catch (err: unknown) {
          if (isAxiosError(err)) {
            await logout();
            navigate('/login', { replace: true });
          }
        }
      }
    };
 
    const interval = setInterval(() => void checkToken(), 60_000);
    return () => clearInterval(interval);
  }, [logout, navigate]);
 
  return <>{children}</>;
};
 
// Renderiza el componente solo si el usuario tiene el rol requerido.
interface RoleMiddlewareProps {
  allowedRoles: string[];
  children: ReactNode;
  fallback?: ReactNode;
}
 
export const RoleMiddleware = ({
  allowedRoles,
  children,
  fallback = null,
}: RoleMiddlewareProps) => {
  const { user } = useAuth();
 
  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }
 
  return <>{children}</>;
};