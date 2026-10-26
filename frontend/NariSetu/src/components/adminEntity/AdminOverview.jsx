import React from 'react';
import {
  Building2, ClipboardCheck, Users, AlertTriangle,
  ArrowUpRight, ChevronRight, CheckCircle2, Clock,
  ExternalLink, Eye, ArrowRight
} from 'lucide-react';

export default function AdminOverview({
  metrics,
  verificationQueue = [],
  flaggedContent = [],
  auditLogs = [],
  partnerActivity = [],
  onNavigateTab,
  onInspectEntity,
  onRequestDocs,
  onNotify
}) {
  const overviewMetrics = metrics?.overview || {
    registeredOrganizations: { count: 214, change: '+11 this month' },
    pendingVerifications: { count: 7, subtext: '2 older than 5 days' },
    communitiesOnPlatform: { count: '1,086', change: '+38 this month' },
    openFlags: { count: 3, subtext: '1 high priority' }
  };

  // Preview rows for Verification Queue matching Screenshot 1
  const previewQueue = verificationQueue.slice(0, 4);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ========================================================= */}
      {/* 1. PAGE HEADER */}
      {/* ========================================================= */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Admin Console
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Review partner verifications, flagged content and platform activity. All figures are aggregated.
        </p>
      </div>

      {/* ========================================================= */}
      {/* 2. 4 TOP STAT CARDS (MATCHING SCREENSHOT 1) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Registered Organizations */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-neutral-500">
            Registered organizations
          </span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-neutral-900 font-sans">
              {overviewMetrics.registeredOrganizations.count}
            </span>
          </div>
          <span className="mt-2 text-xs font-bold text-emerald-700">
            {overviewMetrics.registeredOrganizations.change}
          </span>
        </div>

        {/* Card 2: Pending Verifications */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-neutral-500">
            Pending verifications
          </span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-neutral-900 font-sans">
              {overviewMetrics.pendingVerifications.count}
            </span>
          </div>
          <span className="mt-2 text-xs font-bold text-amber-700">
            {overviewMetrics.pendingVerifications.subtext}
          </span>
        </div>

        {/* Card 3: Communities on Platform */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-neutral-500">
            Communities on platform
          </span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-neutral-900 font-sans">
              {overviewMetrics.communitiesOnPlatform.count}
            </span>
          </div>
          <span className="mt-2 text-xs font-bold text-emerald-700">
            {overviewMetrics.communitiesOnPlatform.change}
          </span>
        </div>

        {/* Card 4: Open Flags */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-neutral-500">
            Open flags
          </span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-neutral-900 font-sans">
              {overviewMetrics.openFlags.count}
            </span>
          </div>
          <span className="mt-2 text-xs font-bold text-amber-700">
            {overviewMetrics.openFlags.subtext}
          </span>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. MAIN TWO-COLUMN SPLIT GRID (MATCHING SCREENSHOT 1) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN (approx 7 cols) */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Verification Queue Table */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-neutral-900">
                Verification Queue
              </h2>
              <button
                onClick={() => onNavigateTab('verification')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Open queue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[550px]">
                <thead>
                  <tr className="border-b border-neutral-100 text-[11px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-50/50">
                    <th className="py-3 px-5">Organization</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Submitted</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {previewQueue.map((item) => {
                    const isAwaiting = item.status === 'Awaiting Review';
                    const isMissing = item.status === 'Missing Docs';
                    const isVerified = item.status === 'Verified';

                    return (
                      <tr key={item.id} className="hover:bg-neutral-50/70 transition-colors">
                        {/* Organization */}
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-neutral-900">{item.name}</div>
                          <div className="text-[11px] text-neutral-400">
                            {item.district} • Documents: {item.docsRatio || '4 of 4'}
                          </div>
                        </td>

                        {/* Type */}
                        <td className="py-3.5 px-4 text-neutral-600 font-medium whitespace-nowrap">
                          {item.type}
                        </td>

                        {/* Submitted */}
                        <td className="py-3.5 px-4 text-neutral-600 font-medium whitespace-nowrap">
                          {item.submittedDate}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                            <span 
                              className={`w-1.5 h-1.5 rounded-full ${
                                isVerified ? 'bg-emerald-500' : isMissing ? 'bg-rose-500' : 'bg-amber-500'
                              }`} 
                            />
                            <span className={isVerified ? 'text-emerald-700' : isMissing ? 'text-rose-700' : 'text-amber-700'}>
                              {isMissing ? 'Missing document' : item.status}
                            </span>
                          </span>
                        </td>

                        {/* Action Button */}
                        <td className="py-3.5 px-5 text-right whitespace-nowrap">
                          {isAwaiting && (
                            <button
                              onClick={() => onInspectEntity?.(item)}
                              className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer active:scale-95"
                            >
                              Review
                            </button>
                          )}
                          {isMissing && (
                            <button
                              onClick={() => onRequestDocs?.(item)}
                              className="px-3.5 py-1.5 rounded-lg bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-bold text-xs shadow-2xs transition-all cursor-pointer"
                            >
                              Request
                            </button>
                          )}
                          {!isAwaiting && !isMissing && (
                            <button
                              onClick={() => onInspectEntity?.(item)}
                              className="px-3.5 py-1.5 rounded-lg bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-bold text-xs shadow-2xs transition-all cursor-pointer"
                            >
                              View
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card: Partner Activity by Type */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5">
            <h2 className="text-sm font-bold text-neutral-900 mb-4">
              Partner Activity by Type
            </h2>

            <div className="space-y-4">
              {partnerActivity.map((activity) => (
                <div key={activity.type} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                    <span>{activity.type}</span>
                    <span className="font-bold text-neutral-900">{activity.count}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${activity.color} transition-all duration-500`}
                      style={{ width: `${(activity.count / activity.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN (approx 5 cols) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card: Flagged Content */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
              <h2 className="text-sm font-bold text-neutral-900">
                Flagged Content
              </h2>
              <button
                onClick={() => onNavigateTab('flagged')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Flagged Alert Cards matching Screenshot 1 */}
            <div className="space-y-3">
              {(!flaggedContent || flaggedContent.length === 0) ? (
                <div className="p-4 rounded-xl bg-neutral-50 text-neutral-500 text-xs text-center border border-dashed border-neutral-200">
                  No open flags or reports at this time.
                </div>
              ) : (
                flaggedContent.map((flag) => {
                  const title = flag.title || flag.target || 'Flagged Listing';
                  const description = flag.description || flag.reason || 'Reported for administrative review.';
                  const priority = (flag.priority || 'medium').toLowerCase();
                  const bgColor = flag.bgColor || (
                    priority === 'high'
                      ? 'bg-rose-50 border-rose-200 text-rose-900'
                      : priority === 'medium'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-sky-50 border-sky-200 text-sky-900'
                  );

                  return (
                    <div
                      key={flag.id}
                      onClick={() => onNavigateTab('flagged')}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-transform hover:-translate-y-0.5 ${bgColor}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 border border-neutral-200/50">
                          {flag.category || 'Platform Report'}
                        </span>
                        <span className="text-[10px] font-semibold opacity-70">
                          {flag.timestamp || flag.date || 'Recent'}
                        </span>
                      </div>
                      <div className="text-xs font-bold leading-tight">
                        {title}
                      </div>
                      <div className="text-[11px] opacity-85 mt-1 leading-relaxed">
                        {description}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Card: Recent Audit Log */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
              <h2 className="text-sm font-bold text-neutral-900">
                Recent Audit Log
              </h2>
              <button
                onClick={() => onNavigateTab('audit')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Full log</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Audit Log Entries matching Screenshot 1 */}
            <div className="space-y-3.5">
              {auditLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="flex items-start gap-2.5 text-xs">
                  <span className={`w-2 h-2 rounded-full ${log.dotColor} shrink-0 mt-1.5`} />
                  <div className="flex flex-col">
                    <span className="font-bold text-neutral-900 leading-tight">
                      {log.action}
                    </span>
                    <span className="text-[11px] text-neutral-400 mt-0.5">
                      {log.detail ? `${log.detail} • ` : ''}{log.reviewer || ''} {log.date ? `· ${log.date}` : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
