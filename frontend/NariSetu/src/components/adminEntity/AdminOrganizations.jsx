import React, { useState } from 'react';
import { 
  Building2, Download, Plus, Search, Filter, 
  MoreVertical, CheckCircle2, Clock, AlertCircle, 
  ChevronRight, ChevronLeft, ExternalLink, Archive 
} from 'lucide-react';

export default function AdminOrganizations({
  organizations = [],
  onOpenRegisterModal,
  onNotify
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [entityFilter, setEntityFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Filter organizations
  const filteredOrgs = organizations.filter((org) => {
    const matchesSearch = 
      (org?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (org?.regId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (org?.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (org?.sector || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEntity = entityFilter === 'all' || (org?.category || '').toLowerCase().includes(entityFilter.toLowerCase());
    const matchesDistrict = districtFilter === 'all' || (org?.district || '').toLowerCase().includes(districtFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (org?.statusType || '').toLowerCase().includes(statusFilter.toLowerCase());

    return matchesSearch && matchesEntity && matchesDistrict && matchesStatus;
  });

  // Export CSV
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Location,RegID,Category,Sector,Communities,ActiveOpps,Status,JoinedDate\n" +
      organizations.map(o => `"${o.name}","${o.location}","${o.regId}","${o.category}","${o.sector}","${o.connectedCommunities}",${o.activeOpps},"${o.verificationStatus}","${o.joinedDate}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Registered_Organizations_NariSetu.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotify?.('info', 'Organizations directory exported as CSV');
  };

  const handleDownloadBundle = () => {
    onNotify?.('success', 'Starting download of West Bengal District State Bundle (.zip)...');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ========================================================= */}
      {/* 1. HEADER (MATCHING SCREENSHOT 3) */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Registered Organizations
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Directory of 214 registered NGOs, Businesses, SHG Federations, and Training Institutes across West Bengal.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-xs font-bold text-neutral-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Directory (CSV)</span>
          </button>

          <button
            onClick={onOpenRegisterModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register Organization</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. 4 STAT CARDS (MATCHING SCREENSHOT 3) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Organizations */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Total Organizations</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-neutral-900">214</span>
          </div>
          <span className="text-xs font-bold text-emerald-700">+11 this month</span>
          <div className="w-full h-1 rounded-full bg-emerald-600 mt-2" />
        </div>

        {/* Active NGOs */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Active NGOs</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="text-xs font-bold">🤝</span>
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-neutral-900">96</span>
          </div>
          <span className="text-xs font-semibold text-neutral-500">45% of total</span>
          <div className="w-full h-1 rounded-full bg-amber-500 mt-2" />
        </div>

        {/* Verified Businesses */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Verified Businesses</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <span className="text-xs font-bold">🏪</span>
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-neutral-900">71</span>
          </div>
          <span className="text-xs font-semibold text-neutral-500">33% of total</span>
          <div className="w-full h-1 rounded-full bg-sky-600 mt-2" />
        </div>

        {/* SHG Federations & Institutes */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">SHG Federations & Institutes</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <span className="text-xs font-bold">👥</span>
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-neutral-900">47</span>
          </div>
          <span className="text-xs font-semibold text-neutral-500">22% of total</span>
          <div className="w-full h-1 rounded-full bg-purple-600 mt-2" />
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. SEARCH & FILTERS (MATCHING SCREENSHOT 3) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-3.5 shadow-2xs flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by organization name, registration ID, or contact person..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-neutral-50/50"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Entity Type: All</option>
            <option value="NGO">NGO</option>
            <option value="Business">Business</option>
            <option value="SHG">SHG Federation</option>
            <option value="Cooperative">Cooperative</option>
          </select>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">District: All (WB)</option>
            <option value="Nadia">Nadia</option>
            <option value="Hooghly">Hooghly</option>
            <option value="North 24 Parganas">North 24 Parganas</option>
            <option value="Murshidabad">Murshidabad</option>
            <option value="Malda">Malda</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Status: All Statuses</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending Review</option>
            <option value="action_required">Action Required</option>
          </select>

          <button 
            onClick={() => { setSearchTerm(''); setEntityFilter('all'); setDistrictFilter('all'); setStatusFilter('all'); }}
            className="p-2 rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
            title="Reset filters"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. TABLE (MATCHING SCREENSHOT 3) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[950px]">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-50/70">
                <th className="py-3.5 px-5">Organization & District</th>
                <th className="py-3.5 px-4">Registration ID</th>
                <th className="py-3.5 px-4">Sector / Category</th>
                <th className="py-3.5 px-4">Connected Communities</th>
                <th className="py-3.5 px-3">Active Opps</th>
                <th className="py-3.5 px-4">Verification</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredOrgs.map((org) => {
                const isVerified = org.statusType === 'verified';
                const isPending = org.statusType === 'pending';
                const isActionRequired = org.statusType === 'action_required';

                return (
                  <tr key={org.id} className="hover:bg-neutral-50/70 transition-colors">
                    
                    {/* Organization & District */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${org?.avatarBg || 'bg-emerald-700 text-white'}`}>
                          {org?.initials || org?.name?.slice(0, 2).toUpperCase() || 'OR'}
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900 leading-tight">
                            {org?.name}
                          </div>
                          <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 mt-0.5">
                            <span>{org?.location}</span>
                            <span>•</span>
                            <span className="font-medium text-neutral-600">{org?.categoryBadge || org?.category || 'Entity'}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Registration ID */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-600 whitespace-nowrap">
                      {org?.regId}
                    </td>

                    {/* Sector / Category */}
                    <td className="py-3.5 px-4 text-neutral-700 font-medium whitespace-nowrap">
                      {org?.sector}
                    </td>

                    {/* Connected Communities */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-neutral-900">
                        {org?.connectedCommunities ? org.connectedCommunities.split(' ')[0] : (org?.communitiesCount || '12')}
                      </span>{' '}
                      <span className="text-neutral-500 text-[11px]">
                        {org?.connectedCommunities && org.connectedCommunities.includes(' ') ? org.connectedCommunities.split(' ').slice(1).join(' ') : 'Communities'}
                      </span>
                    </td>

                    {/* Active Opps */}
                    <td className="py-3.5 px-3 text-center whitespace-nowrap font-bold text-neutral-800">
                      {org.activeOpps}
                    </td>

                    {/* Verification */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          isVerified
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : isPending
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isVerified ? 'bg-emerald-500' : isPending ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                        />
                        <span>{org.verificationStatus}</span>
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="py-3.5 px-4 text-neutral-500 text-[11px] whitespace-nowrap">
                      {org.joinedDate}
                    </td>

                    {/* Actions Menu */}
                    <td className="py-3.5 px-4 text-right relative whitespace-nowrap">
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === org.id ? null : org.id)}
                        className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuId === org.id && (
                        <div className="absolute right-4 mt-1 w-44 bg-white rounded-xl shadow-lg border border-neutral-200 p-1.5 z-30 text-left animate-in fade-in">
                          <button
                            onClick={() => {
                              onNotify?.('info', `Viewing details for ${org.name}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg text-neutral-700 hover:bg-neutral-100 font-semibold text-[11px]"
                          >
                            View Directory Profile
                          </button>
                          <button
                            onClick={() => {
                              onNotify?.('success', `Exported GST & compliance report for ${org.name}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg text-neutral-700 hover:bg-neutral-100 font-semibold text-[11px]"
                          >
                            Export Dossier
                          </button>
                          <button
                            onClick={() => {
                              onNotify?.('error', `Audit flag logged for ${org.name}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-bold text-[11px]"
                          >
                            Flag for Re-verification
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination matching Screenshot 3 */}
        <div className="p-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <span>Showing 1 to {filteredOrgs.length} of 214 registered organizations</span>
          
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-400">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="px-3 py-1 rounded-lg bg-[#064e3b] text-white font-bold">1</button>
            <button className="px-3 py-1 rounded-lg hover:bg-neutral-100 font-semibold">2</button>
            <button className="px-3 py-1 rounded-lg hover:bg-neutral-100 font-semibold">3</button>
            <span className="px-1 text-neutral-400">...</span>
            <button className="px-3 py-1 rounded-lg hover:bg-neutral-100 font-semibold">22</button>
            <button className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-600">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. REGISTRY SNAPSHOT BANNER (MATCHING SCREENSHOT 3) */}
      {/* ========================================================= */}
      <div className="rounded-2xl bg-[#0b241c] text-white p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-xl">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 font-mono">
            REGISTRY SNAPSHOT
          </span>
          <h3 className="text-base font-bold text-white mt-1">
            Export Full District Dataset
          </h3>
          <p className="text-xs text-neutral-300 mt-1 max-w-sm">
            Download monthly CSV reports including GST, FCRA status, and leadership contact nodes.
          </p>
        </div>

        <button
          onClick={handleDownloadBundle}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
        >
          <Archive className="w-4 h-4" />
          <span>Download State Bundle (.zip)</span>
        </button>
      </div>

    </div>
  );
}
