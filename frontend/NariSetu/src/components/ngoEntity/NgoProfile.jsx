import React, { useState } from 'react';
import { 
  ShieldCheck, Upload, Eye, Check, AlertCircle, 
  Building2, Mail, Phone, Globe, MapPin, Plus, X, 
  FileText, Shield, Sparkles, CheckCircle2 
} from 'lucide-react';

export default function NgoProfile({
  ngoProfile,
  onUpdateProfile,
  onNotify
}) {
  const [formData, setFormData] = useState({ ...ngoProfile });
  const [showWebsiteError, setShowWebsiteError] = useState(
    !formData.website.startsWith('https://')
  );
  const [newStateInput, setNewStateInput] = useState('');
  const [showAddState, setShowAddState] = useState(false);
  const [newDistrictInput, setNewDistrictInput] = useState('');
  const [showAddDistrict, setShowAddDistrict] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showUploadDocsModal, setShowUploadDocsModal] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'website') {
      setShowWebsiteError(!value.startsWith('https://'));
    }
  };

  const handleRemoveState = (stateToRemove) => {
    if (formData.focusStates.length <= 1) {
      onNotify('error', 'You must maintain at least one operational focus state.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      focusStates: prev.focusStates.filter((s) => s !== stateToRemove)
    }));
  };

  const handleAddState = (e) => {
    e.preventDefault();
    if (!newStateInput.trim()) return;
    if (formData.focusStates.includes(newStateInput.trim())) {
      onNotify('error', 'State already in focus list.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      focusStates: [...prev.focusStates, newStateInput.trim()]
    }));
    setNewStateInput('');
    setShowAddState(false);
    onNotify('success', `Added ${newStateInput.trim()} to focus states.`);
  };

  const handleRemoveDistrict = (districtToRemove) => {
    if (formData.focusDistricts.length <= 1) {
      onNotify('error', 'You must maintain at least one focus district.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      focusDistricts: prev.focusDistricts.filter((d) => d !== districtToRemove)
    }));
  };

  const handleAddDistrict = (e) => {
    e.preventDefault();
    if (!newDistrictInput.trim()) return;
    if (formData.focusDistricts.includes(newDistrictInput.trim())) {
      onNotify('error', 'District already in operational area.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      focusDistricts: [...prev.focusDistricts, newDistrictInput.trim()]
    }));
    setNewDistrictInput('');
    setShowAddDistrict(false);
    onNotify('success', `Added ${newDistrictInput.trim()} to focus districts.`);
  };

  const handleToggleSector = (sector) => {
    setFormData((prev) => {
      const exists = prev.focusSectors.includes(sector);
      if (exists && prev.focusSectors.length <= 1) {
        onNotify('error', 'Please keep at least one active focus craft/sector.');
        return prev;
      }
      return {
        ...prev,
        focusSectors: exists
          ? prev.focusSectors.filter((s) => s !== sector)
          : [...prev.focusSectors, sector]
      };
    });
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.registrationNumber.trim() || !formData.workEmail.trim()) {
      onNotify('error', 'Please fill in all required fields.');
      return;
    }
    onUpdateProfile(formData);
    onNotify('success', 'Organization profile changes saved successfully.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* ========================================================= */}
      {/* 1. HEADER ROW */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Organization Profile
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Keep your organization details current so communities can trust your partnership requests.
          </p>
        </div>

        {/* Profile Completion Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-700 text-xs font-semibold self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Profile {formData.profileCompletion}% completed</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. TOP BANNER / LOGO & ACTION BAR CARD */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/80 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        
        <div className="flex items-center gap-4">
          {/* Logo upload placeholder */}
          <div className="relative group cursor-pointer">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-dashed border-neutral-300 hover:border-orange-500 bg-neutral-50 flex flex-col items-center justify-center text-neutral-400 group-hover:text-orange-600 transition-colors p-2 text-center">
              <Upload className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-bold leading-tight">Upload logo</span>
              <span className="text-[8px] text-neutral-400">PNG / JPG</span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
                {formData.name}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{formData.status}</span>
              </span>
            </div>

            <p className="text-xs text-neutral-500 mt-1">
              Submitted {formData.submissionDate} · <span className="font-semibold text-neutral-700">Registered NGO</span> · 🛡️ {formData.tier}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-500" />
            <span>Preview public profile</span>
          </button>

          <button
            onClick={handleSave}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save changes</span>
          </button>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. BASIC INFORMATION CARD */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <span>Basic information</span>
          </h3>
          <Building2 className="w-4 h-4 text-neutral-400" />
        </div>
        <p className="text-xs text-neutral-400 mb-5">
          Official registration and founding details of your entity
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                Organization Name
              </label>
              <span className="text-[10px] font-semibold text-orange-600">Required</span>
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs font-medium text-neutral-900 outline-hidden transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                Organization Type
              </label>
              <span className="text-[10px] font-semibold text-orange-600">Required</span>
            </div>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs font-medium text-neutral-900 outline-hidden transition-all bg-white"
            >
              <option value="NGO (Non-Profit Organization)">NGO (Non-Profit Organization)</option>
              <option value="Social Enterprise">Social Enterprise</option>
              <option value="Corporate CSR Foundation">Corporate CSR Foundation</option>
              <option value="Section 8 Not-For-Profit">Section 8 Not-For-Profit</option>
              <option value="Producer Company / Cooperative">Producer Company / Cooperative</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                Registration Number
              </label>
              <span className="text-[10px] font-semibold text-orange-600">Required</span>
            </div>
            <input
              type="text"
              value={formData.registrationNumber}
              onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs font-medium text-neutral-900 outline-hidden transition-all font-mono"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                Year Established
              </label>
              <span className="text-[10px] font-medium text-neutral-400">Optional</span>
            </div>
            <input
              type="text"
              value={formData.yearEstablished}
              onChange={(e) => handleInputChange('yearEstablished', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs font-medium text-neutral-900 outline-hidden transition-all"
            />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. CONTACT DETAILS CARD */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-neutral-900">
            Contact details
          </h3>
          <span className="text-neutral-400 font-bold">@</span>
        </div>
        <p className="text-xs text-neutral-400 mb-5">
          Primary communication points for platform inquiries and district coordination
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                  Work Email
                </label>
                <span className="text-[10px] font-semibold text-orange-600">Required</span>
              </div>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5" />
                <input
                  type="email"
                  value={formData.workEmail}
                  onChange={(e) => handleInputChange('workEmail', e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs font-medium text-neutral-900 outline-hidden transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                  Work Phone
                </label>
                <span className="text-[10px] font-semibold text-orange-600">Required</span>
              </div>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5" />
                <input
                  type="text"
                  value={formData.workPhone}
                  onChange={(e) => handleInputChange('workPhone', e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs font-medium text-neutral-900 outline-hidden transition-all"
                />
              </div>
            </div>
          </div>

          {/* Website field with Screenshot 2 exact validation error demonstration */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                Website
              </label>
              <span className="text-[10px] font-medium text-neutral-400">Optional</span>
            </div>
            <div className="relative flex items-center">
              <Globe className="w-4 h-4 text-neutral-400 absolute left-3.5" />
              <input
                type="text"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://example.org"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-medium outline-hidden transition-all ${
                  showWebsiteError
                    ? 'border-2 border-rose-600 bg-rose-50/20 text-neutral-900'
                    : 'border border-neutral-300 focus:border-orange-500 text-neutral-900'
                }`}
              />
              {showWebsiteError && (
                <AlertCircle className="w-4 h-4 text-rose-600 absolute right-3.5" />
              )}
            </div>

            {showWebsiteError && (
              <p className="text-[11px] text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Enter a valid URL starting with https://</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. FOCUS AREA & GEOGRAPHY CARD */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-neutral-900">
            Focus area & geography
          </h3>
          <MapPin className="w-4 h-4 text-neutral-400" />
        </div>
        <p className="text-xs text-neutral-400 mb-5">
          Define operational regions and key craft or livelihood clusters
        </p>

        <div className="space-y-5">
          
          {/* Focus States */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                Focus States
              </label>
              <span className="text-xs text-neutral-500">
                {formData.focusStates.length} Selected
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {formData.focusStates.map((st) => (
                <span
                  key={st}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-orange-900 border border-orange-200 text-xs font-semibold"
                >
                  <Check className="w-3.5 h-3.5 text-orange-600" />
                  <span>{st}</span>
                  <button
                    onClick={() => handleRemoveState(st)}
                    className="hover:text-rose-600 ml-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}

              {showAddState ? (
                <form onSubmit={handleAddState} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={newStateInput}
                    onChange={(e) => setNewStateInput(e.target.value)}
                    placeholder="Enter state name..."
                    autoFocus
                    className="px-3 py-1.5 rounded-xl border border-orange-400 text-xs text-neutral-800 outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 rounded-xl bg-orange-600 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddState(false)}
                    className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddState(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-dashed border-neutral-300 hover:border-orange-500 text-neutral-600 hover:text-orange-600 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add state</span>
                </button>
              )}
            </div>
          </div>

          {/* Focus Districts */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                Focus Districts
              </label>
              <span className="text-xs text-neutral-500">
                {formData.focusDistricts.length} Operational Areas
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {formData.focusDistricts.map((dist) => (
                <span
                  key={dist}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-semibold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{dist}</span>
                  <button
                    onClick={() => handleRemoveDistrict(dist)}
                    className="hover:text-rose-600 ml-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}

              {showAddDistrict ? (
                <form onSubmit={handleAddDistrict} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={newDistrictInput}
                    onChange={(e) => setNewDistrictInput(e.target.value)}
                    placeholder="Enter district name..."
                    autoFocus
                    className="px-3 py-1.5 rounded-xl border border-neutral-400 text-xs text-neutral-800 outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 rounded-xl bg-neutral-900 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddDistrict(false)}
                    className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddDistrict(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-dashed border-neutral-300 hover:border-neutral-500 text-neutral-600 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add district</span>
                </button>
              )}
            </div>
          </div>

          {/* Focus Sectors */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                Focus Sectors
              </label>
              <span className="text-[11px] text-neutral-400">
                Choose relevant craft / livelihood domains
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {formData.availableSectors.map((sector) => {
                const isSelected = formData.focusSectors.includes(sector);
                return (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => handleToggleSector(sector)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-100/80 text-orange-900 border border-orange-300 shadow-2xs'
                        : 'bg-white hover:bg-neutral-50 text-neutral-600 border border-neutral-300'
                    }`}
                  >
                    {isSelected ? (
                      <Check className="w-3.5 h-3.5 text-orange-600" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-neutral-400" />
                    )}
                    <span>{sector}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 6. VERIFICATION & DOCUMENTS CARD */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-neutral-900">
            Verification & Documents
          </h3>
          <Shield className="w-4 h-4 text-neutral-400" />
        </div>
        <p className="text-xs text-neutral-400 mb-5">
          Trust markers validated by NariSetu field and compliance coordinators
        </p>

        {/* Verification Active Card */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-neutral-900">
                  Verified Organization
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Active
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                Verified on {formData.verifiedDate} · 4 compliance documents on file (FCRA, 80G, 12A, Trust Deed)
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowUploadDocsModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs shrink-0"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-500" />
            <span>Upload updated documents</span>
          </button>
        </div>

        {/* Privacy Note */}
        <div className="mt-4 p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold">Privacy notice:</span> Aggregated community information only. Individual members' contact details and records are never disclosed.
          </p>
        </div>

      </div>

      {/* Footer sample notice */}
      <p className="text-[11px] text-neutral-400 text-center pt-2 pb-6">
        Sample data for design review. Organizations are not verified.
      </p>

      {/* ========================================================= */}
      {/* MODAL 1: PREVIEW PUBLIC PROFILE */}
      {/* ========================================================= */}
      {showPreviewModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowPreviewModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Public Entity Preview
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Verified Partner
                </span>
              </div>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-xl font-black">
                  {formData.initials}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">{formData.name}</h3>
                  <p className="text-xs text-neutral-500">{formData.type} · Estd. {formData.yearEstablished}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Reg. Certificate:</span>
                  <span className="font-mono font-medium text-neutral-800">{formData.registrationNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Official Portal:</span>
                  <span className="font-medium text-neutral-800">{formData.website}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Operational States:</span>
                  <span className="font-medium text-neutral-800">{formData.focusStates.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Focus Districts:</span>
                  <span className="font-medium text-neutral-800">{formData.focusDistricts.join(', ')}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-neutral-700">Supported Livelihood Domains:</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.focusSectors.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-900 border border-orange-200 text-xs font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: UPLOAD UPDATED DOCUMENTS */}
      {/* ========================================================= */}
      {showUploadDocsModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowUploadDocsModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                Upload Compliance Documents
              </h3>
              <button 
                onClick={() => setShowUploadDocsModal(false)}
                className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              {formData.complianceDocs.map((doc, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-neutral-900">{doc.name}</div>
                    <div className="text-[11px] font-mono text-neutral-400 mt-0.5">{doc.code}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {doc.status}
                  </span>
                </div>
              ))}

              <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-6 text-center hover:border-orange-500 transition-colors cursor-pointer bg-neutral-50/50">
                <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-neutral-700">Drag & drop renewed NGO compliance files</p>
                <p className="text-[11px] text-neutral-400 mt-1">PDF, JPG up to 10MB per file</p>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex justify-end gap-2">
              <button
                onClick={() => setShowUploadDocsModal(false)}
                className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUploadDocsModal(false);
                  onNotify('success', 'Documents submitted for district verification review.');
                }}
                className="px-4 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold"
              >
                Submit Documents
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
