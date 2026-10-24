import React, { useState, useRef } from 'react';
import { 
  Download, Upload, CheckCircle2, AlertTriangle, FileSpreadsheet, 
  ArrowLeftRight, RefreshCw, Check, ArrowRight, ChevronDown, Clock, FileText, X
} from 'lucide-react';

export default function BulkImportDatasets({
  rosterItems,
  batchComposition,
  recentHistory,
  schemaMappings,
  onDownloadTemplate,
  onImportBatch,
  onNotify
}) {
  const [schemaOpen, setSchemaOpen] = useState(true);
  const [showFullRoster, setShowFullRoster] = useState(false);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef(null);

  const displayRows = showFullRoster ? rosterItems : rosterItems.slice(0, 5);

  const handleCustomFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onNotify('success', `Loaded "${file.name}"! 35 rows extracted and verified against Aadhaar / GP schema.`);
    }
  };

  const handleExecuteImport = () => {
    setImporting(true);
    setTimeout(() => {
      onImportBatch(rosterItems);
      setImporting(false);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left pb-16">
      
      {/* ========================================================= */}
      {/* 1. TOP HEADER & DOWNLOAD TEMPLATE BUTTON */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Bulk CSV & Tablet Import
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
            Upload pre-filled registration sheets from offline survey tablets or village camp rosters. Validate records, preview column mapping, and import directly into the local operator queue.
          </p>
        </div>

        <div>
          <button
            onClick={onDownloadTemplate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-neutral-500" />
            <span>Download Official CSV Template (.csv)</span>
          </button>
        </div>
      </div>

      {/* Hidden File Picker */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleCustomFileUpload}
        accept=".csv,text/csv,application/vnd.ms-excel"
        className="hidden"
      />

      {/* ========================================================= */}
      {/* 2. AUTO COLUMN SCHEMA MAPPING CARD */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-5 sm:p-6 shadow-2xs">
        
        {/* Accordion Toggle Header */}
        <div 
          onClick={() => setSchemaOpen(!schemaOpen)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center shrink-0">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-neutral-900 text-sm sm:text-base">
                  Auto Column Schema Mapping
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                  All Fields Aligned
                </span>
              </div>
              <span className="text-[11px] text-neutral-500">
                4 / 4 Core Fields Mapped (100% Match Confidence)
              </span>
            </div>
          </div>

          <button className="text-neutral-400 hover:text-neutral-700 p-1">
            <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${schemaOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Collapsible Content */}
        {schemaOpen && (
          <div className="mt-4 pt-4 border-t border-neutral-100 space-y-4">
            <p className="text-xs text-neutral-600">
              The ingestion engine automatically harmonized your file header labels with the NariSetu Master Artisan Schema.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {schemaMappings.map((m, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 text-xs flex flex-col justify-between"
                >
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase">
                    Sheet Header
                  </span>
                  <div className="font-extrabold text-neutral-900 text-sm mt-0.5">
                    {m.sheetHeader}
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono font-bold text-[#ea580c]">
                    <ArrowLeftRight className="w-3 h-3" />
                    <span>{m.schemaField}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* 3. SPLIT MAIN CONTENT: REPORT TABLE & COMPOSITION */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: All Validated User Report Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-200/80 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-neutral-900 text-sm sm:text-base">
                  All Validated User Report
                </h3>
              </div>
              <span className="text-[11px] font-bold text-neutral-500">
                35 Total Extracted Rows
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/60 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">ROW</th>
                    <th className="py-3 px-4">FULL NAME</th>
                    <th className="py-3 px-4">PHONE NUMBER</th>
                    <th className="py-3 px-4">SKILL CATEGORY</th>
                    <th className="py-3 px-4">GP / VILLAGE</th>
                    <th className="py-3 px-4">AADHAAR STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {displayRows.map((r, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-neutral-400">
                        {r.row}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-neutral-900">
                        {r.fullName}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-neutral-700">
                        {r.phone}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-50 text-orange-800 border border-orange-200">
                          {r.skillCategory}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-700 font-medium">
                        {r.gpVillage}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${r.statusBadge}`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>{r.aadhaarStatus}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-neutral-50/50 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Showing rows 1-{displayRows.length} of {rosterItems.length} total extracted roster items</span>
            <button
              onClick={() => setShowFullRoster(!showFullRoster)}
              className="text-[#ea580c] hover:text-[#c2410c] font-bold hover:underline cursor-pointer"
            >
              {showFullRoster ? 'Collapse Table' : `View Full ${rosterItems.length} Rows Table`}
            </button>
          </div>
        </div>

        {/* Right Col: Batch Composition & Recent Entry History */}
        <div className="space-y-6">
          
          {/* Donut Chart Batch Composition */}
          <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-2xs">
            <h3 className="font-extrabold text-neutral-900 text-sm sm:text-base">
              Batch Composition
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5 mb-5">
              Distribution across surveyed handicraft trades:
            </p>

            {/* Simulated Donut Visual */}
            <div className="flex items-center justify-center py-2">
              <div className="relative w-36 h-36 rounded-full border-[12px] border-orange-500 border-t-amber-400 border-l-emerald-500 flex items-center justify-center shadow-inner">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-neutral-900">35</span>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Artisans</span>
                </div>
              </div>
            </div>

            {/* Legend List */}
            <div className="mt-5 space-y-2 pt-3 border-t border-neutral-100 text-xs">
              {batchComposition.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-neutral-700">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: item.color }} 
                    />
                    <span className="font-medium">{item.trade}</span>
                  </div>
                  <div className="font-bold text-neutral-900">
                    {item.records} records ({item.percent}%)
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Entry History */}
          <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-neutral-900 text-sm sm:text-base">
                Recent Entry History
              </h3>
              <button 
                onClick={() => onNotify('info', 'Showing full historical tablet import archives')}
                className="text-xs font-bold text-neutral-500 hover:text-neutral-800 cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentHistory.map((h, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-2xl bg-neutral-50/70 border border-neutral-200/70 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-neutral-900 font-mono text-[11px]">
                      {h.filename}
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">
                      {h.records} records • {h.timeAgo}
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${h.statusBadge}`}>
                    {h.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. BOTTOM ACTION BAR (MATCHING IMAGE 5) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
          <span>Cancel & Re-upload</span>
        </button>

        <button
          type="button"
          disabled={importing}
          onClick={handleExecuteImport}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
        >
          {importing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Importing 35 Beneficiaries...</span>
            </>
          ) : (
            <>
              <span>Import 35 Valid Beneficiaries Now</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
