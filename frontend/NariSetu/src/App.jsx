import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ImpactSection from './components/ImpactSection'
import BorrowerStories from './components/BorrowerStories'
import CalculatorSection from './components/CalculatorSection'
import RolePortalsSection from './components/RolePortalsSection'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import AdminDashboard from './components/AdminDashboard'
import OperatorDashboard from './components/OperatorDashboard'
import UserDashboard from './components/UserDashboard'
import { 
  User, ClipboardCheck, ShieldAlert, Sparkles, CheckCircle2, 
  AlertCircle, Info, X, Database, ArrowRight, ShieldCheck, 
  ExternalLink, Layers, RefreshCw 
} from 'lucide-react'
import { api } from './api'
import './App.css'

export default function App() {
  // Current user state (persisted in localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('narisetu_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  // Navigation View: 'home' | 'dashboard'
  const [currentView, setCurrentView] = useState('home')

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authInitialMode, setAuthInitialMode] = useState('login') // 'login' | 'register'
  const [authInitialRole, setAuthInitialRole] = useState('user') // 'user' | 'operator' | 'admin'

  // Toast Notifications
  const [toasts, setToasts] = useState([])

  // Backend Health State
  const [backendReady, setBackendReady] = useState(false)

  // Check backend health on mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const res = await api.checkHealth()
        if (res.status === 'ok') {
          setBackendReady(true)
        }
      } catch (_err) {
        // Will retry or use proxy
        setBackendReady(false)
      }
    }
    testConnection()
  }, [])

  // Toast Helper
  const notify = (type, message) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4500)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  // Open Auth with specific mode and target role
  const handleOpenAuth = (mode = 'login', role = 'user') => {
    setAuthInitialMode(mode)
    setAuthInitialRole(role)
    setAuthModalOpen(true)
  }

  // Handle successful login or registration
  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
    try {
      localStorage.setItem('narisetu_user', JSON.stringify(user))
    } catch (e) {
      console.warn('Could not save user to storage', e)
    }
    // Automatically transition to the dashboard view
    setCurrentView('dashboard')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('narisetu_user')
    setCurrentView('home')
    notify('info', 'You have been signed out successfully.')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Smooth navigation to in-page anchors
  const handleNavigateSection = (sectionId) => {
    if (sectionId === 'dashboard') {
      if (!currentUser) {
        handleOpenAuth('login', 'user')
      } else {
        setCurrentView('dashboard')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (currentView !== 'home') {
      setCurrentView('home')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Quick switch role directly for testing personas
  const handleQuickSwitchPersona = async (role) => {
    const timestamp = Date.now().toString().slice(-4)
    const mockUsers = {
      user: {
        id: `usr-demo-${timestamp}`,
        name: 'Priya Sharma (Investor)',
        email: `priya.investor_${timestamp}@narisetu.org`,
        role: 'user',
        createdAt: new Date().toISOString()
      },
      operator: {
        id: `op-demo-${timestamp}`,
        name: 'Rajesh Kumar (Field Officer)',
        email: `rajesh.field_${timestamp}@narisetu.org`,
        role: 'operator',
        createdAt: new Date().toISOString()
      },
      admin: {
        id: `adm-demo-${timestamp}`,
        name: 'Master Administrator',
        email: `admin_${timestamp}@narisetu.org`,
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    }

    const selectedUser = mockUsers[role]
    setCurrentUser(selectedUser)
    localStorage.setItem('narisetu_user', JSON.stringify(selectedUser))
    setCurrentView('dashboard')
    notify('success', `Switched active persona to ${role.toUpperCase()} (${selectedUser.name})`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-neutral-800 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      
      {/* --- TOAST NOTIFICATIONS CONTAINER --- */}
      <div className="fixed top-24 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map(toast => {
          const isSuccess = toast.type === 'success'
          const isError = toast.type === 'error'
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-start gap-3 backdrop-blur-md transition-all duration-300 animate-in slide-in-from-right text-xs font-medium leading-relaxed ${
                isSuccess
                  ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/40 shadow-emerald-950/30'
                  : isError
                  ? 'bg-rose-950/90 text-rose-100 border-rose-500/40 shadow-rose-950/30'
                  : 'bg-indigo-950/90 text-indigo-100 border-indigo-500/40 shadow-indigo-950/30'
              }`}
            >
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
              {isError && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
              {!isSuccess && !isError && <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />}
              <span className="flex-1">{toast.message}</span>
              <button 
                onClick={() => removeToast(toast.id)}
                className="text-white/60 hover:text-white ml-2 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )
        })}
      </div>

      {/* --- TOP NAVBAR --- */}
      <Navbar 
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigateSection={handleNavigateSection}
        currentView={currentView}
        onGoHome={() => {
          setCurrentView('home')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            {/* HERO SECTION: Rang De inspired visual with Indian woman illustration and 3 floating badges */}
            <HeroSection 
              onOpenAuth={handleOpenAuth}
              onExploreBorrowers={() => handleNavigateSection('borrowers')}
              onOpenCalculator={() => handleNavigateSection('calculator')}
            />

            {/* THREE USER ROLES SHOWCASE PORTAL SECTION */}
            <RolePortalsSection 
              onOpenAuth={handleOpenAuth}
            />

            {/* IMPACT STATISTICS: Proven field metrics */}
            <ImpactSection />

            {/* FEATURED BORROWERS STORIES & DIRECT SOCIAL PLEDGE */}
            <BorrowerStories 
              onOpenAuth={handleOpenAuth}
              currentUser={currentUser}
              onNotify={notify}
            />

            {/* INTERACTIVE SOCIAL CAPITAL MULTIPLIER CALCULATOR */}
            <CalculatorSection 
              onOpenAuth={handleOpenAuth}
            />
          </>
        ) : (
          /* DASHBOARD VIEW (Rendered according to active user role) */
          <div className="min-h-[70vh] bg-gradient-to-b from-[#fbf8f3] to-[#f5eee6] pb-20">
            {currentUser ? (
              <>
                {currentUser.role === 'admin' && (
                  <AdminDashboard 
                    currentUser={currentUser}
                    onNotify={notify}
                  />
                )}
                {currentUser.role === 'operator' && (
                  <OperatorDashboard 
                    currentUser={currentUser}
                    onNotify={notify}
                  />
                )}
                {currentUser.role === 'user' && (
                  <UserDashboard 
                    currentUser={currentUser}
                    onExploreBorrowers={() => {
                      setCurrentView('home')
                      setTimeout(() => handleNavigateSection('borrowers'), 100)
                    }}
                    onNotify={notify}
                  />
                )}
              </>
            ) : (
              /* GUEST DASHBOARD GATEWAY (If accessed without login) */
              <div className="py-20 max-w-4xl mx-auto px-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6 shadow-md">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                  Access Role-Based Workspace
                </h2>
                <p className="text-neutral-600 max-w-md mx-auto mt-2 text-sm">
                  Please log in or select which user portal you would like to explore. Each role possesses tailored permissions and database capabilities.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
                  <button
                    onClick={() => handleOpenAuth('login', 'user')}
                    className="p-6 rounded-2xl bg-white border border-emerald-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all text-left group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                      <User className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-neutral-900 group-hover:text-emerald-700">User Portal</h3>
                    <p className="text-xs text-neutral-500 mt-1">Lend & track investments</p>
                  </button>

                  <button
                    onClick={() => handleOpenAuth('login', 'operator')}
                    className="p-6 rounded-2xl bg-white border border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all text-left group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                      <ClipboardCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-neutral-900 group-hover:text-blue-700">Operator Portal</h3>
                    <p className="text-xs text-neutral-500 mt-1">Audit & verify applications</p>
                  </button>

                  <button
                    onClick={() => handleOpenAuth('login', 'admin')}
                    className="p-6 rounded-2xl bg-white border border-purple-200 hover:border-purple-400 shadow-sm hover:shadow-md transition-all text-left group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-neutral-900 group-hover:text-purple-700">Admin Portal</h3>
                    <p className="text-xs text-neutral-500 mt-1">Manage database & CRUD</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- FOOTER --- */}
      <Footer 
        onOpenAuth={handleOpenAuth}
        onNavigateSection={handleNavigateSection}
      />

      {/* --- AUTH MODAL (Lucy-inspired Image 2 design) --- */}
      <AuthModal 
        isOpen={authModalOpen}
        initialMode={authInitialMode}
        initialRole={authInitialRole}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleLoginSuccess}
        onNotify={notify}
      />

      {/* --- FLOATING DEV PERSONA SWITCHER TOOL --- */}
      <div className="fixed bottom-5 right-5 z-40 bg-neutral-900/90 text-white backdrop-blur-md rounded-2xl p-2.5 shadow-2xl border border-neutral-700/60 text-xs flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 rounded-lg text-[11px] font-semibold text-neutral-300">
          <Database className={`w-3.5 h-3.5 ${backendReady ? 'text-emerald-400' : 'text-amber-400'}`} />
          <span>Role Switcher:</span>
        </div>

        <button
          onClick={() => handleQuickSwitchPersona('user')}
          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
            currentUser?.role === 'user' && currentView === 'dashboard'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'hover:bg-white/10 text-emerald-300'
          }`}
          title="Switch to User persona"
        >
          User
        </button>

        <button
          onClick={() => handleQuickSwitchPersona('operator')}
          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
            currentUser?.role === 'operator' && currentView === 'dashboard'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'hover:bg-white/10 text-blue-300'
          }`}
          title="Switch to Operator persona"
        >
          Operator
        </button>

        <button
          onClick={() => handleQuickSwitchPersona('admin')}
          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
            currentUser?.role === 'admin' && currentView === 'dashboard'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'hover:bg-white/10 text-purple-300'
          }`}
          title="Switch to Admin persona (Full CRUD)"
        >
          Admin
        </button>

        {currentUser && (
          <button
            onClick={handleLogout}
            className="px-2 py-1 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-950/40 text-[11px] transition-all cursor-pointer"
            title="Log out"
          >
            Clear
          </button>
        )}
      </div>

    </div>
  )
}
