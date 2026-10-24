import React, { useState } from 'react';
import { 
  Settings, Shield, Bell, Database, Save, 
  Check, RefreshCw, Key, Lock, Globe 
} from 'lucide-react';

export default function AdminSettings({ onNotify }) {
  const [twoFactorRequired, setTwoFactorRequired] = useState(true);
  const [autoFlagKeywords, setAutoFlagKeywords] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [syncFrequency, setSyncFrequency] = useState('daily');
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    onNotify?.('success', 'Admin security & platform policies successfully updated!');
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-serif">
          Platform Settings & Security
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Configure verification parameters, automated moderation policies, and state portal integrations.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Security & Access */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
            <Shield className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-neutral-900">Security & Authentication</h2>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 bg-neutral-50/50 cursor-pointer">
              <div>
                <span className="font-bold text-neutral-900 block">Enforce Two-Factor Authentication (2FA)</span>
                <span className="text-neutral-500 text-[11px]">Require OTP verification on all administrator and verifier logins</span>
              </div>
              <input
                type="checkbox"
                checked={twoFactorRequired}
                onChange={(e) => setTwoFactorRequired(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-700 accent-emerald-700"
              />
            </label>

            <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 bg-neutral-50/50">
              <div>
                <span className="font-bold text-neutral-900 block">Admin Session Idle Timeout</span>
                <span className="text-neutral-500 text-[11px]">Automatically terminate inactive administrative sessions</span>
              </div>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-neutral-300 font-semibold bg-white"
              >
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="60">1 Hour</option>
              </select>
            </div>
          </div>
        </div>

        {/* Verification Policies */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
            <Globe className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-neutral-900">Automated Moderation & Verification Sync</h2>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 bg-neutral-50/50 cursor-pointer">
              <div>
                <span className="font-bold text-neutral-900 block">Automated Keyword Flagging</span>
                <span className="text-neutral-500 text-[11px]">Flag opportunities mentioning unverified payments, cash deposits, or non-escrow terms</span>
              </div>
              <input
                type="checkbox"
                checked={autoFlagKeywords}
                onChange={(e) => setAutoFlagKeywords(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-700 accent-emerald-700"
              />
            </label>

            <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 bg-neutral-50/50">
              <div>
                <span className="font-bold text-neutral-900 block">State SHG Portal Sync Interval</span>
                <span className="text-neutral-500 text-[11px]">Poll West Bengal Registrar API for updated corporate statuses</span>
              </div>
              <select
                value={syncFrequency}
                onChange={(e) => setSyncFrequency(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-neutral-300 font-semibold bg-white"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily at 00:00 UTC</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#064e3b] hover:bg-[#053c2e] text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Platform Policies</span>
          </button>
        </div>

      </form>

    </div>
  );
}
