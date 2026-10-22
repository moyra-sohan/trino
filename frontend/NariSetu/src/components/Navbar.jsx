import React, { useState } from 'react';
import { 
  Globe, User, LogOut, LayoutDashboard, Menu, X, 
  Sparkles, Check, ChevronDown 
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
  onGoHome
}) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nav = content?.nav || {};

  const roleBadgeConfig = {
    user: { label: 'Artisan / Citizen', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    operator: { label: 'Field Mitra', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    admin: { label: 'Admin / Govt', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  };

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
    <header className="sticky top-0 z-40 bg-[#fffdfa]/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* --- BRAND / LOGO --- */}
          <div 
            onClick={onGoHome}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            {/* "na" App Icon Logo */}
            <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img
                src="/images/na_icon.png"
                alt="NariSetu na Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-neutral-900 group-hover:text-amber-900 transition-colors">
                  Nari<span className="text-[#ea580c]">Setu</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded border border-amber-200">
                  Govt Mandate
                </span>
              </div>
              <span className="text-[11px] font-medium text-neutral-500 hidden sm:block truncate max-w-xs">
                {nav.tagline || 'Skilled Women | Stronger Communities | Brighter Future'}
              </span>
            </div>
          </div>

          {/* --- DESKTOP NAV LINKS --- */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-[15px] font-semibold text-neutral-700 hover:text-[#ea580c] transition-colors relative py-1 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* --- RIGHT UTILITIES & AUTH --- */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Font Resize Accessibility Controls: A- A A+ */}
            <div className="hidden sm:flex items-center bg-neutral-100/80 rounded-xl p-0.5 border border-neutral-200/80 text-neutral-700">
              <button
                onClick={() => onChangeFontScale('small')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  fontScale === 'small' ? 'bg-white shadow-xs text-neutral-900 font-extrabold' : 'hover:bg-neutral-200/60'
                }`}
                title="Decrease font size"
              >
                A-
              </button>
              <button
                onClick={() => onChangeFontScale('normal')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  fontScale === 'normal' ? 'bg-white shadow-xs text-neutral-900 font-extrabold' : 'hover:bg-neutral-200/60'
                }`}
                title="Default font size"
              >
                A
              </button>
              <button
                onClick={() => onChangeFontScale('large')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  fontScale === 'large' ? 'bg-white shadow-xs text-neutral-900 font-extrabold' : 'hover:bg-neutral-200/60'
                }`}
                title="Increase font size"
              >
                A+
              </button>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100/70 transition-colors cursor-pointer"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-amber-700" />
                <span className="uppercase font-bold">{lang}</span>
                <ChevronDown className="w-3 h-3 text-amber-600" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1">
                    Select Dialect / भाषा
                  </div>
                  {availableLanguages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onChangeLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors cursor-pointer ${
                        lang === l.code
                          ? 'bg-amber-500 text-white font-bold'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.native}</span>
                        <span className="text-[10px] opacity-75">({l.label})</span>
                      </span>
                      {lang === l.code && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Button or Dashboard */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateSection('dashboard')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer ${
                    currentView === 'dashboard'
                      ? 'bg-amber-600 text-white'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Portal</span>
                </button>

                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-2 rounded-xl text-neutral-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('citizen')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login / लॉगिन</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* --- MOBILE ACCORDION MENU --- */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200/60 bg-white/98 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left px-3 py-2.5 rounded-xl font-bold text-sm text-neutral-800 bg-amber-50/50 hover:bg-amber-100 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('citizen');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#ea580c] text-white font-bold text-xs shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Login / लॉगिन</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
