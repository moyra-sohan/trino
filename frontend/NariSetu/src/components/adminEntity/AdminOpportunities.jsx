import React, { useState } from 'react';
import { 
  Briefcase, Download, Plus, Search, Filter, 
  CheckCircle2, AlertTriangle, Pause, Play, ShieldAlert, 
  Clock, ChevronRight, ChevronLeft, ArrowUpRight, Check 
} from 'lucide-react';

export default function AdminOpportunities({
  opportunities = [],
  onUpdateOpportunities,
  onOpenCreateDispatch,
  onNotify
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');

  const filteredOpps = opportunities.filter((opp) => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.publisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.region.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || opp.type.toLowerCase().includes(typeFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || opp.statusType.toLowerCase().includes(statusFilter.toLowerCase());
    const matchesDistrict = districtFilter === 'all' || opp.region.toLowerCase().includes(districtFilter.toLowerCase());

    return matchesSearch && matchesType && matchesStatus && matchesDistrict;
  });

  // Toggle pause/publish
  const handleTogglePause = (opp) => {
    const isPaused = opp.statusType === 'paused';
    const updated = opportunities.map((o) => {
      if (o.id === opp.id) {
        return {
          ...o,
          status: isPaused ? 'Published' : 'Paused by admin',
          statusType: isPaused ? 'published' : 'paused',
          reason: isPaused ? null : 'Compliance review required'
        };
      }
      return o;
    });
    onUpdateOpportunities?.(updated);
    onNotify?.(isPaused ? 'success' : 'info', `${opp.title} has been ${isPaused ? 'resumed and published' : 'paused by admin'}.`);
  };

  // Handle Approve Under Review
  const handleApprove = (opp) => {
    const updated = opportunities.map((o) => {
      if (o.id === opp.id) {
        return {
          ...o,
          status: 'Published',
          statusType: 'published',
          reason: null
        };
      }
      return o;
    });
    onUpdateOpportunities?.(updated);
    onNotify?.('success', `Approved and published opportunity ${opp.title}!`);
  };

  // Export CSV
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Code,Title,Type,Publisher,Region,Skill,Budget,Status\n" +
      opportunities.map(o => `"${o.code}","${o.title}","${o.type}","${o.publisher.name}","${o.region}","${o.skill}","${o.budget}","${o.status}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Opportunities_Moderation_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotify?.('info', 'Opportunities moderation report exported as CSV');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ========================================================= */}
      {/* 1. HEADER (MATCHING SCREENSHOT 5) */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-serif">
            Opportunities Moderation
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
            Review, verify, and monitor bulk buyer purchase orders, institutional training workshops, and micro-equipment grants published by partner federations and enterprises.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-xs font-bold text-neutral-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Opportunities Report</span>
          </button>

          <button
            onClick={onOpenCreateDispatch}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#064e3b] hover:bg-[#053c2e] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Admin Dispatch</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. 4 STAT CARDS (MATCHING SCREENSHOT 5) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* ACTIVE LISTINGS */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 tracking-wider uppercase">
              ACTIVE LISTINGS
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="text-xs">🏪</span>
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-neutral-900">84</span>
          </div>
          <span className="text-xs font-bold text-emerald-700">+12 this week</span>
          <div className="w-full h-1 rounded-full bg-emerald-600 mt-2" />
        </div>

        {/* UNDER REVIEW */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 tracking-wider uppercase">
              UNDER REVIEW
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="text-xs">📋</span>
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-neutral-900">6</span>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Priority queue
            </span>
          </div>
          <span className="text-[11px] text-neutral-500">Partner submissions awaiting vetting</span>
          <div className="w-full h-1 rounded-full bg-amber-500 mt-2" />
        </div>

        {/* TOTAL PIPELINE VALUE */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 tracking-wider uppercase">
              TOTAL PIPELINE VALUE
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="text-xs">₹</span>
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-neutral-900">₹1.42</span>
            <span className="text-sm font-bold text-neutral-800">Cr</span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 ml-auto">
              Escrow backed
            </span>
          </div>
          <span className="text-[11px] text-neutral-500">Procurement & grant commitments</span>
          <div className="w-full h-1 rounded-full bg-emerald-700 mt-2" />
        </div>

        {/* FLAGGED LISTINGS */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 tracking-wider uppercase">
              FLAGGED LISTINGS
            </span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <span className="text-xs">🚩</span>
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-neutral-900">1</span>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Unverified terms
            </span>
          </div>
          <span className="text-[11px] text-neutral-500">Reported by Gram Panchayat liaison</span>
          <div className="w-full h-1 rounded-full bg-rose-600 mt-2" />
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. SEARCH & FILTERS BAR (MATCHING SCREENSHOT 5) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-3.5 shadow-2xs flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search listings by title, buyer, cluster or..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-neutral-50/50"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Types (All Opportunities)</option>
            <option value="Bulk">Bulk Buyer Order</option>
            <option value="Grant">Equipment Grant</option>
            <option value="Workshop">Skill Workshop</option>
            <option value="Food">Food Processing</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Published (Active)</option>
            <option value="published">Published</option>
            <option value="paused">Paused by Admin</option>
            <option value="under_review">Under Review</option>
          </select>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">District: West Bengal</option>
            <option value="Nadia">Nadia</option>
            <option value="Hooghly">Hooghly</option>
            <option value="North 24 Parganas">North 24 Parganas</option>
            <option value="South 24 Parganas">South 24 Parganas</option>
          </select>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. MODERATION FEED TABLE (MATCHING SCREENSHOT 5) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        
        {/* Table Title Bar */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
              MODERATION FEED
            </span>
            <span className="px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 text-[10px] font-bold">
              {filteredOpps.length} displayed
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="inline-flex items-center gap-1.5 text-neutral-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Live on SHG App</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-neutral-600">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Under Compliance Check</span>
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-50/70">
                <th className="py-3.5 px-5">Opportunity & ID</th>
                <th className="py-3.5 px-4">Published By</th>
                <th className="py-3.5 px-4">Target Region & Skill</th>
                <th className="py-3.5 px-4">Budget / Payout</th>
                <th className="py-3.5 px-4">Applicants</th>
                <th className="py-3.5 px-4">Moderation Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredOpps.map((opp) => {
                const isPublished = opp.statusType === 'published';
                const isPaused = opp.statusType === 'paused';
                const isUnderReview = opp.statusType === 'under_review';

                return (
                  <tr key={opp.id} className="hover:bg-neutral-50/70 transition-colors">
                    
                    {/* Opportunity & ID */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded-xl border text-center shrink-0 ${
                          isPaused ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                        }`}>
                          <div className="text-[10px] font-mono font-bold">{opp.code}</div>
                          <div className="text-[9px] text-neutral-400 whitespace-nowrap">{opp.type.split(' ')[0]}</div>
                        </div>

                        <div>
                          <div className="font-bold text-neutral-900 leading-tight">
                            {opp.title}
                          </div>
                          {opp.deadline && (
                            <div className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-neutral-400" />
                              <span>Deadline: {opp.deadline}</span>
                            </div>
                          )}
                          {opp.reason && (
                            <div className="text-[10px] text-rose-600 font-medium mt-1">
                              Reason: {opp.reason}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Published By */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-neutral-900 text-xs">
                          {opp.publisher.name}
                        </span>
                        {opp.publisher.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                        {opp.publisher.gstin}
                      </div>
                    </td>

                    {/* Target Region & Skill */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-medium text-neutral-800">
                        {opp.region}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        {opp.skill}
                      </div>
                    </td>

                    {/* Budget / Payout */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-neutral-900">
                        {opp.budget} {opp.unit ? <span className="text-neutral-500 font-normal">/ {opp.unit}</span> : ''}
                      </div>
                      <div className={`text-[10px] font-bold mt-0.5 inline-block px-1.5 py-0.5 rounded ${opp.escrowBadgeColor}`}>
                        {opp.escrowStatus}
                      </div>
                    </td>

                    {/* Applicants */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {opp.applicants.customText ? (
                        <div className="text-neutral-700 text-xs font-semibold">
                          {opp.applicants.customText}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-neutral-900">
                            {opp.applicants.current} / {opp.applicants.total} slots
                          </div>
                          <div className="w-20 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-emerald-600"
                              style={{ width: `${(opp.applicants.current / opp.applicants.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Moderation Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isPublished
                            ? 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                            : isPaused
                            ? 'text-rose-800 bg-rose-50 border border-rose-200'
                            : 'text-amber-800 bg-amber-50 border border-amber-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isPublished ? 'bg-emerald-500' : isPaused ? 'bg-rose-500' : 'bg-amber-500'
                          }`}
                        />
                        <span>{opp.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {isUnderReview && (
                          <button
                            onClick={() => handleApprove(opp)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                          >
                            Approve
                          </button>
                        )}

                        <button
                          onClick={() => handleTogglePause(opp)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isPaused
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                              : 'bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-50'
                          }`}
                          title={isPaused ? 'Resume publication' : 'Pause listing'}
                        >
                          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination matching Screenshot 5 */}
        <div className="p-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <span>Showing 1 to {filteredOpps.length} of 91 listings</span>
          
          <div className="flex items-center gap-1.5">
            <button className="px-2.5 py-1 rounded-lg border border-neutral-200 text-neutral-400 hover:bg-neutral-50">
              Previous
            </button>
            <button className="px-3 py-1 rounded-lg bg-[#064e3b] text-white font-bold">1</button>
            <button className="px-3 py-1 rounded-lg hover:bg-neutral-100 font-semibold">2</button>
            <button className="px-3 py-1 rounded-lg hover:bg-neutral-100 font-semibold">3</button>
            <span className="px-1 text-neutral-400">...</span>
            <button className="px-3 py-1 rounded-lg hover:bg-neutral-100 font-semibold">19</button>
            <button className="px-2.5 py-1 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50">
              Next
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
