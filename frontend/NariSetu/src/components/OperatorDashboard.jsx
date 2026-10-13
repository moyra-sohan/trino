import React, { useState } from 'react'
import { 
  ClipboardCheck, CheckCircle2, XCircle, AlertTriangle, 
  MapPin, Plus, UserCheck, Search, Filter, ShieldCheck, Camera 
} from 'lucide-react'

export default function OperatorDashboard({ currentUser, onNotify }) {
  const [activeTab, setActiveTab] = useState('queue') // 'queue' | 'add' | 'completed'

  const [queue, setQueue] = useState([
    {
      id: 'APP-8491',
      applicant: 'Kavita Kumari',
      age: 32,
      location: 'Madhubani Sector 4, Bihar',
      shg: 'Ganga Mahila Samooh',
      enterprise: 'Mithila Painting & Paper Crafting',
      loanAmount: 30000,
      kycStatus: 'Aadhaar Verified',
      status: 'Pending Field Visit',
      submittedDate: '12 Oct 2026'
    },
    {
      id: 'APP-8492',
      applicant: 'Geeta Devi Soren',
      age: 41,
      location: 'Ranchi Outer, Jharkhand',
      shg: 'Jharkhand Mahila Samiti',
      enterprise: 'Poultry Farm & Feed Station',
      loanAmount: 45000,
      kycStatus: 'Physical Audit Ready',
      status: 'Documents Uploaded',
      submittedDate: '11 Oct 2026'
    },
    {
      id: 'APP-8493',
      applicant: 'Usha Rani',
      age: 36,
      location: 'Varanasi Rural, Uttar Pradesh',
      shg: 'Kashi Vishwanath Weavers SHG',
      enterprise: 'Zari Embroidery Unit',
      loanAmount: 35000,
      kycStatus: 'Aadhaar Verified',
      status: 'Under Review',
      submittedDate: '10 Oct 2026'
    }
  ])

  // New applicant form state
  const [newApplicant, setNewApplicant] = useState({
    name: '',
    age: '',
    location: '',
    shg: '',
    enterprise: '',
    loanAmount: '',
    notes: ''
  })

  const handleApprove = (id) => {
    setQueue(prev => prev.filter(item => item.id !== id))
    onNotify?.('success', `Application ${id} approved & published to NariSetu live borrower marketplace!`)
  }

  const handleReject = (id) => {
    setQueue(prev => prev.filter(item => item.id !== id))
    onNotify?.('info', `Application ${id} marked for revision with Field Operator feedback.`)
  }

  const handleCreateApplicant = (e) => {
    e.preventDefault()
    const item = {
      id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      applicant: newApplicant.name,
      age: Number(newApplicant.age) || 30,
      location: newApplicant.location,
      shg: newApplicant.shg,
      enterprise: newApplicant.enterprise,
      loanAmount: Number(newApplicant.loanAmount) || 25000,
      kycStatus: 'Operator Verified',
      status: 'Ready for Listing',
      submittedDate: 'Just now'
    }
    setQueue([item, ...queue])
    setNewApplicant({ name: '', age: '', location: '', shg: '', enterprise: '', loanAmount: '', notes: '' })
    setActiveTab('queue')
    onNotify?.('success', `New borrower candidate "${item.applicant}" registered by Field Operator!`)
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-500/30">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Role: Authorized Field Operator / Verification Agent</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Field Command Center: {currentUser.name || currentUser.email}
          </h1>
          <p className="text-blue-100/80 text-sm mt-1 max-w-xl">
            You are the critical trust layer of NariSetu. You visit rural households, verify livelihoods, and ensure zero corruption in loan disbursements.
          </p>
          <div className="mt-3 text-xs text-blue-300/80 font-mono">
            Operator ID: {currentUser.id} • Assigned Hub: Eastern Rural Cluster 04
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab(activeTab === 'add' ? 'queue' : 'add')}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{activeTab === 'add' ? 'View Verification Queue' : 'Register New Borrower'}</span>
          </button>
        </div>
      </div>

      {/* Operator Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm">
          <span className="text-xs font-bold text-neutral-500 uppercase">Pending Verifications</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-1">{queue.length} Cases</div>
          <p className="text-xs text-neutral-500 mt-1">Village visits scheduled this week</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm">
          <span className="text-xs font-bold text-neutral-500 uppercase">Field Audits Completed</span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-1">142 Borrowers</div>
          <p className="text-xs text-neutral-500 mt-1">100% KYC & physical verification rate</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm">
          <span className="text-xs font-bold text-neutral-500 uppercase">SHG Groups Monitored</span>
          <div className="text-3xl font-extrabold text-purple-600 mt-1">18 Cooperatives</div>
          <p className="text-xs text-neutral-500 mt-1">Active weekly repayment collection</p>
        </div>
      </div>

      {/* New Borrower Registration Form */}
      {activeTab === 'add' ? (
        <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm mb-10">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            Register Verified Woman Borrower
          </h3>
          <p className="text-xs text-neutral-500 mb-6">
            Enter field survey details collected during your on-ground village household audit.
          </p>

          <form onSubmit={handleCreateApplicant} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Woman Borrower Name *
              </label>
              <input
                type="text"
                required
                value={newApplicant.name}
                onChange={(e) => setNewApplicant({ ...newApplicant, name: e.target.value })}
                placeholder="e.g. Suman Devi"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={newApplicant.age}
                onChange={(e) => setNewApplicant({ ...newApplicant, age: e.target.value })}
                placeholder="35"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Village & District *
              </label>
              <input
                type="text"
                required
                value={newApplicant.location}
                onChange={(e) => setNewApplicant({ ...newApplicant, location: e.target.value })}
                placeholder="e.g. Purnea District, Bihar"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Associated SHG Group *
              </label>
              <input
                type="text"
                required
                value={newApplicant.shg}
                onChange={(e) => setNewApplicant({ ...newApplicant, shg: e.target.value })}
                placeholder="e.g. Saraswati Mahila Mandal"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Micro-Enterprise Category *
              </label>
              <input
                type="text"
                required
                value={newApplicant.enterprise}
                onChange={(e) => setNewApplicant({ ...newApplicant, enterprise: e.target.value })}
                placeholder="e.g. Handloom Pottery / Grocery Shop"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Required Microcredit Loan (₹) *
              </label>
              <input
                type="number"
                required
                min="5000"
                max="100000"
                value={newApplicant.loanAmount}
                onChange={(e) => setNewApplicant({ ...newApplicant, loanAmount: e.target.value })}
                placeholder="30000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-blue-600 focus:outline-none font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Field Verification Audit Notes
              </label>
              <textarea
                rows="3"
                value={newApplicant.notes}
                onChange={(e) => setNewApplicant({ ...newApplicant, notes: e.target.value })}
                placeholder="State applicant's cash flow, village credibility, and SHG peer guarantee remarks."
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('queue')}
                className="px-6 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Save & Verify Borrower Application
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Verification Queue Table */
        <div className="bg-white rounded-3xl border border-neutral-200/80 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-neutral-900">
                Borrower Field Verification Queue
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Review borrower applicants requiring in-person audit and document verification
              </p>
            </div>
            <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
              {queue.length} Pending Actions
            </span>
          </div>

          {queue.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <p className="font-bold text-neutral-800">All Field Verifications Cleared!</p>
              <p className="text-xs mt-1">No pending borrower audits in your district queue.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50 text-neutral-600 text-xs font-bold uppercase tracking-wider border-b border-neutral-100">
                  <tr>
                    <th className="px-6 py-4">Applicant & SHG</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Enterprise</th>
                    <th className="px-6 py-4">Loan Target</th>
                    <th className="px-6 py-4">KYC Status</th>
                    <th className="px-6 py-4 text-right">Field Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {queue.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-neutral-900">{item.applicant} ({item.age}y)</div>
                        <div className="text-xs text-neutral-500">{item.shg} • <span className="font-mono text-[11px]">{item.id}</span></div>
                      </td>
                      <td className="px-6 py-4 text-xs text-neutral-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{item.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-neutral-800">
                        {item.enterprise}
                      </td>
                      <td className="px-6 py-4 font-bold font-mono text-neutral-900">
                        ₹{item.loanAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
                          {item.kycStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleApprove(item.id)}
                            title="Approve & Publish to Marketplace"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verify</span>
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            title="Flag / Return for revision"
                            className="p-1.5 rounded-lg border border-neutral-300 text-neutral-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  )
}
