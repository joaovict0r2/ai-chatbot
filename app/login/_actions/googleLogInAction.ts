'use server'

import { signIn } from "@/lib/auth";

export async function googleLogInAction() {
  await signIn('google')
}
