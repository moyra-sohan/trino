import React from 'react';
import { X, Printer, CheckCircle2, ShieldCheck, Download, Award, MapPin, QrCode } from 'lucide-react';

export default function ArtisanIdCardModal({
  isOpen,
  record,
  onClose,
  onNotify
}) {
  if (!isOpen || !record) return null;

  const handlePrint = () => {
    window.print();
    onNotify?.('success', `Artisan Identity Card sent to printer for ${record.name}!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-neutral-200 overflow-hidden text-left">
        
        {/* Header */}
        <div className="px-6 py-4 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-400" />
            <span className="font-bold text-sm">Official Rural Artisan Identity Card</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Card Area */}
        <div className="p-6">
          <div className="border-2 border-orange-500/40 rounded-2xl p-6 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 relative overflow-hidden shadow-md">
            
            {/* Hologram / Security Watermark Ribbon */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-orange-400/10 to-transparent rounded-bl-full pointer-events-none" />
            
            {/* Top card banner */}
            <div className="flex items-center justify-between pb-4 border-b border-orange-200">
              <div className="flex items-center gap-3">
                <img 
                  src="/images/na_icon.png" 
                  alt="NariSetu Logo" 
                  className="w-10 h-10 rounded-xl object-cover shadow-sm shrink-0" 
                />
                <div>
                  <div className="text-xs font-black tracking-tight text-neutral-900 uppercase">
                    NariSetu Artisan Federation
                  </div>
                  <div className="text-[10px] text-neutral-600 font-semibold">
                    Rural Livelihoods & Craftswomen Network
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                  Active Verified
                </span>
              </div>
            </div>

            {/* Profile & Identity Grid */}
            <div className="mt-4 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
              
              {/* Photo & UID */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-24 h-28 rounded-xl overflow-hidden border-2 border-orange-400 shadow-sm bg-neutral-100 relative">
                  <img
                    src={record.avatar || '/images/aparna_ghosh.jpg'}
                    alt={record.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/login_bg_user.jpg';
                    }}
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-neutral-900/80 text-[9px] text-white text-center py-0.5 font-mono">
                    {record.uid}
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-neutral-600 mt-1">
                  ID: {record.uid}
                </span>
              </div>

              {/* Artisan Details */}
              <div className="flex-1 space-y-1.5 text-xs">
                <div>
                  <h4 className="text-base font-extrabold text-neutral-900">
                    {record.name}
                  </h4>
                  {record.bengaliName && (
                    <p className="text-xs font-semibold text-neutral-500">
                      {record.bengaliName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div>
                    <span className="text-neutral-400 font-semibold block">Craft Trade:</span>
                    <span className="font-bold text-orange-950">{record.craft}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-semibold block">Aadhaar Ref:</span>
                    <span className="font-mono font-semibold text-neutral-800">{record.aadhaarRef || '**** 8109'}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-semibold block">Gram Panchayat:</span>
                    <span className="font-bold text-neutral-800">{record.panchayat || 'Mayurhat-I'}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-semibold block">Block / District:</span>
                    <span className="font-bold text-neutral-800">{record.block || 'Hanskhali'}, Nadia</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-semibold block">Contact:</span>
                    <span className="font-mono text-neutral-800">{record.phone}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-semibold block">Field Operator:</span>
                    <span className="font-medium text-neutral-800">Smt. Rekha Mondal (OP-8492)</span>
                  </div>
                </div>
              </div>

              {/* QR Code Stamp */}
              <div className="shrink-0 flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                <QrCode className="w-16 h-16 text-neutral-800" />
                <span className="text-[9px] font-mono text-neutral-500 mt-1">Scan to Verify</span>
              </div>

            </div>

            {/* Footer stamp */}
            <div className="mt-4 pt-3 border-t border-orange-200/80 flex items-center justify-between text-[10px] text-neutral-500">
              <span className="font-mono">Registered: {record.registered || '24 Oct 2024'}</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NariSetu Verified Craftswoman Guild</span>
              </span>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <span className="text-xs text-neutral-500">
            Identity hash verified against NariSetu Member Directory.
          </span>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-white cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-md shadow-orange-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Card</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
