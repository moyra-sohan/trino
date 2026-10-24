import React, { useState } from 'react';
import { X, Send, Briefcase, Plus, Check } from 'lucide-react';

export default function CreateDispatchModal({
  isOpen,
  onClose,
  onSubmit,
  onNotify
}) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Bulk Buyer Order');
  const [region, setRegion] = useState('Nadia');
  const [skill, setSkill] = useState('Tailoring & Garments');
  const [budget, setBudget] = useState('₹4,500');
  const [unit, setUnit] = useState('artisan');
  const [slots, setSlots] = useState(25);
  const [deadline, setDeadline] = useState('30 Nov 2024');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      onNotify?.('error', 'Please enter an opportunity title.');
      return;
    }

    const code = `NARI-${Math.floor(700 + Math.random() * 200)}`;

    const newOpp = {
      id: code,
      code,
      title: title.trim(),
      type,
      deadline,
      publisher: {
        name: 'State Livelihoods Mission Dispatch',
        verified: true,
        gstin: 'Govt Administrative Order'
      },
      region,
      skill,
      budget: budget.trim(),
      unit,
      escrowStatus: 'Treasury Escrow Secured',
      escrowBadgeColor: 'text-emerald-700 bg-emerald-50',
      applicants: { current: 0, total: Number(slots) || 20, customText: `0 / ${slots} slots` },
      status: 'Published',
      statusType: 'published',
      reason: null
    };

    onSubmit?.(newOpp);
    onNotify?.('success', `Opportunity dispatch "${title}" created and published!`);
    onClose();
    setTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 max-w-lg w-full overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Create Admin Dispatch</h3>
              <p className="text-xs text-neutral-500">Publish government order or sponsored livelihood grant</p>
            </div>
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
            <label className="block font-bold text-neutral-700 mb-1">Dispatch Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. State Khadi Board Silk Weaving Procurement"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Dispatch Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Bulk Buyer Order</option>
                <option>Equipment Grant</option>
                <option>Skill Workshop</option>
                <option>Export Order</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">Target Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Nadia">Nadia</option>
                <option value="Hooghly">Hooghly</option>
                <option value="North 24 Parganas">North 24 Parganas</option>
                <option value="Murshidabad">Murshidabad</option>
                <option value="All West Bengal">All West Bengal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Target Domain / Craft</label>
              <select
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Tailoring & Garments</option>
                <option>Food Preservation</option>
                <option>Embroidery & Needlework</option>
                <option>Jute & Bamboo Craft</option>
                <option>Financial Literacy</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">Budget / Payout</label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. ₹5,000 / artisan"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Total Slots / Capacity</label>
              <input
                type="number"
                value={slots}
                onChange={(e) => setSlots(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">Application Deadline</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. 15 Nov 2024"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
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
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#064e3b] hover:bg-[#053b2d] text-white font-bold shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Dispatch</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
