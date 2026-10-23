import React, { useState } from 'react';
import { X, Handshake, Users, MapPin, CheckCircle2 } from 'lucide-react';

export default function RequestPartnershipModal({
  isOpen,
  community,
  onClose,
  onSubmitRequest,
  onNotify
}) {
  const [partnershipType, setPartnershipType] = useState('Bulk Order & Procurement');
  const [estimatedBudget, setEstimatedBudget] = useState('₹1,50,000');
  const [timeline, setTimeline] = useState('3 Months');
  const [notes, setNotes] = useState('');

  if (!isOpen || !community) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitRequest({
      communityId: community.id,
      communityName: community.name,
      partnershipType,
      estimatedBudget,
      timeline,
      notes
    });
    onNotify('success', `Partnership proposal dispatched to ${community.name}!`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Handshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Request Partnership
              </h3>
              <p className="text-xs text-neutral-500">
                Send official collaboration request to collective
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Collective Brief */}
        <div className="my-4 p-3.5 rounded-2xl bg-orange-50/50 border border-orange-100 text-xs">
          <div className="font-bold text-neutral-900">{community.name}</div>
          <div className="text-neutral-500 mt-0.5 flex items-center gap-2">
            <span>{community.members} women artisans</span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <MapPin className="w-3 h-3 text-neutral-400" />
              <span>{community.village}, {community.district}</span>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
              Collaboration Model
            </label>
            <select
              value={partnershipType}
              onChange={(e) => setPartnershipType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs font-semibold text-neutral-800 bg-white outline-hidden cursor-pointer"
            >
              <option value="Bulk Order & Procurement">Bulk Order & Procurement</option>
              <option value="Capacity Building & Skills">Capacity Building & Skills</option>
              <option value="Solar / Machinery Equipment Grant">Solar / Machinery Equipment Grant</option>
              <option value="Market Linkage & E-Commerce Onboarding">Market Linkage & E-Commerce Onboarding</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Estimated Budget
              </label>
              <input
                type="text"
                value={estimatedBudget}
                onChange={(e) => setEstimatedBudget(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs text-neutral-900 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Expected Timeline
              </label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs text-neutral-900 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
              Message to Coordinator ({community.leadCoordinator || 'Group Lead'})
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Outline initial requirement, sample inspection date, or meeting schedule..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs text-neutral-900 outline-hidden resize-none"
            />
          </div>

          <div className="pt-3 border-t border-neutral-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
