import bcrypt from 'bcryptjs'
import { prisma } from '../db.js'

/**
 * User CRUD & Auth Routes Plugin
 * @param {import('fastify').FastifyInstance} fastify
 */
export async function userRoutes(fastify) {
  // CREATE: Register / Create new user (POST /api/users)
  fastify.post('/', async (request, reply) => {
    const { email, password, name, role } = request.body || {}

    if (!email || !password) {
      return reply.code(400).send({
        error: 'Bad Request',
        message: 'email and password are required fields'
      })
    }

    if (typeof password !== 'string' || password.length < 6) {
      return reply.code(400).send({
        error: 'Bad Request',
        message: 'Password must be at least 6 characters long'
      })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    })

    if (existingUser) {
      return reply.code(409).send({
        error: 'Conflict',
        message: 'A user with this email already exists'
      })
    }

    // Encrypt password using bcrypt (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name: name?.trim() || null,
        role: role || 'user'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return reply.code(201).send({
      message: 'User created successfully',
      user
    })
  })

  // READ: Get all users (GET /api/users)
  fastify.get('/', async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return {
      total: users.length,
      users
    }
  })

  // READ: Get user by ID (GET /api/users/:id)
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      return reply.code(404).send({
        error: 'Not Found',
        message: `User with ID ${id} not found`
      })
    }

    return user
  })

  // UPDATE: Update user by ID (PUT /api/users/:id)
  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params
    const { name, role, password } = request.body || {}

    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return reply.code(404).send({
        error: 'Not Found',
        message: `User with ID ${id} not found`
      })
    }

    const updateData = {}
    if (name !== undefined) updateData.name = name?.trim() || null
    if (role !== undefined) updateData.role = role
    if (password) {
      if (typeof password !== 'string' || password.length < 6) {
        return reply.code(400).send({
          error: 'Bad Request',
          message: 'Password must be at least 6 characters long'
        })
      }
      updateData.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return {
      message: 'User updated successfully',
      user: updatedUser
    }
  })

  // DELETE: Delete user by ID (DELETE /api/users/:id)
  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params

    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return reply.code(404).send({
        error: 'Not Found',
        message: `User with ID ${id} not found`
      })
    }

    await prisma.user.delete({
      where: { id }
    })

    return {
      message: 'User deleted successfully',
      deletedId: id
    }
  })

  // AUTH: Verify credentials (POST /api/users/login)
  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body || {}

    if (!email || !password) {
      return reply.code(400).send({
        error: 'Bad Request',
        message: 'email and password are required'
      })
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() }
    })

    if (!user) {
      return reply.code(401).send({
        error: 'Unauthorized',
        message: 'Invalid email or password'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return reply.code(401).send({
        error: 'Unauthorized',
        message: 'Invalid email or password'
      })
    }

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    }
  })
}
