import React from 'react'
import { Sparkles, User, ShieldCheck, Briefcase, LogOut, LayoutDashboard, Database } from 'lucide-react'

export default function Navbar({ onOpenAuth, currentUser, onLogout, onNavigateSection, currentView, onGoHome }) {
  const roleBadgeConfig = {
    user: { label: 'User / Investor', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    operator: { label: 'Field Operator', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    admin: { label: 'Administrator', color: 'bg-purple-100 text-purple-800 border-purple-300' }
  }

  return (
    <header className="sticky top-0 z-50 bg-[#fffdfa]/90 backdrop-blur-md border-b border-amber-100/60 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* --- BRAND LOGO (Matches Rang De / NariSetu Logo) --- */}
        <div 
          onClick={onGoHome}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Rang De / NariSetu colorful tree / human motif */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 48 48" className="w-10 h-10 transition-transform group-hover:scale-105">
              {/* Colorful leaves radiating outward */}
              <circle cx="24" cy="14" r="5" fill="#EF4444" />
              <circle cx="16" cy="18" r="4.5" fill="#F59E0B" />
              <circle cx="32" cy="18" r="4.5" fill="#10B981" />
              <circle cx="13" cy="27" r="4" fill="#06B6D4" />
              <circle cx="35" cy="27" r="4" fill="#8B5CF6" />
              <circle cx="20" cy="9" r="3.5" fill="#EC4899" />
              <circle cx="28" cy="9" r="3.5" fill="#F97316" />
              {/* Central Human Figure / Trunk */}
              <circle cx="24" cy="26" r="3" fill="#D97706" />
              <path d="M 24 29 L 24 44 M 20 37 L 24 33 L 28 37" stroke="#92400E" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-2xl tracking-tight text-neutral-900 group-hover:text-amber-900 transition-colors">
                Nari<span className="text-[#e06543]">Setu</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700/80 px-1 py-0.2 bg-amber-100 rounded">
                Portal
              </span>
            </div>
            <span className="text-[10px] text-neutral-500 font-medium tracking-tight -mt-0.5">
              Grassroots Women Empowerment
            </span>
          </div>
        </div>

        {/* --- NAVIGATION LINKS --- */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-neutral-700">
          <button 
            onClick={() => onNavigateSection('about')} 
            className="hover:text-neutral-950 transition-colors cursor-pointer"
          >
            About Us
          </button>
          <button 
            onClick={() => onNavigateSection('borrowers')} 
            className="hover:text-neutral-950 transition-colors cursor-pointer"
          >
            Borrowers
          </button>
          <button 
            onClick={() => onNavigateSection('calculator')} 
            className="hover:text-neutral-950 transition-colors cursor-pointer"
          >
            Impact Calculator
          </button>
          <button 
            onClick={() => onNavigateSection('roles')} 
            className="hover:text-neutral-950 transition-colors cursor-pointer"
          >
            Portals (3 Roles)
          </button>
          <button 
            onClick={() => onNavigateSection('field-trips')} 
            className="hover:text-neutral-950 transition-colors cursor-pointer"
          >
            Field Trips
          </button>
        </nav>

        {/* --- RIGHT AUTH / USER ACTIONS --- */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            /* Logged In State */
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold text-neutral-800 leading-tight">
                  {currentUser.name || currentUser.email.split('@')[0]}
                </span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${roleBadgeConfig[currentUser.role]?.color || 'bg-gray-100'}`}>
                  {roleBadgeConfig[currentUser.role]?.label || currentUser.role}
                </span>
              </div>

              <button
                onClick={() => onNavigateSection('dashboard')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                  currentView === 'dashboard'
                    ? 'bg-amber-600 text-white shadow-amber-200'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={onLogout}
                title="Log out"
                className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Guest State (Exact match to Image 1 "Log in" pill button) */
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-6 py-2 rounded-full border-[1.5px] border-neutral-800 text-neutral-900 font-semibold text-[15px] hover:bg-neutral-900 hover:text-white transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer"
              >
                Log in
              </button>
              
              <button
                onClick={() => onOpenAuth('register')}
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#e06543] text-white font-semibold text-[14px] hover:bg-[#c95232] transition-all shadow-md shadow-orange-200 hover:shadow-orange-300 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join NariSetu</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}
