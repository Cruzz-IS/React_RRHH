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

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
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
 
export interface AuthResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiration?: string;
  user?: UserInfo;
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
 
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}
 
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
 
export interface ApiError {
  success: false;
  message: string;
  errorCode?: string;
  timestamp?: string;
  details?: string;
}
 
export interface Empleado {
  id: number;
  pnombre: string;
  snombre?: string;
  papellido: string;
  sapellido?: string;
  email: string;
  telefono?: string;
  direccion?: string;
  numeroIdentidad?: string;
  genero?: 'M' | 'F' | 'O';
  fechaNacimiento?: string;
  estadoCivil?: string;
  tipoContrato?: string;
  incrementoSueldo: number;
  isActive: boolean;
  role: string;
  createdAt: string;
  updatedAt?: string;
}
 
export interface CreateEmpleadoDto {
  pnombre: string;
  snombre?: string;
  papellido: string;
  sapellido?: string;
  email: string;
  password: string;
  telefono?: string;
  direccion?: string;
  numeroIdentidad?: string;
  genero?: 'M' | 'F' | 'O';
  fechaNacimiento?: string;
  estadoCivil?: string;
  tipoContrato?: string;
}
 
export interface UpdateEmpleadoDto {
  pnombre?: string;
  snombre?: string;
  papellido?: string;
  sapellido?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  genero?: 'M' | 'F' | 'O';
  fechaNacimiento?: string;
  estadoCivil?: string;
  tipoContrato?: string;
  isActive?: boolean;
}
 

 