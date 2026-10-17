import React, { useState, useEffect } from 'react';

export default function VoiceModal({ isOpen, onClose, lang, onShowToast }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [botReply, setBotReply] = useState('');

  const samplePrompts = {
    en: [
      "Tell me about Lakhpati Didi Yojana",
      "How can I get a free sewing machine?",
      "Who is my local Village Sahayika?",
      "What documents are required for artisan loan?"
    ],
    hi: [
      "मुझे लखपति दीदी योजना के बारे में बताएं",
      "मुफ्त सिलाई मशीन कैसे मिलेगी?",
      "मेरे गाँव की ग्राम सहायिका कौन हैं?",
      "कारीगर लोन के लिए कौन से कागजात चाहिए?"
    ],
    bn: [
      "লাখপতি দিদি যোজনা সম্পর্কে বলুন",
      "বিনামূল্যে সেলাই মেশিন কীভাবে পাব?",
      "আমার গ্রামের সহায়িকা কে?",
      "কারিগর লোনের জন্য কী কী কাগজ লাগবে?"
    ]
  };

  const currentPrompts = samplePrompts[lang] || samplePrompts.en;

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);
      setTranscript(
        lang === 'hi'
          ? "सुन रहे हैं... कृपया बोलें या नीचे दिए गए प्रश्न चुनें"
          : lang === 'bn'
          ? "শুনছি... অনুগ্রহ করে কথা বলুন অথবা নিচের প্রশ্নটি নির্বাচন করুন"
          : "Listening... Please speak or choose a question below"
      );
      setBotReply('');
    } else {
      setIsListening(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isOpen, lang]);

  const speakReply = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang === 'hi' ? 'hi-IN' : lang === 'bn' ? 'bn-IN' : 'en-IN';
      utter.rate = 0.95;
      window.speechSynthesis.speak(utter);
    }
  };

  const handleSelectPrompt = (p) => {
    setTranscript(`"${p}"`);
    setIsListening(false);

    let reply = "";
    if (p.includes("लखपति") || p.includes("Lakhpati") || p.includes("লাখপতি")) {
      reply = lang === 'hi'
        ? "लखपति दीदी योजना में स्वयं सहायता समूह की महिलाओं को 5 लाख रुपये तक का ब्याज मुक्त ऋण और सूक्ष्म उद्यम प्रशिक्षण दिया जाता है।"
        : lang === 'bn'
        ? "লাখপতি দিদি যোজনায় স্বনির্ভর দলের মহিলাদের ৫ লক্ষ টাকা পর্যন্ত জামানতহীন সহজ ঋণ ও ব্যবসা প্রশিক্ষণ দেওয়া হয়।"
        : "Lakhpati Didi Yojana provides up to 5 Lakh rupees in collateral-free credit along with micro-enterprise training for SHG women.";
    } else if (p.includes("सिलाई") || p.includes("sewing") || p.includes("সেলাই")) {
      reply = lang === 'hi'
        ? "सिलाई एवं बुनाई योजना में महिलाओं को मुफ्त मोटरयुक्त सिलाई मशीन और कपड़ा उद्योग से सीधे सिलाई के ऑर्डर मिलते हैं।"
        : lang === 'bn'
        ? "দর্জি ও তাঁত অনুদান প্রকল্পে সম্পূর্ণ বিনামূল্যে মোটর চালিত সেলাই মেশিন ও কাজের অর্ডার পাওয়া যায়।"
        : "The Tailoring & Weaving Grant scheme provides free motorized sewing machines and guaranteed supply contracts.";
    } else {
      reply = lang === 'hi'
        ? "आपकी नजदीकी ग्राम सहायिका श्रीमती पूजा देवी हैं। आप 1800-200-NARI पर कॉल करके भी सहायता ले सकती हैं।"
        : lang === 'bn'
        ? "আপনার নিকটবর্তী গ্রাম সহায়িকা শ্রীমতী পূজা দেবী। ১৮০০-২০০-NARI নম্বরে ফোন করেও সহায়তা পেতে পারেন।"
        : "Your nearest Village Sahayika is Smt. Pooja Devi. You can also dial toll-free 1800-200-NARI for immediate help.";
    }

    setBotReply(reply);
    speakReply(reply);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🎙️</span>
            <div>
              <h3 className="modal-title">
                {lang === 'hi' ? 'आवाज सहायक / Voice Help' : lang === 'bn' ? 'ভয়েস সহায়িকা' : 'NariSetu Voice Assistant'}
              </h3>
              <p className="modal-subtitle">
                {lang === 'hi'
                  ? 'अपनी मातृभाषा में बोलें या प्रश्न चुनें'
                  : lang === 'bn'
                  ? 'আপনার মাতৃভাষায় কথা বলুন বা প্রশ্ন নির্বাচন করুন'
                  : 'Speak naturally in Hindi, Bengali or English'}
              </p>
            </div>
          </div>
        </div>

        <div className="modal-body">
          {/* Soundwave Animation */}
          <div className="voice-wave-container">
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
          </div>

          {/* Transcript / Listening Bubble */}
          <div className="voice-transcript-bubble">
            {transcript}
          </div>

          {/* Assistant Voice Response */}
          {botReply && (
            <div style={{
              background: '#ecfdf5',
              border: '1.5px solid #a7f3d0',
              padding: '1.1rem',
              borderRadius: '12px',
              color: '#065f46',
              fontSize: '0.95rem',
              lineHeight: '1.5',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.65rem'
            }}>
              <span style={{ fontSize: '1.25rem' }}>🔊</span>
              <div>
                <strong>{lang === 'hi' ? 'सहायिका उत्तर:' : lang === 'bn' ? 'সহায়িকার উত্তর:' : 'Sahayika Voice:'}</strong>
                <p style={{ marginTop: '0.25rem', color: '#047857' }}>{botReply}</p>
              </div>
            </div>
          )}

          {/* Prompt Suggestions */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
              {lang === 'hi' ? 'सुझाए गए प्रश्न:' : lang === 'bn' ? 'প্রস্তাবিত প্রশ্নাবলী:' : 'Suggested Voice Queries:'}
            </div>
            <div className="voice-suggestions-wrap">
              {currentPrompts.map((p, idx) => (
                <button
                  key={idx}
                  className="voice-suggest-btn"
                  onClick={() => handleSelectPrompt(p)}
                >
                  💬 {p}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              className="guest-btn"
              onClick={() => {
                setIsListening(true);
                setBotReply('');
                setTranscript(
                  lang === 'hi' ? 'माइक्रोफोन सक्रिय... बोलें' : 'Microphone active... Speaking'
                );
              }}
            >
              🔄 {lang === 'hi' ? 'फिर से बोलें' : lang === 'bn' ? 'আবার বলুন' : 'Speak Again'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
