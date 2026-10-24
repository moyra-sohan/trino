import React, { useState } from 'react';
import { 
  LayoutDashboard, UserPlus, FileText, Download, LogOut, 
  Search, Menu, X, ArrowLeft, ShieldCheck, CheckCircle2, User
} from 'lucide-react';

export default function OperatorLayout({
  children,
  activeTab,
  onSelectTab,
  operatorProfile,
  currentUser,
  onLogout,
  onGoHome,
  searchQuery,
  onSearchChange
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'new_registration',
      label: 'New registration',
      icon: UserPlus
    },
    {
      id: 'records',
      label: 'Records',
      icon: FileText
    },
    {
      id: 'import',
      label: 'Import Datasets',
      icon: Download
    }
  ];

  const handleTabClick = (tabId) => {
    onSelectTab(tabId);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-neutral-800">
      
      {/* ========================================================= */}
      {/* 1. TOP HEADER BAR (MATCHING SCREENSHOTS 1, 3, 4, 5) */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/90 shadow-2xs h-16 sm:h-20">
        <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Left: Logo & Portal Badge */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 cursor-pointer"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo */}
            <div 
              onClick={onGoHome}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
              title="Return to Public Portal Home"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#ea580c] to-[#f97316] flex items-center justify-center text-white shadow-sm shadow-orange-500/20 group-hover:scale-105 transition-transform shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <div className="flex flex-col text-left">
                <span className="text-lg sm:text-xl font-black tracking-tight text-neutral-900 leading-none">
                  Nari<span className="text-[#ea580c]">Setu</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-semibold tracking-wide hidden sm:block">
                  Field Operator Console
                </span>
              </div>
            </div>

            {/* Field Operator Console - Data Entry Badge */}
            <div className="hidden md:inline-flex items-center px-3 py-1 rounded-full bg-orange-50 border border-orange-200/90 text-[11px] font-bold text-[#ea580c]">
              <span>Field Operator Console • Data Entry</span>
            </div>
          </div>

          {/* Center: Search input box */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search console, artisan UID, or village records..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-200 text-xs font-medium focus:outline-none focus:border-orange-500 bg-neutral-50/60 focus:bg-white"
              />
            </div>
          </div>

          {/* Right: Operator Profile & Online Badge */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Status dot in mobile header */}
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 hidden sm:inline-block shadow-xs" title="Field Operator Online & GPS Synced" />

            {/* Operator Card */}
            <div className="flex items-center gap-2.5 py-1 px-2 rounded-2xl bg-neutral-50/80 border border-neutral-200/70">
              {/* RM initials circle avatar */}
              <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 font-extrabold text-xs flex items-center justify-center border border-amber-300 shadow-2xs">
                {operatorProfile.avatarInitials || 'RM'}
              </div>

              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-neutral-900 leading-tight">
                  {operatorProfile.name || 'Smt. Rekha Mondal'}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono font-medium">
                  ID: {operatorProfile.id || 'OP-8492'}
                </span>
              </div>
            </div>

            {/* Return to Home link */}
            <button
              onClick={onGoHome}
              className="hidden lg:flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-neutral-900 px-2 py-1 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Return to Main Portal"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portal Home</span>
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. BODY: SIDEBAR + MAIN VIEW CONTAINER */}
      {/* ========================================================= */}
      <div className="flex-1 flex max-w-full">
        
        {/* ========================================================= */}
        {/* DESKTOP SIDEBAR */}
        {/* ========================================================= */}
        <aside className="w-64 bg-white border-r border-neutral-200/80 flex flex-col justify-between p-5 hidden lg:flex shrink-0 min-h-[calc(100vh-80px)] text-left">
          
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-3 mb-3">
              CONSOLE NAVIGATION
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#ea580c] text-white shadow-sm shadow-orange-500/30'
                        : 'text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar: Logout & Online indicator */}
          <div className="pt-4 border-t border-neutral-100 space-y-3">
            <div className="flex items-center gap-2 px-2 text-[11px] text-neutral-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>GPS: Hanskhali Sector</span>
            </div>

            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-neutral-600 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out operator</span>
            </button>
          </div>

        </aside>

        {/* ========================================================= */}
        {/* MOBILE DRAWER SIDEBAR */}
        {/* ========================================================= */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 bg-white h-full p-5 flex flex-col justify-between shadow-2xl z-10 text-left">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    CONSOLE NAVIGATION
                  </span>
                  <button onClick={() => setMobileSidebarOpen(false)}>
                    <X className="w-4 h-4 text-neutral-500" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#ea580c] text-white shadow-sm shadow-orange-500/30'
                            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out operator</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. MAIN WORKSPACE / CONTENT AREA */}
        {/* ========================================================= */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
