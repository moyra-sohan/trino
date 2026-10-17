import React, { useState } from 'react';

export default function Navbar({
  lang,
  setLang,
  fontScale,
  setFontScale,
  activeSection,
  onNavigate,
  onOpenVoice,
  onOpenAuth,
  viewMode,
  setViewMode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम', labelBn: 'হোম', code: '01. HOME' },
    { id: 'about', labelEn: 'About', labelHi: 'हमारे बारे में', labelBn: 'আমাদের কথা', code: '02. ABOUT US' },
    { id: 'schemes', labelEn: 'Schemes & Support', labelHi: 'योजनाएं और सहायता', labelBn: 'স্কিম ও সহায়তা', code: '03. SCHEMES' },
    { id: 'help', labelEn: 'Help', labelHi: 'सहायता केंद्र', labelBn: 'সহায়তা কেন্দ্র', code: '04. HELP' },
  ];

  const getNavLabel = (item) => {
    if (lang === 'hi') return item.labelHi;
    if (lang === 'bn') return item.labelBn;
    return item.labelEn;
  };

  return (
    <>
      {/* Top Wireframe / View Mode Inspector Bar */}
      <div className="view-mode-bar">
        <div className="mode-label">
          <span>📐 Wireframe Framework View:</span>
          <span className="mode-pill">{viewMode === 'all' ? 'All Sections (Unified Flow)' : `Screen ${viewMode.toUpperCase()}`}</span>
        </div>
        <div className="mode-switcher">
          <button
            className={`view-mode-btn ${viewMode === 'all' ? 'active' : ''}`}
            onClick={() => setViewMode('all')}
            title="Inspect unified full landing page"
          >
            All Sections
          </button>
          <button
            className={`view-mode-btn ${viewMode === 'home' ? 'active' : ''}`}
            onClick={() => setViewMode('home')}
            title="Inspect Screen 01. HOME"
          >
            01. HOME
          </button>
          <button
            className={`view-mode-btn ${viewMode === 'about' ? 'active' : ''}`}
            onClick={() => setViewMode('about')}
            title="Inspect Screen 02. ABOUT US"
          >
            02. ABOUT US
          </button>
          <button
            className={`view-mode-btn ${viewMode === 'schemes' ? 'active' : ''}`}
            onClick={() => setViewMode('schemes')}
            title="Inspect Screen 03. SCHEMES & SUPPORT"
          >
            03. SCHEMES & SUPPORT
          </button>
          <button
            className={`view-mode-btn ${viewMode === 'help' ? 'active' : ''}`}
            onClick={() => setViewMode('help')}
            title="Inspect Screen 04. HELP"
          >
            04. HELP
          </button>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="navbar">
        <div className="nav-content">
          {/* Brand & App Icon */}
          <a
            href="#home"
            className="nav-brand"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
          >
            <img
              src="/images/na_icon.png"
              alt="NariSetu Na App Icon"
              className="app-logo-na"
            />
            <div className="brand-info">
              <div className="brand-title-wrap">
                <span className="brand-title">NariSetu</span>
                <span className="brand-indic">
                  {lang === 'bn' ? 'নারীসেতু' : 'नारीसेतु'}
                </span>
              </div>
              <span className="brand-tagline">
                {lang === 'hi'
                  ? 'कुशल नारी | सशक्त समुदाय | उज्ज्वल भविष्य'
                  : lang === 'bn'
                  ? 'দক্ষ নারী | শক্তিশালী সমাজ | উজ্জ্বল ভবিষ্যৎ'
                  : 'Skilled Women | Stronger Communities | Brighter Future'}
              </span>
            </div>
          </a>

          {/* Nav Items */}
          <nav>
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`nav-link-btn ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => onNavigate(item.id)}
                  >
                    {getNavLabel(item)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Utilities */}
          <div className="nav-tools">
            {/* Accessibility Font Resizer (A- A A+) */}
            <div className="font-scaler" title="Adjust Font Size / अक्षरों का आकार">
              <button
                className={`scaler-btn ${fontScale === 0.9 ? 'active' : ''}`}
                onClick={() => setFontScale(0.9)}
                title="Smaller Font (A-)"
              >
                A-
              </button>
              <button
                className={`scaler-btn ${fontScale === 1 ? 'active' : ''}`}
                onClick={() => setFontScale(1)}
                title="Default Font (A)"
              >
                A
              </button>
              <button
                className={`scaler-btn ${fontScale === 1.15 ? 'active' : ''}`}
                onClick={() => setFontScale(1.15)}
                title="Larger Font (A+)"
              >
                A+
              </button>
            </div>

            {/* Language Selector */}
            <div className="lang-select-wrap">
              <select
                className="lang-select"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                aria-label="Select Language"
              >
                <option value="en">🌐 English</option>
                <option value="hi">🌐 हिन्दी (Hindi)</option>
                <option value="bn">🌐 বাংলা (Bengali)</option>
              </select>
              <span className="lang-arrow">▼</span>
            </div>

            {/* Voice Assistant Button */}
            <button
              className="nav-voice-btn"
              onClick={onOpenVoice}
              title="Voice Assistant / आवाज से सहायता"
            >
              <span className="voice-pulse-dot"></span>
              <span>🎙️ {lang === 'hi' ? 'आवाज' : lang === 'bn' ? 'ভয়েস' : 'Voice'}</span>
            </button>

            {/* User Profile / Login */}
            <button
              className="nav-profile-btn"
              onClick={() => onOpenAuth('citizen')}
              title="Citizen / Partner / Official Login"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                style={{
                  textAlign: 'left',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: activeSection === item.id ? '#ea580c' : '#334155',
                  background: activeSection === item.id ? '#fff7ed' : 'transparent',
                  borderRadius: '8px'
                }}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
              >
                {getNavLabel(item)}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
