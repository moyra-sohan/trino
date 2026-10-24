import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, FileText, Check, RefreshCw } from 'lucide-react';

export default function FixIssueModal({
  isOpen,
  issue,
  onClose,
  onResolve,
  onNotify
}) {
  if (!isOpen || !issue) return null;

  const [inputVal, setInputVal] = useState(
    issue.id === 'ATTN-01'
      ? 'PUNB0123400'
      : issue.id === 'ATTN-02'
      ? 'Mayurhat-I GP'
      : '+91 81452 00063'
  );
  const [notes, setNotes] = useState('Audited on-ground documents. Cross-checked with physical survey register.');
  const [resolving, setResolving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResolving(true);

    setTimeout(() => {
      onResolve(issue.id, {
        resolvedVal: inputVal,
        notes: notes
      });
      onNotify('success', `Resolved "${issue.type}" for ${issue.name}! Status updated to Verified.`);
      setResolving(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-neutral-200 overflow-hidden text-left">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                {issue.type}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {issue.name} ({issue.uid})
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <p className="font-bold mb-1">Audit Flag Details:</p>
            <p>{issue.description}</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              {issue.id === 'ATTN-01'
                ? 'Correct Bank IFSC Code *'
                : issue.id === 'ATTN-02'
                ? 'Reconciled Gram Panchayat *'
                : 'Verified Contact Phone Number *'}
            </label>
            <input
              type="text"
              required
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold text-neutral-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Field verification agent override code enabled for Smt. Rekha Mondal (OP-8492).
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              Resolution Remarks / Proof Reference *
            </label>
            <textarea
              rows="3"
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={resolving}
              className="px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              {resolving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Syncing with Directory...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Mark Verified</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
