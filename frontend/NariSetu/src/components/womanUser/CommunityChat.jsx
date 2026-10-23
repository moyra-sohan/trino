import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Users, Info, Send, Paperclip, Mic, MicOff, 
  Check, CheckCircle2, Clock, ArrowRight, X, Sparkles, 
  Scissors, Layers, Utensils, ShoppingBag, Sprout, 
  MessageSquare, AlertCircle, RefreshCw, Volume2, ShieldCheck,
  Megaphone, PlusCircle, CheckCheck
} from 'lucide-react';
import { 
  defaultCommunities, 
  recommendedCommunities as initialRecommended 
} from './womanUserData';

export default function CommunityChat({
  onNavigateToProfile,
  onNotify,
  simulateEmptyStateInitial = false
}) {
  const [communities, setCommunities] = useState(() => {
    try {
      const saved = localStorage.getItem('narisetu_communities');
      return saved ? JSON.parse(saved) : defaultCommunities;
    } catch {
      return defaultCommunities;
    }
  });

  const [activeCommunityId, setActiveCommunityId] = useState('tailoring-embroidery');
  const [recommended, setRecommended] = useState(initialRecommended);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [isEmptyStateSimulated, setIsEmptyStateSimulated] = useState(simulateEmptyStateInitial);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recordingTimerRef = useRef(null);

  // Opportunity application modal
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState('25');
  const [orderApplied, setOrderApplied] = useState(false);

  // Auto-scroll chat feed
  const messagesEndRef = useRef(null);

  const activeCommunity = communities.find(c => c.id === activeCommunityId) || communities[0];

  useEffect(() => {
    if (!isEmptyStateSimulated) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeCommunity?.messages, isEmptyStateSimulated]);

  // Voice recording simulation
  const handleToggleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
      onNotify?.('info', 'Microphone active: Speaking voice note in Bengali/Hindi...');
    } else {
      // Stop and send voice note
      clearInterval(recordingTimerRef.current);
      setIsRecording(false);
      const voiceDuration = recordingSeconds > 0 ? `${recordingSeconds}s` : '5s';
      
      const newVoiceMsg = {
        id: `msg-v-${Date.now()}`,
        dateGroup: 'Today • 24 October 2024',
        senderType: 'user',
        senderName: 'You (Aparna)',
        senderAvatar: '/images/aparna_ghosh.jpg',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'voice',
        duration: voiceDuration,
        content: `Voice message (${voiceDuration}) • ভয়েস অডিও নোট`,
        status: 'Delivered ✓'
      };

      const updated = communities.map(c => {
        if (c.id === activeCommunityId) {
          return {
            ...c,
            messages: [...(c.messages || []), newVoiceMsg]
          };
        }
        return c;
      });

      setCommunities(updated);
      try {
        localStorage.setItem('narisetu_communities', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      onNotify?.('success', 'Voice message sent to community cluster!');
      setRecordingSeconds(0);
    }
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      dateGroup: 'Today • 24 October 2024',
      senderType: 'user',
      senderName: 'You (Aparna)',
      senderAvatar: '/images/aparna_ghosh.jpg',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      content: inputText.trim(),
      status: 'Delivered ✓'
    };

    const updated = communities.map(c => {
      if (c.id === activeCommunityId) {
        return {
          ...c,
          messages: [...(c.messages || []), newMsg],
          lastMessageSnippet: `You: ${inputText.trim().slice(0, 25)}...`
        };
      }
      return c;
    });

    setCommunities(updated);
    try {
      localStorage.setItem('narisetu_communities', JSON.stringify(updated));
    } catch (err) {
      console.warn(err);
    }
    setInputText('');
  };

  const handleRequestJoin = (recId) => {
    setRecommended(prev =>
      prev.map(item => {
        if (item.id === recId) {
          const newRequested = !item.requested;
          if (newRequested) {
            onNotify?.('success', `Join request sent to ${item.name} cluster head!`);
          }
          return { ...item, requested: newRequested };
        }
        return item;
      })
    );
  };

  const handleApplyOrderSubmit = (e) => {
    e.preventDefault();
    setOrderApplied(true);
    setTimeout(() => {
      setSelectedOpportunity(null);
      setOrderApplied(false);
      onNotify?.('success', `Application for ${orderQuantity} uniform sets submitted! Slot reserved at Hanskhali Center.`);
      
      // Auto reply from Operator in chat
      setTimeout(() => {
        const autoReply = {
          id: `msg-rep-${Date.now()}`,
          dateGroup: 'Today • 24 October 2024',
          senderType: 'operator',
          senderName: 'Rekha Mondal',
          senderInitials: 'RM',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text',
          content: `Aparna, your uniform allotment of ${orderQuantity} sets has been confirmed! Please collect cut patterns from Hanskhali cluster tomorrow between 10 AM - 1 PM.`
        };

        setCommunities(curr =>
          curr.map(c => {
            if (c.id === activeCommunityId) {
              return {
                ...c,
                messages: [...(c.messages || []), autoReply]
              };
            }
            return c;
          })
        );
      }, 1200);
    }, 600);
  };

  // Filtered lists
  const filteredJoined = communities.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecommended = recommended.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#ededeb] text-[#1c1917] font-sans pb-16">
      
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200/90 overflow-hidden flex flex-col lg:flex-row min-h-[780px]">
          
          {/* ========================================================= */}
          {/* LEFT SIDEBAR: COMMUNITIES DIRECTORY */}
          {/* ========================================================= */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0 border-r border-neutral-200/80 bg-white p-4 sm:p-5 flex flex-col justify-between">
            
            <div className="space-y-5">
              
              {/* Search communities input */}
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search communities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-[#faf9f8] border border-neutral-200/90 text-xs font-medium placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-orange-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* YOUR COMMUNITIES SECTION */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-neutral-400 mb-3 px-1">
                  <span>YOUR COMMUNITIES</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffedd5] text-[#9a3412] text-[10px] font-extrabold">
                    {communities.length} joined
                  </span>
                </div>

                <div className="space-y-2.5">
                  {filteredJoined.map((community) => {
                    const isActive = community.id === activeCommunityId;
                    return (
                      <div
                        key={community.id}
                        onClick={() => {
                          setActiveCommunityId(community.id);
                          setIsEmptyStateSimulated(false);
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isActive
                            ? 'bg-[#fff7ed] border-[#ea580c] shadow-xs'
                            : 'bg-white hover:bg-neutral-50 border-neutral-200/80'
                        }`}
                      >
                        {/* Icon & Info */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                              isActive
                                ? 'bg-[#ea580c] text-white'
                                : 'bg-[#fff7ed] text-[#ea580c] border border-orange-100'
                            }`}
                          >
                            {community.icon === 'scissors' ? (
                              <Scissors className="w-5 h-5" />
                            ) : (
                              <Layers className="w-5 h-5" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-neutral-900 truncate">
                                {community.name}
                              </span>
                              {isActive && (
                                <span className="w-2 h-2 rounded-full bg-[#ea580c] shrink-0" />
                              )}
                            </div>
                            <div className="text-[11px] text-neutral-400 font-medium">
                              {community.membersCount} members
                            </div>
                            <div className="text-[11px] text-neutral-500 truncate max-w-[170px] mt-0.5">
                              {community.lastMessageSnippet}
                            </div>
                          </div>
                        </div>

                        {/* Chat Pill Button */}
                        <button
                          type="button"
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                            isActive
                              ? 'bg-[#ea580c] text-white shadow-xs hover:bg-[#c2410c]'
                              : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          Chat
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* COMMUNITIES FOR YOU SECTION */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-neutral-400 mb-3 px-1">
                  <span>COMMUNITIES FOR YOU</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] border border-emerald-200 text-[#047857] text-[10px] font-bold">
                    Matches your profile
                  </span>
                </div>

                <div className="space-y-2.5">
                  {filteredRecommended.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs space-y-2 hover:border-neutral-300 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#fff7ed] border border-orange-100 text-[#ea580c] flex items-center justify-center shrink-0 mt-0.5">
                          {item.icon === 'jar' && <Utensils className="w-4 h-4" />}
                          {item.icon === 'bag' && <ShoppingBag className="w-4 h-4" />}
                          {item.icon === 'sprout' && <Sprout className="w-4 h-4 text-emerald-600" />}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-900 truncate">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-medium shrink-0">
                              {item.membersCount} members
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-500 leading-snug mt-0.5">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRequestJoin(item.id)}
                        className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          item.requested
                            ? 'bg-emerald-50 border border-emerald-300 text-emerald-700'
                            : 'bg-white border border-[#ea580c] text-[#ea580c] hover:bg-orange-50'
                        }`}
                      >
                        {item.requested ? 'Requested ✓' : 'Request to join'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Quick Jump to Profile */}
            <div className="pt-4 border-t border-neutral-100 mt-6">
              <button
                onClick={onNavigateToProfile}
                className="w-full py-2.5 px-3 rounded-xl bg-[#faf9f8] hover:bg-[#fff7ed] text-neutral-700 hover:text-[#ea580c] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-neutral-200/80"
              >
                <span>← View My Woman Profile</span>
              </button>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT MAIN CHAT PANE */}
          {/* ========================================================= */}
          <div className="flex-1 flex flex-col bg-[#fdfcfb] min-h-[700px]">
            
            {/* 1. CHAT CHANNEL HEADER */}
            <div className="p-4 sm:px-6 py-3.5 border-b border-neutral-200/80 bg-white flex items-center justify-between gap-4">
              
              {/* Channel identity */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ea580c] to-[#f97316] text-white flex items-center justify-center shrink-0 shadow-xs">
                  {activeCommunity.icon === 'scissors' ? (
                    <Scissors className="w-5 h-5" />
                  ) : (
                    <Layers className="w-5 h-5" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm sm:text-base font-black text-neutral-900 truncate">
                      {activeCommunity.name}
                    </h2>
                    
                    {/* Badge: Run by operator */}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#fef3c7] text-[#92400e] text-[10px] font-bold border border-[#fde68a]">
                      <span>⚡</span>
                      <span>Run by operator</span>
                    </span>

                    {/* Badge: Hanskhali Block */}
                    <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[10px] font-semibold border border-neutral-200">
                      {activeCommunity.block}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                    <span>{activeCommunity.activeArtisansCount} active village artisans</span>
                    <span>•</span>
                    <span>{activeCommunity.cluster}</span>
                  </div>
                </div>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  className="p-2 rounded-xl text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
                  title="Search messages"
                >
                  <Search className="w-4 h-4" />
                </button>

                <button
                  className="px-2.5 py-1.5 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  title="12 artisans online"
                >
                  <Users className="w-4 h-4 text-neutral-500" />
                  <span>{activeCommunity.membersCount}</span>
                </button>

                <button
                  className="p-2 rounded-xl text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
                  title="Community guidelines"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* 2. CHAT MESSAGES STREAM */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#faf9f8]">
              
              {/* If Empty State Simulated */}
              {isEmptyStateSimulated ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 max-w-md mx-auto my-auto space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-[#fff7ed] text-[#ea580c] flex items-center justify-center shadow-sm border border-orange-100">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-neutral-900">
                      Welcome to {activeCommunity.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      There are no recent messages in this cluster yet. Introduce yourself, ask questions about raw material distribution, or await government training alerts.
                    </p>
                  </div>

                  {/* Starter Prompts */}
                  <div className="w-full space-y-2 pt-2">
                    <button
                      onClick={() => {
                        setInputText('Namaste Didi, happy to join the Hanskhali cluster!');
                        setIsEmptyStateSimulated(false);
                      }}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200/90 text-xs font-semibold text-neutral-700 hover:border-orange-500 hover:text-[#ea580c] transition-colors"
                    >
                      👋 Say Namaste to your fellow artisans
                    </button>
                    <button
                      onClick={() => {
                        setInputText('Didi, when is the next Kantha stitch workshop scheduled?');
                        setIsEmptyStateSimulated(false);
                      }}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200/90 text-xs font-semibold text-neutral-700 hover:border-orange-500 hover:text-[#ea580c] transition-colors"
                    >
                      🧵 Inquire about the next Kantha stitching workshop
                    </button>
                  </div>

                  <button
                    onClick={() => setIsEmptyStateSimulated(false)}
                    className="text-xs font-bold text-[#ea580c] hover:underline pt-2 cursor-pointer"
                  >
                    ← Switch back to populated feed
                  </button>
                </div>
              ) : (
                <>
                  {/* Date separator: Yesterday */}
                  <div className="flex justify-center">
                    <span className="px-3.5 py-1 rounded-full bg-white text-[11px] font-bold text-neutral-400 border border-neutral-200/70 shadow-2xs">
                      Yesterday
                    </span>
                  </div>

                  {/* Operator Message: Training Workshop Notice */}
                  {activeCommunity.messages?.filter(m => m.dateGroup === 'Yesterday').map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3">
                      {/* Operator Avatar */}
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {msg.senderInitials || 'RM'}
                      </div>

                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neutral-900">{msg.senderName}</span>
                          <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider">
                            Operator
                          </span>
                          <span className="text-[11px] text-neutral-400">{msg.time}</span>
                        </div>

                        {/* Notice Card */}
                        <div className="bg-white rounded-2xl rounded-tl-xs p-4 border border-neutral-200/80 shadow-xs space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                            <Megaphone className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>{msg.noticeTitle}</span>
                          </div>
                          <p className="text-xs text-neutral-700 leading-relaxed font-normal">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Date separator: Today • 24 October 2024 */}
                  <div className="flex justify-center my-4">
                    <span className="px-4 py-1 rounded-full bg-white text-[11px] font-bold text-neutral-400 border border-neutral-200/70 shadow-2xs">
                      Today • 24 October 2024
                    </span>
                  </div>

                  {/* Messages for Today */}
                  {activeCommunity.messages?.filter(m => m.dateGroup !== 'Yesterday').map((msg) => {
                    const isUser = msg.senderType === 'user';

                    if (isUser) {
                      return (
                        <div key={msg.id} className="flex flex-col items-end space-y-1">
                          <div className="flex items-center gap-2 text-xs text-neutral-400">
                            <span>{msg.time}</span>
                            <span className="font-bold text-neutral-800">{msg.senderName}</span>
                            <img
                              src={msg.senderAvatar || '/images/aparna_ghosh.jpg'}
                              alt="You"
                              className="w-5 h-5 rounded-full object-cover border border-orange-400"
                            />
                          </div>

                          <div className="bg-[#fff4ed] rounded-2xl rounded-tr-xs p-3.5 sm:p-4 border border-[#fed7aa] shadow-xs max-w-lg text-xs text-neutral-800 leading-relaxed text-left">
                            {msg.type === 'voice' ? (
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0">
                                  <Volume2 className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="font-bold text-[#ea580c]">ভয়েস মেসেজ (Voice Note)</div>
                                  <div className="text-[11px] text-neutral-500">Duration: {msg.duration}</div>
                                </div>
                              </div>
                            ) : (
                              msg.content
                            )}
                          </div>

                          <div className="flex items-center gap-1 text-[11px] text-[#ea580c] font-semibold pr-1">
                            <span>Delivered</span>
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                        </div>
                      );
                    }

                    // Operator Livelihood Opportunity Card
                    if (msg.type === 'opportunity') {
                      const opp = msg.opportunity;
                      return (
                        <div key={msg.id} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                            {msg.senderInitials || 'RM'}
                          </div>

                          <div className="space-y-1 max-w-2xl w-full">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-neutral-900">{msg.senderName}</span>
                              <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider">
                                Operator
                              </span>
                              <span className="text-[11px] text-neutral-400">{msg.time}</span>
                            </div>

                            {/* Opportunity Highlight Card */}
                            <div className="bg-white rounded-2xl rounded-tl-xs border-2 border-[#ea580c] overflow-hidden shadow-md">
                              
                              {/* Header Banner */}
                              <div className="bg-gradient-to-r from-[#ea580c] to-[#f97316] px-4 py-2 flex items-center justify-between text-white text-xs font-bold">
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-4 h-4 text-white" />
                                  <span>{opp.badge}</span>
                                </div>
                                <span className="font-mono text-[11px] bg-black/20 px-2 py-0.5 rounded">
                                  ID: {opp.id}
                                </span>
                              </div>

                              {/* Card Body */}
                              <div className="p-4 sm:p-5 space-y-3.5">
                                <div>
                                  <h4 className="font-black text-sm text-neutral-900">
                                    {opp.title}
                                  </h4>
                                  <p className="text-xs text-neutral-600 leading-relaxed mt-1">
                                    {opp.description}
                                  </p>
                                </div>

                                {/* 3 Metrics Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                  <div className="p-2.5 rounded-xl bg-[#faf9f8] border border-neutral-200/80">
                                    <div className="text-[10px] text-neutral-400 font-medium">
                                      Estimated Payout
                                    </div>
                                    <div className="text-xs sm:text-sm font-black text-[#16a34a] font-mono mt-0.5">
                                      {opp.payout}
                                    </div>
                                  </div>

                                  <div className="p-2.5 rounded-xl bg-[#faf9f8] border border-neutral-200/80">
                                    <div className="text-[10px] text-neutral-400 font-medium">
                                      Application Cutoff
                                    </div>
                                    <div className="text-xs font-bold text-neutral-900 mt-0.5">
                                      {opp.cutoff}
                                    </div>
                                  </div>

                                  <div className="p-2.5 rounded-xl bg-[#faf9f8] border border-neutral-200/80">
                                    <div className="text-[10px] text-neutral-400 font-medium">
                                      Delivery Hub
                                    </div>
                                    <div className="text-xs font-bold text-neutral-900 mt-0.5 truncate">
                                      {opp.deliveryHub}
                                    </div>
                                  </div>
                                </div>

                                {/* Card Action Row */}
                                <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                                  <div className="flex items-center gap-1.5 text-xs text-[#c2410c] font-semibold">
                                    <Clock className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
                                    <span>{opp.remainingSlots}</span>
                                  </div>

                                  <button
                                    onClick={() => setSelectedOpportunity(opp)}
                                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                                  >
                                    <span>{opp.actionText}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                              </div>

                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Peer Member Messages (Sunita Das, Ruma Paul)
                    return (
                      <div key={msg.id} className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs ${
                            msg.senderColor || 'bg-teal-600'
                          }`}
                        >
                          {msg.senderInitials || 'M'}
                        </div>

                        <div className="space-y-1 max-w-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-900">{msg.senderName}</span>
                            <span className="text-[11px] text-neutral-400">{msg.time}</span>
                          </div>

                          <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 sm:p-4 border border-neutral-200/80 shadow-xs text-xs text-neutral-800 leading-relaxed">
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </>
              )}

            </div>

            {/* 3. CHAT INPUT BAR */}
            <div className="p-3 sm:p-4 bg-white border-t border-neutral-200/80">
              
              {/* Active voice recording banner if active */}
              {isRecording && (
                <div className="mb-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-xs text-rose-800 animate-pulse">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                    <span className="font-bold">রেকর্ডিং চলছে... (Recording Audio: {recordingSeconds}s)</span>
                  </div>
                  <button
                    onClick={handleToggleVoiceRecord}
                    className="px-3 py-1 rounded-lg bg-rose-600 text-white font-bold text-xs"
                  >
                    Finish & Send
                  </button>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                
                {/* Paperclip attachment button */}
                <button
                  type="button"
                  onClick={() => onNotify?.('info', 'Attach sample Kantha artwork photo or pattern stencil')}
                  className="p-2.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
                  title="Attach sample photo or measurement document"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                {/* Voice message button */}
                <button
                  type="button"
                  onClick={handleToggleVoiceRecord}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                    isRecording
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-[#fffbeb] border border-[#fde68a] text-[#92400e] hover:bg-[#fef3c7]'
                  }`}
                  title="Record voice message in Bengali / Hindi"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ভয়েস মেসেজ</span>
                  <span className="text-[10px] opacity-80">(Voice)</span>
                </button>

                {/* Text input */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message or press mic to speak..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#faf9f8] border border-neutral-200/90 text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-orange-500 transition-colors"
                />

                {/* Send button */}
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-10 h-10 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] disabled:opacity-50 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>

              </form>

            </div>

          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* LIVELIHOOD ORDER APPLICATION MODAL */}
      {/* ========================================================= */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-neutral-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#ea580c]">
                  ID: {selectedOpportunity.id}
                </span>
                <h3 className="text-base font-black text-neutral-900">
                  {selectedOpportunity.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-600 mb-4">
              {selectedOpportunity.description}
            </p>

            <form onSubmit={handleApplyOrderSubmit} className="space-y-4">
              <div className="p-3 rounded-2xl bg-[#fff7ed] border border-orange-200/70 text-xs text-[#9a3412] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#ea580c]" />
                  <span>Guaranteed Direct Benefit Transfer</span>
                </div>
                <div className="text-[11px] text-neutral-600">
                  Estimated Payout: <span className="font-bold text-emerald-700">{selectedOpportunity.payout}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  How many uniform sets can you take this week?
                </label>
                <select
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold focus:border-orange-500 focus:outline-none"
                >
                  <option value="15">15 Sets (Estimated: ₹1,800)</option>
                  <option value="25">25 Sets (Estimated: ₹3,000)</option>
                  <option value="35">35 Sets (Estimated: ₹4,200 - Full Allocation)</option>
                  <option value="50">50 Sets (With Assistant / SHG Sister)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Fabric Pickup Date from Hanskhali Center
                </label>
                <input
                  type="date"
                  defaultValue="2024-10-25"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-semibold focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedOpportunity(null)}
                  className="w-1/2 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={orderApplied}
                  className="w-1/2 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {orderApplied ? 'Reserving...' : 'Confirm Order Allocation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* FOOTER BAR (MATCHING SCREENSHOT) */}
      {/* ========================================================= */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-neutral-300/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          <span>NariSetu Portal • Supported under Rural Women Digital Inclusivity Mission</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-neutral-500 font-medium">
          <span className="hover:text-neutral-800 cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-neutral-800 cursor-pointer">Help & Sahayata Center</span>
          <span>•</span>
          <span className="font-semibold text-neutral-700">Toll-Free Helpline: 1800-XXX-XXXX</span>
        </div>
      </footer>

    </div>
  );
}
