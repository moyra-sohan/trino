import React, { useState } from 'react';
import { X, CheckCircle2, FileText, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { schemeService } from '../services/schemeService';

export default function ApplyModal({
  isOpen,
  onClose,
  scheme,
  lang,
  onShowToast
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    aadhaar: '',
    phone: '',
    village: '',
    skill: 'Handloom & Weaving',
    shgName: ''
  });
  const [submittedAppId, setSubmittedAppId] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Please enter applicant name and phone number.");
      return;
    }

    const randomId = schemeService.generateApplicationId();
    setSubmittedAppId(randomId);
    onShowToast(`🎉 Application submitted successfully! Reference: ${randomId}`);
  };

  const handleReset = () => {
    setSubmittedAppId(null);
    setFormData({
      fullName: '',
      aadhaar: '',
      phone: '',
      village: '',
      skill: 'Handloom & Weaving',
      shgName: ''
    });
    onClose();
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

        {!submittedAppId ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#ea580c] flex items-center justify-center text-xl">
                ✍️
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-neutral-900">
                  {lang === 'hi' ? 'योजना हेतु ऑनलाइन आवेदन' : lang === 'bn' ? 'স্কিমে অনলাইন আবেদন' : 'Apply for Government Scheme'}
                </h3>
                <p className="text-xs text-neutral-500 font-medium">
                  {scheme?.title || 'NariSetu Direct Livelihood Scheme'}
                </p>
              </div>
            </div>

            {/* Benefit Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs sm:text-sm font-semibold mb-6 flex items-center gap-2">
              <span>🎁</span>
              <span>Benefit: {scheme?.amount || 'Zero-collateral micro grant'}</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Full Name (as on Aadhaar) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smt. Sunita Devi"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] outline-hidden text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] outline-hidden text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Aadhaar (Last 4 Digits)
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="XXXX"
                    value={formData.aadhaar}
                    onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] outline-hidden text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Village / Gram Panchayat
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rampur Village"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] outline-hidden text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Vocational Trade / Skill
                  </label>
                  <select
                    value={formData.skill}
                    onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] outline-hidden text-sm bg-white"
                  >
                    <option value="Handloom & Weaving">Handloom & Weaving</option>
                    <option value="Tailoring & Embroidery">Tailoring & Embroidery</option>
                    <option value="Handicrafts & Pottery">Handicrafts & Pottery</option>
                    <option value="Food Processing & Pickles">Food Processing & Pickles</option>
                    <option value="Dairy & Livestock">Dairy & Livestock</option>
                    <option value="Digital Literacy / CSC">Digital Literacy / CSC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Self Help Group (SHG) Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pragati Mahila Samiti"
                  value={formData.shgName}
                  onChange={(e) => setFormData({ ...formData, shgName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] outline-hidden text-sm"
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl text-xs text-neutral-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero fee. Verification carried out by your Gram Panchayat Sahayika.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit Scheme Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-neutral-900">
              Application Dispatched!
            </h3>

            <p className="text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
              Your application for <strong>{scheme?.title}</strong> has been transmitted to your block welfare office.
            </p>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 font-mono text-base font-bold tracking-wider inline-block">
              {submittedAppId}
            </div>

            <p className="text-xs text-neutral-500">
              An SMS confirmation with tracking details has been sent to your registered phone number.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
