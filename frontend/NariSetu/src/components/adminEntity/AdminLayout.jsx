import React, { useState } from 'react';
import { 
  LayoutGrid, ClipboardCheck, Building2, Users, 
  Briefcase, AlertTriangle, ScrollText, UserCheck, 
  Settings, LogOut, Bell, Menu, X, ChevronRight, 
  CheckCircle2, ArrowUpRight, Shield, ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function AdminLayout({
  activeTab = 'overview',
  onSelectTab,
  onLogout,
  onGoHome,
  currentUser,
  verificationCount = 7,
  flaggedCount = 3,
  notifications = [],
  children
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'verification', label: 'Verification Queue', icon: ClipboardCheck, badge: verificationCount },
    { id: 'organizations', label: 'Organizations', icon: Building2 },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
    { id: 'flagged', label: 'Flagged Content', icon: AlertTriangle, badge: flaggedCount, badgeColor: 'bg-rose-100 text-rose-700' },
    { id: 'audit', label: 'Audit Log', icon: ScrollText },
    { id: 'divider', isDivider: true },
    { id: 'users', label: 'Users & Roles', icon: UserCheck },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavClick = (id) => {
    if (id === 'divider') return;
    onSelectTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentTabLabel = navItems.find((item) => item.id === activeTab)?.label || 'Admin Console';

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-neutral-800 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      <div className="flex flex-1">
        
        {/* ========================================================= */}
        {/* 1. DESKTOP FIXED SIDEBAR (MATCHING SCREENSHOTS 1-5) */}
        {/* ========================================================= */}
        <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-neutral-200/90 bg-white p-5 sticky top-0 h-screen shrink-0 shadow-2xs z-30">
          
          <div className="flex flex-col">
            {/* Logo / Header */}
            <div 
              onClick={onGoHome}
              className="flex items-center gap-3 cursor-pointer group pb-5 border-b border-neutral-100"
              title="Return to NariSetu Home"
            >
              {/* NariSetu Brand Icon */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ea580c] to-[#f97316] flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform shrink-0">
                <span className="font-bold text-lg leading-none font-serif">ন</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-black tracking-tight text-neutral-900">
                  Nari<span className="text-[#ea580c]">Setu</span>
                </span>
                <span className="text-[11px] font-medium text-neutral-400">
                  Administration Portal
                </span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-6 flex flex-col gap-1.5">
              {navItems.map((item, idx) => {
                if (item.isDivider) {
                  return <hr key={`divider-${idx}`} className="my-3 border-neutral-200/70" />;
                }

                const IconComponent = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-[#dcfce7] text-[#14532d] font-bold shadow-2xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#15803d]' : 'text-neutral-400 group-hover:text-neutral-700'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.badgeColor || (isActive ? 'bg-[#bbf7d0] text-[#14532d]' : 'bg-neutral-100 text-neutral-600')
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions: Logout Pill & Switch to Portal */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={onGoHome}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/60 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visit Public Site</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {/* Logout pill matching screenshots */}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#e2ece4] hover:bg-[#d4e4d7] text-neutral-800 text-xs font-bold tracking-wider transition-all cursor-pointer shadow-2xs active:scale-98"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LOGOUT</span>
            </button>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* 2. MAIN WORKSPACE CONTENT AREA */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* TOP ADMIN HEADER BAR */}
          <header className="h-16 bg-white border-b border-neutral-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
            
            {/* Left: Mobile hamburger & Page Title / Breadcrumb */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                title="Toggle navigation"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-neutral-900 tracking-tight">
                  Admin Console
                </span>
                {activeTab !== 'overview' && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-xs sm:text-sm font-semibold text-neutral-500 capitalize">
                      {currentTabLabel}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Right: Quick Links, Notifications & Admin Avatar */}
            <div className="flex items-center gap-3 sm:gap-5">
              
              {/* Public Portal Switcher */}
              <button
                onClick={onGoHome}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                title="Return to Public NariSetu portal"
              >
                <span>Portal View</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
              </button>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors relative cursor-pointer"
                  title="Notifications & Alerts"
                >
                  <Bell className="w-4 h-4" />
                  {flaggedCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-neutral-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                      <span className="text-xs font-bold text-neutral-900">Notifications & Alerts</span>
                      <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                        {flaggedCount} Open Flags
                      </span>
                    </div>

                    <div className="py-2 flex flex-col gap-2 max-h-72 overflow-y-auto">
                      <div 
                        onClick={() => { onSelectTab('flagged'); setNotificationsOpen(false); }}
                        className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 hover:bg-rose-100/70 transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-rose-900">Flagged Opportunity</span>
                          <span className="text-[10px] text-rose-600 font-medium">2h ago</span>
                        </div>
                        <p className="text-[11px] text-rose-700 mt-0.5">Kantha stitch silk dupattas has ambiguous payment clauses.</p>
                      </div>

                      <div 
                        onClick={() => { onSelectTab('verification'); setNotificationsOpen(false); }}
                        className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 hover:bg-amber-100/70 transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-amber-900">Verification Pending</span>
                          <span className="text-[10px] text-amber-600 font-medium">3d overdue</span>
                        </div>
                        <p className="text-[11px] text-amber-700 mt-0.5">Mahila Kisan Samiti Federation awaiting final resolution review.</p>
                      </div>

                      <div 
                        onClick={() => { onSelectTab('audit'); setNotificationsOpen(false); }}
                        className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 hover:bg-neutral-100 transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-neutral-900">Security Audit</span>
                          <span className="text-[10px] text-neutral-500 font-medium">24 Oct</span>
                        </div>
                        <p className="text-[11px] text-neutral-600 mt-0.5">Admin signed in with 2-factor authentication.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Administrator Avatar & Label (Matching Screenshot 1-5: "AD Administrator Security & Verification team") */}
              <div className="relative">
                <div 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 cursor-pointer py-1 px-1.5 rounded-xl hover:bg-neutral-100 transition-colors select-none"
                >
                  <div className="w-8 h-8 rounded-full bg-[#16382b] text-white flex items-center justify-center text-xs font-black shadow-2xs">
                    AD
                  </div>
                  <div className="hidden md:flex flex-col text-left leading-tight">
                    <span className="text-xs font-bold text-neutral-900">
                      Administrator
                    </span>
                    <span className="text-[10px] text-neutral-500 font-medium">
                      Security & Verification team
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 hidden sm:block" />
                </div>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 text-xs">
                    <div className="p-2.5 border-b border-neutral-100">
                      <div className="font-bold text-neutral-900">Platform Administrator</div>
                      <div className="text-[11px] text-neutral-500">admin@narisetu.gov.in</div>
                      <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Security Level: Superadmin</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => { handleNavClick('users'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 font-semibold flex items-center gap-2"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Manage Users & DB</span>
                      </button>

                      <button
                        onClick={() => { handleNavClick('settings'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 font-semibold flex items-center gap-2"
                      >
                        <Settings className="w-3.5 h-3.5 text-neutral-500" />
                        <span>System Settings</span>
                      </button>

                      <button
                        onClick={() => { onGoHome(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 font-semibold flex items-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Return to Main Portal</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-neutral-100">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </header>

          {/* PAGE CONTENT CONTAINER */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
            {children}
          </main>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. MOBILE SLIDE-OUT DRAWER */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity" 
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full p-5 flex flex-col justify-between shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
                    ন
                  </div>
                  <span className="font-black text-neutral-900 text-sm">NariSetu Admin</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-4 flex flex-col gap-1">
                {navItems.map((item, idx) => {
                  if (item.isDivider) {
                    return <hr key={`m-div-${idx}`} className="my-2 border-neutral-200" />;
                  }
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={`m-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-[#dcfce7] text-[#14532d] font-bold' : 'text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-neutral-200 text-neutral-700">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2">
              <button
                onClick={onGoHome}
                className="w-full py-2 text-xs font-semibold text-neutral-600 text-center rounded-xl bg-neutral-100"
              >
                Return to Public Portal
              </button>
              <button
                onClick={onLogout}
                className="w-full py-2.5 rounded-xl bg-[#e2ece4] text-neutral-800 text-xs font-bold tracking-wider"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
