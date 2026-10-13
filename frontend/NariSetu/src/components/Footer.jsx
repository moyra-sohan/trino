import React from 'react'
import { Heart, ShieldCheck, Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react'

export default function Footer({ onOpenAuth, onNavigateSection }) {
  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800 text-left">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-[#e06543] flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
                न
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Nari<span className="text-[#e06543]">Setu</span>
              </span>
            </div>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              NariSetu is India's trusted digital bridge uniting conscious social lenders with grassroots women entrepreneurs. Transparent, dignified, and 100% direct peer-to-peer.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Fastify + Neon DB Connected
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => onNavigateSection('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Our Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('borrowers')} className="hover:text-white transition-colors cursor-pointer">
                  Featured Borrowers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('calculator')} className="hover:text-white transition-colors cursor-pointer">
                  Social Impact Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('roles')} className="hover:text-white transition-colors cursor-pointer">
                  Portals & RBAC
                </button>
              </li>
            </ul>
          </div>

          {/* 3 User Portals */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Portals
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => onOpenAuth('login', 'user')} className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <span>User / Investor Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth('login', 'operator')} className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <span>Field Operator Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth('login', 'admin')} className="hover:text-purple-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <span>Administrator Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth('register')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Register New Account
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Transparency */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>support@narisetu.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+91 1800-209-NARI</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>New Delhi & Regional Hubs</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} NariSetu Foundation. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Social Lending</span>
            <span className="hover:text-neutral-400 cursor-pointer">Fair Practices Code</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
