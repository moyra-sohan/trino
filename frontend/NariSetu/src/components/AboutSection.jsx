import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AboutSection({
  content,
  onNavigate,
  onOpenAuth
}) {
  const about = content?.about || {};

  const getStepIcon = (title) => {
    const t = (title || '').toLowerCase();
    if (t.includes('survey') || t.includes('सर्वे')) return '📋';
    if (t.includes('register') || t.includes('पंजी')) return '📝';
    if (t.includes('join') || t.includes('जुड़')) return '🤝';
    if (t.includes('inform') || t.includes('सूचना')) return '📢';
    if (t.includes('hire') || t.includes('उत्पाद')) return '🛍️';
    return '📊';
  };

  const steps = about.steps || [];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#fdfaf6] border-b border-amber-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs uppercase tracking-wider">
            {about.badge || '02. ABOUT US'}
          </span>
        </div>

        {/* 2-Column Intro: Text on left, Mosaic of User Photos on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Heading and narrative */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              {about.heading || 'Empowering Rural Indian Women Through Technology'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              {about.description || 'NariSetu bridges the divide between rural craftswomen and national economic opportunities. By blending grassroots community mobilization with accessible digital tools, we ensure no woman is left behind.'}
            </p>
            <div>
              <button
                onClick={() => onOpenAuth('citizen')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
              >
                <span>{about.cta || 'Explore Our Mission'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Mosaic with User Provided Images */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Photo 1: Rural Women Handloom Weaving */}
              <div className="relative group overflow-hidden rounded-3xl shadow-lg border border-amber-200/60 bg-amber-100">
                <img
                  src="/images/weaving.jpg"
                  alt="Rural women handloom weaving"
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold leading-snug">
                  Traditional Handloom & Textile Weaving
                </div>
              </div>

              {/* Photo 2: User Provided SHG Meeting with Papers (women_meeting.jpg) */}
              <div className="relative group overflow-hidden rounded-3xl shadow-lg border border-amber-200/60 bg-amber-100">
                <img
                  src="/images/women_meeting.jpg"
                  alt="Self Help Group women meeting in village with documents"
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold leading-snug">
                  Grassroots Self-Help Group (SHG) Network
                </div>
              </div>

              {/* Photo 3: User Provided Circle of Hands looking to Sky (hands_circle.jpg) */}
              <div className="sm:col-span-2 relative group overflow-hidden rounded-3xl shadow-xl border border-amber-200/60 bg-amber-100">
                <img
                  src="/images/hands_circle.jpg"
                  alt="Circle of women hands extended together"
                  className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <div className="text-sm sm:text-base font-extrabold">Collective Empowerment & Community Solidarity</div>
                    <div className="text-xs text-amber-200/90 font-medium">Over 18,400 village federations united nationwide</div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                    Verified Field Metric
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* TERRACOTTA STORY & VISION BOX (WITH ORNAMENTAL BORDER) */}
        {/* ========================================================= */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#9c3f25] via-[#b4482c] to-[#7f2d18] text-white shadow-2xl relative overflow-hidden border-2 border-amber-400/40 mb-20">
          
          {/* Subtle Traditional Indian Paisley/Arch Watermark */}
          <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none transform translate-x-16 -translate-y-16">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C70 20 100 40 100 70 C100 86 86 100 70 100 C50 100 40 85 40 70 C40 50 60 40 50 20 C45 30 35 40 30 50 C25 60 25 70 25 70 C25 80 18 85 10 85 C4 85 0 80 0 70 C0 40 30 20 50 0 Z" />
            </svg>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/30 text-amber-200 border border-amber-300/30 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vision & Ancestral Heritage</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              {about.storyTitle || 'Our Story & Vision'}
            </h3>

            <p className="text-sm sm:text-base lg:text-lg text-amber-100/90 leading-relaxed font-normal">
              {about.storyText || "Originating as a nationwide grassroots bridge ('Setu'), NariSetu was designed to honor the ancestral skills of Indian women—from handloom weaving and handicraft to modern agritech and food processing. We bring bank officers, digital literacy mentors, and verified market buyers straight to the village doorstep."}
            </p>

            {/* Pills Wrap from Wireframe */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
              {(about.pills || []).map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate('schemes')}
                  className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-md active:scale-95 cursor-pointer shadow-sm"
                >
                  ✨ {pill}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* HOW NARISETU WORKS (6-STEP IDEA FLOW) - CLEAN & STATIC */}
        {/* ========================================================= */}
        <div className="text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">
            {about.stepsTitle || 'How NariSetu Works (6-Step Idea Flow)'}
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto mb-12">
            {about.stepsSubtitle || 'From initial doorstep survey to sustained monthly income generation'}
          </p>

          {/* Static, easy-to-understand step cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 relative">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border border-amber-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center relative"
              >
                {/* Arrow connector between steps on desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-10 z-10 w-6 h-6 rounded-full bg-amber-100 border border-amber-300 items-center justify-center text-amber-800 text-[10px] font-black shadow-xs">
                    →
                  </div>
                )}

                {/* Step Icon & Number Badge */}
                <div className="relative mb-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shadow-xs">
                    <span>{getStepIcon(st.title)}</span>
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-black flex items-center justify-center shadow-xs">
                    {st.num}
                  </span>
                </div>

                {/* Step Title */}
                <h4 className="font-extrabold text-base text-neutral-900 mb-2">
                  {st.title}
                </h4>

                {/* Complete, fully legible description with no truncation */}
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Simple informative grassroots note banner */}
          <div className="mt-8 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 max-w-2xl mx-auto text-xs text-amber-900 leading-relaxed flex items-center justify-center gap-2">
            <span>💡</span>
            <span><strong>Easy Doorstep Process:</strong> Complete any of these 6 steps in your village panchayat with your local Gram Sahayika—no smartphone or prior computer skills required.</span>
          </div>

        </div>

      </div>
    </section>
  );
}
