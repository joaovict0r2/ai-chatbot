'use server'

import { signIn } from "@/lib/auth"
import { loginSchema } from "@/schemas/loginSchema"
import { AuthError, CredentialsSignin } from "next-auth"

export async function logInAction(formData: FormData) {
  const { success, data } = loginSchema.safeParse(Object.fromEntries(formData))

  if (!success) {
    return
  }

  const { email, password } = data

  try{
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/'
    })
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return { error: 'Invalid credentials' }
    }

    if (error instanceof AuthError) {
      return { error: 'Something went wrong. Try again.' }
    }

    throw error
  }
}
