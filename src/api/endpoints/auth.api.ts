import apiClient from "../axios";
import type {
  AuthResponse,
  LoginCredentials,
  ChangePasswordData,
  RefreshTokenRequest,
  UserInfo,
} from "../../Types/auth.interface";

const AuthApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>("/auth/login", credentials),

  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber?: string;
    position?: string;
    department?: string;
  }) => apiClient.post<AuthResponse>("/auth/register", data),

  refreshToken: (data: RefreshTokenRequest) =>
    apiClient.post<AuthResponse>("/auth/refresh-token", data),

  logout: (refreshToken: string) =>
    apiClient.post<void>("/auth/logout", { refreshToken }),

  me: () => apiClient.get<UserInfo>("/auth/me"),

  changePassword: (data: ChangePasswordData) =>
    apiClient.post<void>("/auth/change-password", data),

  forgotPassword: (email: string) =>
    apiClient.post<void>("/auth/forgot-password", { email }),

  resetPassword: (data: {
    email: string;
    token: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => apiClient.post<void>("/auth/reset-password", data),
};

export default AuthApi;
