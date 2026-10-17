import React, { useState } from 'react';

export default function SchemesSection({
  content,
  lang,
  onApplyScheme,
  onShowToast
}) {
  const { schemes } = content;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(schemes.categories[0]);
  const [speakingId, setSpeakingId] = useState(null);

  // Filter schemes by category and search term
  const filteredSchemes = schemes.list.filter((scheme) => {
    const matchesCategory =
      selectedCategory === schemes.categories[0] ||
      scheme.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      scheme.secondaryTag.toLowerCase().includes(selectedCategory.toLowerCase());

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      scheme.title.toLowerCase().includes(q) ||
      scheme.category.toLowerCase().includes(q) ||
      scheme.secondaryTag.toLowerCase().includes(q) ||
      scheme.highlights.some((h) => h.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // Real Web Speech API text-to-speech for Voice Help
  const handleVoiceHelp = (scheme) => {
    if (!('speechSynthesis' in window)) {
      onShowToast("Voice readout is not supported by your browser.");
      return;
    }

    if (speakingId === scheme.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setSpeakingId(scheme.id);

    const utterance = new SpeechSynthesisUtterance(scheme.audioScript || scheme.title);
    utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'bn' ? 'bn-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => {
      setSpeakingId(null);
    };

    utterance.onerror = () => {
      setSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
    onShowToast(`🔊 Reading aloud: ${scheme.title}`);
  };

  return (
    <section id="schemes" className="schemes-section">
      <div className="schemes-container">
        {/* Header Section */}
        <div className="schemes-header">
          <div>
            <span className="schemes-badge">{schemes.badge}</span>
          </div>
          <h2 className="schemes-heading">{schemes.heading}</h2>

          {/* Live Search Input Field */}
          <div className="schemes-search-bar">
            <input
              type="text"
              className="search-input-field"
              placeholder={schemes.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search schemes"
            />
            {searchQuery ? (
              <button
                className="search-submit-icon"
                onClick={() => setSearchQuery('')}
                title="Clear search"
                style={{ background: '#ef4444' }}
              >
                ✕
              </button>
            ) : (
              <div className="search-submit-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="category-pills-row">
            {schemes.categories.map((cat, idx) => (
              <button
                key={idx}
                className={`cat-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Cards Grid */}
        <div className="schemes-cards-grid">
          {filteredSchemes.map((item) => (
            <div key={item.id} className="scheme-card">
              <div>
                {/* Category Tags */}
                <div className="scheme-tags-row">
                  <span className="scheme-tag tag-orange">{item.category}</span>
                  <span className="scheme-tag tag-teal">{item.secondaryTag}</span>
                  {item.popular && (
                    <span className="scheme-tag" style={{ background: '#fef08a', color: '#854d0e' }}>
                      ⭐ High Demand
                    </span>
                  )}
                </div>

                {/* Scheme Title */}
                <h3 className="scheme-title">{item.title}</h3>

                {/* Amount / Benefit Banner */}
                <div className="scheme-amount-banner">
                  🎁 {item.amount}
                </div>

                {/* Eligibility Highlights */}
                <div className="eligibility-box">
                  <div className="eligibility-label">Eligibility &amp; Highlights</div>
                  <ul className="eligibility-list">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="eligibility-item">
                        <span className="check-icon">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons: Apply Now & Voice Help */}
              <div className="scheme-actions-row">
                <button
                  className="scheme-apply-btn"
                  onClick={() => onApplyScheme(item)}
                >
                  {schemes.applyBtn} →
                </button>
                <button
                  className={`scheme-voice-btn ${speakingId === item.id ? 'speaking' : ''}`}
                  onClick={() => handleVoiceHelp(item)}
                  title="Listen to scheme summary"
                >
                  <span>{speakingId === item.id ? '⏹️' : '🔊'}</span>
                  <span>{schemes.voiceHelpBtn}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '3rem 1.5rem',
            textAlign: 'center',
            color: '#ffffff'
          }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#fef08a' }}>
              🔍 No schemes found matching "{searchQuery}"
            </p>
            <p style={{ fontSize: '0.9rem', color: '#a7f3d0' }}>
              Try searching for "Lakhpati", "Weaving", "Loan", or select "All Schemes".
            </p>
            <button
              className="cat-pill-btn active"
              style={{ marginTop: '1.5rem' }}
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(schemes.categories[0]);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
