"use server"
import { z } from "zod";
import { SignupFormSchema, type FormState } from "@/validations/auth"; 
import { registerUserService } from "@/lib/strapi";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieConfig = {
    maxAge: 60 * 60 * 24 * 7, //1 semana
    path: '/',
    httpOnly: true, //Solo es accesible por el servidor
    domain: process.env.HOST ?? 'localhost',
    secure: process.env.NODE_ENV === 'production',
}

export async function registerUserAction(prevState: FormState, formData: FormData): Promise<FormState>{
    console.log('Hello from Register User Action')

    const fields = {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
        email: formData.get('email') as string,
    }
    const validateFields = SignupFormSchema.safeParse(fields)

    if(!validateFields.success){
        const flattenedErrors = z.flattenError(validateFields.error)

        console.log("Validacion de errores:", flattenedErrors.fieldErrors)

        return {
            success: false,
            message: "Error de validacion",
            strapiErrors: null,
            zodErrors: flattenedErrors.fieldErrors,
            data: fields,
        }
    }

    const response = await registerUserService(validateFields.data)

    if(!response || response.error){
        return{
            success: false,
            message: "Error en el registro",
            strapiErrors: response?.error,
            zodErrors: null,
            data: fields
        }
    }

    const cookieStore = await cookies()
    cookieStore.set('jwt', response.jwt, cookieConfig)
    redirect('/dashboard')
}