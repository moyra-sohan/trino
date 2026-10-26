import React, { useState } from 'react';
import { 
  ChevronDown, ChevronUp, Phone, MessageSquare, 
  MapPin, Clock 
} from 'lucide-react';

export default function HelpSection({
  content,
  onOpenCscLocator,
  onShowToast
}) {
  const help = content?.help || {};
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const handlePhoneCall = () => {
    onShowToast("📞 Dialing Toll-Free Helpline: 1800-200-6274 (1800-200-NARI)");
    window.location.href = "tel:18002006274";
  };

  const handleWhatsApp = () => {
    onShowToast("💬 Connecting to NariSetu 24x7 WhatsApp Assistant...");
    window.open("https://wa.me/919876543210?text=Namaste%20NariSetu%20Sahayika", "_blank");
  };

  const sahayika = help.sahayikaCard || {
    title: "Community Helpdesk",
    name: "Smt. Pooja Devi",
    role: "Lead Community Mitra / Coordinator",
    badge: "Active at Community Center",
    phoneLabel: "Toll-Free Helpline",
    phoneNum: "1800-200-6274",
    waLabel: "WhatsApp Sahayata",
    waNum: "+91 98765 43210",
    locateLabel: "Find Nearest Support Kendra",
    note: "Doorstep guidance available across all 700+ districts"
  };

  return (
    <section id="help" className="py-20 lg:py-28 bg-[#fbf8f3] border-b border-amber-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs uppercase tracking-wider">
              {help.badge || '04. HELP'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight">
            {help.heading || 'How Can We Help You? / सहायता केंद्र'}
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base font-normal max-w-xl mx-auto pt-2">
            {help.subheading || 'Doorstep guidance, paperless assistance, and toll-free helpline support.'}
          </p>
        </div>

        {/* 2-Column Split: Visual FAQs on left, Talk to a Sahayika on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual FAQs Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 flex items-center gap-2 mb-6">
              <span>📋</span>
              <span>{help.faqsTitle || 'Frequently Asked Questions / जरूरी सवाल'}</span>
            </h3>

            <div className="space-y-3">
              {(help.faqs || []).map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-white border-amber-400 shadow-md ring-1 ring-amber-300'
                        : 'bg-white/80 border-neutral-200 hover:border-amber-300 shadow-xs'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-orange-100 text-[#ea580c] font-black text-xs flex items-center justify-center shrink-0">
                          Q{idx + 1}
                        </span>
                        <span className="font-bold text-sm sm:text-base text-neutral-900">
                          {faq.q}
                        </span>
                      </div>
                      <div className="text-neutral-400 shrink-0">
                        {isOpen ? <ChevronUp className="w-5 h-5 text-[#ea580c]" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 animate-in fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Talk to a Sahayika / Village Operator */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl relative overflow-hidden">
              
              {/* Header with Avatar & Verified Badge */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-400 p-0.5 overflow-hidden flex items-center justify-center shadow-md">
                    <img
                      src="/images/na_icon.png"
                      alt="Sahayika Avatar"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-xs" title="Certified Village Mitra">
                    ✓
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    {sahayika.title}
                  </div>
                  <h4 className="text-xl font-extrabold text-neutral-900">
                    {sahayika.name}
                  </h4>
                  <div className="text-xs text-neutral-500 font-medium">
                    {sahayika.role}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>{sahayika.badge}</span>
                  </div>
                </div>
              </div>

              {/* Action Channels List */}
              <div className="space-y-3">
                
                {/* Phone Channel */}
                <button
                  onClick={handlePhoneCall}
                  className="w-full p-4 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-neutral-900 font-bold flex items-center gap-3.5 transition-all active:scale-98 cursor-pointer shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-xs text-neutral-500 font-semibold">{sahayika.phoneLabel}</div>
                    <div className="text-sm font-extrabold text-amber-950">{sahayika.phoneNum}</div>
                  </div>
                </button>

                {/* WhatsApp Channel */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-neutral-900 font-bold flex items-center gap-3.5 transition-all active:scale-98 cursor-pointer shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-xs text-neutral-500 font-semibold">{sahayika.waLabel}</div>
                    <div className="text-sm font-extrabold text-emerald-950">{sahayika.waNum}</div>
                  </div>
                </button>

                {/* CSC Locator Button */}
                <button
                  onClick={onOpenCscLocator}
                  className="w-full p-4 rounded-2xl bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-neutral-900 font-bold flex items-center gap-3.5 transition-all active:scale-98 cursor-pointer shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-xs text-neutral-500 font-semibold">{sahayika.locateLabel}</div>
                    <div className="text-xs text-blue-900 font-medium">Search by PIN code or Gram Panchayat</div>
                  </div>
                </button>

              </div>

              {/* Assistance Note */}
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-500">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{sahayika.note}</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
