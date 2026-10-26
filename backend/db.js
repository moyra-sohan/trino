import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.warn('DATABASE_URL is not set in environment variables. Falling back to local/in-memory resilience.')
}

export const prisma = new PrismaClient(
  connectionString ? { adapter: new PrismaPg({ connectionString }) } : undefined
)
