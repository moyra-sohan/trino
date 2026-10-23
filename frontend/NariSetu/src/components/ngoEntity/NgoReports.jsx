import React from 'react';
import { 
  BarChart3, Download, TrendingUp, Users, 
  IndianRupee, Award, ArrowUpRight, CheckCircle2 
} from 'lucide-react';

export default function NgoReports({ onNotify }) {
  const handleExport = (format) => {
    onNotify('success', `Exporting Rural Sphere Foundation Impact Report (${format})...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Impact & Livelihood Reports
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Real-time aggregated livelihood metrics, training hours, and socio-economic outcomes across clusters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('PDF')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => handleExport('CSV')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Women Supported</span>
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-neutral-900 mt-3">1,480+</div>
          <div className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% from last quarter</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Wages Disbursed</span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-neutral-900 mt-3">₹48.2 Lakh</div>
          <div className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>100% direct bank transfer</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Training Delivered</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-neutral-900 mt-3">340 Hours</div>
          <div className="text-xs text-neutral-500 mt-1">
            Across 9 specialized craft cohorts
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Verified SHG Federations</span>
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-neutral-900 mt-3">38 Groups</div>
          <div className="text-xs text-neutral-500 mt-1">
            Nadia, Hooghly & 24 Parganas
          </div>
        </div>
      </div>

      {/* Cluster breakdown table */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-neutral-100">
          <h2 className="text-base font-bold text-neutral-900">
            District Cluster Performance
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fcfaf7] text-neutral-400 text-[10px] font-bold uppercase tracking-wider border-b border-neutral-200/60">
              <tr>
                <th className="py-3 px-5">Cluster District</th>
                <th className="py-3 px-5">Active Collectives</th>
                <th className="py-3 px-5">Artisan Strength</th>
                <th className="py-3 px-5">Primary Output</th>
                <th className="py-3 px-5">Fulfillment Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr className="hover:bg-neutral-50/80">
                <td className="py-3.5 px-5 font-bold text-neutral-900">Nadia (Kaliganj, Ranaghat, Krishnanagar)</td>
                <td className="py-3.5 px-5 font-semibold text-neutral-700">24 Collectives</td>
                <td className="py-3.5 px-5 font-medium text-neutral-600">890 Artisans</td>
                <td className="py-3.5 px-5 text-neutral-600">Embroidery, Handloom, Kantha</td>
                <td className="py-3.5 px-5 font-bold text-emerald-600">96.4%</td>
              </tr>
              <tr className="hover:bg-neutral-50/80">
                <td className="py-3.5 px-5 font-bold text-neutral-900">North 24 Parganas (Bongaon)</td>
                <td className="py-3.5 px-5 font-semibold text-neutral-700">9 Collectives</td>
                <td className="py-3.5 px-5 font-medium text-neutral-600">380 Artisans</td>
                <td className="py-3.5 px-5 text-neutral-600">Jute Bags, Food Processing</td>
                <td className="py-3.5 px-5 font-bold text-emerald-600">92.8%</td>
              </tr>
              <tr className="hover:bg-neutral-50/80">
                <td className="py-3.5 px-5 font-bold text-neutral-900">Hooghly (Polba Dadpur)</td>
                <td className="py-3.5 px-5 font-semibold text-neutral-700">5 Collectives</td>
                <td className="py-3.5 px-5 font-medium text-neutral-600">210 Artisans</td>
                <td className="py-3.5 px-5 text-neutral-600">Macrame, Eco Pottery</td>
                <td className="py-3.5 px-5 font-bold text-emerald-600">94.1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
