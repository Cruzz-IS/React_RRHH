import { z } from "zod";

export const loginSchema = z.object({
  Email: z
    .string()
    .min(1, "El email es requerido")
    .email("El formato del email no es válido"),

  Password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),

  RememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
