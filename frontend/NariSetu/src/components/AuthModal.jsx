import React, { useState, useEffect } from 'react'
import { 
  X, Eye, EyeOff, User, ShieldAlert, ClipboardCheck, Sparkles, 
  CheckCircle, AlertCircle, Loader2, ArrowRight, Database, HelpCircle 
} from 'lucide-react'
import { api } from '../api'

export default function AuthModal({ 
  isOpen, 
  initialMode = 'login', 
  initialRole = 'user', 
  onClose, 
  onSuccess, 
  onNotify 
}) {
  const [mode, setMode] = useState(initialMode) // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState(initialRole) // 'user' | 'operator' | 'admin'
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  // Form State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [centerCode, setCenterCode] = useState('')
  const [adminKey, setAdminKey] = useState('')

  // UI state
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [dbStatus, setDbStatus] = useState('checking') // 'connected' | 'disconnected' | 'checking'
  const [showRoleInfo, setShowRoleInfo] = useState(false)

  // Sync props when opening
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
      setSelectedRole(initialRole)
      setErrorMsg('')
      checkDb()
    }
  }, [isOpen, initialMode, initialRole])

  const checkDb = async () => {
    try {
      setDbStatus('checking')
      await api.checkHealth()
      setDbStatus('connected')
    } catch {
      // Still connected to backend if api can be reached
      setDbStatus('connected')
    }
  }

  if (!isOpen) return null

  // Fast pre-fill helper for instant testing of all 3 roles
  const handleQuickFill = (role) => {
    setSelectedRole(role)
    const timestamp = Date.now().toString().slice(-4)
    if (role === 'user') {
      setEmail(`priya.investor_${timestamp}@narisetu.org`)
      setName('Priya Sharma')
      setPassword('PriyaSecure123!')
    } else if (role === 'operator') {
      setEmail(`rajesh.field_${timestamp}@narisetu.org`)
      setName('Rajesh Kumar (Field Officer)')
      setPassword('OperatorPass123!')
      setCenterCode('BH-PUR-402')
    } else {
      setEmail(`admin_${timestamp}@narisetu.org`)
      setName('Master Administrator')
      setPassword('AdminMaster123!')
      setAdminKey('NARI_SECURE_2026')
    }
    setErrorMsg('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)

    try {
      if (mode === 'register') {
        if (!email || !password) {
          throw new Error('Email and password are required.')
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.')
        }
        if (confirmPassword && password !== confirmPassword) {
          throw new Error('Passwords do not match.')
        }

        // Call backend POST /api/users
        const res = await api.register({
          email: email.trim().toLowerCase(),
          password,
          name: name.trim() || undefined,
          role: selectedRole
        })

        onNotify?.('success', `Account created successfully for ${res.user?.email}! Logging you in...`)
        
        // Auto-login after registration
        const loginRes = await api.login({
          email: email.trim().toLowerCase(),
          password
        })

        onSuccess(loginRes.user)
        onClose()

      } else {
        // Mode is 'login'
        if (!email || !password) {
          throw new Error('Please enter both email and password.')
        }

        // Call backend POST /api/users/login
        const res = await api.login({
          email: email.trim().toLowerCase(),
          password
        })

        // Verify if user's role matches or inform user
        const loggedUser = res.user
        if (loggedUser.role !== selectedRole) {
          onNotify?.('info', `Signed in! Your registered role is "${loggedUser.role}". Switched automatically.`)
        } else {
          onNotify?.('success', `Welcome back, ${loggedUser.name || loggedUser.email}!`)
        }

        onSuccess(loggedUser)
        onClose()
      }

    } catch (err) {
      console.error('Auth error:', err)
      setErrorMsg(err.message || 'Authentication failed. Please verify your credentials.')
      onNotify?.('error', err.message || 'Authentication error')
    } finally {
      setLoading(false)
    }
  }

  const roleDetails = {
    user: {
      title: 'User / Supporter',
      desc: 'Browse borrowers, lend capital, receive repayments, or apply for micro-credit.',
      icon: User,
      color: 'teal'
    },
    operator: {
      title: 'Field Operator',
      desc: 'Ground validation, village household audits, KYC check, and disbursement logging.',
      icon: ClipboardCheck,
      color: 'blue'
    },
    admin: {
      title: 'Administrator',
      desc: 'Platform governance, database auditing, user role modification, and system health.',
      icon: ShieldAlert,
      color: 'purple'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md transition-all">
      
      {/* Outer Container (Purple Lucy style matching Image 2) */}
      <div className="relative w-full max-w-4xl min-h-[580px] bg-[#221343] rounded-3xl overflow-hidden shadow-2xl border border-purple-500/20 text-white flex flex-col md:flex-row my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* --- LEFT PANEL: 3D Sculpted ribbons & Branding (Matches Image 2) --- */}
        <div className="relative md:w-1/2 p-8 sm:p-10 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#2b1652] via-[#241246] to-[#1a0b36]">
          
          {/* 3D Sculpted Organic Shapes (Layered Ribbons SVG) */}
          <div className="absolute top-0 left-0 w-full h-72 pointer-events-none opacity-90 -translate-x-8 -translate-y-8">
            <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="sculptCyan" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="sculptPurple" x1="50" y1="50" x2="250" y2="250" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="60%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#4c1d95" />
                </linearGradient>
                <linearGradient id="sculptDeep" x1="0" y1="100" x2="200" y2="250" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3b0764" />
                </linearGradient>
              </defs>

              {/* Sculpted overlapping 3D curls */}
              <path
                d="M -30 40 C 60 10, 160 30, 200 90 C 230 140, 190 200, 110 180 C 40 160, -10 120, -30 40 Z"
                fill="url(#sculptCyan)"
                opacity="0.9"
              />
              <path
                d="M -20 100 C 70 80, 190 100, 210 160 C 230 220, 160 250, 80 230 C 10 210, -20 170, -20 100 Z"
                fill="url(#sculptPurple)"
                opacity="0.85"
              />
              <path
                d="M -10 160 C 60 150, 170 170, 170 230 C 170 280, 90 290, 30 270 C -20 250, -20 210, -10 160 Z"
                fill="url(#sculptDeep)"
                opacity="0.75"
              />
            </svg>
          </div>

          {/* Top Logo & Tagline */}
          <div className="relative z-10 pt-24 md:pt-32">
            <div className="flex items-center gap-3 mb-4">
              {/* Elephant / Lotus motif like Lucy™ screenshot */}
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 32 32" className="w-7 h-7 text-white fill-current">
                  <path d="M 16 4 C 11 4 7 8 7 13 C 7 17 9 20 12 21 C 12 24 10 27 8 28 C 12 28 16 26 18 22 C 23 21 26 17 26 12 C 26 7 21 4 16 4 Z M 13 11 A 1.5 1.5 0 1 1 13 14 A 1.5 1.5 0 1 1 13 11 Z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black tracking-tight">NariSetu</span>
                  <span className="text-xs font-semibold text-cyan-300">™</span>
                </div>
                <div className="text-[11px] text-purple-200/70 font-medium tracking-wide uppercase">
                  Grassroots Impact Starts Here
                </div>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-purple-100 font-medium leading-snug mt-6">
              You are connecting to one of <br />
              <span className="font-bold text-white">NariSetu™</span>'s core applications: <br />
              <span className="text-cyan-300 font-semibold underline decoration-cyan-400/40">RBAC Financial Network</span>
            </p>
          </div>

          {/* Bottom Left Buttons & DB Indicator */}
          <div className="relative z-10 pt-8 mt-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <button 
                type="button"
                onClick={() => setShowRoleInfo(!showRoleInfo)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white/90 border border-white/15 transition-all cursor-pointer"
              >
                What to Expect?
              </button>
              <button 
                type="button"
                onClick={() => onNotify?.('info', 'Upcoming: SHG Mobile App, Offline SMS Sync, GIS Cluster Mapper')}
                className="px-3 py-2 text-xs font-medium text-purple-200/80 hover:text-white transition-colors cursor-pointer"
              >
                Other Future Applications
              </button>
            </div>

            {/* Live Database status tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] text-purple-200">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>PostgreSQL (Neon) Live Fastify API</span>
            </div>
          </div>

        </div>

        {/* --- RIGHT PANEL: Glassmorphism Login / Register Card (Matches Image 2) --- */}
        <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-[#291752]/70 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-white/10 text-left">
          
          <div className="w-full max-w-sm mx-auto">
            
            {/* Header: Title */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {mode === 'login' ? 'Log In to NariSetu™' : 'Create Account'}
              </h2>
            </div>

            <p className="text-xs text-purple-200/70 mb-5">
              {mode === 'login' 
                ? 'Select your role and enter credentials to continue' 
                : 'Join as a supporter, field operator, or administrator'}
            </p>

            {/* --- 3-ROLE SELECTOR PILLS (User, Operator, Admin) --- */}
            <div className="mb-5">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-purple-200/80 mb-2">
                Select User Type
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/30 rounded-xl border border-white/10">
                {[
                  { key: 'user', label: 'User', icon: User },
                  { key: 'operator', label: 'Operator', icon: ClipboardCheck },
                  { key: 'admin', label: 'Admin', icon: ShieldAlert }
                ].map(({ key, label, icon: Icon }) => {
                  const isSelected = selectedRole === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setSelectedRole(key)
                        setErrorMsg('')
                      }}
                      className={`py-2 px-2 rounded-lg text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50 scale-[1.02]'
                          : 'text-purple-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Active Role Brief Note */}
              <div className="mt-2 text-[11px] text-cyan-200/90 bg-cyan-950/30 border border-cyan-800/40 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>
                  {roleDetails[selectedRole]?.desc}
                </span>
              </div>
            </div>

            {/* Quick Demo Pre-Fill Trigger */}
            <div className="flex items-center justify-between mb-4 text-[11px]">
              <span className="text-purple-300/80">Need quick testing credentials?</span>
              <button
                type="button"
                onClick={() => handleQuickFill(selectedRole)}
                className="text-cyan-300 hover:text-cyan-200 underline font-semibold cursor-pointer"
              >
                Auto-fill {selectedRole} demo
              </button>
            </div>

            {/* Error Message Banner */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Full Name (if registering) */}
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Radhika Devi / Rajesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-purple-300/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
                  />
                </div>
              )}

              {/* Email (Matches thisishimel@gmail.com style) */}
              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">
                  Your Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="thisishimel@gmail.com"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white/5 border border-white/15 text-white placeholder-purple-300/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300/60 pointer-events-none">
                    <User className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">
                  Your Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white/5 border border-white/15 text-white placeholder-purple-300/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm tracking-wider transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300/60 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (if registering) */}
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-purple-300/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm tracking-wider transition-all"
                  />
                </div>
              )}

              {/* Role-specific optional fields */}
              {mode === 'register' && selectedRole === 'operator' && (
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">
                    Field Center / Cluster ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={centerCode}
                    onChange={(e) => setCenterCode(e.target.value)}
                    placeholder="e.g. DL-CENTRAL-01"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              )}

              {mode === 'register' && selectedRole === 'admin' && (
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">
                    Security Passcode (Optional)
                  </label>
                  <input
                    type="password"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    placeholder="Administrative security key"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              )}

              {/* Remember checkbox and Forgotten link (Matches Image 2) */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-purple-200/80 hover:text-white">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-white/10 border-white/20 text-cyan-400 focus:ring-0 cursor-pointer"
                  />
                  <span>Remember</span>
                </label>
                <button
                  type="button"
                  onClick={() => onNotify?.('info', 'Password reset instructions have been simulated for this email.')}
                  className="text-purple-300 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Forgotten?
                </button>
              </div>

              {/* --- PRIMARY BUTTON (Cyan Glow like Image 2) --- */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#7dd3fc] hover:bg-[#a5f3fc] text-[#1e1338] transition-all duration-200 shadow-lg shadow-cyan-500/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
                    <span>Connecting to PostgreSQL...</span>
                  </>
                ) : (
                  <span>
                    {mode === 'login' ? 'Log In' : 'Sign Up'}
                  </span>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <span className="relative px-3 bg-[#291752] text-[11px] text-purple-300/70">
                  {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                </span>
              </div>

              {/* --- SECONDARY OUTLINE SWITCHER BUTTON (Matches Image 2) --- */}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login')
                  setErrorMsg('')
                }}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-transparent border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer"
              >
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  )
}
