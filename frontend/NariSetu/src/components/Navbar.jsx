import React, { useState } from 'react';
import { 
  Globe, User, Users, LogOut, Menu, X, 
  Sparkles, Check, ChevronDown, MapPin, 
  Home, ArrowLeftRight, LayoutDashboard, Building2,
  Shield, ShieldCheck
} from 'lucide-react';

export default function Navbar({
  content,
  lang,
  onChangeLanguage,
  availableLanguages,
  fontScale,
  onChangeFontScale,
  onOpenAuth,
  currentUser,
  onLogout,
  onNavigateSection,
  currentView,
  onGoHome,
  simulateEmptyState,
  onToggleSimulateEmptyState
}) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const nav = content?.nav || {};
  const isWomanUser = currentUser && currentUser.role === 'user';
  const isPartnerUser = currentUser && (currentUser.role === 'partner' || currentUser.role === 'ngo');
  const isOperatorUser = currentUser && currentUser.role === 'operator';
  const isAdminUser = currentUser && currentUser.role === 'admin';
  const isStaffUser = currentUser && (currentUser.role === 'operator' || currentUser.role === 'admin');

  const navLinks = [
    { id: 'home', label: nav.home || 'Home' },
    { id: 'about', label: nav.about || 'About' },
    { id: 'schemes', label: nav.schemes || 'Schemes & Support' },
    { id: 'help', label: nav.help || 'Help' }
  ];

  const handleNavClick = (id) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* ========================================================= */}
          {/* BRAND / LOGO */}
          {/* ========================================================= */}
          <div 
            onClick={onGoHome}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
            title="NariSetu Home"
          >
            {/* NariSetu Brand Logo */}
            <img 
              src="/images/na_icon.png" 
              alt="NariSetu Logo" 
              className="w-10 h-10 rounded-2xl object-cover shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0" 
            />

            <div className="flex flex-col text-left">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 leading-tight">
                Nari<span className="text-[#ea580c]">Setu</span>
              </span>
              <span className="text-[11px] font-semibold text-neutral-500 hidden sm:block truncate max-w-xs">
                Empowerment Portal for Rural Artisans
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CENTER / RIGHT NAVIGATION */}
          {/* ========================================================= */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            
            {/* 1. PUBLIC LANDING NAV LINKS (Shown when not logged in or on landing home) */}
            {(!currentUser || currentView === 'home') && (
              <nav className="hidden lg:flex items-center gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#ea580c] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            )}

            {/* 2. LOGGED-IN WOMAN ARTISAN NAVIGATION (MATCHING SCREENSHOTS) */}
            {isWomanUser && (
              <>
                {/* Profile Tab Button */}
                <button
                  onClick={() => onNavigateSection('profile')}
                  className={`flex items-center gap-1.5 py-1 text-xs sm:text-sm font-bold transition-all cursor-pointer relative ${
                    currentView === 'profile'
                      ? 'text-[#ea580c] border-b-2 border-[#ea580c]'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>

                {/* Community Tab Button */}
                <button
                  onClick={() => onNavigateSection('community')}
                  className={`flex items-center gap-1.5 py-1 text-xs sm:text-sm font-bold transition-all cursor-pointer relative ${
                    currentView === 'community'
                      ? 'text-[#ea580c] border-b-2 border-[#ea580c]'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Community</span>
                </button>

                {/* Simulate: Empty State (Rendered in Community View matching Screenshot 2) */}
                {currentView === 'community' && (
                  <button
                    onClick={onToggleSimulateEmptyState}
                    className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                      simulateEmptyState
                        ? 'bg-orange-50 border-orange-400 text-[#ea580c]'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                    title="Toggle between populated chat stream and initial empty state"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Simulate: Empty State</span>
                  </button>
                )}

                {/* Woman User Profile Avatar & Badge */}
                <div className="relative">
                  <div 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2.5 cursor-pointer py-1 px-1.5 rounded-xl hover:bg-neutral-100 transition-colors select-none"
                    title={currentUser.name}
                  >
                    {/* Avatar with green online dot */}
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-neutral-200 shadow-2xs ring-1 ring-orange-500/20">
                        <img
                          src={currentUser.avatar || '/images/aparna_ghosh.jpg'}
                          alt={currentUser.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/images/login_bg_user.jpg';
                          }}
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                    </div>

                    {/* Show name + location in Community View matching Screenshot 2 */}
                    {currentView === 'community' && (
                      <div className="hidden sm:flex flex-col text-left">
                        <span className="text-xs font-black text-neutral-900 leading-tight">
                          {currentUser.name}
                        </span>
                        <span className="text-[10px] text-neutral-500 flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5 text-neutral-400" />
                          <span>{currentUser.location || 'Hanskhali, Nadia'}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 text-xs">
                      <div className="p-2 border-b border-neutral-100">
                        <div className="font-bold text-neutral-900">{currentUser.name}</div>
                        <div className="text-[11px] text-neutral-400">Rural Artisan • Nadia Cluster</div>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            onNavigateSection('profile');
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-orange-50 hover:text-[#ea580c] font-semibold flex items-center gap-2"
                        >
                          <User className="w-3.5 h-3.5" />
                          <span>Woman User Profile</span>
                        </button>

                        <button
                          onClick={() => {
                            onNavigateSection('community');
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-orange-50 hover:text-[#ea580c] font-semibold flex items-center gap-2"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>Community Chat</span>
                        </button>

                        <button
                          onClick={() => {
                            onGoHome();
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 font-semibold flex items-center gap-2"
                        >
                          <Home className="w-3.5 h-3.5" />
                          <span>Portal Home</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-neutral-100">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
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
              </>
            )}

            {/* 3. LOGGED-IN OPERATOR (FIELD DATA ENTRY CONSOLE) */}
            {isOperatorUser && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigateSection('operator')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-[#ea580c] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Operator Console</span>
                </button>

                <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
                  <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 border border-amber-300 flex items-center justify-center text-xs font-black shadow-2xs">
                    {currentUser.avatarInitials || 'RM'}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-neutral-900 leading-tight">
                      {currentUser.name || 'Smt. Rekha Mondal'}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Hanskhali Operator (OP-8492)</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 3B. LOGGED-IN ADMIN */}
            {isAdminUser && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigateSection('admin')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                  <span>Admin Console</span>
                </button>

                <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
                  <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center text-xs font-black shadow-2xs">
                    AD
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-neutral-900 leading-tight">
                      {currentUser.name || 'Platform Administrator'}
                    </span>
                    <span className="text-[10px] text-purple-700 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                      <span>Security & Governance</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 4. LOGGED-IN BUSINESS & NGO PARTNER (IMAGE 1-5 ENTITY) */}
            {isPartnerUser && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigateSection('ngo')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-[#ea580c] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>NGO Dashboard</span>
                </button>

                <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
                  <div className="w-8 h-8 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-xs font-black shadow-2xs">
                    {currentUser.initials || 'RS'}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-neutral-900 leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Verified partner</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 5. PUBLIC UTILITIES & LOGIN BUTTON (When NOT logged in) */}
            {!currentUser && (
              <>
                {/* Font Resize Accessibility Controls */}
                <div className="hidden sm:flex items-center bg-neutral-100/80 rounded-xl p-0.5 border border-neutral-200/80 text-neutral-700">
                  <button
                    onClick={() => onChangeFontScale?.('small')}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      fontScale === 'small' ? 'bg-white shadow-xs text-neutral-900 font-extrabold' : 'hover:bg-neutral-200/60'
                    }`}
                    title="Decrease font size"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => onChangeFontScale?.('normal')}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      fontScale === 'normal' ? 'bg-white shadow-xs text-neutral-900 font-extrabold' : 'hover:bg-neutral-200/60'
                    }`}
                    title="Default font size"
                  >
                    A
                  </button>
                  <button
                    onClick={() => onChangeFontScale?.('large')}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      fontScale === 'large' ? 'bg-white shadow-xs text-neutral-900 font-extrabold' : 'hover:bg-neutral-200/60'
                    }`}
                    title="Increase font size"
                  >
                    A+
                  </button>
                </div>

                {/* Language Selector */}
                <div className="relative">
                  <button
                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100/70 transition-colors cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-700" />
                    <span className="uppercase font-bold">{lang}</span>
                    <ChevronDown className="w-3 h-3 text-amber-600" />
                  </button>

                  {langDropdownOpen && availableLanguages && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-1.5 z-50">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1">
                        Select Dialect / भाषा
                      </div>
                      {availableLanguages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => {
                            onChangeLanguage?.(l.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors cursor-pointer ${
                            lang === l.code ? 'bg-amber-500 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          <span>{l.native}</span>
                          {lang === l.code && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Direct Business & NGO Portal Button */}
                <button
                  onClick={() => onOpenAuth('partner')}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-orange-300 bg-orange-50/80 hover:bg-orange-100/90 text-orange-900 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  title="Business & NGO Partner Portal"
                >
                  <Building2 className="w-3.5 h-3.5 text-orange-600" />
                  <span>Business & NGO</span>
                </button>

                {/* Direct Admin Console Button */}
                <button
                  onClick={() => onNavigateSection('admin')}
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100/90 text-[#064e3b] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  title="Administration Portal"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Admin Console</span>
                </button>

                {/* Prominent Login Button */}
                <button
                  onClick={() => onOpenAuth('citizen')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Login / लॉगिन</span>
                </button>
              </>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer ml-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE MENU */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200/80 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          
          {/* Mobile Language & Accessibility Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 gap-2">
            <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-bold">
              <Globe className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>Language:</span>
            </div>
            <div className="flex items-center gap-1">
              {availableLanguages?.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onChangeLanguage?.(l.code)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all cursor-pointer ${
                    lang === l.code ? 'bg-[#ea580c] text-white shadow-xs' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {l.native}
                </button>
              ))}
            </div>
          </div>

          {currentUser ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-orange-50/70 border border-orange-200">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={currentUser.avatar || '/images/aparna_ghosh.jpg'}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-orange-300"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-neutral-900 truncate">{currentUser.name}</div>
                    <div className="text-[10px] text-neutral-500 capitalize">{currentUser.role}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-600 font-bold px-3 py-1.5 rounded-xl hover:bg-rose-50 border border-rose-200/60 shrink-0"
                >
                  Sign Out
                </button>
              </div>

              {isWomanUser && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      onNavigateSection('profile');
                      setMobileMenuOpen(false);
                    }}
                    className={`p-3 rounded-2xl font-bold text-xs text-left flex items-center gap-2 transition-colors ${
                      currentView === 'profile' ? 'bg-[#ea580c] text-white shadow-sm' : 'bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigateSection('community');
                      setMobileMenuOpen(false);
                    }}
                    className={`p-3 rounded-2xl font-bold text-xs text-left flex items-center gap-2 transition-colors ${
                      currentView === 'community' ? 'bg-[#ea580c] text-white shadow-sm' : 'bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Community</span>
                  </button>
                </div>
              )}

              {isPartnerUser && (
                <div className="pt-1">
                  <button
                    onClick={() => {
                      onNavigateSection('ngo');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full p-3 rounded-2xl font-bold text-xs text-left flex items-center gap-2.5 bg-orange-100/80 text-[#ea580c] border border-orange-200 hover:bg-orange-200/70 transition-colors"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Business & NGO Dashboard</span>
                  </button>
                </div>
              )}

              {isAdminUser && (
                <div className="pt-1">
                  <button
                    onClick={() => {
                      onNavigateSection('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full p-3 rounded-2xl font-bold text-xs text-left flex items-center gap-2.5 bg-[#dcfce7] text-[#14532d] border border-emerald-200 hover:bg-emerald-200/70 transition-colors"
                  >
                    <Shield className="w-4 h-4 text-emerald-700" />
                    <span>Admin Console (Overview, Verifications)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-neutral-800 bg-neutral-50 hover:bg-neutral-100 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('partner');
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-3 rounded-2xl border border-orange-300 bg-orange-50 text-orange-950 font-bold text-xs shadow-2xs hover:bg-orange-100 transition-all cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-orange-600" />
                  <span>NGO Portal</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('citizen');
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Login / लॉगिन</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateSection('admin');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-950 font-bold text-xs shadow-2xs hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <Shield className="w-4 h-4 text-emerald-700" />
                <span>Admin Console</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
