export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  emailConfirmed: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiration: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password?: string; // Opcional si usas distintos métodos de entrada
}

export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}