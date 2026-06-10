import { createContext } from "react";
import type { LoginCredentials, UserInfo } from "../Types/auth.interface";

export interface AuthContextValue {
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
AuthContext.displayName = "AuthContext";