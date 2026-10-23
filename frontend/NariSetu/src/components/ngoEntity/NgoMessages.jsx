import React, { useState } from 'react';
import { 
  Send, Search, Users, Phone, Video, 
  Paperclip, CheckCheck, MoreVertical, MapPin 
} from 'lucide-react';

export default function NgoMessages({ onNotify }) {
  const [activeThreadId, setActiveThreadId] = useState('t1');
  const [replyText, setReplyText] = useState('');

  const [threads, setThreads] = useState([
    {
      id: 't1',
      name: 'Mahila Kisan Samiti',
      lead: 'Sabita Roy (Secretary)',
      location: 'Ranaghat, Nadia',
      sector: 'Organic Farming',
      initials: 'MK',
      unread: 1,
      messages: [
        {
          id: 'm1',
          sender: 'them',
          text: 'Namaskar Rural Sphere team, we received your partnership interest for the seasonal organic pickle consignment. Our 32 women members are ready with 500 jars batch.',
          time: '11:45 AM'
        },
        {
          id: 'm2',
          sender: 'me',
          text: 'Wonderful Sabita ji! Could you confirm if all FSSAI batch test reports have been verified by the district food inspector?',
          time: '12:10 PM'
        },
        {
          id: 'm3',
          sender: 'them',
          text: 'Yes! The inspection certificate was signed yesterday by the Nadia Food Safety Officer. We have attached the copy in the portal.',
          time: '01:25 PM'
        }
      ]
    },
    {
      id: 't2',
      name: 'Sundarpur Stitching Collective',
      lead: 'Parul Mondal (Lead Artisan)',
      location: 'Kaliganj, Nadia',
      sector: 'Tailoring & Textiles',
      initials: 'SS',
      unread: 0,
      messages: [
        {
          id: 'm4',
          sender: 'them',
          text: 'We finished cutting the 800 school uniform shirts under the embroidery buyer contract.',
          time: 'Yesterday'
        },
        {
          id: 'm5',
          sender: 'me',
          text: 'Excellent work. Our field officer will visit Kaliganj on Thursday for sample quality check.',
          time: 'Yesterday'
        }
      ]
    },
    {
      id: 't3',
      name: 'Sabuj Food Collective',
      lead: 'Chitra Das',
      location: 'Bongaon, North 24 Parganas',
      sector: 'Food Processing',
      initials: 'SB',
      unread: 0,
      messages: [
        {
          id: 'm6',
          sender: 'them',
          text: 'Thank you for approving our grant application for the solar drying tunnel.',
          time: '3 days ago'
        }
      ]
    }
  ]);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text: replyText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThreadId
          ? { ...t, messages: [...t.messages, newMessage] }
          : t
      )
    );

    setReplyText('');
    onNotify('success', `Message delivered to ${activeThread.name}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Community Communication
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Direct messaging with women collective leaders, SHG secretaries, and field coordinators.
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-2xs overflow-hidden flex flex-col md:flex-row h-[620px]">
        
        {/* Left Conversation List */}
        <div className="w-full md:w-80 border-r border-neutral-100 flex flex-col bg-[#fcfaf7]/50 shrink-0">
          <div className="p-4 border-b border-neutral-100">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 text-xs bg-white outline-hidden focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100">
            {threads.map((t) => {
              const isSelected = t.id === activeThreadId;
              const lastMsg = t.messages[t.messages.length - 1];
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-orange-50/70 border-l-4 border-l-[#ea580c]' : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-800 font-bold flex items-center justify-center shrink-0 text-xs">
                    {t.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-neutral-900 truncate">{t.name}</h4>
                      <span className="text-[10px] text-neutral-400">{lastMsg?.time}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">{t.lead}</p>
                    <p className="text-[11px] text-neutral-400 truncate mt-1">{lastMsg?.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Message Stream */}
        <div className="flex-1 flex flex-col bg-white">
          
          {/* Thread Header */}
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-500 text-white font-black flex items-center justify-center text-xs">
                {activeThread.initials}
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{activeThread.name}</h3>
                <p className="text-[11px] text-neutral-500 flex items-center gap-1">
                  <span>{activeThread.lead}</span>
                  <span>·</span>
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  <span>{activeThread.location}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNotify('info', `Calling ${activeThread.lead}...`)}
                className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-600 transition-colors cursor-pointer"
                title="Voice Call"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-neutral-50/40">
            {activeThread.messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] sm:max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-[#ea580c] text-white rounded-tr-xs'
                      : 'bg-white border border-neutral-200 text-neutral-800 rounded-tl-xs shadow-2xs'
                  }`}>
                    <p>{m.text}</p>
                    <div className={`text-[10px] mt-1 text-right flex items-center justify-end gap-1 ${
                      isMe ? 'text-white/80' : 'text-neutral-400'
                    }`}>
                      <span>{m.time}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3.5 border-t border-neutral-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNotify('info', 'File attachment opened (PDF/Images allowed)')}
              className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${activeThread.name}...`}
              className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-orange-500 text-xs outline-hidden"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
