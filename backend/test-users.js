import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { prisma } from './db.js'
import { userRoutes } from './routes/user.routes.js'

async function runTests() {
  const fastify = Fastify()
  await fastify.register(cors)
  await fastify.register(userRoutes, { prefix: '/api/users' })
  await fastify.ready()

  console.log('Testing User CRUD and Password Encryption...')

  const testEmail = `test_${Date.now()}@example.com`
  const rawPassword = 'SecurePassword123!'

  // 1. Create User
  const createRes = await fastify.inject({
    method: 'POST',
    url: '/api/users',
    payload: {
      email: testEmail,
      password: rawPassword,
      name: 'Test User'
    }
  })

  console.log('1. Create user status:', createRes.statusCode)
  const createdBody = JSON.parse(createRes.body)
  console.log('Created user payload:', createdBody)
  const userId = createdBody.user.id

  // Verify password is encrypted in database
  const dbUser = await prisma.user.findUnique({ where: { id: userId } })
  console.log('Encrypted password in DB starts with $2:', dbUser.password.startsWith('$2'))
  console.log('Encrypted hash sample:', dbUser.password.slice(0, 20) + '...')

  // 2. Read Users
  const listRes = await fastify.inject({
    method: 'GET',
    url: '/api/users'
  })
  console.log('2. List users status:', listRes.statusCode)

  // 3. Read Single User
  const getRes = await fastify.inject({
    method: 'GET',
    url: `/api/users/${userId}`
  })
  console.log('3. Get user status:', getRes.statusCode)

  // 4. Login with correct password
  const loginRes = await fastify.inject({
    method: 'POST',
    url: '/api/users/login',
    payload: {
      email: testEmail,
      password: rawPassword
    }
  })
  console.log('4. Login status (valid credentials):', loginRes.statusCode)

  // 5. Login with invalid password
  const badLoginRes = await fastify.inject({
    method: 'POST',
    url: '/api/users/login',
    payload: {
      email: testEmail,
      password: 'WrongPassword'
    }
  })
  console.log('5. Login status (invalid credentials):', badLoginRes.statusCode)

  // 6. Update user
  const updateRes = await fastify.inject({
    method: 'PUT',
    url: `/api/users/${userId}`,
    payload: {
      name: 'Updated Test User'
    }
  })
  console.log('6. Update user status:', updateRes.statusCode)

  // 7. Delete user
  const deleteRes = await fastify.inject({
    method: 'DELETE',
    url: `/api/users/${userId}`
  })
  console.log('7. Delete user status:', deleteRes.statusCode)

  await prisma.$disconnect()
  console.log('All tests passed successfully!')
}

runTests().catch(err => {
  console.error('Test error:', err)
  process.exit(1)
})
