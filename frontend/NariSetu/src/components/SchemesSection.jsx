import React from 'react';
import { Search, X, ArrowRight, Check } from 'lucide-react';
import { useSchemes } from '../hooks/useSchemes';

export default function SchemesSection({
  content,
  onApplyScheme
}) {
  const schemesData = content?.schemes || {};

  const {
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredSchemes
  } = useSchemes(schemesData);

  return (
    <section id="schemes" className="py-20 lg:py-28 bg-gradient-to-b from-[#0b332b] via-[#0d3b32] to-[#07241e] text-white relative overflow-hidden">
      
      {/* Decorative Indian Traditional Jaali Pattern Watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="jaali-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="20" fill="none" stroke="#fff" strokeWidth="1" />
            <path d="M 0 30 L 60 30 M 30 0 L 30 60" stroke="#fff" strokeWidth="0.8" />
            <polygon points="30,15 45,30 30,45 15,30" fill="none" stroke="#fff" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#jaali-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-extrabold text-xs uppercase tracking-wider">
              {schemesData.badge || '03. SCHEMES & SUPPORT'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {schemesData.heading || 'Find Welfare Schemes & Financial Support'}
          </h2>

          <p className="text-emerald-100/80 text-sm sm:text-base font-normal max-w-xl mx-auto">
            Direct DBT grants, subsidized tools, self-employment capital, and artisan welfare for rural women.
          </p>

          {/* Live Search Input Bar */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={schemesData.searchPlaceholder || 'Search schemes by keyword, benefit or skill...'}
                className="w-full pl-5 pr-12 py-4 rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-neutral-900 border border-emerald-400/30 focus:border-emerald-500 placeholder-white/60 focus:placeholder-neutral-400 backdrop-blur-md outline-hidden text-sm sm:text-base transition-all shadow-inner"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1.5 rounded-xl bg-white/20 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                  title="Clear Search"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <div className="absolute right-4 text-emerald-300 pointer-events-none">
                  <Search className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>

          {/* Filter Category Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat, idx) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-amber-950 shadow-md shadow-amber-400/20'
                      : 'bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Schemes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredSchemes.map((item) => (
            <div
              key={item.id}
              className="bg-white/95 rounded-3xl p-6 sm:p-7 text-neutral-900 shadow-xl border border-emerald-200/40 hover:border-amber-400 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
                <div>
                  {/* Category & Badge Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 uppercase tracking-wide">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-200 uppercase tracking-wide">
                      {item.secondaryTag}
                    </span>
                    {item.popular && (
                      <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        ⭐ High Demand
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight mb-2">
                    {item.title}
                  </h3>

                  {/* Amount / Benefit Banner */}
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 font-bold text-xs sm:text-sm mb-5 flex items-center gap-2">
                    <span className="text-base">🎁</span>
                    <span className="truncate">{item.amount}</span>
                  </div>

                  {/* Eligibility & Highlights Checklist */}
                  <div className="mb-6 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Eligibility &amp; Highlights
                    </div>
                    <ul className="space-y-2">
                      {item.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-600 leading-snug">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action: Apply Now */}
                <div className="pt-4 border-t border-neutral-100">
                  <button
                    onClick={() => onApplyScheme(item)}
                    className="w-full py-3.5 px-5 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{schemesData.applyBtn || 'Apply Now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
          ))}
        </div>

        {/* Empty state when search produces no results */}
        {filteredSchemes.length === 0 && (
          <div className="bg-white/10 rounded-3xl p-10 text-center max-w-lg mx-auto border border-white/20 mt-8 backdrop-blur-md">
            <p className="text-xl font-bold text-amber-300 mb-2">
              🔍 No schemes found matching "{searchQuery}"
            </p>
            <p className="text-sm text-emerald-100/80 mb-6">
              Try searching for "Lakhpati", "Weaving", "Subsidy", or reset your category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory(categories[0] || 'All Schemes');
              }}
              className="px-6 py-2.5 rounded-full bg-amber-400 text-amber-950 font-bold text-sm shadow-md hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
