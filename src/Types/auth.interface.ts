export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  emailConfirmed: boolean;
}


export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}
 
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  position?: string;
  department?: string;
}
 
export interface AuthResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiration?: string;
  user?: UserInfo;
}
 
export interface UserInfo {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  position?: string;
  department?: string;
  emailConfirmed: boolean;
}
 
export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}
 
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
 

 