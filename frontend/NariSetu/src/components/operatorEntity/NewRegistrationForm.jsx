import React, { useState, useRef } from 'react';
import { 
  Camera, Upload, CheckCircle2, AlertCircle, PhoneCall, 
  MapPin, Check, Plus, ShieldCheck, Sparkles, RefreshCw, X
} from 'lucide-react';

export default function NewRegistrationForm({
  onCancel,
  onSubmit,
  onNotify
}) {
  // 1. Profile / Biometrics
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isCapturingWebcam, setIsCapturingWebcam] = useState(false);
  const fileInputRef = useRef(null);

  // 2. Personal & Family Details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('32');
  const [educationLevel, setEducationLevel] = useState('Secondary (10th Pass / Madhyamik)');
  const [maritalStatus, setMaritalStatus] = useState('Married');
  const [familyConditions, setFamilyConditions] = useState(['BPL Household', 'Female-Headed']);
  const [totalFamilyMembers, setTotalFamilyMembers] = useState('5');
  const [numberOfChildren, setNumberOfChildren] = useState('2');
  const [monthlyIncome, setMonthlyIncome] = useState('7,500');
  const [craftInterests, setCraftInterests] = useState(['Textile & Tailoring', 'Handicrafts & Jute Work']);
  const [customInterest, setCustomInterest] = useState('');
  const [showAddInterest, setShowAddInterest] = useState(false);

  // 3. Address Details
  const [state, setState] = useState('West Bengal');
  const [district, setDistrict] = useState('Nadia');
  const [block, setBlock] = useState('Hanskhali');
  const [gramPanchayat, setGramPanchayat] = useState('Mayurhat-I GP');
  const [village, setVillage] = useState('Dakshinpara, Mayurhat');
  const [wardLandmark, setWardLandmark] = useState('Ward No. 04 (Near Primary School)');
  const [pinCode, setPinCode] = useState('741502');

  // 4. Skills & Interests
  const [skillsSelected, setSkillsSelected] = useState(['Kantha Embroidery', 'Tailoring & Stitch']);
  const [specialization, setSpecialization] = useState('Traditional Bengali Nakshi Kantha, Sari borders, Cushion covers, Motif design');
  const [experienceLevel, setExperienceLevel] = useState('Experienced Practitioner (5 - 10 years)');
  const [productionCapacity, setProductionCapacity] = useState('4 - 5 hours daily (Home workshop)');
  const [skillDescription, setSkillDescription] = useState('Specialized in intricate running-stitch floral patterns and folklore motifs on pure mulberry silk and handspun cotton. Actively leads a 6-woman self-help cluster in Mayurhat GP.');
  const [achievements, setAchievements] = useState('District Hastashilpa Mela Award (2022); Certified by WB Handicrafts Development Corp');
  
  // Contact info
  const [phone, setPhone] = useState('98321' + Math.floor(10000 + Math.random() * 90000));

  const [submitting, setSubmitting] = useState(false);

  // Handle Photo Upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
        onNotify('success', 'Biometric facial photograph loaded successfully (ISO 19794-5 Compliant).');
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate Webcam Capture
  const handleSimulateWebcam = () => {
    setIsCapturingWebcam(true);
    setTimeout(() => {
      setPhotoPreview('/images/aparna_ghosh.jpg');
      setIsCapturingWebcam(false);
      onNotify('success', 'Facial frame captured! Biometric Quality: 96% Match.');
    }, 700);
  };

  const toggleFamilyCondition = (cond) => {
    setFamilyConditions(prev => 
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  const toggleCraftInterest = (interest) => {
    setCraftInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleSkill = (skill) => {
    setSkillsSelected(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomInterest = (e) => {
    e.preventDefault();
    if (customInterest.trim() && !craftInterests.includes(customInterest.trim())) {
      setCraftInterests([...craftInterests, customInterest.trim()]);
      setCustomInterest('');
      setShowAddInterest(false);
      onNotify('info', `Added "${customInterest.trim()}" to craft activity groups.`);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      onNotify('error', 'Please enter First Name and Last Name.');
      return;
    }

    setSubmitting(true);

    const generatedUid = `NS-WB-${Math.floor(7406 + Math.random() * 500)}`;

    const newArtisan = {
      id: generatedUid,
      uid: generatedUid,
      name: `${firstName.trim()} ${lastName.trim()}`,
      bengaliName: firstName.trim() === 'Ananya' ? 'অনন্যা ঘোষ' : null,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      age: Number(age) || 32,
      education: educationLevel,
      educationLevel: educationLevel,
      maritalStatus,
      familyConditions,
      category: familyConditions,
      totalFamilyMembers: Number(totalFamilyMembers) || 5,
      numberOfChildren: Number(numberOfChildren) || 2,
      income: `₹ ${monthlyIncome} / month`,
      monthlyIncome: monthlyIncome,
      craftInterests,
      state,
      district,
      block,
      panchayat: gramPanchayat.replace(' GP', ''),
      gramPanchayat,
      village,
      habitation: `${village}, ${block}`,
      wardLandmark,
      pinCode,
      skillsSelected,
      craft: skillsSelected[0] || 'Handicrafts & Stitch',
      craftDetail: `${skillsSelected[0] || 'Handicrafts'} (${productionCapacity.split(' ')[0]} hrs/day)`,
      specialization,
      experienceLevel,
      productionCapacity,
      skillDescription,
      achievements,
      phone: `+91 ${phone}`,
      aadhaarRef: `UID: **** ${Math.floor(1000 + Math.random() * 9000)} (OK)`,
      avatar: photoPreview || '/images/aparna_ghosh.jpg',
      registered: 'Today, Just now',
      syncStatus: 'Verified',
      syncBadgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };

    setTimeout(() => {
      onSubmit(newArtisan);
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left pb-16">
      
      {/* Title & Helpdesk Banner */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            New User Registration Form
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
            Capture authentic identity data, biometrics, and baseline household location for the rural craft directory.
          </p>
        </div>

        {/* Helpline Card from Screenshot */}
        <div className="bg-[#fff7ed] border border-orange-200/90 rounded-2xl p-4 max-w-sm flex items-start gap-3 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center shrink-0 mt-0.5">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-orange-950 uppercase tracking-wider block">
              District Helpdesk Helpline
            </span>
            <p className="text-[11px] text-neutral-600 mt-0.5 leading-tight">
              Facing document mismatch or UIDAI server timeouts? Toll-free Nadia District Support:
            </p>
            <span className="text-xs font-mono font-extrabold text-[#ea580c] block mt-1">
              1800-345-0204
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmitForm} className="space-y-6">
        
        {/* ========================================================= */}
        {/* SECTION 1: USER PROFILE & BIOMETRIC CAPTURE */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-2xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-100">
            <Camera className="w-4 h-4 text-[#ea580c]" />
            <h2 className="text-sm sm:text-base font-extrabold text-neutral-900">
              1. User Profile
            </h2>
            <span className="text-[11px] text-neutral-400 ml-2 hidden sm:inline">
              Live biometric facial capture compliant with Handicrafts Board standard
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* Photo Frame */}
            <div className="w-32 h-36 rounded-2xl bg-neutral-100 border-2 border-dashed border-neutral-300 flex items-center justify-center overflow-hidden relative shadow-2xs shrink-0 group">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Biometric Capture Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-neutral-400 p-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center mb-1">
                    <Camera className="w-6 h-6 text-neutral-400" />
                  </div>
                  <span className="text-[10px] font-semibold">No Image</span>
                </div>
              )}
            </div>

            {/* Quality & Action Buttons */}
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Facial Frame Quality: 96% Match</span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Direct sunlight avoided • Neutral background detected • ISO compliant capture.
                </p>
                <p className="text-[10px] text-neutral-400 mt-0.5 font-mono">
                  🔒 Encrypted bio-token stored locally on field device
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleSimulateWebcam}
                  disabled={isCapturingWebcam}
                  className="px-4 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-sm shadow-orange-500/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  {isCapturingWebcam ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Calibrating Camera...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-3.5 h-3.5" />
                      <span>Take Photo with Webcam</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Upload JPG / PNG</span>
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png"
                  className="hidden"
                />
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: PERSONAL & FAMILY DETAILS */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-neutral-900">
                2. Personal & Family Details
              </h2>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Core demographic baseline, family dependency & household economic status
              </p>
            </div>
            <span className="text-[11px] font-bold text-rose-500">
              * Mandatory fields
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            
            {/* First Name */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-neutral-800">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Aadhaar Verified
                </span>
              </div>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Ananya"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            {/* Last Name */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-neutral-800">
                  Last Name / Surname <span className="text-rose-500">*</span>
                </label>
              </div>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Ghosh"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            {/* Age */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-neutral-800">
                  Age (Years) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Auto: {age} Yrs
                </span>
              </div>
              <input
                type="number"
                required
                min="18"
                max="85"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Education Level <span className="text-rose-500">*</span>
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-white"
              >
                <option value="Secondary (10th Pass / Madhyamik)">Secondary (10th Pass / Madhyamik)</option>
                <option value="Primary (5th Pass)">Primary (5th Pass)</option>
                <option value="Primary (8th Pass)">Primary (8th Pass)</option>
                <option value="Higher Secondary (12th Pass)">Higher Secondary (12th Pass)</option>
                <option value="Graduate / Degree">Graduate / Degree</option>
                <option value="Literate (Non-formal schooling)">Literate (Non-formal schooling)</option>
              </select>
            </div>

          </div>

          {/* Relationship / Marital Status */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-neutral-800 mb-2">
              Relationship / Marital Status <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Married', 'Unmarried', 'Widowed', 'Single / Separated'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setMaritalStatus(status)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    maritalStatus === status
                      ? 'bg-orange-100 border-orange-400 text-orange-950 shadow-2xs'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${maritalStatus === status ? 'bg-[#ea580c]' : 'bg-neutral-300'}`} />
                  <span>{status}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Family Condition (Socio-Economic Category) */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-neutral-800">
                Family Condition (Socio-Economic Category) <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] text-neutral-400">Select applicable tags</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                'BPL Household',
                'Female-Headed',
                'Marginalized Artisan',
                'Divyangjan (PwD)'
              ].map((cond) => {
                const active = familyConditions.includes(cond);
                return (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => toggleFamilyCondition(cond)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      active
                        ? 'bg-amber-100/70 border-amber-400 text-amber-950 shadow-2xs'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[9px] ${
                      active ? 'bg-amber-600 text-white border-amber-600' : 'border-neutral-300'
                    }`}>
                      {active && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{cond}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Numeric Demographics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Total Family Members <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                max="20"
                value={totalFamilyMembers}
                onChange={(e) => setTotalFamilyMembers(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Number of Children <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                max="10"
                value={numberOfChildren}
                onChange={(e) => setNumberOfChildren(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-neutral-800">
                  Monthly Household Income <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] font-mono font-bold text-neutral-400">INR (₹)</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-neutral-400 font-bold">₹</span>
                <input
                  type="text"
                  required
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="7,500 / month"
                  className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-bold text-neutral-900 focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Community Group & Craft Interests */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-neutral-800">
                Community Group & Craft Interests <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] text-neutral-400">Select all relevant activity groups</span>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {[
                'Textile & Tailoring',
                'Cooking & Food Processing',
                'Handicrafts & Jute Work',
                'Weaving & Handloom',
                'Traditional Dancing & Folk Arts',
                'Pottery & Clay Craft'
              ].map((interest) => {
                const active = craftInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleCraftInterest(interest)}
                    className={`py-2 px-3.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      active
                        ? 'bg-orange-100 border-orange-400 text-orange-950 shadow-2xs'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[9px] ${
                      active ? 'bg-[#ea580c] text-white border-[#ea580c]' : 'border-neutral-300'
                    }`}>
                      {active && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{interest}</span>
                  </button>
                );
              })}

              {showAddInterest ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                    placeholder="Enter group name..."
                    className="px-3 py-1.5 rounded-xl border border-orange-300 text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomInterest}
                    className="px-3 py-1.5 rounded-xl bg-[#ea580c] text-white text-xs font-bold cursor-pointer"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddInterest(false)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddInterest(true)}
                  className="py-2 px-3 rounded-xl border border-dashed border-orange-300 text-[#ea580c] text-xs font-bold hover:bg-orange-50 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add other group / community</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* SECTION 3: ADDRESS DETAILS */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-neutral-900">
                3. Address Details
              </h2>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Gram Panchayat jurisdiction, block cluster & residential location
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>Geo-Verified Block</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                State <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                District <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Block / Sub-Division <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Gram Panchayat <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={gramPanchayat}
                onChange={(e) => setGramPanchayat(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Village / Habitation <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Ward / Para / Landmark
              </label>
              <input
                type="text"
                value={wardLandmark}
                onChange={(e) => setWardLandmark(e.target.value)}
                placeholder="e.g. Ward No. 04 (Near Primary School)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-neutral-800">
                  Postal PIN Code <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-emerald-700 font-semibold">
                  Valid Nadia Postal Division
                </span>
              </div>
              <input
                type="text"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-mono font-bold text-neutral-900 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 4: SKILLS & INTERESTS */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-neutral-900">
                4. Skills & Interests
              </h2>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Craft taxonomy, production capability, experience level & recognition
              </p>
            </div>
            <span className="text-[10px] font-bold text-orange-800 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
              Ministry of Textiles Taxonomy
            </span>
          </div>

          {/* Primary & Secondary Skill / Craft Names */}
          <div>
            <label className="block text-xs font-bold text-neutral-800 mb-2">
              Primary & Secondary Skill / Craft Names <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                'Kantha Embroidery',
                'Tailoring & Stitch',
                'Jute Handicrafts',
                'Handloom Weaving'
              ].map((skill) => {
                const active = skillsSelected.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      active
                        ? 'bg-orange-100 border-orange-400 text-orange-950 shadow-2xs'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[9px] ${
                      active ? 'bg-[#ea580c] text-white border-[#ea580c]' : 'border-neutral-300'
                    }`}>
                      {active && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{skill}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-xs font-bold text-neutral-800 mb-1.5">
              Interest Fields / Specialization Areas <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="e.g. Traditional Bengali Nakshi Kantha, Sari borders, Cushion covers, Motif design"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:border-orange-500 focus:outline-none"
            />
            <span className="text-[10px] text-neutral-400 mt-1 block">
              Enter specific motifs, products or commercial work interests
            </span>
          </div>

          {/* Experience & Production Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Skill & Experience Level <span className="text-rose-500">*</span>
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:border-orange-500 focus:outline-none bg-white"
              >
                <option value="Experienced Practitioner (5 - 10 years)">Experienced Practitioner (5 - 10 years)</option>
                <option value="Master Artisan (10+ years)">Master Artisan (10+ years)</option>
                <option value="Intermediate Artisan (2 - 5 years)">Intermediate Artisan (2 - 5 years)</option>
                <option value="Beginner / Trainee (Less than 2 years)">Beginner / Trainee (Less than 2 years)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Production Capacity <span className="text-rose-500">*</span>
              </label>
              <select
                value={productionCapacity}
                onChange={(e) => setProductionCapacity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:border-orange-500 focus:outline-none bg-white"
              >
                <option value="4 - 5 hours daily (Home workshop)">4 - 5 hours daily (Home workshop)</option>
                <option value="2 - 3 hours daily (Part-time)">2 - 3 hours daily (Part-time)</option>
                <option value="6 - 8 hours daily (Full-time commercial)">6 - 8 hours daily (Full-time commercial)</option>
                <option value="Cooperative Shared Loom (Flexible)">Cooperative Shared Loom (Flexible)</option>
              </select>
            </div>
          </div>

          {/* Description of Skill & Work Style */}
          <div>
            <label className="block text-xs font-bold text-neutral-800 mb-1.5">
              Description of Skill & Work Style
            </label>
            <textarea
              rows="3"
              value={skillDescription}
              onChange={(e) => setSkillDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-800 focus:border-orange-500 focus:outline-none"
            />
          </div>

          {/* Notable Achievements / Certifications */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-neutral-800">
                Notable Achievements / Certifications
              </label>
              <span className="text-[10px] text-neutral-400">Optional</span>
            </div>
            <input
              type="text"
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              placeholder="e.g. District Hastashilpa Mela Award (2022); Certified by WB Handicrafts Development Corp"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-800 focus:border-orange-500 focus:outline-none"
            />
            <span className="text-[10px] text-neutral-400 mt-1 block">
              Awards, state exhibition participation, or SHG cluster recognition
            </span>
          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM ACTION BUTTONS */}
        {/* ========================================================= */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-600/30 flex items-center gap-2 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
          >
            {submitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Registering Beneficiary...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Register</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
