import React, { useState, useMemo } from 'react';
import { 
  Search, Download, Filter, RotateCcw, Check, ChevronLeft, ChevronRight, 
  Users, UserCheck, Clock, Award, Printer, Edit, Eye, ShieldCheck, MapPin, CheckCircle2
} from 'lucide-react';

export default function UserRecords({
  records,
  metrics,
  recentRegistrations,
  onEditRecord,
  onPrintCard,
  onViewRecord,
  onExportCsv,
  onNotify
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPanchayat, setSelectedPanchayat] = useState('All');
  const [selectedCraft, setSelectedCraft] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // Filter logic
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const matchSearch = 
        !searchTerm.trim() ||
        rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (rec.bengaliName && rec.bengaliName.includes(searchTerm)) ||
        (rec.phone && rec.phone.includes(searchTerm)) ||
        (rec.craft && rec.craft.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchPanchayat = 
        selectedPanchayat === 'All' ||
        (rec.panchayat && rec.panchayat.toLowerCase().includes(selectedPanchayat.toLowerCase())) ||
        (rec.habitation && rec.habitation.toLowerCase().includes(selectedPanchayat.toLowerCase()));

      const matchCraft = 
        selectedCraft === 'All' ||
        (rec.craft && rec.craft.toLowerCase().includes(selectedCraft.toLowerCase()));

      const matchStatus = 
        selectedStatus === 'All' ||
        rec.syncStatus.toLowerCase() === selectedStatus.toLowerCase();

      return matchSearch && matchPanchayat && matchCraft && matchStatus;
    });
  }, [records, searchTerm, selectedPanchayat, selectedCraft, selectedStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredRecords.slice(start, start + rowsPerPage);
  }, [filteredRecords, currentPage]);

  const toggleSelectAll = () => {
    if (selectedRowIds.length === paginatedRecords.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(paginatedRecords.map(r => r.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedRowIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedPanchayat('All');
    setSelectedCraft('All');
    setSelectedStatus('All');
    setCurrentPage(1);
    onNotify('info', 'Filters reset to default view.');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left">
      
      {/* ========================================================= */}
      {/* 1. TOP HEADER & EXPORT MASTER CSV BUTTON */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            User Records
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
            Browse recent enrollments, inspect verified artisan profiles across Hanskhali and Chapra blocks, and update demographic or handicraft skill records.
          </p>
        </div>

        <div>
          <button
            onClick={onExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-neutral-500" />
            <span>Export Master CSV</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. TOP METRIC CARDS (3 COLS MATCHING IMAGE 4) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Total Enrolled */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              TOTAL ENROLLED
            </span>
            <div className="text-3xl font-black text-neutral-900 mt-1 tracking-tight">
              {metrics.totalEnrolled || 186}
            </div>
            <p className="text-[11px] text-neutral-500 mt-0.5 font-medium">
              Active rural craftswomen
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Enrolled Today */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                ENROLLED TODAY
              </span>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                24 Oct
              </span>
            </div>
            <div className="text-3xl font-black text-neutral-900 mt-1 tracking-tight">
              {metrics.enrolledToday || 8}
            </div>
            <p className="text-[11px] text-neutral-500 mt-0.5 font-medium">
              beneficiaries
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Profile Updates */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                PENDING PROFILE UPDATES
              </span>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                Review
              </span>
            </div>
            <div className="text-3xl font-black text-neutral-900 mt-1 tracking-tight">
              {metrics.pendingProfileUpdates || 3}
            </div>
            <p className="text-[11px] text-neutral-500 mt-0.5 font-medium">
              Bank & SHG migration flags
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. RECENT REGISTRATIONS CAROUSEL CARDS */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <h3 className="font-extrabold text-neutral-900 text-sm sm:text-base">
              Recent Registrations (Today, 24 Oct)
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-[#ea580c] text-[10px] font-bold">
              {recentRegistrations.length} Captured
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onNotify('info', 'Showing latest registered beneficiaries')}
              className="p-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNotify('info', 'Showing next page of recent batch')}
              className="p-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recentRegistrations.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-neutral-50/70 hover:bg-white border border-neutral-200/80 hover:border-orange-300 transition-all flex items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-neutral-200 shrink-0 bg-neutral-200">
                  <img
                    src={item.image || '/images/aparna_ghosh.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/login_bg_user.jpg';
                    }}
                  />
                </div>
                <div>
                  <div className="font-extrabold text-xs text-neutral-900">
                    {item.name} <span className="font-semibold text-neutral-500">• {item.age}y</span>
                  </div>
                  {item.bengaliName && (
                    <div className="text-[10px] text-neutral-400 font-medium">
                      {item.bengaliName}
                    </div>
                  )}
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 mt-1">
                    {item.craft}
                  </span>
                  <div className="text-[10px] text-neutral-500 mt-1 flex items-center gap-1">
                    <span>{item.location}</span>
                    <span>•</span>
                    <span className="font-mono">{item.timeAgo}</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onEditRecord(item)}
                  className="px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Edit className="w-3 h-3 text-neutral-400" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. SEARCH & FILTER CONTROLS */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by artisan name, UID (e.g. NS-WB), mobile, or ration ref..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-medium focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Panchayat Dropdown */}
          <select
            value={selectedPanchayat}
            onChange={(e) => {
              setSelectedPanchayat(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full lg:w-48 py-2.5 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 focus:outline-none bg-white"
          >
            <option value="All">Gram Panchayat: All (4)</option>
            <option value="Mayurhat-I">Mayurhat-I GP</option>
            <option value="Mayurhat-II">Mayurhat-II GP</option>
            <option value="Bagula">Bagula GP</option>
            <option value="Govindapur">Govindapur GP</option>
            <option value="Ramnagar">Ramnagar GP</option>
            <option value="Hriddaypur">Hriddaypur GP</option>
          </select>

          {/* Craft Dropdown */}
          <select
            value={selectedCraft}
            onChange={(e) => {
              setSelectedCraft(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full lg:w-48 py-2.5 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 focus:outline-none bg-white"
          >
            <option value="All">Craft: All Specialties</option>
            <option value="Nakshi Kantha">Nakshi Kantha</option>
            <option value="Terracotta">Terracotta Craft</option>
            <option value="Jamdani Weaving">Jamdani Weaving</option>
            <option value="Zari Needlework">Zari Needlework</option>
            <option value="Shitalpati Mats">Shitalpati Mats</option>
            <option value="Jute Braiding">Jute Braiding</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full lg:w-48 py-2.5 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 focus:outline-none bg-white"
          >
            <option value="All">Status: All (186)</option>
            <option value="Verified">Verified & Synced</option>
            <option value="Pending">Pending Audit</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="w-full lg:w-auto px-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Active Selection Tags row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-neutral-400 font-semibold">Active Selection:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-[#ea580c] border border-orange-200 font-bold flex items-center gap-1">
              <span>Showing All Records ({filteredRecords.length} total)</span>
              <button onClick={() => setSearchTerm('')} className="hover:text-rose-600 cursor-pointer">✕</button>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 font-medium">
              District: Nadia
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
              Biometric Sync: Enabled
            </span>
          </div>

          <div>
            <span>Displaying 1-{paginatedRecords.length} of {filteredRecords.length} user</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. MASTER RECORDS TABLE (MATCHING IMAGE 4) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/60 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRowIds.length > 0 && selectedRowIds.length === paginatedRecords.length}
                    onChange={toggleSelectAll}
                    className="rounded border-neutral-300 text-orange-600 focus:ring-orange-500"
                  />
                </th>
                <th className="py-3.5 px-4">ARTISAN BENEFICIARY</th>
                <th className="py-3.5 px-4">CRAFT & SKILL TRADE</th>
                <th className="py-3.5 px-4">PANCHAYAT & HABITATION</th>
                <th className="py-3.5 px-4">CONTACT & AADHAAR REF</th>
                <th className="py-3.5 px-4">REGISTERED</th>
                <th className="py-3.5 px-4">SYNC STATUS</th>
                <th className="py-3.5 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {paginatedRecords.map((row) => {
                const isSelected = selectedRowIds.includes(row.id);
                return (
                  <tr 
                    key={row.id}
                    className={`hover:bg-neutral-50/70 transition-colors ${isSelected ? 'bg-orange-50/30' : ''}`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(row.id)}
                        className="rounded border-neutral-300 text-orange-600 focus:ring-orange-500"
                      />
                    </td>

                    {/* Artisan Beneficiary */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0">
                          <img
                            src={row.avatar || '/images/aparna_ghosh.jpg'}
                            alt={row.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '/images/login_bg_user.jpg';
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-neutral-900 text-xs">
                              {row.name}
                            </span>
                            {row.syncStatus === 'Verified' && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            )}
                          </div>
                          {row.bengaliName && (
                            <div className="text-[11px] text-neutral-500 font-medium">
                              {row.bengaliName}
                            </div>
                          )}
                          <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                            {row.uid}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Craft & Skill Trade */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-neutral-900 text-xs">
                        {row.craft}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        {row.craftDetail || 'Handicrafts production'}
                      </div>
                    </td>

                    {/* Panchayat & Habitation */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-neutral-800 text-xs">
                        {row.panchayat}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        {row.habitation}
                      </div>
                    </td>

                    {/* Contact & Aadhaar Ref */}
                    <td className="py-4 px-4 font-mono text-[11px]">
                      <div className="font-bold text-neutral-800">
                        {row.phone}
                      </div>
                      <div className="text-neutral-500 text-[10px] mt-0.5">
                        {row.aadhaarRef || 'UID: **** 8109 (OK)'}
                      </div>
                    </td>

                    {/* Registered */}
                    <td className="py-4 px-4 text-[11px] text-neutral-600 font-medium whitespace-nowrap">
                      {row.registered || 'Today, 10:42 AM'}
                    </td>

                    {/* Sync Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        row.syncStatus === 'Verified'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : row.syncStatus === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          row.syncStatus === 'Verified'
                            ? 'bg-emerald-500'
                            : row.syncStatus === 'Pending'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`} />
                        <span>{row.syncStatus}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEditRecord(row)}
                          title="Edit record"
                          className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onPrintCard(row)}
                          title="Print official Artisan ID Card"
                          className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onViewRecord(row)}
                          title="View Full Profile"
                          className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination & Footer */}
        <div className="p-4 bg-neutral-50/60 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              disabled
              className="px-2 py-1 rounded-md border border-neutral-200 text-neutral-700 text-xs font-semibold bg-white"
            >
              <option value="6">10</option>
            </select>
            <span className="text-neutral-400">|</span>
            <span>
              Showing {Math.min(1 + (currentPage - 1) * rowsPerPage, filteredRecords.length)} to {Math.min(currentPage * rowsPerPage, filteredRecords.length)} of {filteredRecords.length} entries
            </span>
          </div>

          <div className="flex items-center gap-1 font-bold">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md hover:bg-neutral-200 text-neutral-500 disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#ea580c] text-white shadow-2xs'
                    : 'text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {page}
              </button>
            ))}
            <span className="px-1 text-neutral-400">...</span>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                currentPage === totalPages ? 'bg-[#ea580c] text-white' : 'text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              19
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md hover:bg-neutral-200 text-neutral-500 disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
