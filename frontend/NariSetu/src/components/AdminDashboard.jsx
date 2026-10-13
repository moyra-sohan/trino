import React, { useState, useEffect } from 'react'
import { 
  ShieldAlert, Database, RefreshCw, Trash2, Edit3, 
  UserCheck, Plus, CheckCircle, AlertCircle, Loader2, 
  Search, ShieldCheck, Users, Activity 
} from 'lucide-react'
import { api } from '../api'

export default function AdminDashboard({ currentUser, onNotify }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [healthStatus, setHealthStatus] = useState(null)
  const [healthLoading, setHealthLoading] = useState(false)

  // Quick user add form state
  const [showAddModal, setShowAddModal] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })
  const [submitting, setSubmitting] = useState(false)

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await api.getUsers()
      setUsers(data.users || [])
    } catch (err) {
      console.error('Failed to load users:', err)
      onNotify?.('error', `Failed to load users from DB: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const checkDbHealth = async () => {
    try {
      setHealthLoading(true)
      const res = await api.checkHealth()
      setHealthStatus({ ok: true, data: res })
      onNotify?.('success', 'PostgreSQL database connection is healthy & active!')
    } catch (err) {
      setHealthStatus({ ok: false, error: err.message })
      onNotify?.('error', `DB Health check failed: ${err.message}`)
    } finally {
      setHealthLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
    checkDbHealth()
  }, [])

  // Change user role directly in PostgreSQL via PUT /api/users/:id
  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.updateUser(userId, { role: newRole })
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
      onNotify?.('success', `User role updated to "${newRole}" in database!`)
    } catch (err) {
      onNotify?.('error', `Failed to update role: ${err.message}`)
    }
  }

  // Delete user from PostgreSQL via DELETE /api/users/:id
  const handleDeleteUser = async (userId, userEmail) => {
    if (userId === currentUser.id) {
      onNotify?.('error', 'Cannot delete your own active administrator account.')
      return
    }

    if (!window.confirm(`Are you sure you want to delete user "${userEmail}" from the database?`)) {
      return
    }

    try {
      await api.deleteUser(userId)
      setUsers(prev => prev.filter(u => u.id !== userId))
      onNotify?.('success', `User ${userEmail} successfully deleted from PostgreSQL!`)
    } catch (err) {
      onNotify?.('error', `Failed to delete user: ${err.message}`)
    }
  }

  // Create new user directly in DB
  const handleCreateUser = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const res = await api.register(newUser)
      setUsers([res.user, ...users])
      setShowAddModal(false)
      setNewUser({ name: '', email: '', password: '', role: 'user' })
      onNotify?.('success', `User ${res.user.email} created directly in database!`)
    } catch (err) {
      onNotify?.('error', `Creation error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  // Filtered users
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.id || '').toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = filterRole === 'all' || u.role === filterRole
    return matchesSearch && matchesRole
  })

  // Role stats
  const totalCount = users.length
  const userCount = users.filter(u => u.role === 'user').length
  const operatorCount = users.filter(u => u.role === 'operator').length
  const adminCount = users.filter(u => u.role === 'admin').length

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-neutral-950 rounded-3xl p-8 text-white shadow-xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-purple-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3 border border-purple-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Master Administrative Suite • Full RBAC Access</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            NariSetu Governance Console
          </h1>
          <p className="text-purple-200/80 text-sm mt-1 max-w-xl">
            Live database records connecting to Fastify & Neon PostgreSQL. Directly inspect, modify roles, or purge test accounts.
          </p>
          <div className="mt-3 text-xs text-purple-300/80 font-mono">
            Admin: {currentUser.name || currentUser.email} • ID: {currentUser.id}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={checkDbHealth}
            disabled={healthLoading}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {healthLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Activity className="w-3.5 h-3.5 text-emerald-400" />}
            <span>Check DB Health</span>
          </button>

          <button
            onClick={loadUsers}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync DB</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create User</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-8">
        
        <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm">
          <span className="text-[11px] font-bold text-neutral-500 uppercase">Total Registered</span>
          <div className="text-3xl font-extrabold text-neutral-900 mt-1 font-mono">{totalCount}</div>
          <p className="text-xs text-neutral-400 mt-1">Neon DB records</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm">
          <span className="text-[11px] font-bold text-emerald-700 uppercase">Users / Investors</span>
          <div className="text-3xl font-extrabold text-emerald-700 mt-1 font-mono">{userCount}</div>
          <p className="text-xs text-neutral-400 mt-1">Role: "user"</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm">
          <span className="text-[11px] font-bold text-blue-700 uppercase">Field Operators</span>
          <div className="text-3xl font-extrabold text-blue-700 mt-1 font-mono">{operatorCount}</div>
          <p className="text-xs text-neutral-400 mt-1">Role: "operator"</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm">
          <span className="text-[11px] font-bold text-purple-700 uppercase">System Admins</span>
          <div className="text-3xl font-extrabold text-purple-700 mt-1 font-mono">{adminCount}</div>
          <p className="text-xs text-neutral-400 mt-1">Role: "admin"</p>
        </div>

      </div>

      {/* Database Health Pill */}
      {healthStatus && (
        <div className={`p-4 rounded-2xl mb-8 flex items-center justify-between text-xs font-mono ${
          healthStatus.ok 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' 
            : 'bg-rose-50 border border-rose-200 text-rose-900'
        }`}>
          <div className="flex items-center gap-2">
            {healthStatus.ok ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            <span>
              <strong>PostgreSQL State:</strong> {healthStatus.ok ? 'Connected (Neon Serverless Pooler Active)' : healthStatus.error}
            </span>
          </div>
          <span className="text-[11px] opacity-75">
            Table: users (Prisma Client 7.10)
          </span>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search email, name or ID..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-purple-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-neutral-500">Filter Role:</span>
          {['all', 'user', 'operator', 'admin'].map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer capitalize ${
                filterRole === role
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Database Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-neutral-900">
              Live Database Users ({filteredUsers.length})
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Direct reads from PostgreSQL Neon table <code className="bg-neutral-100 px-1 py-0.5 rounded text-[11px]">users</code>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-neutral-400">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-2" />
            <span className="text-xs font-semibold">Querying PostgreSQL database...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            <Users className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
            <p className="font-bold text-neutral-700">No matching users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-600 text-xs font-bold uppercase tracking-wider border-b border-neutral-100">
                <tr>
                  <th className="px-6 py-4">User Details</th>
                  <th className="px-6 py-4">Database UUID</th>
                  <th className="px-6 py-4">Role Assignment</th>
                  <th className="px-6 py-4">Registered On</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredUsers.map((u) => {
                  const roleColors = {
                    user: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    operator: 'bg-blue-50 text-blue-700 border-blue-200',
                    admin: 'bg-purple-50 text-purple-700 border-purple-200'
                  }

                  return (
                    <tr key={u.id} className="hover:bg-neutral-50/60 transition-colors">
                      
                      {/* Name & Email */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-neutral-900">
                          {u.name || 'Unnamed User'}
                        </div>
                        <div className="text-xs text-neutral-600 font-mono">
                          {u.email}
                        </div>
                      </td>

                      {/* UUID */}
                      <td className="px-6 py-4 text-xs font-mono text-neutral-400">
                        {u.id}
                      </td>

                      {/* Interactive Role Switcher */}
                      <td className="px-6 py-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                            roleColors[u.role] || 'bg-neutral-100'
                          }`}
                        >
                          <option value="user">user</option>
                          <option value="operator">operator</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>

                      {/* Created At */}
                      <td className="px-6 py-4 text-xs text-neutral-500 font-mono">
                        {new Date(u.createdAt).toLocaleString()}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(u.id, u.email)}
                          title="Delete user from database"
                          className="p-2 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add New User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl text-left">
            <h3 className="text-xl font-bold text-neutral-900 mb-1">
              Create New User in Database
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              This will run an encrypted password hash and create a real row in PostgreSQL.
            </p>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="user@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Password (min 6 characters) *
                </label>
                <input
                  type="password"
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Role Assignment *
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-purple-600 focus:outline-none font-bold capitalize"
                >
                  <option value="user">User / Investor</option>
                  <option value="operator">Operator (Field Partner)</option>
                  <option value="admin">Admin (System Governance)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Create in PostgreSQL</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
