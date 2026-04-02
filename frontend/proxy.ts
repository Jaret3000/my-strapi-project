import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { STRAPI_BASE_URL } from "./lib/strapi";

const protectedRoutes = ['/dashboard']

function checkIsProtectedRoute(path: string){
    return protectedRoutes.includes(path)
}

export async function proxy(request: NextRequest){
    const currentPath = request.nextUrl.pathname

    const isProtectedRoute = checkIsProtectedRoute(currentPath)

    if(!isProtectedRoute) return NextResponse.next()

    //la ruta, es una ruta protegida, por lo que debemos verificar si el usuario esta autenticado

    try{
    //1.- validar que el usuario tiene el token jwt 
    //2.- verificar si el usuario existe en la BD
    //3.- verificar si el usuario esta activo

    const cookieStore = await cookies()
    const jwt = cookieStore.get('jwt')?.value

    if(!jwt){
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    const response = await fetch(`${STRAPI_BASE_URL}/api/users/me`, {
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        }
    })

    const userResponse = await response.json()
    console.log(userResponse)

    if(!userResponse){
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    //se le da paso a la solicitud del usuario
    return NextResponse.next()

    } catch (error){
        console.error('Error en la verificacion de autenticacion:', error)
        return NextResponse.redirect(new URL('/signin', request.url))
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/dashboard",
        "/dashboard/:path*",
    ]
} 