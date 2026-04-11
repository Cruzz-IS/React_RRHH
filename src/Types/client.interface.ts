export interface Cliente {
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