import React, { useState } from 'react';
import { 
  Check, CheckCircle2, MapPin, Pencil, Users, ShieldCheck, 
  IdCard, Award, Sparkles, Building, ChevronRight, X, CreditCard,
  Lightbulb, ExternalLink, ShieldAlert
} from 'lucide-react';
import { defaultWomanProfile } from './womanUserData';

export default function WomanProfile({ 
  onNavigateToCommunity,
  onNotify
}) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('narisetu_woman_profile');
      return saved ? JSON.parse(saved) : defaultWomanProfile;
    } catch {
      return defaultWomanProfile;
    }
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({ ...profile });

  // Bank Form State
  const [bankData, setBankData] = useState({
    bankName: 'State Bank of India',
    accountNumber: '38291048291',
    ifsc: 'SBIN0001284',
    branch: 'Hanskhali Branch'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(editForm);
    try {
      localStorage.setItem('narisetu_woman_profile', JSON.stringify(editForm));
    } catch (err) {
      console.warn('Storage save failed', err);
    }
    setIsEditModalOpen(false);
    onNotify?.('success', 'Profile details updated successfully!');
  };

  const handleLinkBank = (e) => {
    e.preventDefault();
    const updated = {
      ...profile,
      completeness: 100,
      bankLinked: true,
      bankDetails: bankData
    };
    setProfile(updated);
    try {
      localStorage.setItem('narisetu_woman_profile', JSON.stringify(updated));
    } catch (err) {
      console.warn('Storage save failed', err);
    }
    setIsBankModalOpen(false);
    onNotify?.('success', 'Bank account linked! Profile completeness reached 100%');
  };

  return (
    <div className="min-h-screen bg-[#ededeb] text-[#1c1917] font-sans pb-16">
      
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          
          {/* ========================================================= */}
          {/* LEFT SIDEBAR PROFILE CARD */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-neutral-200/80 flex flex-col items-center text-center">
            
            {/* Avatar with Verified Badge */}
            <div className="relative mt-2">
              <div className="w-36 h-36 rounded-full p-1 ring-4 ring-orange-500/30 overflow-hidden shadow-md">
                <img
                  src={profile.avatarUrl || '/images/aparna_ghosh.jpg'}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = '/images/login_bg_user.jpg';
                  }}
                />
              </div>
              {/* Green Verified Circle Badge */}
              <div 
                className="absolute bottom-1 right-2 w-7 h-7 rounded-full bg-emerald-600 text-white border-2 border-white flex items-center justify-center shadow-md"
                title="Verified Rural Artisan"
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

            {/* Name & Basic Info */}
            <h1 className="text-2xl font-black text-neutral-900 mt-5 tracking-tight">
              {profile.name}
            </h1>
            <p className="text-sm font-medium text-neutral-500 mt-1">
              {profile.age} • {profile.maritalStatus}
            </p>

            {/* Location Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-3 rounded-full bg-[#fff7ed] border border-orange-200/70 text-xs font-semibold text-[#c2410c]">
              <MapPin className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
              <span>{profile.district}, {profile.state}</span>
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={() => {
                setEditForm({ ...profile });
                setIsEditModalOpen(true);
              }}
              className="w-full mt-6 py-3 px-4 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
              <span>Edit profile</span>
            </button>

            {/* Profile Completeness Section */}
            <div className="w-full mt-7 text-left">
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-neutral-700">Profile completeness</span>
                <span className="text-[#ea580c] font-black">{profile.completeness}%</span>
              </div>
              
              <div className="w-full h-2.5 bg-neutral-200/90 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-700"
                  style={{ width: `${profile.completeness}%` }}
                />
              </div>

              {profile.completeness < 100 ? (
                <button
                  onClick={() => setIsBankModalOpen(true)}
                  className="text-[11px] text-neutral-400 hover:text-[#ea580c] mt-2 font-medium transition-colors cursor-pointer text-left block"
                >
                  Add bank account link to reach 100%
                </button>
              ) : (
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-2 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Profile 100% verified with linked Bank A/C</span>
                </div>
              )}
            </div>

            {/* Verification & Community Info Cards */}
            <div className="w-full space-y-3 mt-7">
              
              {/* Member of 2 Communities */}
              <button
                onClick={onNavigateToCommunity}
                className="w-full p-3.5 rounded-2xl bg-[#fdfcfb] hover:bg-[#fbf7f3] border border-neutral-200/80 flex items-center gap-3.5 text-left transition-all cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-orange-100/90 text-[#ea580c] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-neutral-900 group-hover:text-[#ea580c] transition-colors">
                    Member of {profile.communitiesCount} communities
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate">
                    {profile.communitiesNames}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#ea580c] transition-colors shrink-0" />
              </button>

              {/* Verified Artisan Member */}
              <div className="w-full p-3.5 rounded-2xl bg-[#f0fdf4] border border-emerald-200/80 flex items-center gap-3.5 text-left">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-neutral-900">
                    Verified Artisan Member
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold truncate">
                    {profile.verifiedBy}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT MAIN DETAILS CONTAINER */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* --------------------------------------------------------- */}
            {/* 1. PERSONAL DETAILS CARD */}
            {/* --------------------------------------------------------- */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-neutral-200/80">
              
              {/* Section Header */}
              <div className="flex items-start gap-3.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#fff7ed] text-[#ea580c] flex items-center justify-center shrink-0 mt-0.5 border border-orange-100">
                  <IdCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-neutral-900 tracking-tight">
                    Personal details
                  </h2>
                  <p className="text-xs text-neutral-400 font-medium">
                    Verified demographic and familial records
                  </p>
                </div>
              </div>

              {/* 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                
                {/* Name */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                  <div className="text-[11px] font-medium text-neutral-400">Name (first, last)</div>
                  <div className="text-sm font-bold text-neutral-900 mt-1">{profile.name}</div>
                </div>

                {/* Age */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                  <div className="text-[11px] font-medium text-neutral-400">Age</div>
                  <div className="text-sm font-bold text-neutral-900 mt-1">{profile.age}</div>
                </div>

                {/* Relationship status */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                  <div className="text-[11px] font-medium text-neutral-400">Relationship status</div>
                  <div className="text-sm font-bold text-neutral-900 mt-1">{profile.maritalStatus}</div>
                </div>

                {/* Family condition */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                  <div className="text-[11px] font-medium text-neutral-400">Family condition</div>
                  <div className="text-sm font-bold text-neutral-900 mt-1">{profile.familyCondition}</div>
                </div>

                {/* Education */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                  <div className="text-[11px] font-medium text-neutral-400">Education</div>
                  <div className="text-sm font-bold text-neutral-900 mt-1">{profile.education}</div>
                </div>

                {/* Number of children */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                  <div className="text-[11px] font-medium text-neutral-400">Number of children</div>
                  <div className="text-sm font-bold text-neutral-900 mt-1">{profile.children}</div>
                </div>

                {/* Family members */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                  <div className="text-[11px] font-medium text-neutral-400">Family members</div>
                  <div className="text-sm font-bold text-neutral-900 mt-1">{profile.familyMembers}</div>
                </div>

                {/* Income */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                  <div className="text-[11px] font-medium text-neutral-400">Income</div>
                  <div className="text-sm font-extrabold text-[#16a34a] font-mono mt-1">
                    {profile.income}
                  </div>
                </div>

              </div>

            </div>

            {/* --------------------------------------------------------- */}
            {/* 2. ADDRESS CARD */}
            {/* --------------------------------------------------------- */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-neutral-200/80">
              
              {/* Section Header */}
              <div className="flex items-start gap-3.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#fff7ed] text-[#ea580c] flex items-center justify-center shrink-0 mt-0.5 border border-orange-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-neutral-900 tracking-tight">
                    Address
                  </h2>
                  <p className="text-xs text-neutral-400 font-medium">
                    Registered rural residential location
                  </p>
                </div>
              </div>

              {/* Grid Layout matching screenshot */}
              <div className="space-y-3.5">
                
                {/* Row 1: State | District | Block */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                    <div className="text-[11px] font-medium text-neutral-400">State</div>
                    <div className="text-sm font-bold text-neutral-900 mt-1">{profile.state}</div>
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                    <div className="text-[11px] font-medium text-neutral-400">District</div>
                    <div className="text-sm font-bold text-neutral-900 mt-1">{profile.district}</div>
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                    <div className="text-[11px] font-medium text-neutral-400">Block</div>
                    <div className="text-sm font-bold text-neutral-900 mt-1">{profile.block}</div>
                  </div>
                </div>

                {/* Row 2: Panchayat | Village */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                    <div className="text-[11px] font-medium text-neutral-400">Panchayat</div>
                    <div className="text-sm font-bold text-neutral-900 mt-1">{profile.panchayat}</div>
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                    <div className="text-[11px] font-medium text-neutral-400">Village</div>
                    <div className="text-sm font-bold text-neutral-900 mt-1">{profile.village}</div>
                  </div>
                </div>

              </div>

            </div>

            {/* --------------------------------------------------------- */}
            {/* 3. SKILLS AND INTERESTS CARD */}
            {/* --------------------------------------------------------- */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-neutral-200/80">
              
              {/* Section Header */}
              <div className="flex items-start gap-3.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#fff7ed] text-[#ea580c] flex items-center justify-center shrink-0 mt-0.5 border border-orange-100">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-neutral-900 tracking-tight">
                    Skills and interests
                  </h2>
                  <p className="text-xs text-neutral-400 font-medium">
                    Livelihood proficiencies, trade abilities, and future ambitions
                  </p>
                </div>
              </div>

              {/* Verified Skills */}
              <div className="mt-4">
                <div className="text-[11px] font-black uppercase tracking-wider text-neutral-400 mb-2.5">
                  VERIFIED SKILLS
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {profile.verifiedSkills?.map((skill, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ea580c] text-white text-xs font-bold shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interest Fields & Aspirations */}
              <div className="mt-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-neutral-400 mb-2.5">
                  INTEREST FIELDS & ASPIRATIONS
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {profile.interestFields?.map((interest, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center px-4 py-2 rounded-full bg-[#fefce8] border border-[#fde047] text-neutral-800 text-xs font-semibold shadow-2xs"
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description of skill */}
              <div className="mt-6 p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70">
                <div className="text-xs font-bold text-neutral-700 mb-1.5">
                  Description of skill
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {profile.descriptionOfSkill}
                </p>
              </div>

              {/* Achievements & Certifications */}
              <div className="mt-4 p-4 rounded-2xl bg-[#faf9f8] border border-neutral-200/70 space-y-3">
                <div className="text-xs font-bold text-neutral-700 mb-2">
                  Achievements & Certifications
                </div>

                <div className="space-y-2.5">
                  {/* Item 1 */}
                  <div className="flex items-start gap-2.5 text-xs text-neutral-600">
                    <span className="text-base leading-none">🏆</span>
                    <div>
                      <span className="font-bold text-neutral-900">Best Artisan Award (Runner Up)</span>
                      <span> - Nadia District Rural Handicraft Fair 2023.</span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-2.5 text-xs text-neutral-600">
                    <span className="text-base leading-none">🎖️</span>
                    <div>
                      <span className="font-bold text-neutral-900">Certified Master Tailor</span>
                      <span> - West Bengal State Rural Livelihoods Mission (Anandadhara).</span>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-2.5 text-xs text-neutral-600">
                    <span className="text-base leading-none">👥</span>
                    <div>
                      <span className="font-bold text-neutral-900">Peer Trainer</span>
                      <span> - Trained 18 rural women in Hanskhali village in hand-embroidery and Kantha stitching techniques.</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* EDIT PROFILE MODAL */}
      {/* ========================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
              <div>
                <h3 className="text-xl font-black text-neutral-900">Edit Rural Artisan Profile</h3>
                <p className="text-xs text-neutral-500">Update verified details & skill descriptions</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Age & Unit</label>
                  <input
                    type="text"
                    value={editForm.age}
                    onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Relationship Status</label>
                  <input
                    type="text"
                    value={editForm.maritalStatus}
                    onChange={(e) => setEditForm({ ...editForm, maritalStatus: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Family Condition</label>
                  <input
                    type="text"
                    value={editForm.familyCondition}
                    onChange={(e) => setEditForm({ ...editForm, familyCondition: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Education</label>
                  <input
                    type="text"
                    value={editForm.education}
                    onChange={(e) => setEditForm({ ...editForm, education: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Monthly Income</label>
                  <input
                    type="text"
                    value={editForm.income}
                    onChange={(e) => setEditForm({ ...editForm, income: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:border-orange-500 focus:outline-none font-mono text-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Gram Panchayat</label>
                  <input
                    type="text"
                    value={editForm.panchayat}
                    onChange={(e) => setEditForm({ ...editForm, panchayat: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Village & Post (PIN)</label>
                  <input
                    type="text"
                    value={editForm.village}
                    onChange={(e) => setEditForm({ ...editForm, village: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Description of Skill</label>
                <textarea
                  rows="3"
                  value={editForm.descriptionOfSkill}
                  onChange={(e) => setEditForm({ ...editForm, descriptionOfSkill: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-normal focus:border-orange-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* LINK BANK ACCOUNT MODAL (FOR 100% COMPLETION) */}
      {/* ========================================================= */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-neutral-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black text-neutral-900">Link Bank Account for DBT</h3>
              </div>
              <button
                onClick={() => setIsBankModalOpen(false)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-500 mb-4">
              Direct Benefit Transfer (DBT) requires a verified bank account linked to your Aadhaar and SHG Passbook.
            </p>

            <form onSubmit={handleLinkBank} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  value={bankData.bankName}
                  onChange={(e) => setBankData({ ...bankData, bankName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-semibold focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">Account Number</label>
                <input
                  type="text"
                  value={bankData.accountNumber}
                  onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono font-semibold focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={bankData.ifsc}
                    onChange={(e) => setBankData({ ...bankData, ifsc: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono font-semibold focus:border-orange-500 focus:outline-none uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Branch</label>
                  <input
                    type="text"
                    value={bankData.branch}
                    onChange={(e) => setBankData({ ...bankData, branch: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-semibold focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsBankModalOpen(false)}
                  className="w-1/2 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Link & Complete 100%
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* FOOTER BAR (MATCHING SCREENSHOT) */}
      {/* ========================================================= */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-neutral-300/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          <span>NariSetu Portal • Supported under Rural Women Digital Inclusivity Mission</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-neutral-500 font-medium">
          <span className="hover:text-neutral-800 cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-neutral-800 cursor-pointer">Help & Sahayata Center</span>
          <span>•</span>
          <span className="font-semibold text-neutral-700">Toll-Free Helpline: 1800-XXX-XXXX</span>
        </div>
      </footer>

    </div>
  );
}
