import React, { useState } from 'react';
import { 
  Users, Download, Plus, Search, Filter, 
  MapPin, CheckCircle2, ChevronRight, ChevronLeft, 
  Layers, Package, Check, RefreshCw, Eye 
} from 'lucide-react';

export default function AdminCommunities({
  communities = [],
  onOpenRegisterModal,
  onNotify
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [cohortSizeFilter, setCohortSizeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCommunityForModal, setSelectedCommunityForModal] = useState(null);

  // Filter logic
  const filteredCommunities = communities.filter((comm) => {
    const matchesSearch = 
      comm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.leader.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain = domainFilter === 'all' || comm.domain.toLowerCase().includes(domainFilter.toLowerCase());
    const matchesDistrict = districtFilter === 'all' || comm.district.toLowerCase().includes(districtFilter.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'available' && comm.statusType === 'available') ||
      (statusFilter === 'discussion' && comm.statusType === 'discussion') ||
      (statusFilter === 'seeking' && comm.statusType === 'seeking') ||
      (statusFilter === 'full' && comm.statusType === 'full');

    return matchesSearch && matchesDomain && matchesDistrict && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setDomainFilter('all');
    setDistrictFilter('all');
    setCohortSizeFilter('all');
    setStatusFilter('all');
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Code,Name,Domain,Purpose,Location,District,Leader,Status\n" +
      communities.map(c => `"${c.code}","${c.name}","${c.domain}","${c.purpose}","${c.location}","${c.district}","${c.leader.name}","${c.status}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Communities_SHG_Register_NariSetu.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotify?.('info', 'Communities & SHG register exported as CSV');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ========================================================= */}
      {/* 1. HEADER (MATCHING SCREENSHOT 4) */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-serif">
            Communities & SHGs
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
            Oversight of 1,086 registered artisan collectives, self-help groups, and rural women producer cohorts across cottage domains.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-xs font-bold text-neutral-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Register (CSV)</span>
          </button>

          <button
            onClick={onOpenRegisterModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#064e3b] hover:bg-[#053c2e] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register New Collective</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. 4 STAT CARDS (MATCHING SCREENSHOT 4) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* TOTAL COMMUNITIES */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 tracking-wider uppercase">
              TOTAL COMMUNITIES
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-neutral-900">1,086</span>
          </div>
        </div>

        {/* ACTIVE USER */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 tracking-wider uppercase">
              ACTIVE USER
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="text-xs font-bold">👤</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-neutral-900">24,820</span>
          </div>
        </div>

        {/* ACTIVE ORDER LOAD */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 tracking-wider uppercase">
              ACTIVE ORDER LOAD
            </span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-neutral-900">412</span>
            <span className="text-xs text-neutral-500 font-semibold">Clusters</span>
          </div>
        </div>

        {/* GEOGRAPHIC FOOTPRINT */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 tracking-wider uppercase">
              GEOGRAPHIC FOOTPRINT
            </span>
            <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-neutral-900">18</span>
            <span className="text-xs text-neutral-500 font-semibold">Districts</span>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. SEARCH & FILTERS BAR (MATCHING SCREENSHOT 4) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-2xs space-y-3">
        
        {/* Top filter row */}
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by collective title, coordinator name, block or village..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-neutral-50/50"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Skill Domains</option>
              <option value="Tailoring">Tailoring & Embroidery</option>
              <option value="Organic Food">Organic Food & Spices</option>
              <option value="Jute">Jute & Bamboo Craft</option>
              <option value="Kantha">Kantha Stitch & Textiles</option>
              <option value="Jamdani">Jamdani & Cotton Weaving</option>
              <option value="Pickles">Food Processing & Spices</option>
            </select>

            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Districts (West Bengal)</option>
              <option value="Nadia">Nadia District</option>
              <option value="Hooghly">Hooghly District</option>
              <option value="North 24 Parganas">North 24 Parganas</option>
              <option value="Murshidabad">Murshidabad</option>
              <option value="Malda">Malda</option>
            </select>

            <select
              value={cohortSizeFilter}
              onChange={(e) => setCohortSizeFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Member Cohort Size</option>
              <option value="small">10 - 25 members</option>
              <option value="medium">25 - 50 members</option>
              <option value="large">50+ members</option>
            </select>

            <button
              onClick={handleResetFilters}
              className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Status Pill Filters matching Screenshot 4 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-neutral-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mr-1">
              STATUS:
            </span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-[#064e3b] text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/60'
              }`}
            >
              All (1,086)
            </button>
            <button
              onClick={() => setStatusFilter('available')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'available'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
              }`}
            >
              Available for Orders (540)
            </button>
            <button
              onClick={() => setStatusFilter('discussion')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'discussion'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200/60'
              }`}
            >
              In Discussion (184)
            </button>
            <button
              onClick={() => setStatusFilter('seeking')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'seeking'
                  ? 'bg-amber-700 text-white shadow-2xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              Seeking Buyer Links (214)
            </button>
            <button
              onClick={() => setStatusFilter('full')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'full'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/60'
              }`}
            >
              At Full Capacity (148)
            </button>
          </div>

          <div className="text-[11px] text-neutral-500 font-medium">
            Showing {filteredCommunities.length} of 1,086 records • Display: Table / List View
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. TABLE (MATCHING SCREENSHOT 4) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-50/70">
                <th className="py-3.5 px-5">Community & Identifier</th>
                <th className="py-3.5 px-4">Domain & Primary Purpose</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Leadership</th>
                <th className="py-3.5 px-4">Key Equipment & Capacity</th>
                <th className="py-3.5 px-4">Operational Status</th>
                <th className="py-3.5 px-5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredCommunities.map((comm) => {
                const isAvailable = comm.statusType === 'available';
                const isDiscussion = comm.statusType === 'discussion';
                const isSeeking = comm.statusType === 'seeking';
                const isFull = comm.statusType === 'full';

                return (
                  <tr key={comm.id} className="hover:bg-neutral-50/70 transition-colors">
                    
                    {/* Community & Identifier */}
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-neutral-900 leading-tight">
                        {comm.name}
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                        ID: {comm.code}
                      </div>
                    </td>

                    {/* Domain & Primary Purpose */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border mb-1 ${comm.domainBg}`}>
                        {comm.domain}
                      </span>
                      <div className="text-[11px] text-neutral-500 leading-tight">
                        {comm.purpose}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-neutral-700 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <div>
                          <div>{comm.location}</div>
                          <div className="text-[10px] text-neutral-400">{comm.district}</div>
                        </div>
                      </div>
                    </td>

                    {/* Leadership */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${comm.leader.avatarBg}`}>
                          {comm.leader.initials}
                        </div>
                        <span className="font-bold text-neutral-800 text-xs">
                          {comm.leader.name}
                        </span>
                        {comm.leader.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                    </td>

                    {/* Key Equipment & Capacity */}
                    <td className="py-3.5 px-4 max-w-xs text-neutral-600 text-[11px] leading-relaxed">
                      {comm.equipment}
                    </td>

                    {/* Operational Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex flex-col items-start gap-1">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isAvailable
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : isDiscussion
                              ? 'bg-sky-50 text-sky-800 border border-sky-200'
                              : isSeeking
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-purple-50 text-purple-800 border border-purple-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isAvailable ? 'bg-emerald-500' : isDiscussion ? 'bg-sky-500' : isSeeking ? 'bg-amber-500' : 'bg-purple-500'
                            }`}
                          />
                          <span>{comm.status}</span>
                        </span>
                        <span className="text-[10px] text-neutral-400 font-medium">
                          {comm.statusDetails}
                        </span>
                      </div>
                    </td>

                    {/* Details Button */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedCommunityForModal(comm)}
                        className="px-3 py-1.5 rounded-lg bg-[#064e3b] hover:bg-[#053c2e] text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination matching Screenshot 4 */}
        <div className="p-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <span>Showing records 1 to {filteredCommunities.length} of 1,086 total verified communities</span>
          
          <div className="flex items-center gap-1.5">
            <button className="px-2.5 py-1 rounded-lg border border-neutral-200 text-neutral-400 hover:bg-neutral-50">
              Previous
            </button>
            <button className="px-3 py-1 rounded-lg bg-[#064e3b] text-white font-bold">1</button>
            <button className="px-3 py-1 rounded-lg hover:bg-neutral-100 font-semibold">2</button>
            <button className="px-3 py-1 rounded-lg hover:bg-neutral-100 font-semibold">3</button>
            <span className="px-1 text-neutral-400">...</span>
            <button className="px-3 py-1 rounded-lg hover:bg-neutral-100 font-semibold">181</button>
            <button className="px-2.5 py-1 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Community Details Quick Modal */}
      {selectedCommunityForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 max-w-lg w-full p-6 text-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-neutral-900">{selectedCommunityForModal.name}</h3>
                <p className="text-neutral-500 font-mono">Code: {selectedCommunityForModal.code}</p>
              </div>
              <button 
                onClick={() => setSelectedCommunityForModal(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
              <div className="flex justify-between">
                <span className="text-neutral-500 font-semibold">Domain:</span>
                <span className="font-bold text-neutral-800">{selectedCommunityForModal.domain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-semibold">Location:</span>
                <span className="font-bold text-neutral-800">{selectedCommunityForModal.location}, {selectedCommunityForModal.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-semibold">Coordinator:</span>
                <span className="font-bold text-neutral-800">{selectedCommunityForModal.leader.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-semibold">Equipment:</span>
                <span className="font-bold text-neutral-800">{selectedCommunityForModal.equipment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-semibold">Status:</span>
                <span className="font-bold text-emerald-800">{selectedCommunityForModal.status}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  onNotify?.('success', `Direct procurement inquiry created for ${selectedCommunityForModal.name}`);
                  setSelectedCommunityForModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#064e3b] text-white font-bold hover:bg-[#053c2e]"
              >
                Dispatch Work Order
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
