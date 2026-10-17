import React from 'react';

export default function HomeSection({
  content,
  onOpenAuth,
  onShowToast,
  onNavigate
}) {
  const { hero, features, stats } = content;

  const renderFeatureIcon = (iconName) => {
    switch (iconName) {
      case 'graduation-cap':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        );
      case 'briefcase':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        );
      case 'users':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      case 'landmark':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="22" x2="21" y2="22"></line>
            <line x1="6" y1="18" x2="6" y2="11"></line>
            <line x1="10" y1="18" x2="10" y2="11"></line>
            <line x1="14" y1="18" x2="14" y2="11"></line>
            <line x1="18" y1="18" x2="18" y2="11"></line>
            <polygon points="12 2 20 7 4 7"></polygon>
          </svg>
        );
      case 'trending-up':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
        );
      case 'shield-check':
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        );
    }
  };

  return (
    <>
      <section id="home" className="hero-section" style={{ backgroundImage: `url('/images/hero_bg.jpg')` }}>
        <div className="hero-overlay"></div>

      {/* Traditional Indian Mandala Background Motif */}
      <svg className="hero-pattern-mandala" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="#ea580c" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="#ea580c" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#ea580c" strokeWidth="2" />
      </svg>

      <div className="hero-container">
        {/* Main Hero Header */}
        <div className="hero-content">
          <div className="hero-gov-badge">
            <span>🏛️</span>
            <span>{hero.govBadge}</span>
          </div>
          <div className="hero-title-badge">
            {hero.title}
          </div>
          <h1 className="hero-heading">
            {hero.subTitle}
          </h1>
          <p className="hero-desc">
            {hero.description}
          </p>
        </div>

        {/* 3 Role Action Cards from Wireframe */}
        <div className="hero-cards-grid">
          {/* Card 1: For Women / Citizens */}
          <div className="role-card theme-pink">
            <div>
              <div className="role-header">
                <div className="role-icon-box" style={{ color: '#be123c', background: '#fff1f2' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="5"></circle>
                    <path d="M20 21a8 8 0 1 0-16 0"></path>
                  </svg>
                </div>
                <span className="role-badge">{hero.cards[0].badge}</span>
              </div>
              <h2 className="role-title">{hero.cards[0].title}</h2>
              <p className="role-desc">{hero.cards[0].desc}</p>
            </div>
            <button
              className="role-cta-btn"
              onClick={() => onOpenAuth('citizen')}
            >
              <span>{hero.cards[0].action}</span>
              <span>→</span>
            </button>
          </div>

          {/* Card 2: For Community Support */}
          <div className="role-card theme-blue">
            <div>
              <div className="role-header">
                <div className="role-icon-box" style={{ color: '#1d4ed8', background: '#eff6ff' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <span className="role-badge">{hero.cards[1].badge}</span>
              </div>
              <h2 className="role-title">{hero.cards[1].title}</h2>
              <p className="role-desc">{hero.cards[1].desc}</p>
            </div>
            <button
              className="role-cta-btn"
              onClick={() => onOpenAuth('partner')}
            >
              <span>{hero.cards[1].action}</span>
              <span>→</span>
            </button>
          </div>

          {/* Card 3: For Government */}
          <div className="role-card theme-green">
            <div>
              <div className="role-header">
                <div className="role-icon-box" style={{ color: '#047857', background: '#f0fdf4' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="22" x2="21" y2="22"></line>
                    <line x1="6" y1="18" x2="6" y2="11"></line>
                    <line x1="10" y1="18" x2="10" y2="11"></line>
                    <line x1="14" y1="18" x2="14" y2="11"></line>
                    <line x1="18" y1="18" x2="18" y2="11"></line>
                    <polygon points="12 2 20 7 4 7"></polygon>
                  </svg>
                </div>
                <span className="role-badge">{hero.cards[2].badge}</span>
              </div>
              <h2 className="role-title">{hero.cards[2].title}</h2>
              <p className="role-desc">{hero.cards[2].desc}</p>
            </div>
            <button
              className="role-cta-btn"
              onClick={() => onOpenAuth('gov')}
            >
              <span>{hero.cards[2].action}</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Guest Access Link */}
        <div className="hero-guest-wrap">
          <button
            className="guest-btn"
            onClick={() => {
              onShowToast("Browsing as Guest. You have full access to view schemes and resources!");
              onNavigate('schemes');
            }}
          >
            <span>{hero.guestLink}</span>
          </button>
        </div>
      </div>
    </section>

    {/* 6 Key Benefits / Features Strip (Opaque Crisp White Background as in Wireframe) */}
    <section className="features-strip">
      <div className="features-container">
        <div className="features-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="feature-item">
              <div className="feature-icon-circle">
                {renderFeatureIcon(feat.icon)}
              </div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Impact Numbers Ribbon */}
    <section className="impact-ribbon">
      <div className="impact-grid">
        {stats.map((s, idx) => (
          <div key={idx}>
            <div className="impact-stat-num">{s.number}</div>
            <div className="impact-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  </>
  );
}
