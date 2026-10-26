import React from 'react';
import { 
  Users, Landmark, GraduationCap, Briefcase, 
  TrendingUp, ShieldCheck, ArrowRight, Sparkles 
} from 'lucide-react';

export default function HomeSection({
  content,
  onOpenAuth,
  onShowToast,
  onNavigate,
  currentUser
}) {
  const hero = content?.hero || {};
  const features = content?.features || [];
  const stats = content?.stats || [];

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

  return (
    <section id="home" className="relative">
      
      {/* ========================================================= */}
      {/* HERO SECTION WITH USER-GIVEN BACKGROUND IMAGE (hero_bg.jpg) */}
      {/* ========================================================= */}
      <div className="relative min-h-[500px] lg:min-h-[580px] flex items-center justify-center overflow-hidden border-b border-amber-200/60">
        
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
            
            {/* Empowerment Initiative Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/95 border border-orange-300 text-orange-950 text-xs sm:text-sm font-bold shadow-xs mb-4">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>{hero.govBadge || 'Rural Women Livelihoods & Skill Development Initiative'}</span>
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
              {hero.description || 'A dedicated empowerment platform supporting rural women to master marketable skills, start self-reliant enterprises, and access community financial schemes.'}
            </p>

            {/* Hero CTA Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('schemes')}
                className="px-6 py-3.5 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-600/25 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>{content?.nav?.schemes || 'Find Welfare Schemes'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3.5 rounded-2xl bg-white/95 hover:bg-white text-neutral-800 font-bold text-sm sm:text-base border border-amber-300 shadow-sm transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>{content?.nav?.about || 'Explore Portals'}</span>
              </button>
            </div>

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
