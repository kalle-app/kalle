import { PrismaClient } from "@prisma/client"
import { enhancePrisma } from "blitz"
export * from "@prisma/client"

const EnhancedPrisma = enhancePrisma(PrismaClient)
export default new EnhancedPrisma()
