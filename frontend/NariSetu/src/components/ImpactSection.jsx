import React from 'react'
import { Coins, Users, Award, ShieldAlert, Heart, Building, CheckCircle } from 'lucide-react'

export default function ImpactSection() {
  const stats = [
    {
      value: '₹18.4 Cr+',
      label: 'Capital Disbursed',
      sub: 'Direct peer-to-peer social funding without usury',
      icon: Coins,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      value: '52,400+',
      label: 'Women Micro-Entrepreneurs',
      sub: 'Artisans, dairy farmers, weavers & village store owners',
      icon: Users,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      value: '99.4%',
      label: 'Repayment Rate',
      sub: 'Peer accountability through grassroots self-help groups',
      icon: Award,
      color: 'text-teal-600',
      bg: 'bg-teal-50'
    },
    {
      value: '28 Districts',
      label: 'Rural Geographies Reached',
      sub: 'Covering 6 states with verified Field Operator networks',
      icon: Building,
      color: 'text-rose-600',
      bg: 'bg-rose-50'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white border-y border-amber-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#e06543] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Real Proof of Progress
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mt-3 tracking-tight">
            Transforming Grassroots Economies, One Woman at a Time
          </h2>
          <p className="text-neutral-600 mt-4 text-base sm:text-lg">
            Unlike commercial microfinance institutions that charge 24-36% interest, NariSetu operates as a transparent social lending bridge. 100% of your funds reach the borrower.
          </p>
        </div>

        {/* 4 Key Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 hover:bg-white hover:border-amber-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                  {s.value}
                </div>
                <div className="text-base font-bold text-neutral-800 mt-1">
                  {s.label}
                </div>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  {s.sub}
                </p>
              </div>
            )
          })}
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-12 border-t border-neutral-100">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
              01
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-lg">Verified by Field Operators</h4>
              <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                Dedicated local field operators visit each household, verify livelihood plans, and validate SHG group membership before listing.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
              02
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-lg">Transparent Peer-to-Peer</h4>
              <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                Track every rupee in real time. As borrowers repay monthly installments, funds are credited back to your investor account.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold shrink-0">
              03
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-lg">Dignity Over Charity</h4>
              <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                Borrowers are dignified business partners, not charity cases. Repaid capital can be withdrawn or recycled to fund new entrepreneurs.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
