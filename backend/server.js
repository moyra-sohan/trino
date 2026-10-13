import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { prisma } from './db.js'
import { userRoutes } from './routes/user.routes.js'

const fastify = Fastify({ logger: true })

await fastify.register(cors, {
  origin: true,
  credentials: true
})

// Register user activity router
await fastify.register(userRoutes, { prefix: '/api/users' })

fastify.get('/', async () => ({
  status: 'ok',
  message: 'Backend API is running',
  timestamp: new Date().toISOString(),
  endpoints: {
    health: '/health',
    healthReady: '/health/ready',
    users: '/api/users'
  }
}))

fastify.get('/health', async () => ({ status: 'ok' }))

fastify.get('/health/ready', async (_request, reply) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { status: 'ok', database: 'connected' }
  } catch (error) {
    fastify.log.error({ err: error }, 'Database health check failed')
    return reply.code(503).send({ status: 'error', database: 'disconnected', message: error.message })
  }
})

fastify.addHook('onClose', async () => {
  await prisma.$disconnect()
})

const start = async () => {
  try {
    await prisma.$connect()
    await prisma.$queryRaw`SELECT 1`
    fastify.log.info('Connected to PostgreSQL')
    const port = Number(process.env.PORT ?? 3000)
    const host = process.env.HOST ?? '0.0.0.0'
    await fastify.listen({ port, host })
    fastify.log.info(`Backend is running at http://localhost:${port}`)
  } catch (error) {
    fastify.log.error({ err: error }, 'Failed to start backend')
    await prisma.$disconnect()
    process.exitCode = 1
  }
}

start()

