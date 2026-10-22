import React from 'react'
import { User, ClipboardCheck, ShieldAlert, ArrowRight, CheckCircle2, Lock } from 'lucide-react'

export default function RolePortalsSection({ onOpenAuth }) {
  const roles = [
    {
      roleKey: 'user',
      title: 'User / Social Investor',
      badge: 'Public & Borrowers',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Lend directly to grassroots women entrepreneurs or request microloans with transparent, peer-to-peer terms.',
      icon: User,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      features: [
        'Browse 100% field-verified women borrowers',
        'Pledge loans starting from ₹1,000',
        'Real-time automated repayment dashboard',
        'Direct SHG community communication'
      ]
    },
    {
      roleKey: 'operator',
      title: 'Field Operator / Agent',
      badge: 'Ground Officers',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      description: 'Authorized ground partners who visit villages, verify identity and business plans, and monitor repayments.',
      icon: ClipboardCheck,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
      buttonBg: 'bg-blue-600 hover:bg-blue-700 text-white',
      features: [
        'Review incoming borrower applications',
        'Execute KYC & village household visits',
        'Submit field audit notes & compliance scores',
        'Coordinate SHG group disbursements'
      ]
    },
    {
      roleKey: 'admin',
      title: 'Platform Administrator',
      badge: 'Governance & Security',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      description: 'Master administrative suite for database governance, security audits, user role elevation, and ledger health.',
      icon: ShieldAlert,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
      buttonBg: 'bg-purple-700 hover:bg-purple-800 text-white',
      features: [
        'Live PostgreSQL Neon user management',
        'Audit all User, Operator & Admin accounts',
        'Update or revoke user roles & permissions',
        'System health & cryptographic verification'
      ]
    }
  ]

  return (
    <section id="roles" className="py-20 bg-gradient-to-b from-white via-neutral-50/50 to-white border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
            Role-Based Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mt-3 tracking-tight">
            Tailored Experiences for 3 Distinct User Types
          </h2>
          <p className="text-neutral-600 mt-3 text-base">
            NariSetu is built with dedicated role-based access control (RBAC). Choose your portal below to sign in with verified credentials.
          </p>
        </div>

        {/* 3 Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((r) => {
            const Icon = r.icon
            return (
              <div
                key={r.roleKey}
                className="bg-white rounded-3xl border border-neutral-200/80 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl border ${r.iconBg} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${r.badgeColor}`}>
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                    {r.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-8 pt-4 border-t border-neutral-100">
                    {r.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-neutral-100">
                  <button
                    onClick={() => onOpenAuth('login', r.roleKey)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-md ${r.buttonBg}`}
                  >
                    <span>Log In to {r.title.split(' ')[0]} Portal</span>
                    <ArrowRight className="w-4 h-4" />
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
