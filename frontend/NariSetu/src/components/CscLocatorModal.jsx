import React, { useState } from 'react';

export default function CscLocatorModal({ isOpen, onClose, lang, onShowToast }) {
  const [pinCode, setPinCode] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const sampleCenters = [
    {
      id: 1,
      name: "Gram Panchayat Sahayata Kendra - Rampur",
      sahayika: "Smt. Pooja Devi (Lead Mitra)",
      phone: "+91 98765 43210",
      distance: "0.8 km from village center",
      address: "Panchayat Bhavan, Near Primary Health Center, Rampur",
      openHours: "Mon-Sat: 9:00 AM - 5:30 PM",
      services: ["Biometric Aadhaar", "Direct Scheme Apply", "Passbook Linking"]
    },
    {
      id: 2,
      name: "CSC Digital Seva Kendra - Block North",
      sahayika: "Smt. Sunita Murmu (VLE)",
      phone: "+91 98765 88990",
      distance: "2.4 km",
      address: "BDO Complex, Room 14, Main Road",
      openHours: "Mon-Sat: 9:30 AM - 6:00 PM",
      services: ["Micro-ATM Cash Withdrawal", "Loom Subsidy Form", "Certificate Print"]
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!pinCode) {
      alert("Please enter a 6-digit PIN code or district.");
      return;
    }
    setSearched(true);
    onShowToast(`📍 Found 2 verified centers near "${pinCode}"`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📍</span>
            <div>
              <h3 className="modal-title">
                {lang === 'hi' ? 'निकटतम सीएससी / ग्राम पंचायत केंद्र' : lang === 'bn' ? 'নিকটতম সিএসসি ও পঞ্চায়েত কেন্দ্র' : 'Find Nearest Village Kendra & Sahayika'}
              </h3>
              <p className="modal-subtitle">
                Locate verified doorstep assistance for schemes and paperless application
              </p>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="Enter 6-digit PIN code (e.g. 700001 or 110001)..."
              className="form-input"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
            <button
              type="submit"
              className="cat-pill-btn active"
              style={{ padding: '0.75rem 1.25rem', whiteSpace: 'nowrap' }}
            >
              Search Center
            </button>
          </form>

          {/* Results list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sampleCenters.map((c) => (
              <div
                key={c.id}
                style={{
                  border: '1.5px solid #fed7aa',
                  borderRadius: '12px',
                  padding: '1.15rem',
                  background: '#fffaf5',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#9a3412' }}>{c.name}</h4>
                  <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#15803d', fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '999px' }}>
                    {c.distance}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: '600', marginBottom: '0.35rem' }}>
                  👩 Sahayika in-charge: {c.sahayika}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  📍 {c.address}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#047857', fontWeight: '600', marginBottom: '0.75rem' }}>
                  🕒 {c.openHours}
                </div>

                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {c.services.map((s, idx) => (
                    <span key={idx} style={{ fontSize: '0.7rem', background: '#ffffff', border: '1px solid #fed7aa', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#9a3412' }}>
                      ✓ {s}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="scheme-apply-btn"
                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                    onClick={() => {
                      onShowToast(`Calling Kendra: ${c.phone}`);
                      window.location.href = `tel:${c.phone}`;
                    }}
                  >
                    📞 Call Operator
                  </button>
                  <button
                    className="guest-btn"
                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                    onClick={() => onShowToast(`Opening Google Maps direction to ${c.name}`)}
                  >
                    🗺️ Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
