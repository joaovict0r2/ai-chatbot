import { PrismaClient } from "./generated/prisma"

declare const globalThis: {
  prismaglobal: PrismaClient
} & typeof global

const db = globalThis.prismaglobal ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaglobal = db
}

export default db
