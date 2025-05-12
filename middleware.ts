import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  const isLogged = !!request.auth
  const { pathname } = request.nextUrl
  const isPrivatePath = pathname.startsWith('/chat') || pathname === '/'

  if (isLogged && !isPrivatePath) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isLogged && isPrivatePath) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
})

// Se eu for manter rotas de API, coloca-las aqui, para serem privadas.
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/chat/:path'
  ]
}
