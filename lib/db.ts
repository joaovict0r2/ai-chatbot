import { PrismaClient } from "@/lib/generated/prisma"

declare const globalThis: {
  prismaglobal: PrismaClient
} & typeof global

export const db = globalThis.prismaglobal ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaglobal = db
}
