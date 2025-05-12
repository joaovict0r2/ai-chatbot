'use server'

import db from "@/lib/db"
import { registerSchema } from "@/schemas/registerSchema"
import { hash } from "bcryptjs"

export async function registerAction(formData: FormData) {
  "use server"

  const { success, data } = registerSchema.safeParse(Object.fromEntries(formData))

  if (!success) return

  const { email, name, password } = data
  const hashedPassword = await hash(password, 12)

  // Adicionar validacao com o zod, min passoword etc, igual ao login

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  })
}
