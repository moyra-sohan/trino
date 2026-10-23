import React, { useState, useMemo } from 'react';
import { 
  Search, X, RotateCcw, ChevronLeft, ChevronRight, 
  Users, Check, Plus, AlertCircle, Eye, ArrowRight, 
  MapPin, Sparkles, Filter 
} from 'lucide-react';
import { filterOptions } from './ngoData';

export default function NgoCommunities({
  communities = [],
  onViewCommunity,
  onRequestPartnership,
  onNotify
}) {
  // Filter states
  const [selectedDistrict, setSelectedDistrict] = useState('Nadia');
  const [selectedBlock, setSelectedBlock] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState(['Tailoring', 'Embroidery']);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Toggle skills filter
  const handleToggleSkill = (skill) => {
    setSelectedSkills((prev) => 
      prev.includes(skill) 
        ? prev.filter((s) => s !== skill) 
        : [...prev, skill]
    );
    setCurrentPage(1);
  };

  // Clear all filters to reset
  const handleClearFilters = () => {
    setSelectedDistrict('all');
    setSelectedBlock('all');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedSkills([]);
    setCurrentPage(1);
    onNotify('info', 'All community filters reset.');
  };

  // Reset to Nadia default
  const handleBrowseNadia = () => {
    setSelectedDistrict('Nadia');
    setSelectedBlock('all');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedSkills([]);
    setCurrentPage(1);
  };

  // Filter logic
  const filteredCommunities = useMemo(() => {
    return communities.filter((comm) => {
      // District filter
      if (selectedDistrict !== 'all' && !comm.district.toLowerCase().includes(selectedDistrict.toLowerCase())) {
        return false;
      }
      // Block filter
      if (selectedBlock !== 'all' && comm.block !== selectedBlock) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && comm.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'all' && comm.statusType !== selectedStatus) {
        return false;
      }
      // Skills filter (if any skills are selected, collective must include at least one)
      if (selectedSkills.length > 0) {
        const hasMatchingSkill = selectedSkills.some((s) => 
          comm.skills.some((cs) => cs.toLowerCase().includes(s.toLowerCase()))
        );
        if (!hasMatchingSkill) return false;
      }
      return true;
    });
  }, [communities, selectedDistrict, selectedBlock, selectedCategory, selectedStatus, selectedSkills]);

  // Paginated slice
  const totalItems = filteredCommunities.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const displayedCommunities = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCommunities.slice(start, start + itemsPerPage);
  }, [filteredCommunities, currentPage, itemsPerPage]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ========================================================= */}
      {/* 1. HEADER */}
      {/* ========================================================= */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Discover Communities
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Find women's self-help groups and producer collectives that match your sourcing, training or partnership needs.
        </p>
      </div>

      {/* ========================================================= */}
      {/* 2. FILTER BAR CONTAINER */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-2xs space-y-4">
        
        {/* Row 1: Dropdowns + Counter / Clear */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          
          {/* Target District */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
              Target District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs font-semibold text-neutral-800 bg-white outline-hidden cursor-pointer"
            >
              {filterOptions.districts.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>

          {/* Block / Sub-District */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
              Block / Sub-District
            </label>
            <select
              value={selectedBlock}
              onChange={(e) => { setSelectedBlock(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs font-semibold text-neutral-800 bg-white outline-hidden cursor-pointer"
            >
              {filterOptions.blocks.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>

          {/* Product Category */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
              Product Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs font-semibold text-neutral-800 bg-white outline-hidden cursor-pointer"
            >
              {filterOptions.categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Partnership Status */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
              Partnership Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs font-semibold text-neutral-800 bg-white outline-hidden cursor-pointer"
            >
              {filterOptions.partnershipStatuses.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters & Count */}
          <div className="flex sm:flex-col lg:flex-row items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0">
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>
            <span className="text-xs font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg">
              {totalItems} {totalItems === 1 ? 'community' : 'communities'} found
            </span>
          </div>

        </div>

        {/* Row 2: Skills Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mr-1">
            Skills:
          </span>

          {filterOptions.skillsList.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => handleToggleSkill(skill)}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#ea580c] text-white shadow-2xs hover:bg-[#c2410c]'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                }`}
              >
                {isSelected ? (
                  <>
                    <span>{skill}</span>
                    <X className="w-3 h-3 ml-0.5" />
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3 text-neutral-400" />
                    <span>{skill}</span>
                  </>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. COMMUNITIES GRID OR EMPTY STATE */}
      {/* ========================================================= */}
      {displayedCommunities.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedCommunities.map((comm) => (
              <div 
                key={comm.id} 
                className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md hover:border-orange-300 transition-all group"
              >
                <div>
                  {/* Top Bar: Icon + Title + Location */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${comm.iconBg}`}>
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-neutral-900 leading-tight group-hover:text-orange-600 transition-colors">
                        {comm.name}
                      </h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
                        {comm.village} · {comm.block} · {comm.district}
                      </p>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {comm.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Details stats */}
                  <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-100 pt-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Members</span>
                      <span className="font-semibold text-neutral-800">{comm.members} women</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Products</span>
                      <span className="font-semibold text-neutral-800 truncate max-w-[170px]">{comm.products}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Training need</span>
                      <span className="font-semibold text-neutral-800 truncate max-w-[170px]">{comm.trainingNeed}</span>
                    </div>
                  </div>

                  {/* Status Indicator Pill */}
                  <div className="mt-4 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      comm.statusType === 'open' 
                        ? 'bg-emerald-500' 
                        : comm.statusType === 'discussion'
                        ? 'bg-blue-500'
                        : 'bg-neutral-400'
                    }`} />
                    <span className="text-xs font-medium text-neutral-600">
                      {comm.partnershipStatus}
                    </span>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-5 grid grid-cols-2 gap-2 pt-3 border-t border-neutral-100">
                  <button
                    onClick={() => onViewCommunity(comm)}
                    className="px-3 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold transition-colors cursor-pointer text-center"
                  >
                    View Community
                  </button>
                  <button
                    onClick={() => onRequestPartnership(comm)}
                    className="px-3 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Request Partnership
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* ========================================================= */}
          {/* 4. PAGINATION CONTROLS */}
          {/* ========================================================= */}
          <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-neutral-500">
              Showing <span className="font-bold text-neutral-900">{(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="font-bold text-neutral-900">{totalItems}</span> communities in {selectedDistrict === 'all' ? 'West Bengal' : selectedDistrict}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Previous
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
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        /* ========================================================= */
        /* 5. EMPTY STATE (MATCHING SCREENSHOT 4 EXACTLY) */
        /* ========================================================= */
        <div className="bg-white rounded-3xl p-10 sm:p-16 border border-neutral-200/80 shadow-2xs text-center flex flex-col items-center justify-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-5 text-neutral-400">
            <Search className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
            No communities match these filters
          </h3>

          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mt-2 leading-relaxed">
            Try removing a skill or widening the district to explore more self-help groups and women's cooperatives in this region.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>

            <button
              onClick={handleBrowseNadia}
              className="px-5 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Browse all Nadia communities
            </button>
          </div>
        </div>
      )}

      {/* Bottom disclaimer */}
      <p className="text-[11px] text-neutral-400 text-center pt-2">
        Aggregated community information only. Individual members' contact details and records are never disclosed. Sample data for design review. Organizations are not verified.
      </p>

    </div>
  );
}
