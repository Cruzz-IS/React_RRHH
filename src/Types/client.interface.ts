export interface Empleado {
  Id: number;
  Name: string;
  Email: string;
  Username?: string;
  // PhoneNumber?: string;
  PasswordHash: string;
  // isactive: boolean;
  // EmailConfirmed: boolean;
  // FailedLoginAttempts: number;
  // LockoutEnd: Date | null;
  // LastLoginDate: Date | null;
  // PasswordChangeDate: Date | null;
  // ResetPasswordToken: string | null;
  // ResetPasswordTokenExpiry: Date | null;
  // CreatedAt: Date;
  // UpdatedAt: Date;
  // CreatedBy: string;
  // UpdatedBy: string;
  // Roles: string[];
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