import React from 'react';
import { X, FileText, CheckCircle2, Clock, AlertCircle, Download, ExternalLink, ShieldCheck } from 'lucide-react';

export default function DocumentViewerModal({
  isOpen,
  document,
  onClose,
  onToggleStatus,
  onNotify
}) {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900">{document.title}</h3>
              <p className="text-xs text-neutral-500 font-mono">{document.fileName} • {document.size}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mock Document Preview Content */}
        <div className="p-6 flex-1 overflow-y-auto bg-neutral-100/50 flex flex-col items-center justify-center min-h-[300px]">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 max-w-lg w-full text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100/60 text-emerald-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mb-2">
              Official Authenticated Copy
            </span>
            <h4 className="text-base font-bold text-neutral-900">{document.title}</h4>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs">
              Cryptographically verified with NariSetu Central Entity Registry & Self-Help Group Council.
            </p>

            <div className="w-full mt-6 p-4 rounded-xl bg-neutral-50 border border-neutral-100 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between text-neutral-600">
                <span>File:</span>
                <span className="font-bold text-neutral-800">{document.fileName}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>File Size:</span>
                <span className="font-bold text-neutral-800">{document.size}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Status:</span>
                <span className={`font-bold ${document.verified ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {document.status}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Checksum:</span>
                <span className="text-neutral-500">e82a9...d40b</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-white border-t border-neutral-100 flex items-center justify-between">
          <button
            onClick={() => {
              onNotify?.('info', `Downloading ${document.fileName}...`);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onToggleStatus?.(document.id);
                onNotify?.('success', `Updated status for ${document.title}`);
                onClose();
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                document.verified
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  : 'bg-emerald-800 text-white hover:bg-emerald-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{document.verified ? 'Mark for Re-Review' : 'Approve Document'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
