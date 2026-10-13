import React, { useState } from 'react'
import { 
  User, Wallet, ArrowUpRight, Clock, CheckCircle2, 
  Heart, Sparkles, PlusCircle, ArrowDownLeft, FileText, Building 
} from 'lucide-react'

export default function UserDashboard({ currentUser, onExploreBorrowers, onNotify }) {
  const [walletBalance, setWalletBalance] = useState(12500)
  const [activeLoans, setActiveLoans] = useState([
    {
      borrower: 'Radhika Devi',
      enterprise: 'Handloom Cotton & Silk Weaving',
      amountPledged: 2500,
      repaidSoFar: 1450,
      nextInstallment: '25 Oct 2026',
      status: 'On Track'
    },
    {
      borrower: 'Savitri Bai Patil',
      enterprise: 'Indigenous Dairy & Ghee',
      amountPledged: 5000,
      repaidSoFar: 3200,
      nextInstallment: '02 Nov 2026',
      status: 'On Track'
    }
  ])

  // New loan request modal state for borrower user
  const [showLoanModal, setShowLoanModal] = useState(false)
  const [loanPurpose, setLoanPurpose] = useState('')
  const [requestedAmount, setRequestedAmount] = useState('20000')

  const handleApplyLoan = (e) => {
    e.preventDefault()
    onNotify?.('success', `Loan application for ₹${Number(requestedAmount).toLocaleString('en-IN')} submitted! Assigned to Field Operator for verification.`)
    setShowLoanModal(false)
    setLoanPurpose('')
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-neutral-900 rounded-3xl p-8 text-white shadow-xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
            <User className="w-3.5 h-3.5" />
            <span>Role: User / Social Investor</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser.name || currentUser.email}!
          </h1>
          <p className="text-emerald-100/80 text-sm mt-1 max-w-xl">
            You are actively empowering rural women entrepreneurs. Your repayments automatically credit to your NariSetu digital wallet.
          </p>
          <div className="mt-3 text-xs text-emerald-300/80 font-mono">
            User ID: {currentUser.id} • Registered: {new Date(currentUser.createdAt || Date.now()).toLocaleDateString()}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowLoanModal(true)}
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Apply for Microloan</span>
          </button>
          
          <button
            onClick={onExploreBorrowers}
            className="px-5 py-3 rounded-xl bg-[#e06543] hover:bg-[#c95232] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Fund More Borrowers</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Wallet Balance */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              NariSetu Digital Wallet
            </span>
            <div className="text-3xl font-extrabold text-neutral-900 mt-1 font-mono">
              ₹{walletBalance.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Available for withdrawal or re-lending</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        {/* Active Capital Out */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Total Capital Deployed
            </span>
            <div className="text-3xl font-extrabold text-neutral-900 mt-1 font-mono">
              ₹7,500
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Funding 2 verified women cooperatives
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>

        {/* Total Repaid */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Principal Repaid to Date
            </span>
            <div className="text-3xl font-extrabold text-neutral-900 mt-1 font-mono">
              ₹4,650
            </div>
            <p className="text-xs text-teal-600 font-semibold mt-1">
              62% repaid on schedule with 0 defaults
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <ArrowDownLeft className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Active Pledges Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 overflow-hidden shadow-sm mb-10">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-neutral-900">
              Your Active Social Lending Portfolio
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Live updates synced with grassroots SHG repayments
            </p>
          </div>
          <span className="text-xs font-semibold bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full">
            {activeLoans.length} Active Loans
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-600 text-xs font-bold uppercase tracking-wider border-b border-neutral-100">
              <tr>
                <th className="px-6 py-4">Borrower & Enterprise</th>
                <th className="px-6 py-4">Pledged Amount</th>
                <th className="px-6 py-4">Repaid So Far</th>
                <th className="px-6 py-4">Next Due Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {activeLoans.map((loan, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-neutral-900">{loan.borrower}</div>
                    <div className="text-xs text-neutral-500">{loan.enterprise}</div>
                  </td>
                  <td className="px-6 py-4 font-bold font-mono text-neutral-900">
                    ₹{loan.amountPledged.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-emerald-700 font-mono">
                      ₹{loan.repaidSoFar.toLocaleString('en-IN')}
                    </div>
                    <div className="w-24 h-1.5 bg-neutral-100 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(loan.repaidSoFar / loan.amountPledged) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{loan.nextInstallment}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      {loan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Borrower Application Modal */}
      {showLoanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl text-left">
            <h3 className="text-xl font-bold text-neutral-900 mb-1">
              Apply for NariSetu Microloan
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              Low-cost capital for women entrepreneurs. An assigned Field Operator will visit for documentation.
            </p>

            <form onSubmit={handleApplyLoan} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Required Loan Amount (₹)
                </label>
                <input
                  type="number"
                  min="5000"
                  max="100000"
                  step="1000"
                  value={requestedAmount}
                  onChange={(e) => setRequestedAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-emerald-600 text-sm font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Enterprise / Purpose Description
                </label>
                <textarea
                  rows="3"
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  placeholder="e.g. Purchase of tailoring machinery & sewing threads for village boutique"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-emerald-600 text-sm"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLoanModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
