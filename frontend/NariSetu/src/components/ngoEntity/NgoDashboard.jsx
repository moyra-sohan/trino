import React from 'react';
import { 
  Users, CheckCircle2, Briefcase, Calendar, Search, Plus, 
  ArrowRight, ExternalLink, Sparkles, AlertCircle, Clock, 
  MapPin, ChevronRight, Check, ShieldCheck 
} from 'lucide-react';

export default function NgoDashboard({
  ngoProfile,
  metrics,
  activities,
  events,
  communities,
  opportunities,
  onNavigateTab,
  onOpenCreateOpportunity,
  onOpenScheduleTraining,
  onViewCommunity,
  onRequestPartnership,
  onNotify
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* ========================================================= */}
      {/* 1. PAGE HEADER */}
      {/* ========================================================= */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Business & NGO Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Connect rural women's skills with meaningful livelihood opportunities.
        </p>
      </div>

      {/* ========================================================= */}
      {/* 2. STAT METRICS CARDS (4 CARDS) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Communities Reached */}
        <div 
          onClick={() => onNavigateTab('communities')}
          className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Communities Reached</span>
            <div className="w-8 h-8 rounded-full bg-orange-100/70 text-orange-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-neutral-900 mt-3 tracking-tight group-hover:text-orange-600 transition-colors">
            {metrics.communitiesReached.value}
          </div>
          <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <span>{metrics.communitiesReached.change}</span>
          </div>
        </div>

        {/* Card 2: Total Activity */}
        <div 
          onClick={() => onNavigateTab('opportunities')}
          className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Total Activity</span>
            <div className="w-8 h-8 rounded-full bg-amber-100/70 text-amber-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-neutral-900 mt-3 tracking-tight group-hover:text-amber-600 transition-colors">
            {metrics.totalActivity.value}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            {metrics.totalActivity.subtext}
          </div>
        </div>

        {/* Card 3: Ongoing Activity */}
        <div 
          onClick={() => onNavigateTab('opportunities')}
          className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Ongoing Activity</span>
            <div className="w-8 h-8 rounded-full bg-orange-100/70 text-orange-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-neutral-900 mt-3 tracking-tight group-hover:text-orange-600 transition-colors">
            {metrics.ongoingActivity.value}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            {metrics.ongoingActivity.subtext}
          </div>
        </div>

        {/* Card 4: Upcoming Activities */}
        <div 
          onClick={() => onNavigateTab('training')}
          className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Upcoming Activities</span>
            <div className="w-8 h-8 rounded-full bg-rose-100/70 text-rose-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-neutral-900 mt-3 tracking-tight group-hover:text-rose-600 transition-colors">
            {metrics.upcomingActivities.value}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            {metrics.upcomingActivities.subtext}
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. MIDDLE SECTION: QUICK ACTIONS | RECENT ACTIVITY | UPCOMING EVENTS */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Col 1: Quick Actions */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900">
              Quick Actions
            </h2>
            
            <div className="mt-4 flex flex-col gap-2.5">
              <button
                onClick={() => onNavigateTab('communities')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-neutral-500" />
                <span>Discover Communities</span>
              </button>

              <button
                onClick={onOpenCreateOpportunity}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Create Opportunity</span>
              </button>

              <button
                onClick={onOpenScheduleTraining}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                <span>Schedule Training</span>
              </button>
            </div>
          </div>

          <p className="text-[11px] text-neutral-400 mt-6 leading-relaxed">
            Start from a shortlist of communities or publish a new livelihood opportunity.
          </p>
        </div>

        {/* Col 2: Recent Activity */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-neutral-900">
                Recent Activity
              </h2>
              <button
                onClick={() => onNavigateTab('messages')}
                className="text-xs font-semibold text-neutral-500 hover:text-orange-600 transition-colors cursor-pointer"
              >
                View all
              </button>
            </div>

            <div className="space-y-3.5">
              {activities.slice(0, 3).map((act) => (
                <div key={act.id} className="flex items-start gap-3 group">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${act.avatarBg}`}>
                    {act.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-neutral-900 leading-snug line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {act.title}
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {act.sector} · {act.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: Upcoming Events */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-neutral-900">
                Upcoming Events
              </h2>
              <button
                onClick={() => onNavigateTab('training')}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer"
              >
                Calendar
              </button>
            </div>

            <div className="space-y-3.5">
              {events.slice(0, 3).map((ev) => (
                <div key={ev.id} className="flex items-start gap-3">
                  <div className="w-9 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-black text-neutral-800 leading-none">{ev.day}</span>
                    <span className="text-[8px] font-bold text-neutral-500 tracking-wider mt-0.5">{ev.month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-neutral-900 leading-snug line-clamp-1">
                      {ev.title}
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-0.5 truncate">
                      {ev.location} · {ev.time} · {ev.participants} participants
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. DISCOVER COMMUNITIES (PREVIEW SECTION MATCHING IMAGE 1) */}
      {/* ========================================================= */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-neutral-900">
            Discover Communities
          </h2>
          <button
            onClick={() => onNavigateTab('communities')}
            className="text-xs font-bold text-[#ea580c] hover:text-[#c2410c] transition-colors cursor-pointer"
          >
            Browse all 38 communities
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {communities.slice(0, 3).map((comm) => (
            <div 
              key={comm.id} 
              className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                {/* Header Icon + Name */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${comm.iconBg}`}>
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-neutral-900 leading-tight group-hover:text-orange-600 transition-colors">
                      {comm.name}
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
                      {comm.village} · {comm.block} · {comm.district}
                    </p>
                  </div>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {comm.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Key Metrics */}
                <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-100 pt-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Members</span>
                    <span className="font-semibold text-neutral-800">{comm.members} women</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Products</span>
                    <span className="font-semibold text-neutral-800 truncate max-w-[170px]">{comm.products}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Training need</span>
                    <span className="font-semibold text-neutral-800 truncate max-w-[170px]">{comm.trainingNeed}</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-4 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    comm.statusType === 'open' 
                      ? 'bg-emerald-500' 
                      : comm.statusType === 'discussion'
                      ? 'bg-blue-500'
                      : 'bg-neutral-400'
                  }`} />
                  <span className="text-xs font-medium text-neutral-600">
                    {comm.partnershipStatus}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 grid grid-cols-2 gap-2 pt-3 border-t border-neutral-100">
                <button
                  onClick={() => onViewCommunity(comm)}
                  className="px-3 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  View Community
                </button>
                <button
                  onClick={() => onRequestPartnership(comm)}
                  className="px-3 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Request Partnership
                </button>
              </div>

            </div>
          ))}
        </div>

        <p className="text-[11px] text-neutral-400 text-center mt-4">
          Aggregated community information only. Individual members' contact details and records are not shown.
        </p>
      </div>

      {/* ========================================================= */}
      {/* 5. RECENT OPPORTUNITIES TABLE */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-neutral-100">
          <h2 className="text-base font-bold text-neutral-900">
            Recent Opportunities
          </h2>
          <button
            onClick={() => onNavigateTab('opportunities')}
            className="text-xs font-bold text-[#ea580c] hover:text-[#c2410c] transition-colors cursor-pointer"
          >
            Manage all opportunities
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fcfaf7] text-neutral-400 text-[10px] font-bold uppercase tracking-wider border-b border-neutral-200/60">
              <tr>
                <th className="py-3 px-5">Opportunity</th>
                <th className="py-3 px-5">Type</th>
                <th className="py-3 px-5">Target District</th>
                <th className="py-3 px-5 text-center">Applications</th>
                <th className="py-3 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {opportunities.slice(0, 5).map((opp) => (
                <tr key={opp.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-neutral-900">{opp.title}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">
                      {opp.skills.join(', ')}
                    </div>
                  </td>
                  <td className="py-3.5 px-5 font-medium text-neutral-600">
                    {opp.type}
                  </td>
                  <td className="py-3.5 px-5 text-neutral-600 font-medium">
                    {opp.location}
                  </td>
                  <td className="py-3.5 px-5 text-center font-bold text-neutral-800">
                    {opp.applications}
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                      opp.status === 'Published'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : opp.status === 'Paused'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : opp.status === 'Draft'
                        ? 'bg-slate-50 text-slate-700 border-slate-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        opp.status === 'Published'
                          ? 'bg-emerald-500'
                          : opp.status === 'Paused'
                          ? 'bg-amber-500'
                          : opp.status === 'Draft'
                          ? 'bg-slate-400'
                          : 'bg-rose-500'
                      }`} />
                      <span>{opp.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
