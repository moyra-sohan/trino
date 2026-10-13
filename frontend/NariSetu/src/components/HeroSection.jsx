import React from 'react'
import { ArrowRight, HeartHandshake, ShieldCheck, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react'
import IndianWomanIllustration from './IndianWomanIllustration'

export default function HeroSection({ onOpenAuth, onExploreBorrowers, onOpenCalculator }) {
  return (
    <section className="relative pt-6 pb-16 overflow-hidden">
      {/* Subtle background ambient warmth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-12 left-10 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl" />
        <div className="absolute top-36 right-10 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Text & Narrative Row (Matches Image 1 layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-8">
          
          {/* Left Column: Heading and Story */}
          <div className="lg:col-span-5 text-left pt-2">
            
            {/* Live Impact Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct Peer-to-Peer Social Lending Platform</span>
            </div>

            {/* Headline with Vertical Coral Bar */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-1.5 sm:w-2 h-20 sm:h-24 bg-[#e06543] rounded-full shrink-0 mt-1 shadow-sm" />
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-neutral-900 leading-[1.08] tracking-tight">
                How do you <br />
                enable <span className="font-serif italic text-[#c94b28] font-normal font-medium">Impact?</span>
              </h1>
            </div>

            {/* Description Paragraph */}
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              By giving a loan through NariSetu, you start making a big difference in someone's life. We connect conscious social investors directly with resilient rural and semi-urban women entrepreneurs, eliminating exploitative middlemen and building lasting financial dignity.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-neutral-900 text-white font-semibold text-base hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/15 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Start Lending Today</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-neutral-300 bg-white/80 text-neutral-800 font-semibold text-base hover:bg-white hover:border-neutral-400 transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-[#e06543]" />
                <span>Calculate Impact</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-neutral-200/60 text-xs sm:text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Capital Returned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Field-Verified Borrowers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Middlemen Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Real-Time Repayment Tracking</span>
              </div>
            </div>

          </div>

          {/* Right Column (Placeholder space that blends with artwork on large screens) */}
          <div className="hidden lg:block lg:col-span-7">
            {/* Sub-quote banner */}
            <div className="flex justify-end pr-8">
              <div className="max-w-xs text-right text-xs text-neutral-500 italic">
                “When you educate a boy, you train a man. When you empower a woman, you liberate an entire village.”
              </div>
            </div>
          </div>

        </div>

        {/* --- CENTERPIECE ARTWORK WITH THE 3 BADGES (EXACT REPLICA OF IMAGE 1) --- */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/10 border border-amber-100 bg-gradient-to-b from-[#fffcf8] via-[#fef2e6] to-[#fce3cb] p-2 sm:p-4">
          <IndianWomanIllustration />
        </div>

      </div>
    </section>
  )
}
