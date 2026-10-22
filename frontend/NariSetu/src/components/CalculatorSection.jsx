import React, { useState } from 'react'
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, RefreshCw, Layers } from 'lucide-react'

export default function CalculatorSection({ onOpenAuth }) {
  const [amount, setAmount] = useState(10000)

  // Calculations
  const womenSupported = Math.max(1, Math.floor(amount / 5000))
  const childrenInSchool = womenSupported * 2
  const estimatedMonths = 12
  const recyclingCycles = 3
  const cumulativeImpact = amount * recyclingCycles

  return (
    <section id="calculator" className="py-20 bg-white border-t border-amber-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Explanation */}
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e06543] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Interactive Impact Calculator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mt-3 tracking-tight">
              See the Ripple Effect of Your Social Capital
            </h2>
            <p className="text-neutral-600 mt-4 text-base leading-relaxed">
              When you lend on NariSetu, your money doesn't just sit in a charity ledger. It travels to the village, funds working tools, earns income, and returns back to your wallet. You can then withdraw or re-lend it indefinitely.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">The 3x Recycling Multiplier</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Over 3 years, a single ₹10,000 contribution recirculates to fund up to 6 different micro-enterprises.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">100% Repayment Principal Back</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Borrowers repay in manageable monthly installments directly into your NariSetu digital wallet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Card */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40 rounded-3xl p-8 sm:p-10 border border-amber-200 shadow-xl text-left">
              
              {/* Slider Header */}
              <div className="flex justify-between items-baseline mb-4">
                <label className="text-sm font-bold text-neutral-700">
                  Select Your Social Lending Amount
                </label>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#c94b28] font-mono">
                  ₹{amount.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="2000"
                max="50000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#e06543] mb-8"
              />

              {/* Preset Buttons */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[5000, 10000, 20000, 35000, 50000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      amount === preset
                        ? 'bg-[#e06543] text-white shadow'
                        : 'bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    ₹{preset.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Real-time Dynamic Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                
                <div className="p-4 rounded-2xl bg-white border border-amber-100 shadow-sm">
                  <div className="text-2xl font-extrabold text-neutral-900">
                    {womenSupported} Women
                  </div>
                  <div className="text-xs font-semibold text-neutral-500 mt-1">
                    Micro-entrepreneurs funded directly
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-amber-100 shadow-sm">
                  <div className="text-2xl font-extrabold text-neutral-900">
                    {childrenInSchool}+ Kids
                  </div>
                  <div className="text-xs font-semibold text-neutral-500 mt-1">
                    Education & nutrition secured
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-amber-100 shadow-sm col-span-2 sm:col-span-1">
                  <div className="text-2xl font-extrabold text-emerald-700">
                    ₹{cumulativeImpact.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs font-semibold text-neutral-500 mt-1">
                    Cumulative 3-year impact power
                  </div>
                </div>

              </div>

              {/* Call to action */}
              <button
                onClick={() => onOpenAuth('login', 'partner')}
                className="w-full py-4 rounded-2xl bg-neutral-900 text-white font-bold text-base hover:bg-[#e06543] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Pledge ₹{amount.toLocaleString('en-IN')} & Create Change</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
