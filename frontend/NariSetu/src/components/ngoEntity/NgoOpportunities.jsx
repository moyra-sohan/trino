import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, RotateCcw, MapPin, Calendar, 
  Users, CheckCircle2, AlertCircle, Clock, 
  ChevronLeft, ChevronRight, X, ExternalLink, Filter 
} from 'lucide-react';
import { filterOptions } from './ngoData';

export default function NgoOpportunities({
  opportunities = [],
  onOpenCreateModal,
  onNotify
}) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Selected opportunity for view details modal
  const [viewOpportunity, setViewOpportunity] = useState(null);

  // Status tabs calculation
  const tabCounts = useMemo(() => {
    return {
      All: opportunities.length,
      Published: opportunities.filter((o) => o.status === 'Published').length,
      Draft: opportunities.filter((o) => o.status === 'Draft').length,
      Paused: opportunities.filter((o) => o.status === 'Paused').length,
      Closed: opportunities.filter((o) => o.status === 'Closed').length
    };
  }, [opportunities]);

  // Filter opportunities
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      // Tab filter
      if (activeTab !== 'All' && opp.status !== activeTab) {
        return false;
      }
      // Type filter
      if (selectedType !== 'all' && opp.type !== selectedType) {
        return false;
      }
      // District filter
      if (selectedDistrict !== 'all' && !opp.location.toLowerCase().includes(selectedDistrict.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = opp.title.toLowerCase().includes(query);
        const matchSkills = opp.skills.some((s) => s.toLowerCase().includes(query));
        const matchLocation = opp.location.toLowerCase().includes(query);
        if (!matchTitle && !matchSkills && !matchLocation) return false;
      }
      return true;
    });
  }, [opportunities, activeTab, selectedType, selectedDistrict, searchQuery]);

  // Paginated items
  const totalItems = filteredOpportunities.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const displayedOpportunities = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOpportunities.slice(start, start + itemsPerPage);
  }, [filteredOpportunities, currentPage, itemsPerPage]);

  const handleResetFilters = () => {
    setActiveTab('All');
    setSearchQuery('');
    setSelectedType('all');
    setSelectedDistrict('all');
    setCurrentPage(1);
    onNotify('info', 'Opportunity search and filters reset.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ========================================================= */}
      {/* 1. TOP INITIATIVE BADGE & PAGE TITLE */}
      {/* ========================================================= */}
      <div>
        <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-100/70 px-2.5 py-1 rounded-md">
          INITIATIVE PORTAL • Nadia & Delta Clusters
        </span>

        <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl leading-relaxed">
              Publish livelihood opportunities and track applications from women's artisan collectives, SHGs, and local producer groups.
            </p>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Opportunity</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. STATUS TABS ROW (ALL, PUBLISHED, DRAFT, PAUSED, CLOSED) */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200/80 pb-1">
        <div className="flex items-center gap-6 overflow-x-auto">
          {['All', 'Published', 'Draft', 'Paused', 'Closed'].map((tab) => {
            const count = tabCounts[tab] || 0;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#ea580c] border-b-2 border-[#ea580c]'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <span>{tab}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-orange-100 text-orange-800' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-500 pb-2 sm:pb-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-neutral-700">80 total applications active</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. SEARCH & FILTERS BAR */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="lg:col-span-6 relative flex items-center">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search by opportunity title, skill, or cohort..."
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs text-neutral-800 placeholder-neutral-400 outline-hidden"
            />
          </div>

          {/* Type Dropdown */}
          <div className="lg:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs font-semibold text-neutral-700 bg-white outline-hidden cursor-pointer"
            >
              {filterOptions.opportunityTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div className="lg:col-span-2">
            <select
              value={selectedDistrict}
              onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs font-semibold text-neutral-700 bg-white outline-hidden cursor-pointer"
            >
              {filterOptions.districts.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          <div className="lg:col-span-1 flex justify-end">
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1 cursor-pointer py-1"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

        </div>

        <div className="text-[11px] text-neutral-400 pt-1">
          Showing filtered opportunities across 4 blocks
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. OPPORTUNITIES TABLE (MATCHING SCREENSHOT 5) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fcfaf7] text-neutral-400 text-[10px] font-bold uppercase tracking-wider border-b border-neutral-200/60">
              <tr>
                <th className="py-3 px-5">Opportunity</th>
                <th className="py-3 px-5">Type</th>
                <th className="py-3 px-5">Eligible Location</th>
                <th className="py-3 px-5">Deadline</th>
                <th className="py-3 px-5">Applications</th>
                <th className="py-3 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {displayedOpportunities.map((opp) => (
                <tr 
                  key={opp.id} 
                  onClick={() => setViewOpportunity(opp)}
                  className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                >
                  {/* Opportunity column */}
                  <td className="py-4 px-5">
                    <div className="font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">
                      {opp.title}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {opp.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Type column with dot indicator */}
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>{opp.type}</span>
                    </span>
                  </td>

                  {/* Location column with pin icon */}
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1 text-neutral-600 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{opp.location}</span>
                    </span>
                  </td>

                  {/* Deadline column with urgency indicator */}
                  <td className="py-4 px-5">
                    <div className="font-semibold text-neutral-800">{opp.deadline}</div>
                    <div className={`text-[11px] mt-0.5 ${
                      opp.deadlineUrgent 
                        ? 'text-orange-600 font-bold' 
                        : 'text-neutral-400'
                    }`}>
                      {opp.deadlineSub}
                    </div>
                  </td>

                  {/* Applications column */}
                  <td className="py-4 px-5">
                    <span className="font-bold text-neutral-900">
                      {opp.applications} received
                    </span>
                  </td>

                  {/* Status column with pill badges */}
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                      opp.status === 'Published'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : opp.status === 'Paused'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : opp.status === 'Draft'
                        ? 'bg-slate-50 text-slate-700 border-slate-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        opp.status === 'Published'
                          ? 'bg-emerald-500'
                          : opp.status === 'Paused'
                          ? 'bg-amber-500'
                          : opp.status === 'Draft'
                          ? 'bg-slate-400'
                          : 'bg-rose-500'
                      }`} />
                      <span>{opp.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {displayedOpportunities.length === 0 && (
          <div className="p-8 text-center text-xs text-neutral-400">
            No opportunities found matching your search and filter criteria.
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 5. PAGINATION ROW */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-neutral-500">
          Showing <span className="font-bold text-neutral-900">{(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="font-bold text-neutral-900">{totalItems}</span> opportunities
        </span>

        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            ‹ Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentPage === num
                  ? 'bg-[#ea580c] text-white shadow-xs'
                  : 'border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {num}
            </button>
          ))}

          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Next ›
          </button>
        </div>
      </div>

      {/* Bottom disclaimer */}
      <p className="text-[11px] text-neutral-400 text-center pt-2">
        Aggregated community information only. Individual members' contact details and records are never disclosed. Sample data for design review. Organizations are not verified.
      </p>

      {/* ========================================================= */}
      {/* MODAL: VIEW OPPORTUNITY DETAILS */}
      {/* ========================================================= */}
      {viewOpportunity && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setViewOpportunity(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                viewOpportunity.status === 'Published'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : viewOpportunity.status === 'Paused'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : viewOpportunity.status === 'Draft'
                  ? 'bg-slate-50 text-slate-700 border-slate-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  viewOpportunity.status === 'Published' ? 'bg-emerald-500' : 'bg-neutral-400'
                }`} />
                <span>{viewOpportunity.status}</span>
              </span>

              <button 
                onClick={() => setViewOpportunity(null)}
                className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-neutral-900">{viewOpportunity.title}</h3>
                <p className="text-xs text-neutral-500 mt-1">{viewOpportunity.type} · {viewOpportunity.location}</p>
              </div>

              <p className="text-xs text-neutral-700 leading-relaxed bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200">
                {viewOpportunity.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-orange-50/50 border border-orange-100">
                  <span className="text-[10px] text-neutral-400 block uppercase font-bold">Applications</span>
                  <span className="text-base font-black text-orange-600">{viewOpportunity.applications} received</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] text-neutral-400 block uppercase font-bold">Grant / Budget</span>
                  <span className="text-base font-black text-neutral-800">{viewOpportunity.budget || '₹3,50,000'}</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] text-neutral-400 block uppercase font-bold">Deadline</span>
                  <span className="text-sm font-bold text-neutral-800">{viewOpportunity.deadline}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-neutral-700">Required Artisan Capabilities:</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {viewOpportunity.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 text-xs font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex justify-end gap-2">
              <button
                onClick={() => setViewOpportunity(null)}
                className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onNotify('success', `Exported application roster for ${viewOpportunity.title}`);
                  setViewOpportunity(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold cursor-pointer"
              >
                Review Applications ({viewOpportunity.applications})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
