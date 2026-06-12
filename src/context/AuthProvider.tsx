import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import AuthApi from "../api/endpoints/auth.api";
import TokenService from "../services/token.service";
import type {
  AuthResponse,
  LoginCredentials,
  UserInfo,
} from "../Types/auth.interface";
import { AuthContext, type AuthContextValue } from "./AuthContext";

const mapEmpleadoToUserInfo = (
  empleado: NonNullable<AuthResponse["Empleado"]>,
): UserInfo => ({
  id: empleado.Id,
  email: empleado.Email,
  name: empleado.Name,
  role: empleado.Role,
  emailConfirmed: empleado.EmailConfirmed,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(() =>
    TokenService.getUserInfo<UserInfo>(),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const accessToken = TokenService.getAccessToken();
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
            accessToken: accessToken ?? "",
            refreshToken,
          });
          if (data.Success && data.AccessToken && data.RefreshToken) {
            TokenService.setAccessToken(data.AccessToken);
            TokenService.setRefreshToken(data.RefreshToken);
            if (data.Empleado) {
              const userInfo = mapEmpleadoToUserInfo(data.Empleado);
              TokenService.setUserInfo(userInfo);
              setUser(userInfo);
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

    void restoreSession();
  }, []);

  useEffect(() => {
    const handleForceLogout = () => {
      setUser(null);
      TokenService.clearAllTokens();
    };
    window.addEventListener("auth:logout", handleForceLogout);
    return () => window.removeEventListener("auth:logout", handleForceLogout);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { data } = await AuthApi.login(credentials);
    if (!data.Success || !data.AccessToken || !data.RefreshToken) {
      throw new Error(data.Message ?? "Credenciales inválidas");
    }
    TokenService.setAccessToken(data.AccessToken);
    TokenService.setRefreshToken(data.RefreshToken, credentials.RememberMe);
    if (data.Empleado) {
      const userInfo = mapEmpleadoToUserInfo(data.Empleado);
      TokenService.setUserInfo(userInfo);
      setUser(userInfo);
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
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      refreshUser,
    }),
    [user, isLoading, login, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
