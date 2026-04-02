import { z } from "zod";

export const SigninFormSchema = z.object({
    identifier: z
    .string()
    .min(3, "Nombre de usuario o email debe tener al menos 3 caracteres"),
    password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña debe tener menos de 100 caracteres"),
});

export const SignupFormSchema = z.object({
    username: z
    .string()
    .min(3, "Nombre de usuario o email debe tener al menos 3 caracteres")
    .max(20, "Nombre de usuario debe tener menos de 20 caracteres"),
    email: z.email("Ingrese un email valido o existente"),
    password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña debe tener menos de 100 caracteres"),
});

export type SigninFormValues = z.infer<typeof SigninFormSchema>
export type SignupFormValues = z.infer<typeof SignupFormSchema>

export type FormState = {
    success?: boolean;
    message?: string;
    data?: {
        identifier?: string;
        username?: string;
        email?: string;
        password?: string;
    };
    strapiErrors?: {
        status: number;
        name: string;
        message: string;
        details?: Record<string, string[]>;
    } | null;
    zodErrors?: {
        identifier?: string[];
        username?: string[];
        email?: string[];
        password?: string[];
    } | null;
};