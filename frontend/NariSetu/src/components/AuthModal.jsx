import React, { useState, useEffect } from 'react';
import { 
  X, Eye, EyeOff, Search, ChevronDown, Check, ShieldCheck, 
  Sparkles, CheckCircle2, Lock, ArrowRight, HelpCircle 
} from 'lucide-react';
import { api } from '../api';

export default function AuthModal({ 
  isOpen, 
  initialRole = 'user', 
  onClose, 
  onSuccess, 
  onNotify 
}) {
  // 4 Roles matching the user-provided design: 'user' | 'operator' | 'partner' | 'admin'
  const [activeRole, setActiveRole] = useState('user');
  
  // Operator sub-role toggle: 'data_entry' | 'community_manager'
  const [operatorSubRole, setOperatorSubRole] = useState('data_entry');

  // Form Fields
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync initial role when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialRole === 'gov') setActiveRole('admin');
      else if (initialRole === 'partner') setActiveRole('partner');
      else if (initialRole === 'operator') setActiveRole('operator');
      else setActiveRole('user');

      setIsVerified(false);
      setOtp('');
      setPassword('');
      setIdentifier('');
    }
  }, [isOpen, initialRole]);

  if (!isOpen) return null;

  // Background artwork corresponding to each role
  const roleBackgrounds = {
    user: '/images/login_bg_user.jpg',
    operator: '/images/login_bg_operator.jpg',
    partner: '/images/login_bg_partner.jpg',
    admin: '/images/login_bg_admin.jpg'
  };

  const handleVerify = () => {
    if (!identifier.trim()) {
      onNotify('error', 'Please enter your Mobile number, Email or ID first.');
      return;
    }
    setIsVerified(true);
    setOtp('528140');
    onNotify('success', `OTP 528140 sent to ${identifier}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const timestamp = Date.now().toString().slice(-4);
      let roleUser = {
        id: activeRole === 'operator' ? 'OP-8492' : `${activeRole}-${timestamp}`,
        name: activeRole === 'user' 
          ? 'Aparna Ghosh' 
          : activeRole === 'operator' 
          ? 'Smt. Rekha Mondal'
          : activeRole === 'partner'
          ? 'Rural Sphere Foundation'
          : 'Director of Rural Development',
        email: identifier || (activeRole === 'user' 
          ? 'aparna.ghosh@narisetu.org' 
          : activeRole === 'operator'
          ? 'rekha.mondal@narisetu.wb.gov.in'
          : activeRole === 'partner' 
          ? 'partnerships@ruralsphere.org.in' 
          : `${activeRole}_${timestamp}@narisetu.gov.in`),
        role: activeRole,
        displayRole: activeRole === 'operator' ? 'Field Operator (Data Entry)' : activeRole,
        avatarInitials: activeRole === 'operator' ? 'RM' : null,
        assignedBlock: activeRole === 'operator' ? 'Hanskhali' : null,
        operatorSubRole: activeRole === 'operator' ? operatorSubRole : null,
        status: activeRole === 'partner' ? 'Verified partner' : activeRole === 'operator' ? 'Active Field Operator' : null,
        initials: activeRole === 'partner' ? 'RS' : activeRole === 'operator' ? 'RM' : null,
        tier: activeRole === 'partner' ? 'Tier-1 Partner' : null,
        avatar: activeRole === 'user' ? '/images/aparna_ghosh.jpg' : null,
        location: activeRole === 'user' ? 'Hanskhali, Nadia' : activeRole === 'operator' ? 'Hanskhali Block, Nadia South' : activeRole === 'partner' ? 'West Bengal & Odisha' : null,
        createdAt: new Date().toISOString()
      };

      onSuccess(roleUser);
      onClose();
    } catch {
      onNotify('error', 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    if (activeRole === 'user') {
      setIdentifier('+91 98765 43210');
      setPassword('aparna@2026');
      setOtp('528140');
    } else if (activeRole === 'operator') {
      setIdentifier('operator.csc104@narisetu.org');
      setPassword('mitra@2026');
      setOtp('528140');
    } else if (activeRole === 'partner') {
      setIdentifier('partnerships@ruralsphere.org.in');
      setPassword('rural@partner2026');
    } else {
      setIdentifier('adm.director@narisetu.gov.in');
      setPassword('gov@admin2026');
    }
    setIsVerified(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in"
      onClick={onClose}
    >
      {/* Container simulating the full-bleed artwork card frame */}
      <div 
        className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col min-h-[580px] max-h-[92vh] bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url('${roleBackgrounds[activeRole]}')` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Soft Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 pointer-events-none" />

        {/* ========================================================= */}
        {/* TOP BAR (MATCHING IMAGE 1 HEADER) */}
        {/* ========================================================= */}
        <div className="relative z-20 px-6 py-4 flex items-center justify-between border-b border-white/15 bg-black/30 backdrop-blur-md">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm shrink-0">
              <img src="/images/na_icon.png" alt="NariSetu Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Nari<span className="text-orange-400">Setu</span>
            </span>
          </div>

          {/* Search Box from Image */}
          <div className="hidden sm:flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs text-white/80 max-w-xs w-full mx-4">
            <Search className="w-3.5 h-3.5 mr-2 text-white/60" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent outline-hidden text-xs text-white placeholder-white/50 w-full" 
            />
          </div>

          {/* Right Controls: Language & Close */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white">
              <span>lang:</span>
              <span className="font-bold text-amber-300">Hindi/English</span>
            </div>

            <button 
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4 ROLES SELECTOR TABS (EASY ROLE SWITCHING) */}
        {/* ========================================================= */}
        <div className="relative z-20 px-6 pt-3 pb-2 flex items-center justify-center sm:justify-start gap-2 overflow-x-auto bg-black/20">
          <button
            onClick={() => { setActiveRole('user'); setIsVerified(false); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeRole === 'user'
                ? 'bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
            }`}
          >
            01. Simple User (Woman) | नागरिक लॉगिन
          </button>

          <button
            onClick={() => { setActiveRole('operator'); setIsVerified(false); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeRole === 'operator'
                ? 'bg-emerald-500 text-emerald-950 shadow-md shadow-emerald-500/30'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
            }`}
          >
            02. Operator | ऑपरेटर लॉगिन
          </button>

          <button
            onClick={() => { setActiveRole('partner'); setIsVerified(false); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeRole === 'partner'
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
            }`}
          >
            03. Business & NGO | पार्टनर लॉगिन
          </button>

          <button
            onClick={() => { setActiveRole('admin'); setIsVerified(false); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeRole === 'admin'
                ? 'bg-teal-400 text-teal-950 shadow-md shadow-teal-400/30'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
            }`}
          >
            04. Admin | एडमिनिस्ट्रेशन पोर्टल
          </button>
        </div>

        {/* ========================================================= */}
        {/* MAIN BODY: RIGHT-ALIGNED GLASSMORPHISM LOGIN CARD */}
        {/* ========================================================= */}
        <div className="relative z-10 flex-1 p-6 sm:p-10 flex items-center justify-center lg:justify-end overflow-y-auto">
          
          <div className="w-full max-w-md bg-black/45 backdrop-blur-xl border border-white/25 rounded-3xl p-6 sm:p-8 shadow-2xl text-white animate-in zoom-in-95">
            
            {/* ----------------------------------------------------- */}
            {/* SCREEN 01: CITIZEN LOGIN (नागरिक लॉगिन) */}
            {/* ----------------------------------------------------- */}
            {activeRole === 'user' && (
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-5 text-amber-100 flex items-center gap-2">
                  <span>Citizen Login | नागरिक लॉगिन</span>
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Mobile / Email with Verify Button */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">
                      Mobile Number or Email / मोबाइल नंबर या ईमेल
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter 10-digit mobile or email..."
                        className="w-full pl-3.5 pr-28 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/50 text-xs sm:text-sm outline-hidden focus:border-amber-400 focus:bg-white/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleVerify}
                        className={`absolute right-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isVerified 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-amber-600 hover:bg-amber-700 text-white'
                        }`}
                      >
                        {isVerified ? '✓ Verified' : 'Verify / सत्यापित करें'}
                      </button>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">
                      Password / पासवर्ड
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password..."
                        className="w-full pl-3.5 pr-10 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/50 text-xs sm:text-sm outline-hidden focus:border-amber-400 focus:bg-white/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-white/60 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Enter OTP Field */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">
                      Enter OTP / ओटीपी दर्ज करें
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit OTP code..."
                      className="w-full px-3.5 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/50 text-xs sm:text-sm outline-hidden focus:border-amber-400 focus:bg-white/20 transition-all"
                    />
                  </div>

                  <div className="text-center text-xs text-white/50 font-bold uppercase tracking-wider py-0.5">
                    OR
                  </div>

                  {/* Login Action Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-sm shadow-lg shadow-orange-500/30 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Login / लॉगिन करें</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* SCREEN 02: OPERATOR LOGIN (ऑपरेटर लॉगिन) */}
            {/* ----------------------------------------------------- */}
            {activeRole === 'operator' && (
              <div>
                {/* Sub-role Toggle Pill as in Image 1 Panel 02 */}
                <div className="flex items-center p-1 rounded-2xl bg-white/15 border border-white/20 mb-5">
                  <button
                    type="button"
                    onClick={() => setOperatorSubRole('data_entry')}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      operatorSubRole === 'data_entry'
                        ? 'bg-white text-emerald-950 shadow-sm'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Data Entry / डाटा एंट्री
                  </button>
                  <button
                    type="button"
                    onClick={() => setOperatorSubRole('community_manager')}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      operatorSubRole === 'community_manager'
                        ? 'bg-white text-emerald-950 shadow-sm'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Community Manager / कम्युनिटी
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Mobile / Email */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">
                      Mobile / Email / मोबाइल या ईमेल
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Operator Mobile / VLE ID..."
                        className="w-full pl-3.5 pr-28 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/50 text-xs sm:text-sm outline-hidden focus:border-emerald-400 focus:bg-white/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleVerify}
                        className={`absolute right-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isVerified 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        }`}
                      >
                        {isVerified ? '✓ Verified' : 'Verify / सत्यापित करें'}
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">
                      Password / पासवर्ड
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Operator password..."
                        className="w-full pl-3.5 pr-10 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/50 text-xs sm:text-sm outline-hidden focus:border-emerald-400 focus:bg-white/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-white/60 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* OTP */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">
                      Enter OTP / ओटीपी दर्ज करें
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit auth code..."
                      className="w-full px-3.5 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/50 text-xs sm:text-sm outline-hidden focus:border-emerald-400 focus:bg-white/20 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:brightness-110 text-white font-extrabold text-sm shadow-lg shadow-orange-500/30 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Login as Operator / ऑपरेटर लॉगिन</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* SCREEN 03: BUSINESS & NGO PORTAL (पार्टनर लॉगिन) */}
            {/* ----------------------------------------------------- */}
            {activeRole === 'partner' && (
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-5 text-amber-200 flex items-center gap-2">
                  <span>Business & NGO Portal / पार्टनर लॉगिन</span>
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Work Email / Mobile */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">
                      Work Email / Mobile / कार्य ईमेल या मोबाइल
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="organization@domain.org..."
                        className="w-full pl-3.5 pr-28 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/50 text-xs sm:text-sm outline-hidden focus:border-amber-400 focus:bg-white/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleVerify}
                        className={`absolute right-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isVerified 
                            ? 'bg-amber-500 text-amber-950 font-black' 
                            : 'bg-amber-600 hover:bg-amber-700 text-white'
                        }`}
                      >
                        {isVerified ? '✓ Verified' : 'Verify / सत्यापित करें'}
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">
                      Password / पासवर्ड
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Partner password..."
                        className="w-full pl-3.5 pr-10 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/50 text-xs sm:text-sm outline-hidden focus:border-amber-400 focus:bg-white/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-white/60 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Need Help */}
                  <div className="flex items-center justify-between text-xs text-white/80 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded accent-amber-500"
                      />
                      <span>Remember Me</span>
                    </label>

                    <button 
                      type="button"
                      onClick={() => onNotify('info', 'Helpline: 1800-200-NARI (support@narisetu.gov.in)')}
                      className="text-amber-300 hover:underline"
                    >
                      Need Help?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:brightness-110 text-amber-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Access Portal / पोर्टल पर जाएं</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* SCREEN 04: ADMINISTRATION (एडमिनिस्ट्रेशन पोर्टल) */}
            {/* ----------------------------------------------------- */}
            {activeRole === 'admin' && (
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-5 text-teal-200 flex items-center gap-2">
                  <span>Administration / एडमिनिस्ट्रेशन पोर्टल</span>
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Admin ID or Email */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">
                      Admin ID or Email / एडमिन आईडी या ईमेल
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="nic.admin@gov.in or ID..."
                        className="w-full pl-3.5 pr-28 py-3 rounded-xl bg-white/15 border border-teal-400/40 text-white placeholder-white/50 text-xs sm:text-sm outline-hidden focus:border-teal-300 focus:bg-white/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleVerify}
                        className={`absolute right-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isVerified 
                            ? 'bg-teal-500 text-teal-950 font-black' 
                            : 'bg-teal-600 hover:bg-teal-500 text-white'
                        }`}
                      >
                        {isVerified ? '✓ Verified' : 'Verify / सत्यापित करें'}
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">
                      Password / पासवर्ड
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Admin security key..."
                        className="w-full pl-3.5 pr-10 py-3 rounded-xl bg-white/15 border border-teal-400/40 text-white placeholder-white/50 text-xs sm:text-sm outline-hidden focus:border-teal-300 focus:bg-white/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-white/60 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Secure Login Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:brightness-110 text-neutral-950 font-black text-sm shadow-xl shadow-amber-400/30 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-6"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Secure Login / सुरक्षित लॉगिन</span>
                  </button>
                </form>
              </div>
            )}

            {/* Quick Demo Pre-Fill Button */}
            <div className="mt-5 pt-4 border-t border-white/15 text-center">
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-xs text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-4 cursor-pointer"
              >
                ⚡ Auto-fill sample credentials for {activeRole.toUpperCase()}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
