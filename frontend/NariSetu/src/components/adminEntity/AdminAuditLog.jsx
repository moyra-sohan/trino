import React, { useState } from 'react';
import { 
  ScrollText, Download, Search, Filter, ShieldCheck, 
  Clock, AlertCircle, CheckCircle2, UserCheck, Key 
} from 'lucide-react';

export default function AdminAuditLog({
  auditLogs = [],
  onNotify
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.detail && log.detail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.reviewer && log.reviewer.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Action,Detail,Reviewer,Date,Category\n" +
      auditLogs.map(l => `"${l.action}","${l.detail || ''}","${l.reviewer || ''}","${l.date}","${l.category}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "System_Audit_Log_NariSetu.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotify?.('info', 'Audit logs exported as CSV');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-serif">
            System Audit Log
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
            Immutable administrative event trace including 2FA authentication, role adjustments, verification approvals, and listing moderation.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-xs font-bold text-neutral-700 shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Log (CSV)</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-3.5 shadow-2xs flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search audit trail by actor, action, or date..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-neutral-50/50"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Categories</option>
            <option value="Security">Security & 2FA</option>
            <option value="Verification">Verification Approvals</option>
            <option value="Moderation">Listing Moderation</option>
          </select>
        </div>
      </div>

      {/* Audit Log Timeline */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-6">
        <div className="space-y-6">
          {filteredLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-4">
              <span className={`w-3 h-3 rounded-full ${log.dotColor} shrink-0 mt-1 ring-4 ring-neutral-100`} />
              
              <div className="flex-1 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-neutral-900 text-sm">
                    {log.action}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    {log.date}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  {log.detail && (
                    <span className="text-xs text-neutral-600 font-medium">
                      {log.detail}
                    </span>
                  )}
                  {log.reviewer && (
                    <span className="text-[11px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full font-semibold">
                      Actor: {log.reviewer}
                    </span>
                  )}
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold ml-auto">
                    {log.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
