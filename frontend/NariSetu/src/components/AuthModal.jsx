import React, { useState, useEffect } from 'react';

export default function AuthModal({
  isOpen,
  onClose,
  initialRole = 'citizen',
  lang,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState(initialRole);
  const [mobileNum, setMobileNum] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  useEffect(() => {
    if (initialRole) {
      setActiveTab(initialRole);
    }
    setOtpSent(false);
    setOtpCode('');
  }, [initialRole, isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!mobileNum || mobileNum.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setOtpSent(true);
    onShowToast(`📲 OTP sent to +91 ${mobileNum}: 1234 (Demo OTP)`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode === '1234' || otpCode.length === 4) {
      onShowToast(`✅ Welcome! Logged in as ${activeTab.toUpperCase()}.`);
      onClose();
    } else {
      alert("Please enter OTP 1234.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        {/* Portal Role Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc'
        }}>
          <button
            style={{
              padding: '1rem 0.5rem',
              fontSize: '0.85rem',
              fontWeight: '700',
              color: activeTab === 'citizen' ? '#be123c' : '#64748b',
              background: activeTab === 'citizen' ? '#ffffff' : 'transparent',
              borderBottom: activeTab === 'citizen' ? '3px solid #be123c' : 'none'
            }}
            onClick={() => { setActiveTab('citizen'); setOtpSent(false); }}
          >
            👩 Women / Citizen
          </button>
          <button
            style={{
              padding: '1rem 0.5rem',
              fontSize: '0.85rem',
              fontWeight: '700',
              color: activeTab === 'partner' ? '#1d4ed8' : '#64748b',
              background: activeTab === 'partner' ? '#ffffff' : 'transparent',
              borderBottom: activeTab === 'partner' ? '3px solid #1d4ed8' : 'none'
            }}
            onClick={() => { setActiveTab('partner'); setOtpSent(false); }}
          >
            🤝 Community / NGO
          </button>
          <button
            style={{
              padding: '1rem 0.5rem',
              fontSize: '0.85rem',
              fontWeight: '700',
              color: activeTab === 'gov' ? '#047857' : '#64748b',
              background: activeTab === 'gov' ? '#ffffff' : 'transparent',
              borderBottom: activeTab === 'gov' ? '3px solid #047857' : 'none'
            }}
            onClick={() => { setActiveTab('gov'); setOtpSent(false); }}
          >
            🏛️ Government
          </button>
        </div>

        <div className="modal-header">
          <h3 className="modal-title">
            {activeTab === 'citizen' && (lang === 'hi' ? 'महिला व नागरिक पोर्टल' : 'Women & Artisan Portal')}
            {activeTab === 'partner' && (lang === 'hi' ? 'सामुदायिक सहयोगी व एनजीओ' : 'Community Partner / NGO Portal')}
            {activeTab === 'gov' && (lang === 'hi' ? 'सरकारी अधिकारी डैशबोर्ड' : 'Government & Panchayat Portal')}
          </h3>
          <p className="modal-subtitle">
            {activeTab === 'citizen' && 'Access training courses, schemes, and connect with peer artisans.'}
            {activeTab === 'partner' && 'Onboard beneficiaries, organize training cohorts and manage crafts orders.'}
            {activeTab === 'gov' && 'Monitor district progress, fund disbursements and verification queues.'}
          </p>
        </div>

        <div className="modal-body">
          {!otpSent ? (
            <form onSubmit={handleSendOtp}>
              <div className="form-group">
                <label className="form-label">
                  {activeTab === 'gov' ? 'Official Mobile / Government ID' : 'Mobile Number / मोबाइल नंबर *'}
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{
                    padding: '0.75rem 1rem',
                    background: '#f1f5f9',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: '#475569'
                  }}>
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="Enter 10 digit number"
                    className="form-input"
                    value={mobileNum}
                    onChange={(e) => setMobileNum(e.target.value)}
                  />
                </div>
              </div>

              {activeTab === 'gov' && (
                <div className="form-group">
                  <label className="form-label">Gram Panchayat / Block Code</label>
                  <input
                    type="text"
                    placeholder="e.g. GP-WB-24PGS-041"
                    className="form-input"
                  />
                </div>
              )}

              <button
                type="submit"
                className="form-submit-btn"
                style={{
                  background: activeTab === 'citizen'
                    ? 'linear-gradient(135deg, #e11d48, #be123c)'
                    : activeTab === 'partner'
                    ? 'linear-gradient(135deg, #2563eb, #1d4ed8)'
                    : 'linear-gradient(135deg, #059669, #047857)'
                }}
              >
                Get One-Time Password (OTP) →
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                marginBottom: '1.25rem',
                fontSize: '0.88rem',
                color: '#166534'
              }}>
                📨 Enter demo OTP: <strong>1234</strong> sent to +91 {mobileNum}
              </div>

              <div className="form-group">
                <label className="form-label">Enter 4-Digit OTP Code</label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  placeholder="1234"
                  className="form-input"
                  style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5em', fontWeight: '800' }}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="form-submit-btn"
                style={{
                  background: activeTab === 'citizen'
                    ? 'linear-gradient(135deg, #e11d48, #be123c)'
                    : activeTab === 'partner'
                    ? 'linear-gradient(135deg, #2563eb, #1d4ed8)'
                    : 'linear-gradient(135deg, #059669, #047857)'
                }}
              >
                Verify &amp; Enter Portal →
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button
                  type="button"
                  style={{ fontSize: '0.82rem', color: '#64748b', textDecoration: 'underline' }}
                  onClick={() => setOtpSent(false)}
                >
                  Change mobile number
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
