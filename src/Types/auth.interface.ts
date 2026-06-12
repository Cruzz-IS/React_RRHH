export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  emailConfirmed: boolean;
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
 
export interface AuthResponse {
  Success: boolean;
  Message?: string;
  AccessToken?: string;
  RefreshToken?: string;
  TokenExpiration?: string;
  Empleado?: EmpleadoInfo;
}


export interface EmpleadoInfo {
  Id: number;
  Email: string;
  Name: string;       
  Role: string;
  EmailConfirmed: boolean;
}


export interface LoginCredentials {
  Email: string;       
  Password: string;
  RememberMe?: boolean;
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

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  role: string;
  emailConfirmed: boolean;
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