import React, { useState } from 'react';
import { 
  LayoutDashboard, Building2, Search, Briefcase, 
  Calendar, BarChart3, MessageSquare, LogOut, 
  Bell, Clock, Menu, X, ChevronRight, ShieldCheck, 
  Check, Sparkles, ExternalLink 
} from 'lucide-react';

export default function NgoLayout({
  activeTab = 'dashboard',
  onSelectTab,
  ngoProfile,
  currentUser,
  onLogout,
  onGoHome,
  notifications = [],
  children
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Organization Profile', icon: Building2 },
    { id: 'communities', label: 'Discover Communities', icon: Search },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
    { id: 'training', label: 'Training & Events', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'messages', label: 'Messages', icon: MessageSquare }
  ];

  const handleNavClick = (id) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get Breadcrumb text per tab
  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="flex flex-col">
            <span className="text-[11px] text-neutral-400">Home / Dashboard / Organization Profile</span>
            <span className="text-xs sm:text-sm font-bold text-neutral-800">Business & NGO Dashboard</span>
          </div>
        );
      case 'communities':
        return (
          <div className="flex flex-col">
            <span className="text-[11px] text-neutral-400">Home / Discover Communities</span>
            <span className="text-xs sm:text-sm font-bold text-neutral-800">Discover Communities</span>
          </div>
        );
      case 'opportunities':
        return (
          <div className="flex flex-col">
            <span className="text-[11px] text-neutral-400">Home / Dashboard / Opportunities</span>
            <span className="text-xs sm:text-sm font-bold text-neutral-800">Business & NGO Dashboard</span>
          </div>
        );
      case 'training':
        return (
          <div className="flex flex-col">
            <span className="text-[11px] text-neutral-400">Home / Dashboard / Training & Events</span>
            <span className="text-xs sm:text-sm font-bold text-neutral-800">Business & NGO Dashboard</span>
          </div>
        );
      case 'reports':
        return (
          <div className="flex flex-col">
            <span className="text-[11px] text-neutral-400">Home / Dashboard / Reports</span>
            <span className="text-xs sm:text-sm font-bold text-neutral-800">Business & NGO Dashboard</span>
          </div>
        );
      case 'messages':
        return (
          <div className="flex flex-col">
            <span className="text-[11px] text-neutral-400">Home / Dashboard / Messages</span>
            <span className="text-xs sm:text-sm font-bold text-neutral-800">Business & NGO Dashboard</span>
          </div>
        );
      default:
        return (
          <div className="flex flex-col">
            <span className="text-[11px] text-neutral-400">Home / Dashboard</span>
            <span className="text-xs sm:text-sm font-bold text-neutral-800">Business & NGO Dashboard</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-neutral-800 flex flex-col font-sans">
      
      <div className="flex flex-1">
        
        {/* ========================================================= */}
        {/* 1. DESKTOP FIXED SIDEBAR */}
        {/* ========================================================= */}
        <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-neutral-200/80 bg-white p-5 sticky top-0 h-screen shrink-0 shadow-2xs">
          
          <div>
            {/* Logo matching wireframe */}
            <div 
              onClick={onGoHome}
              className="flex items-center gap-3 cursor-pointer group pb-6 border-b border-neutral-100"
              title="Return to NariSetu Home"
            >
              <div className="w-9 h-9 rounded-xl bg-[#ea580c] flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-tight text-neutral-900">
                    Nari<span className="text-[#ea580c]">Setu</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                </div>
                <span className="text-[11px] font-bold text-orange-600/90 tracking-wider">
                  নারীসেতু
                </span>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="mt-6 space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#ffedd5] text-[#ea580c] shadow-2xs font-extrabold'
                        : 'text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#ea580c]' : 'text-neutral-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Logout link matching Screenshot 4 */}
          <div className="pt-4 border-t border-neutral-100">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

        </aside>

        {/* ========================================================= */}
        {/* 2. MOBILE DRAWER SIDEBAR */}
        {/* ========================================================= */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div 
              className="w-72 max-w-[80vw] h-full bg-white p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#ea580c] flex items-center justify-center text-white">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-base font-black text-neutral-900">NariSetu</span>
                      <span className="text-[10px] block text-orange-600 font-bold">নারীসেতু</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-5 space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#ffedd5] text-[#ea580c]'
                            : 'text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-neutral-100 space-y-2">
                <button
                  onClick={onGoHome}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  <span>Portal Home</span>
                </button>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. MAIN CONTENT CONTAINER & TOP BAR */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Bar matching wireframe */}
          <header className="sticky top-0 z-30 bg-[#faf8f5]/90 backdrop-blur-md border-b border-neutral-200/70 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 cursor-pointer shadow-2xs"
                title="Toggle Menu"
              >
                <Menu className="w-4 h-4" />
              </button>

              {/* Breadcrumb Display */}
              {getBreadcrumb()}
            </div>

            {/* Right Tools: Bell, Clock, User Profile Badge */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="w-9 h-9 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer relative shadow-2xs"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-neutral-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 text-xs">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100 font-bold text-neutral-900">
                      <span>Notifications</span>
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                        3 new
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-orange-50/50 hover:bg-orange-50 transition-colors">
                        <p className="font-bold text-neutral-900">Mahila Kisan Samiti responded</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">FSSAI inspection reports attached for review.</p>
                        <span className="text-[9px] text-neutral-400 mt-1 block">2 hours ago</span>
                      </div>
                      <div className="p-2.5 rounded-xl hover:bg-neutral-50 transition-colors">
                        <p className="font-bold text-neutral-900">Application deadline reminder</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">Digital bookkeeping cohort closes in 4 days.</p>
                        <span className="text-[9px] text-neutral-400 mt-1 block">Yesterday</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Time / Clock Icon */}
              <button
                onClick={() => handleNavClick('training')}
                className="w-9 h-9 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer shadow-2xs"
                title="Upcoming Schedule"
              >
                <Clock className="w-4 h-4" />
              </button>

              {/* User Profile Badge (RS + Rural Sphere Foundation + Verified partner) */}
              <div className="relative">
                <div
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-full bg-white border border-neutral-200/90 hover:border-neutral-300 transition-all cursor-pointer shadow-2xs select-none"
                >
                  {/* Initials Avatar */}
                  <div className="w-8 h-8 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-2xs">
                    {ngoProfile.initials || 'RS'}
                  </div>

                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-neutral-900 leading-tight">
                      {ngoProfile.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{ngoProfile.status || 'Verified partner'}</span>
                    </span>
                  </div>
                </div>

                {/* Profile menu dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 text-xs">
                    <div className="p-2 border-b border-neutral-100">
                      <div className="font-bold text-neutral-900">{ngoProfile.name}</div>
                      <div className="text-[10px] text-neutral-400">{ngoProfile.workEmail}</div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleNavClick('profile');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-orange-50 hover:text-orange-600 font-semibold flex items-center gap-2"
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Organization Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onGoHome();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 font-semibold flex items-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Public Portal View</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-neutral-100">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
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

          {/* Page Body View */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}
