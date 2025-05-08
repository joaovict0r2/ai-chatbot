import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().min(1).email(),
  password: z.string().min(8)
})
