import { PrismaClient } from "@prisma/client"
export * from "@prisma/client"

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  const gT = globalThis as any
  // Ensure the prisma instance is re-used during hot-reloading
  // Otherwise, a new client will be created on every reload
  gT["prisma"] = gT["prisma"] || new PrismaClient()
  prisma = gT["prisma"]
}

export default prisma
