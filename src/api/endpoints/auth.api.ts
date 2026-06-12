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
    apiClient.post<AuthResponse>("/Auth/login", credentials),

  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber?: string;
    position?: string;
    department?: string;
  }) => apiClient.post<AuthResponse>("/Auth/register", data),

  refreshToken: (data: RefreshTokenRequest) =>
    apiClient.post<AuthResponse>("/Auth/refresh-token", data),

  logout: (refreshToken: string) =>
    apiClient.post<void>("/Auth/logout", { refreshToken }),

  me: () => apiClient.get<UserInfo>("/Auth/me"),

  changePassword: (data: ChangePasswordData) =>
    apiClient.post<void>("/Auth/change-password", data),

  forgotPassword: (email: string) =>
    apiClient.post<void>("/Auth/forgot-password", { email }),

  resetPassword: (data: {
    email: string;
    token: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => apiClient.post<void>("/Auth/reset-password", data),
};

export default AuthApi;
