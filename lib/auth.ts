import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

import db from "./db"
import { compare } from "bcryptjs"
import { loginSchema } from "@/schemas/loginSchema"
import { PrismaAdapter } from '@auth/prisma-adapter'

export const { auth, signIn, signOut, handlers } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const { success, data } = loginSchema.safeParse(credentials)

        if (!success) {
          return null
        }

        const { email, password } = data

        const user = await db.user.findUnique({ where: { email }})

        if (!user || !user.password) {
          return null
        }

        const isValidPassword = await compare(password, user.password)

        if(!isValidPassword) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }
    })
  ],
  callbacks: {
    session ({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
      }

      return session
    }
  },
  pages: { error: '/login' }
})
