import React, { useState } from 'react';
import { 
  AlertTriangle, CheckCircle2, XCircle, Search, 
  Filter, ShieldAlert, ArrowRight, Eye, RefreshCw 
} from 'lucide-react';

export default function AdminFlaggedContent({
  flaggedContent = [],
  onUpdateFlags,
  onNotify
}) {
  const [filterPriority, setFilterPriority] = useState('all');
  const [flags, setFlags] = useState(flaggedContent);

  const handleResolve = (flagId) => {
    const updated = flags.map((f) => 
      f.id === flagId ? { ...f, status: 'Resolved' } : f
    );
    setFlags(updated);
    onUpdateFlags?.(updated);
    onNotify?.('success', 'Flag marked as resolved and closed.');
  };

  const handleDismiss = (flagId) => {
    const updated = flags.filter((f) => f.id !== flagId);
    setFlags(updated);
    onUpdateFlags?.(updated);
    onNotify?.('info', 'Flag dismissed.');
  };

  const filteredFlags = flags.filter((f) => 
    filterPriority === 'all' || f.priority === filterPriority
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-serif">
              Flagged Content & Reports
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Review urgent community reports, suspicious opportunity terms, and unverified data modifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterPriority('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterPriority === 'all' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            All Flags ({flags.length})
          </button>
          <button
            onClick={() => setFilterPriority('high')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterPriority === 'high' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700'
            }`}
          >
            High Priority
          </button>
        </div>
      </div>

      {/* Flag Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFlags.map((flag) => {
          const isResolved = flag.status === 'Resolved';

          return (
            <div 
              key={flag.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between shadow-2xs transition-all ${
                isResolved 
                  ? 'bg-neutral-50 border-neutral-200 opacity-60' 
                  : flag.bgColor
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 border border-neutral-200">
                    {flag.category}
                  </span>
                  <span className="text-[11px] font-semibold opacity-70">
                    {flag.timestamp}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-neutral-900 mt-3 leading-snug">
                  {flag.title}
                </h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  {flag.description}
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-200/60 text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-500 font-medium">Target Node:</span>
                    <span className="font-bold text-neutral-800">{flag.targetName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 font-medium">Reported By:</span>
                    <span className="font-bold text-neutral-800 truncate max-w-[160px]">{flag.reporter}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-200/60 flex items-center justify-between gap-2">
                {!isResolved ? (
                  <>
                    <button
                      onClick={() => handleResolve(flag.id)}
                      className="flex-1 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors cursor-pointer text-center"
                    >
                      Resolve Flag
                    </button>
                    <button
                      onClick={() => handleDismiss(flag.id)}
                      className="px-3 py-1.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-xs font-bold text-neutral-700 transition-colors cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Resolved</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
