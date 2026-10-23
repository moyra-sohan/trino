import React from 'react';
import { X, Users, MapPin, Award, CheckCircle2, Phone, Sparkles, Handshake } from 'lucide-react';

export default function ViewCommunityModal({
  isOpen,
  community,
  onClose,
  onRequestPartnership
}) {
  if (!isOpen || !community) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${
              community.statusType === 'open' 
                ? 'bg-emerald-500' 
                : community.statusType === 'discussion'
                ? 'bg-blue-500'
                : 'bg-neutral-400'
            }`} />
            <span className="text-xs font-bold text-neutral-600">{community.partnershipStatus}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${community.iconBg}`}>
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-neutral-900 leading-tight">
                {community.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{community.village} · {community.block} · {community.district}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
              <span className="text-[10px] text-neutral-400 block uppercase font-bold">Members</span>
              <span className="text-base font-black text-neutral-900">{community.members} women</span>
            </div>
            <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
              <span className="text-[10px] text-neutral-400 block uppercase font-bold">Monthly Output</span>
              <span className="text-xs font-bold text-neutral-900">{community.avgMonthlyOutput || '800 units'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
              <span className="text-[10px] text-neutral-400 block uppercase font-bold">Established</span>
              <span className="text-xs font-bold text-neutral-900">{community.established || '2021'}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/40 border border-orange-100 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-500">Key Products:</span>
              <span className="font-bold text-neutral-800">{community.products}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Training Need:</span>
              <span className="font-bold text-orange-700">{community.trainingNeed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Lead Coordinator:</span>
              <span className="font-bold text-neutral-800">{community.leadCoordinator}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Cluster Phone:</span>
              <span className="font-mono text-neutral-800">{community.phone}</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-neutral-700">Artisan Skill Matrix:</span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {community.skills.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-100 flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onRequestPartnership(community);
            }}
            className="px-5 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Handshake className="w-4 h-4" />
            <span>Request Partnership</span>
          </button>
        </div>
      </div>
    </div>
  );
}
