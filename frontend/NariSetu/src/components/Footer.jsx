import React from 'react';

export default function Footer({ content, onNavigate, onShowToast }) {
  const { footer } = content;

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Grid */}
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-brand-title">
              <img
                src="/images/na_icon.png"
                alt="NariSetu Logo"
                className="footer-logo-img"
              />
              <div>
                <div className="footer-name">NariSetu</div>
                <div className="footer-motto">
                  Empowering Rural Women | Building Stronger Rural Economies
                </div>
              </div>
            </div>
            <p className="footer-desc">
              {footer.brandDesc}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">{footer.columns.quickLinks}</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
                  Home (01. गृह)
                </a>
              </li>
              <li>
                <a href="#about" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>
                  About Us (02. हमारे बारे में)
                </a>
              </li>
              <li>
                <a href="#schemes" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('schemes'); }}>
                  Schemes &amp; Support (03. योजनाएं)
                </a>
              </li>
              <li>
                <a href="#help" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('help'); }}>
                  Help / Sahayata Kendra (04. सहायता केंद्र)
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Schemes */}
          <div>
            <h4 className="footer-col-title">{footer.columns.schemes}</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#schemes" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('schemes'); }}>
                  Lakhpati Didi Yojana
                </a>
              </li>
              <li>
                <a href="#schemes" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('schemes'); }}>
                  PM Vishwakarma for Artisans
                </a>
              </li>
              <li>
                <a href="#schemes" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('schemes'); }}>
                  Tailoring &amp; Weaving Grant
                </a>
              </li>
              <li>
                <a href="#schemes" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('schemes'); }}>
                  Namo Drone Didi Program
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="footer-col-title">{footer.columns.contact}</h4>
            <ul className="footer-links-list">
              <li style={{ color: '#d1d5db', fontSize: '0.85rem' }}>
                📞 <strong>Toll-Free:</strong> 1800-200-NARI (6274)
              </li>
              <li style={{ color: '#d1d5db', fontSize: '0.85rem' }}>
                💬 <strong>WhatsApp:</strong> +91 98765 43210
              </li>
              <li style={{ color: '#d1d5db', fontSize: '0.85rem' }}>
                ✉️ <strong>Email:</strong> help@narisetu.gov.in
              </li>
              <li style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                🏛️ Ministry of Rural Development, Krishi Bhawan, New Delhi
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>{footer.copyright}</div>

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <span
              style={{ cursor: 'pointer', color: '#9ca3af' }}
              onClick={() => onShowToast("Privacy policy conforms to Digital Personal Data Protection Act 2023.")}
            >
              {footer.privacy}
            </span>
            <span>•</span>
            <span
              style={{ cursor: 'pointer', color: '#9ca3af' }}
              onClick={() => onShowToast("Terms of service under National Rural Livelihood Mission (NRLM).")}
            >
              {footer.terms}
            </span>
          </div>

          {/* Social Icons */}
          <div className="footer-social-row">
            <button
              className="social-icon-link"
              title="Facebook"
              onClick={() => onShowToast("Visiting NariSetu Facebook Community")}
            >
              f
            </button>
            <button
              className="social-icon-link"
              title="YouTube"
              onClick={() => onShowToast("Visiting NariSetu Video Tutorials")}
            >
              ▶
            </button>
            <button
              className="social-icon-link"
              title="Instagram"
              onClick={() => onShowToast("Visiting NariSetu Rural Artisans Gallery")}
            >
              📸
            </button>
            <button
              className="social-icon-link"
              title="X (Twitter)"
              onClick={() => onShowToast("Visiting NariSetu on X")}
            >
              𝕏
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
