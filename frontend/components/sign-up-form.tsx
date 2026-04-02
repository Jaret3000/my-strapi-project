"use client"
import Link from "next/link";
import { actions } from "@/actions";

import{
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { FormState } from "@/validations/auth";
import { FormError } from "./form-error";

const styles = {
    container: "w-full max-w-md",
    header: "space-y-1",
    title: "text-3xl font-bold text-purple-500",
    content: "space-y-4",
    fieldGroup: "space-y-2",
    footer: "flex flex-col",
    button: "w-full",
    prompt: "mt-4 text-center text-sm",
    link: "ml-2 text-pink-500",
};

const INITIAL_STATE: FormState = {
    success: false,
    message: undefined,
    strapiErrors: null,
    zodErrors: null,
    data: {
        username: '',
        password: '',
        email: '',
    }
}

export function SignupForm(){
    const [formState, formAction] = useActionState(actions.auth.registerUserAction, INITIAL_STATE)
    console.log(formState)

    return(
        <div className={styles.container}>
            <form action={formAction}>
                <Card>
                    <CardHeader className={styles.header}>
                        <CardTitle className={styles.title}>Registrate</CardTitle>
                        <CardDescription>
                            Ingresa tus datos para crear una nueva cuenta
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={styles.content}>
                        <div className={styles.fieldGroup}>
                            <Label htmlFor="username">Nombre usuario</Label>
                            <Input id="username" name="username" type="text" placeholder="username" 
                            defaultValue={formState.data?.username ?? ''}/>
                            <FormError error={formState.zodErrors?.username} />
                        </div>
                        <div className={styles.fieldGroup}>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="email"
                            defaultValue={formState.data?.email ?? ''}/>
                            <FormError error={formState.zodErrors?.email} />
                        </div>
                        <div className={styles.fieldGroup}>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="password"
                            defaultValue={formState.data?.password ?? ''}/>
                            <FormError error={formState.zodErrors?.password} />
                        </div>
                    </CardContent>
                    <CardFooter className={styles.footer}>
                        <Button type="submit" className={styles.button}>Finalizar Registro</Button>
                        {formState.strapiErrors && <p className="text-pink-500 text-xs italic mt-1 py-2">
                            {formState.strapiErrors.message}</p>}
                    </CardFooter>
                </Card>
                <div className={styles.prompt}>
                    Ya tienes una cuenta?
                    <Link className={styles.link} href="signin">Inicia Sesion</Link>
                </div>
            </form>
        </div>
    );
}