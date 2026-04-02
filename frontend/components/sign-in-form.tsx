"use client"
import Link from "next/link";

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

export function SigninForm(){
    return(
        <div className={styles.container}>
            <form>
                <Card>
                    <CardHeader className={styles.header}>
                        <CardTitle className={styles.title}>Inicia sesion</CardTitle>
                        <CardDescription>
                            Inicia sesion en tu cuenta
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={styles.content}>
                        <div className={styles.fieldGroup}>
                            <Label htmlFor="email">Email</Label>
                            <Input id="identifier" name="identifier" type="text" 
                            placeholder="username or email"/>
                        </div>
                        <div className={styles.fieldGroup}>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" 
                            placeholder="password"/>
                        </div>
                    </CardContent>
                    <CardFooter className={styles.footer}>
                        <Button className={styles.button}>Iniciar Sesion</Button>
                    </CardFooter>
                </Card>
                <div className={styles.prompt}>
                    No tienes una cuenta?
                    <Link className={styles.link} href="signup">Registrate</Link>
                </div>
            </form>
        </div>
    );
}