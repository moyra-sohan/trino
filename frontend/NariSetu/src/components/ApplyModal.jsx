import React, { useState } from 'react';

export default function ApplyModal({
  isOpen,
  onClose,
  scheme,
  lang,
  onShowToast
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    aadhaar: '',
    phone: '',
    village: '',
    skill: 'Handloom & Weaving',
    shgName: ''
  });
  const [submittedAppId, setSubmittedAppId] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Please fill in applicant name and phone number.");
      return;
    }

    const randomId = `NS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedAppId(randomId);
    onShowToast(`🎉 Application submitted successfully! Reference: ${randomId}`);
  };

  const handleReset = () => {
    setSubmittedAppId(null);
    setFormData({
      fullName: '',
      aadhaar: '',
      phone: '',
      village: '',
      skill: 'Handloom & Weaving',
      shgName: ''
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '1.5rem' }}>✍️</span>
            <div>
              <h3 className="modal-title">
                {lang === 'hi' ? 'योजना हेतु ऑनलाइन आवेदन' : lang === 'bn' ? 'স্কিমে অনলাইন আবেদন' : 'Apply for Government Scheme'}
              </h3>
              <p className="modal-subtitle">
                {scheme?.title || 'NariSetu Direct Livelihood Scheme'}
              </p>
            </div>
          </div>
        </div>

        <div className="modal-body">
          {submittedAppId ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1.25rem'
              }}>
                ✓
              </div>
              <h4 style={{ fontSize: '1.35rem', color: '#15803d', fontWeight: '800', marginBottom: '0.5rem' }}>
                {lang === 'hi' ? 'आवेदन सफलतापूर्वक जमा हुआ!' : lang === 'bn' ? 'আবেদন সফলভাবে জমা হয়েছে!' : 'Application Successfully Submitted!'}
              </h4>
              <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                {lang === 'hi'
                  ? 'आपके पंजीकृत मोबाइल पर पुष्टिकरण एसएमएस भेज दिया गया है।'
                  : 'An SMS confirmation has been sent to your registered mobile number.'}
              </p>

              <div style={{
                background: '#f8fafc',
                border: '1.5px dashed #cbd5e1',
                padding: '1.25rem',
                borderRadius: '12px',
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>
                  Application Tracking Number
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ea580c', letterSpacing: '0.05em', marginTop: '0.25rem' }}>
                  {submittedAppId}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#047857', marginTop: '0.5rem', fontWeight: '600' }}>
                  🏛️ Assigned to: Gram Panchayat Operator (Smt. Pooja Devi)
                </div>
              </div>

              <button className="form-submit-btn" onClick={handleReset}>
                Done / पूरा हुआ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Selected Scheme Banner */}
              <div style={{
                background: '#fff7ed',
                border: '1px solid #fed7aa',
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#9a3412', fontWeight: '700' }}>SELECTED SCHEME</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#7c2d12' }}>{scheme?.title}</div>
                </div>
                <span style={{ fontSize: '0.82rem', background: '#ecfdf5', color: '#065f46', padding: '0.25rem 0.6rem', borderRadius: '6px', fontWeight: '700' }}>
                  {scheme?.amount || 'Full Grant'}
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {lang === 'hi' ? 'आवेदिका का पूरा नाम *' : lang === 'bn' ? 'আবেদনকারিণীর পুরো নাম *' : 'Applicant Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anita Devi / अनिता देवी"
                  className="form-input"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">
                    {lang === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">
                    {lang === 'hi' ? 'आधार संख्या (वैकल्पिक)' : 'Aadhaar No. (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX"
                    className="form-input"
                    value={formData.aadhaar}
                    onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">
                    {lang === 'hi' ? 'गाँव / ग्राम पंचायत' : 'Village / Panchayat'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rampur Gram"
                    className="form-input"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">
                    {lang === 'hi' ? 'कौशल विधा' : 'Skill Domain'}
                  </label>
                  <select
                    className="form-select"
                    value={formData.skill}
                    onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                  >
                    <option value="Handloom & Weaving">Handloom &amp; Weaving</option>
                    <option value="Tailoring & Boutique">Tailoring &amp; Stitching</option>
                    <option value="Handicrafts & Pottery">Handicrafts &amp; Pottery</option>
                    <option value="Food Processing & Pickles">Food Processing &amp; Pickles</option>
                    <option value="Drone Pilot & Agritech">Drone Pilot &amp; Agritech</option>
                    <option value="Dairy & Livestock">Dairy &amp; Animal Husbandry</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {lang === 'hi' ? 'स्वयं सहायता समूह (SHG) का नाम (यदि सदस्य हैं)' : 'Self-Help Group (SHG) Name (Optional)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maa Durga Mahila Mandal"
                  className="form-input"
                  value={formData.shgName}
                  onChange={(e) => setFormData({ ...formData, shgName: e.target.value })}
                />
              </div>

              <button type="submit" className="form-submit-btn">
                {lang === 'hi' ? 'आवेदन पत्र जमा करें →' : lang === 'bn' ? 'আবেদন পত্র জমা দিন →' : 'Submit Application Form →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
