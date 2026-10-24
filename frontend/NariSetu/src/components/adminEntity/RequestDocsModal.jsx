import React, { useState } from 'react';
import { X, Send, AlertCircle, FileText, Check } from 'lucide-react';

export default function RequestDocsModal({
  isOpen,
  entity,
  onClose,
  onSubmit,
  onNotify
}) {
  const [docType, setDocType] = useState('Executive Committee Resolution');
  const [urgency, setUrgency] = useState('Standard (5 days)');
  const [notes, setNotes] = useState('Please re-upload a clear, signed and stamped copy with full quorum sign-offs.');

  if (!isOpen || !entity) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({
      entityId: entity.id,
      entityName: entity.name,
      docType,
      urgency,
      notes
    });
    onNotify?.('success', `Document request sent to ${entity.name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 max-w-lg w-full overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Request Documents</h3>
            <p className="text-xs text-neutral-500">{entity.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-neutral-700 mb-1">Target Document Type</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option>Executive Committee Resolution</option>
              <option>Income Tax 12A / 80G Exemption</option>
              <option>Bank Branch Direct DBT Linkage Proof</option>
              <option>Gram Panchayat Recommendation Letter</option>
              <option>FSSAI Food Processing License</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-neutral-700 mb-1">Upload Urgency / Deadline</label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option>Standard (5 business days)</option>
              <option>High Priority (48 hours)</option>
              <option>Critical (24 hours)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-neutral-700 mb-1">Instructions for Partner</label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Specify requirements or issues identified..."
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-neutral-200 font-bold text-neutral-600 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Partner Request</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
