import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { prisma } from './db.js'
import { userRoutes } from './routes/user.routes.js'
import { operatorRoutes } from './routes/operator.routes.js'
import { adminRoutes } from './routes/admin.routes.js'

const fastify = Fastify({ logger: true })

await fastify.register(cors, {
  origin: true,
  credentials: true
})

// Register user activity router
await fastify.register(userRoutes, { prefix: '/api/users' })

// Register field operator entity router
await fastify.register(operatorRoutes, { prefix: '/api/operator' })

// Register admin governance & moderation entity router
await fastify.register(adminRoutes, { prefix: '/api/admin' })

// Global error handler so no route error crashes the server
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error({ err: error, url: request?.raw?.url }, 'Request error')
  const statusCode = error.statusCode && error.statusCode >= 400 && error.statusCode < 600 ? error.statusCode : 500
  reply.code(statusCode).send({
    error: error.name || 'Internal Server Error',
    message: error.message || 'An error occurred while processing the request',
    statusCode
  })
})

// Process-level guards against unexpected rejections
process.on('unhandledRejection', (reason) => {
  fastify.log.error({ reason }, 'Unhandled Promise Rejection caught')
})

process.on('uncaughtException', (error) => {
  fastify.log.error({ error }, 'Uncaught Exception caught')
})

fastify.get('/', async () => ({
  status: 'ok',
  message: 'Backend API is running',
  timestamp: new Date().toISOString(),
  endpoints: {
    health: '/health',
    healthReady: '/health/ready',
    users: '/api/users',
    operator: '/api/operator',
    admin: '/api/admin'
  }
}))

fastify.get('/health', async () => ({ status: 'ok' }))

fastify.get('/health/ready', async (_request, reply) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { status: 'ok', database: 'connected' }
  } catch (error) {
    fastify.log.warn({ err: error.message }, 'Database health check failed')
    return reply.code(200).send({ 
      status: 'degraded', 
      database: 'reconnecting', 
      message: error.message 
    })
  }
})

fastify.addHook('onClose', async () => {
  try {
    await prisma.$disconnect()
  } catch {
    // Ignore disconnect error on close
  }
})

const start = async () => {
  const port = Number(process.env.PORT ?? 3000)
  const host = process.env.HOST ?? '0.0.0.0'

  try {
    await fastify.listen({ port, host })
    fastify.log.info(`Backend is running at http://localhost:${port}`)
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      fastify.log.warn(`Port ${port} is already in use by another instance. Process exiting cleanly.`)
      return
    }
    fastify.log.error({ err: error }, 'Failed to start backend server')
    process.exitCode = 1
    return
  }

  // Connect to PostgreSQL asynchronously without blocking HTTP requests
  try {
    await prisma.$connect()
    await prisma.$queryRaw`SELECT 1`
    fastify.log.info('Connected to PostgreSQL')
  } catch (error) {
    fastify.log.warn({ err: error.message }, 'PostgreSQL connection delayed or unreachable. In-memory data store active.')
  }
}

start()

