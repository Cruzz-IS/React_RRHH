import apiClient from '../axios';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  RefreshTokenRequest,
  ChangePasswordData,
} from '../../Types/auth.interface';
 
const AuthApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>('/auth/login', credentials),
 
  register: (data: RegisterData) =>
    apiClient.post<AuthResponse>('/auth/register', data),
 
  refreshToken: (data: RefreshTokenRequest) =>
    apiClient.post<AuthResponse>('/auth/refresh-token', data),
 
  logout: (refreshToken: string) =>
    apiClient.post('/auth/logout', { refreshToken }),
 
  me: () => apiClient.get<AuthResponse['user']>('/auth/me'),
 
  changePassword: (data: ChangePasswordData) =>
    apiClient.post('/auth/change-password', data),
 
  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),
 
  resetPassword: (data: {
    email: string;
    token: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => apiClient.post('/auth/reset-password', data),
};
 
export default AuthApi;