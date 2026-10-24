import React from 'react';
import { 
  Plus, ArrowRight, CheckCircle2, AlertTriangle, FileSpreadsheet, 
  Download, Upload, Check, ExternalLink, HelpCircle, Eye, Edit3, ShieldAlert
} from 'lucide-react';

export default function OperatorDashboard({
  operatorProfile,
  metrics,
  todayEntries,
  attentionItems,
  onNavigateTab,
  onOpenNewRegistration,
  onOpenFixIssue,
  onViewRecord,
  onDownloadTemplate,
  onNotify
}) {
  const chartDays = [
    { day: 'Mon', val: 5, target: 7, isToday: false },
    { day: 'Tue', val: 8, target: 7, isToday: false },
    { day: 'Wed', val: 5, target: 7, isToday: false },
    { day: 'Thu', val: 9, target: 7, isToday: false },
    { day: 'Fri (Today)', val: 7, target: 7, isToday: true },
    { day: 'Sat', val: 0, target: 7, isToday: false, isPlanned: true },
    { day: 'Sun', val: 0, target: 7, isToday: false, isPlanned: true }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* ========================================================= */}
      {/* 1. TOP WELCOME BANNER (MATCHING IMAGE 1 & IMAGE 2) */}
      {/* ========================================================= */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#faeedd] via-[#f7e6ce] to-[#f4deb8] border border-orange-200/80 shadow-xs min-h-[160px] flex flex-col justify-between p-6 sm:p-8">
        
        {/* Right Art Illustration (Image 2) */}
        <div 
          className="absolute inset-y-0 right-0 w-full sm:w-2/3 lg:w-1/2 bg-no-repeat bg-right-bottom bg-contain opacity-90 sm:opacity-100 pointer-events-none"
          style={{ backgroundImage: `url('/images/operator/operator_banner.png')` }}
        />

        <div className="relative z-10 max-w-lg text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-950/70">
              Field Operator Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Good morning, {operatorProfile.name ? operatorProfile.name.replace(/^(Smt\.\s*|Shri\s*)/i, '') : 'Rekha Mondal'}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-neutral-700/90 mt-1">
            {operatorProfile.assignedBlock || 'Hanskhali'} Block Operator Console • 24 October 2024
          </p>
        </div>

        {/* Top Right toggle pill placeholder from screenshot */}
        <div className="absolute top-5 right-6 hidden sm:flex items-center gap-2 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-orange-200/80 text-[11px] text-orange-950 font-semibold shadow-2xs">
          <span>Hanskhali Rural Hub</span>
        </div>

        {/* Action Button */}
        <div className="relative z-10 mt-6 sm:mt-4 text-left">
          <button
            onClick={onOpenNewRegistration}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-600/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New registration</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. STATS CARDS (4 COLS MATCHING IMAGE 1) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left">
        
        {/* DRAFTS */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs relative overflow-hidden group hover:border-neutral-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              DRAFTS
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-neutral-900 tracking-tight">
              {metrics.drafts}
            </span>
            <span className="text-xs font-semibold text-neutral-500">records</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1 font-medium">
            Saved locally on device
          </p>
        </div>

        {/* SUBMITTED */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs relative overflow-hidden group hover:border-orange-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              SUBMITTED
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-neutral-900 tracking-tight">
              {metrics.submitted}
            </span>
            <span className="text-xs font-bold text-amber-700">under review</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1 font-medium">
            Awaiting block verification
          </p>
        </div>

        {/* VERIFIED */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              VERIFIED
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-neutral-900 tracking-tight">
              {metrics.verified}
            </span>
            <span className="text-xs font-bold text-emerald-700">enrolled</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1 font-medium">
            Approved & active in SHG
          </p>
        </div>

        {/* REJECTED */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs relative overflow-hidden group hover:border-rose-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">
              REJECTED
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-neutral-900 tracking-tight">
              {metrics.rejected}
            </span>
            <span className="text-xs font-bold text-rose-700">flagged</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1 font-medium">
            Needs correction
          </p>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. TODAY'S ENTRIES TABLE (MATCHING IMAGE 1) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-2xs overflow-hidden text-left">
        
        {/* Table Header Section */}
        <div className="p-5 sm:p-6 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-extrabold text-neutral-900 tracking-tight">
              Today's entries
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {todayEntries.length} registrations handled today in Nadia South
            </p>
          </div>
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-orange-50 border border-orange-200/80 text-[11px] font-bold text-[#ea580c]">
              Block: {operatorProfile.assignedBlock || 'Hanskhali'}
            </span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/60 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6">ARTISAN & ID</th>
                <th className="py-3.5 px-6">VILLAGE</th>
                <th className="py-3.5 px-6">SKILL CATEGORY</th>
                <th className="py-3.5 px-6">TIME</th>
                <th className="py-3.5 px-6">STATUS</th>
                <th className="py-3.5 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {todayEntries.map((row) => (
                <tr key={row.id} className="hover:bg-neutral-50/70 transition-colors">
                  
                  {/* Artisan & ID */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border shrink-0 ${row.avatarBg || 'bg-amber-100 text-amber-900 border-amber-300'}`}>
                        {row.initials || row.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-extrabold text-neutral-900 leading-tight">
                          {row.name}
                        </div>
                        <div className="text-[10px] text-neutral-500 font-mono mt-0.5">
                          {row.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Village */}
                  <td className="py-3.5 px-6 text-neutral-700 font-medium">
                    {row.village}
                  </td>

                  {/* Skill Category */}
                  <td className="py-3.5 px-6">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border ${row.skillPillColor || 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                      {row.skillCategory}
                    </span>
                  </td>

                  {/* Time */}
                  <td className="py-3.5 px-6 text-neutral-600 font-mono text-[11px]">
                    {row.time}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      row.status === 'Verified'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : row.status === 'Submitted'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : row.status === 'Draft'
                        ? 'bg-neutral-100 text-neutral-700 border-neutral-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        row.status === 'Verified'
                          ? 'bg-emerald-500'
                          : row.status === 'Submitted'
                          ? 'bg-amber-500'
                          : row.status === 'Draft'
                          ? 'bg-neutral-400'
                          : 'bg-rose-500'
                      }`} />
                      <span>{row.status}</span>
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-6 text-right font-bold">
                    {row.actionType === 'fix' ? (
                      <button
                        onClick={() => onOpenFixIssue(row)}
                        className="text-rose-600 hover:text-rose-700 underline decoration-rose-300 hover:decoration-rose-600 transition-colors cursor-pointer"
                      >
                        Fix now
                      </button>
                    ) : row.actionType === 'edit' ? (
                      <button
                        onClick={() => onViewRecord(row)}
                        className="text-[#ea580c] hover:text-[#c2410c] hover:underline transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={() => onViewRecord(row)}
                        className="text-[#ea580c] hover:text-[#c2410c] hover:underline transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-neutral-50/50 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
          <span>Showing {todayEntries.length} of {metrics.verified} verified records today</span>
          <button
            onClick={() => onNavigateTab('records')}
            className="text-[#ea580c] hover:text-[#c2410c] font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View all {metrics.verified} records in Records tab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. BOTTOM SPLIT ROW: TARGETS & ACTION ITEMS */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        
        {/* Left 2 Cols: Weekly Performance & Block Targets */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-2xs">
            
            {/* Header with badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-extrabold text-neutral-900 text-base">
                  Weekly Performance & Block Targets
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Hanskhali Block • Target: 50 registrations/week (Achieved: 42/50 • 84%)
                </p>
              </div>

              {/* Status Pills */}
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold">
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  On Track
                </span>
                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200">
                  DAILY AVG: 7.6 entries
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300">
                  APPROVAL RATE: 96.2%
                </span>
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-300">
                  PENDING AUDIT: 2 records
                </span>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="pt-6 pb-2">
              <div className="h-40 flex items-end justify-between gap-3 sm:gap-6 px-4 border-b border-neutral-200 relative">
                
                {/* Horizontal Daily Target Dashed Line at height 7 */}
                <div 
                  className="absolute inset-x-0 border-b border-dashed border-amber-400 z-0 flex items-center justify-end pr-2 pointer-events-none"
                  style={{ bottom: `${(7 / 10) * 100}%` }}
                >
                  <span className="text-[10px] font-bold text-amber-600 bg-white/90 px-1 rounded -translate-y-2">
                    Daily Target: 7
                  </span>
                </div>

                {chartDays.map((col, idx) => {
                  const heightPercent = col.val > 0 ? (col.val / 10) * 100 : 8;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end z-10">
                      
                      {/* Bar */}
                      <div 
                        className={`w-full max-w-[42px] rounded-t-lg transition-all duration-300 relative group flex items-center justify-center ${
                          col.isToday
                            ? 'bg-gradient-to-t from-orange-600 to-amber-500 shadow-sm shadow-orange-500/30'
                            : col.isPlanned
                            ? 'bg-neutral-200/60 border border-dashed border-neutral-300'
                            : 'bg-amber-500/80 hover:bg-amber-600'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      >
                        {col.val > 0 && (
                          <span className="text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 bg-neutral-900 px-1 rounded">
                            {col.val}
                          </span>
                        )}
                      </div>

                      {/* Day Label */}
                      <span className={`text-[11px] font-semibold mt-2.5 whitespace-nowrap ${
                        col.isToday ? 'text-[#ea580c] font-black' : 'text-neutral-500'
                      }`}>
                        {col.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Target Pace Progress Bar */}
            <div className="mt-5 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-600 mb-1.5">
                <span>Target Pace: 84%</span>
                <span className="text-neutral-400 text-[11px]">8 remaining to achieve weekly block quota</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" style={{ width: '84%' }} />
              </div>
            </div>

          </div>

          {/* Bulk Import Offline Batch CSV Box */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#ea580c] flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-neutral-900">
                  Bulk Import Offline Batch CSV
                </h4>
                <p className="text-xs text-neutral-500">
                  Upload pre-filled artisan registration forms from field survey tablets
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                onClick={onDownloadTemplate}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-neutral-500" />
                <span>Download Template (.csv)</span>
              </button>
              <button
                onClick={() => onNavigateTab('import')}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-orange-50 border border-orange-300 text-[#ea580c] hover:bg-orange-100 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload CSV</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Col: Needs your attention (3 Action Items) */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
              <h3 className="font-extrabold text-neutral-900 text-base">
                Needs your attention
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                {attentionItems.length} Action Items
              </span>
            </div>

            <div className="space-y-4">
              {attentionItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-2xl bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200/70 transition-all text-left flex flex-col justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${item.badgeClass}`}>
                        {item.type}
                      </span>
                    </div>

                    <div className="font-bold text-xs text-neutral-900 mt-1">
                      {item.name} {item.uid && <span className="font-mono text-[10px] text-neutral-500">({item.uid})</span>}
                    </div>

                    <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 text-right">
                    <button
                      onClick={() => onOpenFixIssue(item)}
                      className="text-xs font-bold text-[#ea580c] hover:text-[#c2410c] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{item.actionLabel || 'Open & Fix →'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-neutral-100 text-[11px] text-neutral-400 text-center">
            Nadia District Field Verification SLA: 48 Hours
          </div>
        </div>

      </div>

    </div>
  );
}
