import React, { useState } from 'react';
import { 
  Download, RefreshCw, Search, Filter, ShieldCheck, 
  FileText, CheckCircle2, Clock, AlertCircle, Eye, 
  Check, X, Maximize2, Send, ExternalLink, ChevronRight 
} from 'lucide-react';

export default function AdminVerificationQueue({
  queue = [],
  onUpdateQueue,
  onOpenDocViewer,
  onRequestDocs,
  onNotify
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'awaiting' | 'missing' | 'audit'

  // Selected entity for inspection pane (defaults to Mahila Kisan Samiti Federation)
  const [selectedEntityId, setSelectedEntityId] = useState(queue[0]?.id || 'VER-001');
  const [isSyncing, setIsSyncing] = useState(false);

  const selectedEntity = queue.find((q) => q.id === selectedEntityId) || queue[0];

  // Filtering
  const filteredQueue = queue.filter((item) => {
    const matchesSearch = 
      (item?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item?.regNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item?.location || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || (item?.type || '').toLowerCase().includes(selectedType.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || (item?.district || '').toLowerCase().includes(selectedDistrict.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'awaiting' && item?.status === 'Awaiting Review') ||
      (statusFilter === 'missing' && item?.status === 'Missing Docs') ||
      (statusFilter === 'audit' && (item?.status === 'Under Audit' || item?.status === 'In Review'));

    return matchesSearch && matchesType && matchesDistrict && matchesStatus;
  });

  // Handle statutory checklist toggle
  const handleToggleChecklist = (checklistId) => {
    if (!selectedEntity) return;
    const updatedChecklist = (selectedEntity.statutoryChecklist || []).map((c) =>
      c.id === checklistId ? { ...c, checked: !c.checked } : c
    );
    const updatedItem = { ...selectedEntity, statutoryChecklist: updatedChecklist };
    onUpdateQueue?.(queue.map((q) => (q.id === selectedEntity.id ? updatedItem : q)));
  };

  // Handle auditor notes edit
  const handleAuditorNotesChange = (text) => {
    if (!selectedEntity) return;
    const updatedItem = { ...selectedEntity, auditorNotes: text };
    onUpdateQueue?.(queue.map((q) => (q.id === selectedEntity.id ? updatedItem : q)));
  };

  // Handle Approve
  const handleApprove = () => {
    if (!selectedEntity) return;
    const updatedItem = { 
      ...selectedEntity, 
      status: 'Verified',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      docsWarning: null
    };
    onUpdateQueue?.(queue.map((q) => (q.id === selectedEntity.id ? updatedItem : q)));
    onNotify?.('success', `Approved verification for ${selectedEntity.name}! Platform credentials generated.`);
  };

  // Handle Reject
  const handleReject = () => {
    if (!selectedEntity) return;
    const updatedItem = { 
      ...selectedEntity, 
      status: 'Rejected',
      statusColor: 'bg-rose-50 text-rose-800 border-rose-200' 
    };
    onUpdateQueue?.(queue.map((q) => (q.id === selectedEntity.id ? updatedItem : q)));
    onNotify?.('error', `Rejected verification for ${selectedEntity.name}. Partner notified.`);
  };

  // Handle Sync State Registry
  const handleSyncStateRegistry = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onNotify?.('success', 'State Livelihoods Registry synced successfully! 7 entities up to date.');
    }, 1200);
  };

  // Export CSV
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "RegID,Name,Type,District,DocsStatus,Assigned,Status\n" +
      queue.map(q => `"${q.regNumber}","${q.name}","${q.type}","${q.district}","${q.docsStatus}","${q.assignedReviewer}","${q.status}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Verification_Registry_NariSetu.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotify?.('info', 'Verification Register exported as CSV');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ========================================================= */}
      {/* 1. HEADER WITH ACTIONS */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Verification Queue
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
            Review partner documentation, verify organization legitimacy, and approve secure access to the state livelihood network.
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
            onClick={handleSyncStateRegistry}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#064e3b] hover:bg-[#053c2e] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95 disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sync State Registry</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. 4 STAT CARDS (MATCHING SCREENSHOT 2) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Pending */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Total Pending</span>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              • 2 overdue &gt;5d
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-neutral-900">7</span>
            <span className="text-xs text-neutral-500 ml-2">applications queued</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
            <div className="w-1/3 h-full rounded-full bg-amber-500" />
          </div>
        </div>

        {/* Needs Document */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Needs Document</span>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Partner notified
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-neutral-900">3</span>
            <span className="text-xs text-neutral-500 ml-2">awaiting upload</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
            <div className="w-2/5 h-full rounded-full bg-rose-500" />
          </div>
        </div>

        {/* Approved This Month */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Approved This Month</span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              +18% vs last mo
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-neutral-900">34</span>
            <span className="text-xs text-neutral-500 ml-2">onboarded</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
            <div className="w-4/5 h-full rounded-full bg-emerald-600" />
          </div>
        </div>

        {/* Avg Review Time */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Avg Review Time</span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-neutral-900">1.4</span>
            <span className="text-xs text-neutral-500 ml-2">Days</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
            <div className="w-3/4 h-full rounded-full bg-emerald-700" />
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. SEARCH & FILTERS BAR (MATCHING SCREENSHOT 2) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-3.5 shadow-2xs space-y-3">
        
        {/* Top search inputs */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by organization name, CIN, or WB reg number..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-neutral-50/50"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Entity Types (7)</option>
              <option value="SHG">SHG Federation</option>
              <option value="Business">Business</option>
              <option value="Training">Training Institute</option>
              <option value="NGO">NGO / Trust</option>
            </select>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Districts (West Bengal)</option>
              <option value="Nadia">Nadia</option>
              <option value="Hooghly">Hooghly</option>
              <option value="North 24 Parganas">North 24 Parganas</option>
              <option value="Murshidabad">Murshidabad</option>
              <option value="Malda">Malda</option>
            </select>

            <button 
              onClick={() => { setSearchTerm(''); setSelectedType('all'); setSelectedDistrict('all'); setStatusFilter('all'); }}
              className="p-2 rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
              title="Reset filters"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-neutral-100">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/60'
            }`}
          >
            All 7
          </button>
          <button
            onClick={() => setStatusFilter('awaiting')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'awaiting'
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
            }`}
          >
            Awaiting Review 4
          </button>
          <button
            onClick={() => setStatusFilter('missing')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'missing'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200/60'
            }`}
          >
            Missing Documents 2
          </button>
          <button
            onClick={() => setStatusFilter('audit')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'audit'
                ? 'bg-cyan-700 text-white shadow-2xs'
                : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100 border border-cyan-200/60'
            }`}
          >
            Under Compliance Check 1
          </button>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. DUAL PANE VERIFICATION WORKSPACE (MATCHING SCREENSHOT 2) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================= */}
        {/* LEFT PANE: REGISTRY ENTRIES TABLE (7 cols) */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
          
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <div>
              <h2 className="text-sm font-bold text-neutral-900">
                Verification Registry Entries
              </h2>
              <p className="text-[11px] text-neutral-400">
                Sorted by submission freshness and escalation urgency
              </p>
            </div>
            <span className="text-xs text-neutral-500 font-semibold">
              Showing {filteredQueue.length} of {queue.length} entities
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[650px]">
              <thead>
                <tr className="border-b border-neutral-100 text-[11px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-50/70">
                  <th className="py-3 px-4">Organization & Location</th>
                  <th className="py-3 px-3">Entity Type</th>
                  <th className="py-3 px-3">Docs Status</th>
                  <th className="py-3 px-3">Assigned</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredQueue.map((item) => {
                  const isSelected = selectedEntity?.id === item.id;

                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedEntityId(item.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-amber-50/60 ring-1 ring-inset ring-amber-300' 
                          : 'hover:bg-neutral-50/70'
                      }`}
                    >
                      {/* Organization & Location */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-orange-600' : 'bg-emerald-500'}`} />
                          <div>
                            <div className="font-bold text-neutral-900 leading-tight">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-neutral-400 mt-0.5">
                              {item.location} • <span className="text-neutral-500 font-medium">{item.submittedFreshness}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Entity Type */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.typeColor}`}>
                          {item.type}
                        </span>
                      </td>

                      {/* Docs Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="font-bold text-neutral-800 text-[11px]">
                          {item.docsRatio}
                          {item.docsWarning && (
                            <span className="ml-1 text-[10px] text-rose-600 font-semibold">
                              {item.docsWarning}
                            </span>
                          )}
                          {!item.docsWarning && item.docsRatio === '4/4' && (
                            <span className="ml-1 text-[10px] text-emerald-600 font-semibold">
                              Complete
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Assigned */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${item.assignedColor}`}>
                            {item.assignedAvatar}
                          </div>
                          <span className="text-neutral-600 text-[11px]">{item.assignedReviewer}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.statusColor}`}>
                          {item.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        {isSelected ? (
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedEntityId(item.id); }}
                            className="px-3 py-1 rounded-lg bg-orange-600 text-white font-bold text-xs shadow-2xs hover:bg-orange-700 cursor-pointer"
                          >
                            Inspect
                          </button>
                        ) : item.status === 'Missing Docs' ? (
                          <button
                            onClick={(e) => { e.stopPropagation(); onRequestDocs?.(item); }}
                            className="px-3 py-1 rounded-lg border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-50 cursor-pointer"
                          >
                            Notify
                          </button>
                        ) : item.assignedReviewer === 'Unassigned' ? (
                          <button
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              const updated = queue.map(q => q.id === item.id ? { ...q, assignedReviewer: 'Administrator', assignedAvatar: 'AD', assignedColor: 'bg-emerald-800 text-white' } : q);
                              onUpdateQueue(updated);
                              onNotify?.('info', `Claimed review for ${item.name}`);
                            }}
                            className="px-3 py-1 rounded-lg border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-50 cursor-pointer"
                          >
                            Claim
                          </button>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedEntityId(item.id); }}
                            className="px-3 py-1 rounded-lg border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-50 cursor-pointer"
                          >
                            Review
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Priority sort enabled • All submissions encrypted SHA-256</span>
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Previous</span>
              <span className="px-2 py-0.5 rounded bg-neutral-900 text-white font-bold">1</span>
              <span className="text-neutral-400">Next</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANE: ACTIVE INSPECTION DRAWER (5 cols) */}
        {/* ========================================================= */}
        {selectedEntity && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200/80 shadow-md overflow-hidden flex flex-col">
            
            {/* Header matching Screenshot 2: Dark banner with badge & Reg ID */}
            <div className="bg-[#1c2420] text-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-400 text-neutral-950 text-[10px] font-black uppercase tracking-wider">
                    ACTIVE INSPECTION
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Reg: {selectedEntity.regNumber}
                  </span>
                </div>
                <button 
                  onClick={() => onOpenDocViewer?.(selectedEntity.documents[0])}
                  className="text-neutral-400 hover:text-white transition-colors"
                  title="Expand view"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-lg font-bold text-white mt-3">
                {selectedEntity?.name || 'Organization Inspection'}
              </h2>
              <p className="text-xs text-neutral-300 mt-0.5">
                {selectedEntity?.type || 'Entity'} • {selectedEntity?.city || ''}{selectedEntity?.city ? ', ' : ''}{selectedEntity?.district || ''}
              </p>

              {/* Representative & Affiliated Women stats box */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-neutral-800 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold block">
                    REPRESENTATIVE
                  </span>
                  <span className="font-bold text-white">{selectedEntity?.representative?.name || 'Authorized Signatory'}</span>
                  <span className="text-[11px] text-neutral-400 block">{selectedEntity?.representative?.phone || selectedEntity?.contactPhone || '+91 98301 22410'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold block">
                    AFFILIATED WOMEN
                  </span>
                  <span className="font-bold text-white">{selectedEntity?.affiliatedWomen?.count || '1,240 Artisans'}</span>
                  <span className="text-[11px] text-neutral-400 block">{selectedEntity?.affiliatedWomen?.clusters || '8 Clusters'}</span>
                </div>
              </div>
            </div>

            {/* Document Verification Section */}
            <div className="p-5 space-y-5">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
                    REQUIRED DOCUMENTATION (
                    {(selectedEntity?.documents || []).filter(d => d.verified).length} OF {(selectedEntity?.documents || []).length} VERIFIED)
                  </span>
                  <span className="text-[10px] text-neutral-400">Click document to open viewer</span>
                </div>

                <div className="space-y-2">
                  {(selectedEntity?.documents || []).map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => onOpenDocViewer?.(doc)}
                      className="p-3 rounded-xl border border-neutral-200/80 hover:border-neutral-300 bg-neutral-50/50 hover:bg-neutral-50 flex items-center justify-between text-xs cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-neutral-400 group-hover:text-emerald-700 transition-colors" />
                        <div>
                          <div className="font-bold text-neutral-900 leading-tight">
                            {doc.title}
                          </div>
                          <div className="text-[10px] text-neutral-400 font-mono">
                            {doc.fileName} • {doc.size}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {doc.verified ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <Check className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <Clock className="w-3 h-3" />
                            <span>Pending Review</span>
                          </span>
                        )}
                        <Eye className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Clearance Checklist */}
              <div>
                <span className="text-xs font-bold text-neutral-900 tracking-wider uppercase block mb-2">
                  STATUTORY CLEARANCE CHECKLIST
                </span>

                <div className="space-y-2 text-xs">
                  {(selectedEntity?.statutoryChecklist || []).map((checkItem) => (
                    <label
                      key={checkItem.id}
                      className="flex items-start gap-2.5 cursor-pointer text-neutral-700 hover:text-neutral-900 select-none"
                    >
                      <input
                        type="checkbox"
                        checked={checkItem.checked}
                        onChange={() => handleToggleChecklist(checkItem.id)}
                        className="mt-0.5 w-4 h-4 rounded text-emerald-700 border-neutral-300 focus:ring-emerald-500 cursor-pointer accent-emerald-700"
                      />
                      <span className={`leading-tight ${checkItem.checked ? 'text-neutral-800 font-medium' : 'text-neutral-500'}`}>
                        {checkItem.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Verification Auditor Log Notes */}
              <div>
                <span className="text-xs font-bold text-neutral-900 tracking-wider uppercase block mb-1.5">
                  VERIFICATION AUDITOR LOG NOTES
                </span>
                <textarea
                  rows={3}
                  value={selectedEntity.auditorNotes || ''}
                  onChange={(e) => handleAuditorNotesChange(e.target.value)}
                  placeholder="Record auditor remarks, cross-check reference IDs, or rationale..."
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-neutral-50/50"
                />
              </div>

              {/* Action Buttons matching Screenshot 2 */}
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-neutral-100">
                <button
                  onClick={handleApprove}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#064e3b] hover:bg-[#053c2e] text-white font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Verification</span>
                </button>

                <button
                  onClick={() => onRequestDocs?.(selectedEntity)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-bold text-xs shadow-2xs transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Docs</span>
                </button>

                <button
                  onClick={handleReject}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-rose-300 hover:bg-rose-50 text-rose-700 font-bold text-xs shadow-2xs transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
