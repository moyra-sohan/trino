import React, { useState } from 'react';

export default function AboutSection({
  content,
  onNavigate,
  onOpenAuth
}) {
  const { about } = content;
  const [selectedStep, setSelectedStep] = useState(null);

  const getStepIcon = (title) => {
    switch (title.toLowerCase()) {
      case 'survey':
      case 'सर्वेक्षण':
      case 'সার্ভে':
        return '📋';
      case 'register':
      case 'पंजीकरण':
      case 'নিবন্ধন':
        return '📝';
      case 'join':
      case 'जुड़ें':
      case 'যুক্ত হন':
        return '🤝';
      case 'inform':
      case 'सूचनाएं':
      case 'তথ্য পান':
        return '📢';
      case 'hire & sell':
      case 'उत्पाद बिक्री':
      case 'উৎপাদন ও বিক্রি':
        return '🛍️';
      case 'report':
      case 'प्रगति रिपोर्ट':
      case 'রিপোর্ট':
      default:
        return '📊';
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Top Header Badge */}
        <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
          <span className="section-badge-header">{about.badge}</span>
        </div>

        {/* 2-Column Intro: Text on left, Mosaic on right */}
        <div className="about-hero-grid">
          <div className="about-text-col">
            <h2 className="about-heading">{about.heading}</h2>
            <p className="about-desc">{about.description}</p>
            <button
              className="about-cta-btn"
              onClick={() => onOpenAuth('citizen')}
            >
              <span>{about.cta}</span>
              <span>→</span>
            </button>
          </div>

          {/* Mosaic of user provided photos and weaving craft */}
          <div className="about-photos-mosaic">
            {/* Photo 1: Rural Women Handloom Weaving */}
            <div className="mosaic-card">
              <img
                src="/images/weaving.jpg"
                alt="Rural women weaving handloom sarees"
                className="mosaic-img"
              />
              <div className="mosaic-caption">Traditional Handloom & Textile Weaving</div>
            </div>

            {/* Photo 2: User provided SHG women meeting with papers */}
            <div className="mosaic-card">
              <img
                src="/images/women_meeting.jpg"
                alt="Self Help Group women meeting in village"
                className="mosaic-img"
              />
              <div className="mosaic-caption">Grassroots Self-Help Group (SHG) Network</div>
            </div>

            {/* Photo 3: User provided circle of hands looking to sky */}
            <div className="mosaic-card span-col">
              <img
                src="/images/hands_circle.jpg"
                alt="Unity of women hands reaching to the sky"
                className="mosaic-img"
              />
              <div className="mosaic-caption">Collective Empowerment & Community Solidarity</div>
            </div>
          </div>
        </div>

        {/* Terracotta Box: Our Story & Vision (with Indian decorative border) */}
        <div className="story-vision-box pattern-border-terracotta">
          <div className="story-ornament-border"></div>
          <div className="story-inner">
            <h3 className="story-title">{about.storyTitle}</h3>
            <p className="story-text">{about.storyText}</p>
            <div className="story-pills-wrap">
              {about.pills.map((pill, idx) => (
                <span
                  key={idx}
                  className="story-pill"
                  onClick={() => onNavigate('schemes')}
                  style={{ cursor: 'pointer' }}
                >
                  ✨ {pill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* How NariSetu Works (6-Step Idea Flow) */}
        <div className="flow-section-wrap">
          <h3 className="flow-title">{about.stepsTitle}</h3>
          <p className="flow-subtitle">{about.stepsSubtitle}</p>

          <div className="flow-steps-grid">
            {about.steps.map((st, idx) => (
              <div
                key={idx}
                className="flow-step-card"
                onClick={() => setSelectedStep(st)}
              >
                <div className="step-circle" title="Click to view details">
                  <span className="step-num">{st.num}</span>
                  <span className="step-icon-inner">{getStepIcon(st.title)}</span>
                </div>
                <h4 className="step-name">{st.title}</h4>
                <p className="step-desc">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step Details Modal if clicked */}
        {selectedStep && (
          <div className="modal-backdrop" onClick={() => setSelectedStep(null)}>
            <div className="modal-window" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
              <button className="modal-close-btn" onClick={() => setSelectedStep(null)}>✕</button>
              <div className="modal-header">
                <span className="step-num" style={{ fontSize: '1rem', color: '#ea580c' }}>
                  STEP {selectedStep.num}
                </span>
                <h3 className="modal-title" style={{ marginTop: '0.25rem' }}>
                  {selectedStep.title}
                </h3>
              </div>
              <div className="modal-body">
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#334155', marginBottom: '1.5rem' }}>
                  {selectedStep.desc}
                </p>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', color: '#64748b' }}>
                  💡 <strong>Village Tip:</strong> No internet? Your local Gram Panchayat Sahayika can complete this step on your behalf with physical documents or biometric verification.
                </div>
                <button
                  className="form-submit-btn"
                  style={{ marginTop: '1.5rem' }}
                  onClick={() => {
                    setSelectedStep(null);
                    onOpenAuth('citizen');
                  }}
                >
                  Proceed with {selectedStep.title}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
