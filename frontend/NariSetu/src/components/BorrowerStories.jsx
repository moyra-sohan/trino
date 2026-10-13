import React, { useState } from 'react'
import { MapPin, Heart, ArrowUpRight, Check, Sparkles, AlertCircle } from 'lucide-react'

export default function BorrowerStories({ onOpenAuth, currentUser, onNotify }) {
  const [borrowers, setBorrowers] = useState([
    {
      id: 1,
      name: 'Radhika Devi',
      age: 38,
      location: 'Madhubani, Bihar',
      enterprise: 'Handloom Cotton & Silk Weaving',
      story: 'Radhika leads a cooperative of 6 women weavers. She needs working capital to purchase quality unbleached yarn directly from mills to meet wedding season handloom orders.',
      targetAmount: 35000,
      fundedAmount: 28000,
      tenure: '12 Months',
      shgGroup: 'Maa Annapurna SHG',
      operatorVerified: 'Verified by Rajesh Kumar (Purnea Hub)',
      avatarBg: 'from-amber-500 to-orange-600',
      initials: 'RD'
    },
    {
      id: 2,
      name: 'Savitri Bai Patil',
      age: 44,
      location: 'Kolhapur, Maharashtra',
      enterprise: 'Indigenous Dairy & Ghee Processing',
      story: 'Savitri is expanding her small milk chilling and traditional bilona ghee setup. The microloan funds a second dairy cow and veterinary vaccinations for hygienic production.',
      targetAmount: 50000,
      fundedAmount: 42500,
      tenure: '14 Months',
      shgGroup: 'Kranti Jyoti Mahila Mandal',
      operatorVerified: 'Verified by Sneha Desai (Western Div)',
      avatarBg: 'from-teal-500 to-emerald-700',
      initials: 'SP'
    },
    {
      id: 3,
      name: 'Anjali Murmu',
      age: 29,
      location: 'Mayurbhanj, Odisha',
      enterprise: 'Sal Leaf Plate Making Machine',
      story: 'Anjali collects eco-friendly fallen sal leaves from nearby forest belts. An automated hydraulic pressing machine will replace manual stamping and triple her daily output.',
      targetAmount: 25000,
      fundedAmount: 21000,
      tenure: '10 Months',
      shgGroup: 'Sabarmati Van SHG',
      operatorVerified: 'Verified by Amit Nayak (Baripada Cluster)',
      avatarBg: 'from-purple-500 to-indigo-700',
      initials: 'AM'
    }
  ])

  const [fundedLoans, setFundedLoans] = useState({})

  const handleFund = (id) => {
    if (!currentUser) {
      onOpenAuth('login', 'user')
      return
    }

    setFundedLoans(prev => ({ ...prev, [id]: true }))
    setBorrowers(prev => prev.map(b => {
      if (b.id === id) {
        return { ...b, fundedAmount: Math.min(b.targetAmount, b.fundedAmount + 2500) }
      }
      return b
    }))

    onNotify?.('success', `Thank you ${currentUser.name || 'Supporter'}! Your ₹2,500 contribution was pledged!`)
  }

  return (
    <section id="borrowers" className="py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-800 bg-teal-100/80 px-3 py-1 rounded-full border border-teal-200">
              Grassroots Heroes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mt-3 tracking-tight">
              Invest in Resilient Women, Transform Generations
            </h2>
            <p className="text-neutral-600 mt-2 text-base">
              Every loan listed below has been physically visited, documented, and verified by an authorized NariSetu Field Operator.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs font-semibold text-neutral-500">
              Showing active campaigns
            </span>
          </div>
        </div>

        {/* Borrower Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {borrowers.map((b) => {
            const percentage = Math.round((b.fundedAmount / b.targetAmount) * 100)
            const isFunded = fundedLoans[b.id]

            return (
              <div
                key={b.id}
                className="bg-white rounded-3xl border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col text-left group"
              >
                {/* Header with Avatar & Location */}
                <div className="p-6 pb-4 border-b border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${b.avatarBg} text-white font-extrabold text-lg flex items-center justify-center shadow-md`}>
                      {b.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-neutral-900 group-hover:text-amber-700 transition-colors">
                        {b.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-neutral-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{b.location}</span>
                        <span>•</span>
                        <span>Age {b.age}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    {percentage}% Funded
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Enterprise Tag */}
                    <div className="inline-block text-xs font-semibold text-neutral-700 bg-neutral-100 px-3 py-1 rounded-md mb-3">
                      💼 {b.enterprise}
                    </div>

                    <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3 mb-5">
                      {b.story}
                    </p>

                    {/* Funding Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-neutral-900">₹{b.fundedAmount.toLocaleString('en-IN')} raised</span>
                        <span className="text-neutral-500">Goal: ₹{b.targetAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Metadata tags */}
                    <div className="bg-neutral-50 rounded-xl p-3 text-xs text-neutral-600 space-y-1 mb-6 border border-neutral-100">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Group:</span>
                        <span className="font-semibold text-neutral-800">{b.shgGroup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Tenure:</span>
                        <span className="font-semibold text-neutral-800">{b.tenure}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-neutral-400 pt-1 border-t border-neutral-200/50">
                        <span>🛡️ {b.operatorVerified}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fund Button */}
                  <button
                    onClick={() => handleFund(b.id)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isFunded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-900 text-white hover:bg-[#e06543] active:scale-95 shadow-md'
                    }`}
                  >
                    {isFunded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Funded (+₹2,500 Pledged)</span>
                      </>
                    ) : (
                      <>
                        <span>Lend ₹2,500 to {b.name.split(' ')[0]}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
