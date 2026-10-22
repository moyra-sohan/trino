import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, Search, ShieldCheck } from 'lucide-react';

export default function CscLocatorModal({ isOpen, onClose, lang, onShowToast }) {
  const [pinCode, setPinCode] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const sampleCenters = [
    {
      id: 1,
      name: "Gram Panchayat Sahayata Kendra - Rampur",
      sahayika: "Smt. Pooja Devi (Lead Mitra)",
      phone: "+91 98765 43210",
      distance: "0.8 km from village square",
      address: "Panchayat Bhavan, Near Primary Health Center, Rampur",
      openHours: "Mon-Sat: 9:00 AM - 5:30 PM",
      services: ["Biometric Aadhaar", "Direct Scheme Apply", "Passbook Linking"]
    },
    {
      id: 2,
      name: "CSC Digital Seva Kendra - Block North",
      sahayika: "Smt. Sunita Murmu (VLE)",
      phone: "+91 98765 88990",
      distance: "2.4 km",
      address: "BDO Complex, Room 14, Main Road",
      openHours: "Mon-Sat: 9:30 AM - 6:00 PM",
      services: ["Micro-ATM Cash Withdrawal", "Loom Subsidy Form", "Certificate Print"]
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!pinCode) {
      alert("Please enter a 6-digit PIN code or district name.");
      return;
    }
    setSearched(true);
    onShowToast(`📍 Found 2 verified centers near "${pinCode}"`);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber-200 animate-in zoom-in-95 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl shadow-xs">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-neutral-900">
              {lang === 'hi' ? 'निकटतम सीएससी / ग्राम पंचायत केंद्र' : lang === 'bn' ? 'নিকটতম সিএসসি ও পঞ্চায়েত কেন্দ্র' : 'Find Nearest Village Kendra & Sahayika'}
            </h3>
            <p className="text-xs text-neutral-500 font-medium">
              Doorstep verification and paperless assistance
            </p>
          </div>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            placeholder="Enter 6-digit PIN code (e.g. 847211)..."
            className="flex-1 px-4 py-3 rounded-2xl border border-neutral-200 focus:border-blue-500 outline-hidden text-sm"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </form>

        {/* Centers List */}
        <div className="space-y-4">
          {sampleCenters.map((c) => (
            <div key={c.id} className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:border-blue-300 transition-all space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-neutral-900">
                    {c.name}
                  </h4>
                  <div className="text-xs text-neutral-500 font-medium">
                    {c.address}
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 whitespace-nowrap">
                  {c.distance}
                </span>
              </div>

              <div className="text-xs text-neutral-700 space-y-1">
                <div><strong>Lead Mitra:</strong> {c.sahayika}</div>
                <div><strong>Helpline:</strong> {c.phone}</div>
                <div className="flex items-center gap-1 text-neutral-500">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{c.openHours}</span>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap gap-1.5">
                {c.services.map((s, sIdx) => (
                  <span key={sIdx} className="text-[10px] font-semibold bg-white border border-neutral-200 text-neutral-600 px-2 py-0.5 rounded-md">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
