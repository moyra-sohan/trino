import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL must be set in environment variables')
}

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString })
})
