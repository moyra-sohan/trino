import React, { useState } from 'react';

export default function HelpSection({
  content,
  onOpenVoice,
  onOpenCscLocator,
  onShowToast
}) {
  const { help } = content;
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const handlePhoneCall = () => {
    onShowToast("📞 Dialing Toll-Free Helpline: 1800-200-6274 (1800-200-NARI)");
    window.location.href = "tel:18002006274";
  };

  const handleWhatsApp = () => {
    onShowToast("💬 Connecting to NariSetu 24x7 WhatsApp Assistant...");
    window.open("https://wa.me/919876543210?text=Namaste%20NariSetu%20Sahayika", "_blank");
  };

  return (
    <section id="help" className="help-section">
      <div className="help-container">
        {/* Help Header */}
        <div className="help-header">
          <div>
            <span className="section-badge-header">{help.badge}</span>
          </div>
          <h2 className="help-heading">{help.heading}</h2>

          {/* Large Tap to Speak Voice Assist Button from Wireframe */}
          <div>
            <button
              className="tap-to-speak-cta"
              onClick={onOpenVoice}
              title="Click to speak your question"
            >
              <div className="tap-icon-pulse">🎙️</div>
              <span>{help.tapToSpeak}</span>
            </button>
          </div>

          <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '640px', margin: '0 auto' }}>
            {help.subheading}
          </p>
        </div>

        {/* 2-Column Split: Visual FAQs on left, Talk to a Sahayika on right */}
        <div className="help-grid-split">
          {/* Left: Visual FAQs */}
          <div className="faqs-col">
            <h3 className="faqs-title">
              <span>📋</span>
              <span>{help.faqsTitle}</span>
            </h3>

            <div className="faq-accordion">
              {help.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      className="faq-question-btn"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ color: '#ea580c', fontWeight: '800' }}>Q{idx + 1}.</span>
                        <span>{faq.q}</span>
                      </div>
                      <span className="faq-chevron">▼</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer-panel">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Talk to a Sahayika / Village Operator */}
          <div className="sahayika-card">
            <div className="sahayika-avatar-wrap">
              <img
                src="/images/narisetu_emblem.jpg"
                alt="Sahayika Avatar"
                className="sahayika-avatar"
                style={{ padding: '2px', background: '#fff' }}
              />
              <div className="sahayika-verified-badge" title="Certified Village Mitra">
                ✓
              </div>
            </div>

            <div className="sahayika-card-title">{help.sahayikaCard.title}</div>
            <div className="sahayika-name">{help.sahayikaCard.name}</div>
            <div className="sahayika-role">
              <span>📍 {help.sahayikaCard.role}</span>
              <span style={{ display: 'block', color: '#16a34a', fontWeight: '700', marginTop: '2px' }}>
                🟢 {help.sahayikaCard.badge}
              </span>
            </div>

            <div className="sahayika-buttons-list">
              {/* Phone Support */}
              <button
                className="contact-channel-btn btn-phone"
                onClick={handlePhoneCall}
              >
                <span style={{ fontSize: '1.25rem' }}>📞</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem' }}>{help.sahayikaCard.phoneLabel}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{help.sahayikaCard.phoneNum}</div>
                </div>
              </button>

              {/* WhatsApp Support */}
              <button
                className="contact-channel-btn btn-wa"
                onClick={handleWhatsApp}
              >
                <span style={{ fontSize: '1.25rem' }}>💬</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem' }}>{help.sahayikaCard.waLabel}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>{help.sahayikaCard.waNum}</div>
                </div>
              </button>

              {/* Nearest CSC locator */}
              <button
                className="contact-channel-btn btn-locate"
                onClick={onOpenCscLocator}
              >
                <span style={{ fontSize: '1.25rem' }}>📍</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem' }}>{help.sahayikaCard.locateLabel}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Search by PIN or Village Panchayat</div>
                </div>
              </button>
            </div>

            <div className="sahayika-note">
              ⏰ {help.sahayikaCard.note}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
