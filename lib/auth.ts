import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "./db"
import { compare } from "bcryptjs"
import { loginSchema } from "@/schemas/loginSchema"

export const { auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { success, data } = loginSchema.safeParse(credentials)

        if (!success) {
          return null
        }

        const { email, password } = data

        const user = await db.user.findUnique({ where: { email }})

        if (!user) {
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
  ]
})
