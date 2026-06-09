import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import AuthApi from '../api/endpoints/auth.api';
import TokenService from '../services/token.service';
import type { LoginCredentials, UserInfo } from '@/Types/auth.interface';

interface AuthContextValue {
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(() =>
    TokenService.getUserInfo<UserInfo>()
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const restoreSession = async () => {
      const accessToken  = TokenService.getAccessToken();
      const refreshToken = TokenService.getRefreshToken();

      if (!refreshToken) {
        TokenService.clearAllTokens();
        setUser(null);
        setIsLoading(false);
        return;
      }

      if (!accessToken || TokenService.isTokenExpired(accessToken)) {
        try {
          const { data } = await AuthApi.refreshToken({
            accessToken:  accessToken ?? '',
            refreshToken,
          });
          if (data.success && data.accessToken && data.refreshToken) {
            TokenService.setAccessToken(data.accessToken);
            TokenService.setRefreshToken(data.refreshToken);
            if (data.user) {
              TokenService.setUserInfo(data.user);
              setUser(data.user);
            }
          } else {
            TokenService.clearAllTokens();
            setUser(null);
          }
        } catch {
          TokenService.clearAllTokens();
          setUser(null);
        }
      } else {
        const cached = TokenService.getUserInfo<UserInfo>();
        if (cached) {
          setUser(cached);
        } else {
          try {
            const { data } = await AuthApi.me();
            if (data) {
              TokenService.setUserInfo(data);
              setUser(data);
            }
          } catch {
            TokenService.clearAllTokens();
            setUser(null);
          }
        }
      }

      setIsLoading(false);
    };

    restoreSession();
  }, []);

  useEffect(() => {
    const handleForceLogout = () => {
      setUser(null);
      TokenService.clearAllTokens();
    };
    window.addEventListener('auth:logout', handleForceLogout);
    return () => window.removeEventListener('auth:logout', handleForceLogout);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { data } = await AuthApi.login(credentials);
    if (!data.success || !data.accessToken || !data.refreshToken) {
      throw new Error(data.message ?? 'Credenciales inválidas');
    }
    TokenService.setAccessToken(data.accessToken);
    TokenService.setRefreshToken(data.refreshToken, credentials.rememberMe);
    if (data.user) {
      TokenService.setUserInfo(data.user);
      setUser(data.user);
    }
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = TokenService.getRefreshToken();
    try {
      if (refreshToken) await AuthApi.logout(refreshToken);
    } finally {
      TokenService.clearAllTokens();
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await AuthApi.me();
      if (data) {
        TokenService.setUserInfo(data);
        setUser(data);
      }
    } catch {
      // exceptions
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: !!user, isLoading, login, logout, refreshUser }),
    [user, isLoading, login, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};