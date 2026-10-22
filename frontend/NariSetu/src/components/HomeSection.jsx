import React from 'react';
import { 
  User, Users, Landmark, GraduationCap, Briefcase, 
  TrendingUp, ShieldCheck, ArrowRight, Sparkles 
} from 'lucide-react';

export default function HomeSection({
  content,
  onOpenAuth,
  onShowToast,
  onNavigate
}) {
  const hero = content?.hero || {};
  const features = content?.features || [];
  const stats = content?.stats || [];
  const cards = hero?.cards || [];

  const getFeatureIcon = (iconName) => {
    switch (iconName) {
      case 'graduation-cap':
        return <GraduationCap className="w-6 h-6 text-amber-600" />;
      case 'briefcase':
        return <Briefcase className="w-6 h-6 text-blue-600" />;
      case 'users':
        return <Users className="w-6 h-6 text-purple-600" />;
      case 'landmark':
        return <Landmark className="w-6 h-6 text-emerald-600" />;
      case 'trending-up':
        return <TrendingUp className="w-6 h-6 text-rose-600" />;
      case 'shield-check':
      default:
        return <ShieldCheck className="w-6 h-6 text-teal-600" />;
    }
  };

  const roleCardStyles = {
    pink: {
      cardBg: 'bg-white/95 hover:bg-white border-rose-200 hover:border-rose-400 shadow-rose-900/5',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
      iconBox: 'bg-rose-50 text-rose-700',
      btn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
    },
    blue: {
      cardBg: 'bg-white/95 hover:bg-white border-blue-200 hover:border-blue-400 shadow-blue-900/5',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
      iconBox: 'bg-blue-50 text-blue-700',
      btn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
    },
    green: {
      cardBg: 'bg-white/95 hover:bg-white border-emerald-200 hover:border-emerald-400 shadow-emerald-900/5',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconBox: 'bg-emerald-50 text-emerald-700',
      btn: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
    }
  };

  return (
    <section id="home" className="relative">
      
      {/* ========================================================= */}
      {/* HERO SECTION WITH USER-GIVEN BACKGROUND IMAGE (hero_bg.jpg) */}
      {/* ========================================================= */}
      <div className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden border-b border-amber-200/60">
        
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center lg:bg-right transition-all duration-700 scale-100"
          style={{ backgroundImage: `url('/images/hero_bg.jpg')` }}
        />

        {/* Ambient Gradient Overlay for Readability and Warmth */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/98 via-amber-50/90 to-amber-50/40 sm:to-amber-50/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-100/80 via-transparent to-amber-50/40" />

        {/* Decorative Indian Mandala Motif (Subtle Top-Right Watermark) */}
        <div className="absolute -top-24 -right-24 w-96 h-96 opacity-15 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-orange-600 animate-spin" style={{ animationDuration: '120s' }}>
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
          
          {/* Main Hero Header */}
          <div className="max-w-3xl text-left">
            
            {/* Government Mandate Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/95 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold shadow-xs mb-4">
              <span className="text-sm">🏛️</span>
              <span>{hero.govBadge || 'Ministry of Rural Development & Skill India Initiative'}</span>
            </div>

            {/* Platform Brand Title Badge */}
            <div className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-[#ea580c] mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{hero.title || 'NariSetu'}</span>
            </div>

            {/* Subtitle / Big Value Proposition */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight sm:leading-tight">
              {hero.subTitle || 'Connecting Rural Women with Skills, Opportunities and a Stronger Tomorrow'}
            </h1>

            {/* Descriptive Paragraph */}
            <p className="mt-4 text-base sm:text-lg text-neutral-700 leading-relaxed font-normal max-w-2xl">
              {hero.description || 'A government-supported platform empowering rural women to master marketable skills, start self-reliant enterprises, and access financial schemes.'}
            </p>
          </div>

          {/* ========================================================= */}
          {/* 3 ROLE ACTION CARDS (EXACT MATCH TO WIREFRAME 01. HOME) */}
          {/* ========================================================= */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: For Women / Citizens */}
            {cards[0] && (
              <div className={`rounded-3xl p-6 sm:p-7 border backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${roleCardStyles.pink.cardBg}`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${roleCardStyles.pink.iconBox}`}>
                      <User className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${roleCardStyles.pink.badgeBg}`}>
                      {cards[0].badge}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-2">
                    {cards[0].title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                    {cards[0].desc}
                  </p>
                </div>

                <button
                  onClick={() => onOpenAuth('citizen')}
                  className={`w-full py-3 px-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${roleCardStyles.pink.btn}`}
                >
                  <span>{cards[0].action}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Card 2: For Community Support */}
            {cards[1] && (
              <div className={`rounded-3xl p-6 sm:p-7 border backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${roleCardStyles.blue.cardBg}`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${roleCardStyles.blue.iconBox}`}>
                      <Users className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${roleCardStyles.blue.badgeBg}`}>
                      {cards[1].badge}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-2">
                    {cards[1].title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                    {cards[1].desc}
                  </p>
                </div>

                <button
                  onClick={() => onOpenAuth('partner')}
                  className={`w-full py-3 px-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${roleCardStyles.blue.btn}`}
                >
                  <span>{cards[1].action}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Card 3: For Government */}
            {cards[2] && (
              <div className={`rounded-3xl p-6 sm:p-7 border backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${roleCardStyles.green.cardBg}`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${roleCardStyles.green.iconBox}`}>
                      <Landmark className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${roleCardStyles.green.badgeBg}`}>
                      {cards[2].badge}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-2">
                    {cards[2].title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                    {cards[2].desc}
                  </p>
                </div>

                <button
                  onClick={() => onOpenAuth('gov')}
                  className={`w-full py-3 px-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${roleCardStyles.green.btn}`}
                >
                  <span>{cards[2].action}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* Guest Access Link from Wireframe */}
          <div className="mt-8 text-center sm:text-left">
            <button
              onClick={() => {
                onShowToast("Browsing as Guest. You have full access to view schemes and resources!");
                onNavigate('schemes');
              }}
              className="inline-flex items-center gap-2 font-bold text-sm text-neutral-800 hover:text-[#ea580c] transition-colors underline underline-offset-4 decoration-amber-400 cursor-pointer"
            >
              <span>{hero.guestLink || 'Continue as Guest →'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 6 KEY BENEFITS / FEATURES STRIP (CRISP WHITE AS IN WIREFRAME) */}
      {/* ========================================================= */}
      <div className="bg-white py-12 sm:py-16 border-b border-neutral-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {features.map((feat, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-amber-50/40 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
                  {getFeatureIcon(feat.icon)}
                </div>
                <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-amber-800 transition-colors mb-1">
                  {feat.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-snug">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* IMPACT METRICS STRIP */}
      {/* ========================================================= */}
      <div className="bg-gradient-to-r from-amber-900 via-[#8a3319] to-orange-950 text-white py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {stats.map((s, idx) => (
              <div key={idx} className="pt-3 lg:pt-0 px-4">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-200 tracking-tight">
                  {s.number}
                </div>
                <div className="text-xs sm:text-sm font-medium text-amber-100/80 mt-1 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
