// API Client for NariSetu backend
const API_BASE_URL = 'http://localhost:3000'

/**
 * Helper to fetch with dual fallback (Direct backend <-> Vite proxy)
 */
async function apiRequest(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  }

  const primaryUrl = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`
  const fallbackUrl = endpoint.startsWith('http') ? endpoint : endpoint

  let response
  try {
    response = await fetch(primaryUrl, { ...options, headers })
  } catch (_err) {
    if (fallbackUrl !== primaryUrl) {
      try {
        response = await fetch(fallbackUrl, { ...options, headers })
      } catch (_fallbackErr) {
        throw new Error(`Cannot reach backend API at ${primaryUrl}. Ensure backend server is running on port 3000.`)
      }
    } else {
      throw new Error(`Cannot reach backend API at ${primaryUrl}. Ensure backend server is running on port 3000.`)
    }
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || data.error || `Request failed with status ${response.status}`)
  }

  return data
}

export const api = {
  // Check backend health & database connection
  async checkHealth() {
    return apiRequest('/health/ready')
  },

  // Register new user with specific role (user, operator, admin)
  async register({ email, password, name, role = 'user' }) {
    return apiRequest('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role })
    })
  },

  // Authenticate user
  async login({ email, password }) {
    return apiRequest('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  },

  // Fetch all users (Admin view - READ all)
  async getUsers() {
    return apiRequest('/api/users')
  },

  // Fetch user by ID (READ single)
  async getUser(id) {
    return apiRequest(`/api/users/${id}`)
  },

  // Update user (UPDATE)
  async updateUser(id, updateData) {
    return apiRequest(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    })
  },

  // Delete user (DELETE)
  async deleteUser(id) {
    return apiRequest(`/api/users/${id}`, {
      method: 'DELETE'
    })
  }
}
