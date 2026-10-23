import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Clock, MapPin, Users, 
  Plus, CheckCircle2, ChevronRight, Video, Sparkles, Filter 
} from 'lucide-react';

export default function NgoTrainingEvents({
  events = [],
  onOpenScheduleModal,
  onNotify
}) {
  const [filterMode, setFilterMode] = useState('all');

  const filteredEvents = events.filter((ev) => {
    if (filterMode === 'all') return true;
    if (filterMode === 'in-person') return ev.mode === 'In-person';
    if (filterMode === 'hybrid') return ev.mode.toLowerCase().includes('online');
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Training & Community Events
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Conduct capacity building, digital literacy, and technical craft workshops with women collectives.
          </p>
        </div>

        <button
          onClick={onOpenScheduleModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Session</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-2">
        {[
          { id: 'all', label: 'All Sessions' },
          { id: 'in-person', label: 'In-Person Workshops' },
          { id: 'hybrid', label: 'Hybrid & Online' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterMode(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterMode === tab.id
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredEvents.map((ev) => (
          <div 
            key={ev.id}
            className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4">
                {/* Date Tile */}
                <div className="w-12 h-14 rounded-2xl bg-orange-50 border border-orange-200 flex flex-col items-center justify-center shrink-0">
                  <span className="text-base font-black text-orange-600 leading-none">{ev.day}</span>
                  <span className="text-[10px] font-bold text-orange-800 tracking-wider mt-1">{ev.month}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600">
                      {ev.mode}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 mt-1 leading-snug">
                    {ev.title}
                  </h3>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{ev.location} Cluster Hub</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{ev.time} (IST)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{ev.participants} artisans registered</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Trainer Confirmed</span>
              </span>
              <button
                onClick={() => onNotify('success', `Attendance sheet opened for ${ev.title}`)}
                className="text-xs font-bold text-[#ea580c] hover:text-[#c2410c] cursor-pointer"
              >
                Manage Roster →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
