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
  },

  // Operator Entity Endpoints
  async getOperatorMetrics() {
    return apiRequest('/api/operator/metrics')
  },

  async getOperatorRecords() {
    return apiRequest('/api/operator/records')
  },

  async createArtisanRecord(artisanData) {
    return apiRequest('/api/operator/records', {
      method: 'POST',
      body: JSON.stringify(artisanData)
    })
  },

  async updateArtisanRecord(id, updateData) {
    return apiRequest(`/api/operator/records/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    })
  },

  async importBatchRecords(records) {
    return apiRequest('/api/operator/records/batch', {
      method: 'POST',
      body: JSON.stringify({ records })
    })
  },

  // Admin Entity Endpoints
  async getAdminMetrics() {
    return apiRequest('/api/admin/metrics')
  },

  async getAdminVerificationQueue(params = {}) {
    const query = new URLSearchParams(params).toString()
    return apiRequest(`/api/admin/verification-queue${query ? `?${query}` : ''}`)
  },

  async updateVerificationItem(id, updateData) {
    return apiRequest(`/api/admin/verification-queue/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    })
  },

  async getAdminOrganizations() {
    return apiRequest('/api/admin/organizations')
  },

  async createAdminOrganization(orgData) {
    return apiRequest('/api/admin/organizations', {
      method: 'POST',
      body: JSON.stringify(orgData)
    })
  },

  async getAdminCommunities() {
    return apiRequest('/api/admin/communities')
  },

  async createAdminCommunity(commData) {
    return apiRequest('/api/admin/communities', {
      method: 'POST',
      body: JSON.stringify(commData)
    })
  },

  async getAdminOpportunities() {
    return apiRequest('/api/admin/opportunities')
  },

  async createAdminOpportunity(oppData) {
    return apiRequest('/api/admin/opportunities', {
      method: 'POST',
      body: JSON.stringify(oppData)
    })
  },

  async getAdminFlags() {
    return apiRequest('/api/admin/flags')
  },

  async updateAdminFlag(id, flagData) {
    return apiRequest(`/api/admin/flags/${id}`, {
      method: 'PUT',
      body: JSON.stringify(flagData)
    })
  },

  async getAdminAuditLogs() {
    return apiRequest('/api/admin/audit-logs')
  },

  async createAdminAuditLog(logData) {
    return apiRequest('/api/admin/audit-logs', {
      method: 'POST',
      body: JSON.stringify(logData)
    })
  }
}
