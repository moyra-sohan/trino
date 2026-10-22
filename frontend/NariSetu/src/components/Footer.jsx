import React from 'react';
import { Heart, Phone, Mail, MapPin, Globe, Sparkles, ArrowUp } from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';

export default function Footer({ onOpenAuth, onNavigateSection }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800 text-left">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-orange-500/20 shrink-0">
                <img
                  src="/images/na_icon.png"
                  alt="NariSetu na Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Nari<span className="text-[#ea580c]">Setu</span>
              </span>
            </div>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              NariSetu is India's dedicated digital gateway connecting rural women, self-help groups, and master craftswomen with certified skills, enterprise grants, and direct market access.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-neutral-400">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ministry of Rural Development & Skill India Partner</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button 
                  onClick={() => onNavigateSection('home')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  01. Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('about')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  02. About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('schemes')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  03. Schemes & Support
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('help')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  04. Help / सहायता
                </button>
              </li>
            </ul>
          </div>

          {/* User Portals */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Portals
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button 
                  onClick={() => onOpenAuth('citizen')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  For Women / Citizens
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenAuth('partner')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  For Community Support
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenAuth('gov')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  For Government Officials
                </button>
              </li>
            </ul>
          </div>

          {/* 24x7 Helpline */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              National Helpline
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-neutral-400">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>{APP_CONFIG.helpline.tollFreeDisplay}</span>
              </div>
              <div className="text-xs text-neutral-500">
                (Toll-Free 24x7 in Hindi, Bengali, Tamil, Telugu, Marathi & English)
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-400" />
                <span>{APP_CONFIG.helpline.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span>Krishi Bhawan, New Delhi 110001</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} NariSetu. Ministry of Rural Development, Government of India. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
