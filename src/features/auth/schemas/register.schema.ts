import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'El nombre es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(100, 'El nombre no puede exceder 100 caracteres')
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras'),
 
    lastName: z
      .string()
      .min(1, 'El apellido es requerido')
      .min(2, 'El apellido debe tener al menos 2 caracteres')
      .max(100, 'El apellido no puede exceder 100 caracteres')
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras'),
 
    email: z
      .string()
      .min(1, 'El email es requerido')
      .email('El formato del email no es válido'),
 
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[a-z]/, 'Debe contener al menos una minúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número')
      .regex(/[@$!%*?&#]/, 'Debe contener al menos un carácter especial (@$!%*?&#)'),
 
    confirmPassword: z.string().min(1, 'Debe confirmar su contraseña'),
 
    phoneNumber: z
      .string()
      .regex(/^\+?[\d\s\-()]+$/, 'Formato de teléfono inválido')
      .optional()
      .or(z.literal('')),
 
    department: z.string().optional(),
    position: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });
 
export type RegisterFormValues = z.infer<typeof registerSchema>;