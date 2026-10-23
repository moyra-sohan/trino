import React, { useState } from 'react';
import { X, Plus, Sparkles, Building2, Calendar, MapPin, IndianRupee } from 'lucide-react';
import { filterOptions } from './ngoData';

export default function CreateOpportunityModal({
  isOpen,
  onClose,
  onCreate,
  onNotify
}) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Market Linkage');
  const [location, setLocation] = useState('Nadia');
  const [deadline, setDeadline] = useState('');
  const [budget, setBudget] = useState('₹3,50,000');
  const [selectedSkills, setSelectedSkills] = useState(['Tailoring']);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Published');

  if (!isOpen) return null;

  const handleToggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline.trim()) {
      onNotify('error', 'Please enter opportunity title and submission deadline.');
      return;
    }

    const newOpp = {
      id: `opp-${Date.now()}`,
      title: title.trim(),
      skills: selectedSkills.length > 0 ? selectedSkills : ['General Craft'],
      type,
      location,
      deadline,
      deadlineSub: 'Newly published',
      deadlineUrgent: false,
      applications: 0,
      status,
      budget,
      description: description.trim() || 'Livelihood opportunity published by verified partner.'
    };

    onCreate(newOpp);
    onNotify('success', `Opportunity "${title}" created as ${status}!`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-xl font-black text-neutral-900 tracking-tight">
              Create New Livelihood Opportunity
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Publish contracts, training cohorts or grants for rural artisan groups
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-5 space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
              Opportunity Title <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Handloom Silk Stoles Export Procurement"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs text-neutral-900 outline-hidden"
            />
          </div>

          {/* Type & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Opportunity Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs font-semibold text-neutral-800 bg-white outline-hidden cursor-pointer"
              >
                <option value="Market Linkage">Market Linkage</option>
                <option value="Equipment Support">Equipment Support</option>
                <option value="Training">Training</option>
                <option value="Employment">Employment</option>
                <option value="Mentorship">Mentorship</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Eligible District Cluster
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs font-semibold text-neutral-800 bg-white outline-hidden cursor-pointer"
              >
                <option value="Nadia">Nadia (West Bengal)</option>
                <option value="North 24 Parganas">North 24 Parganas</option>
                <option value="Hooghly">Hooghly</option>
                <option value="Nadia, Hooghly">Nadia & Hooghly Multi-cluster</option>
                <option value="Bongaon">Bongaon Border Region</option>
              </select>
            </div>
          </div>

          {/* Deadline & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Application Deadline <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. 25 Dec 2025"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs text-neutral-900 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Budget / Estimated Value
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. ₹5,00,000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs text-neutral-900 outline-hidden"
              />
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
              Relevant Skills / Craft Specialties
            </label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.skillsList.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleToggleSkill(skill)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-600 text-white shadow-2xs'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
              Scope of Work / Opportunity Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the specifications, volume, materials supplied, quality criteria and disbursement terms..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-orange-500 text-xs text-neutral-900 outline-hidden resize-none"
            />
          </div>

          {/* Publishing Status */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
              Publishing State
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700">
                <input
                  type="radio"
                  name="status"
                  value="Published"
                  checked={status === 'Published'}
                  onChange={() => setStatus('Published')}
                  className="accent-orange-600"
                />
                <span>Publish Immediately (Live to all clusters)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700">
                <input
                  type="radio"
                  name="status"
                  value="Draft"
                  checked={status === 'Draft'}
                  onChange={() => setStatus('Draft')}
                  className="accent-orange-600"
                />
                <span>Save as Draft</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-semibold cursor-pointer hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              Create Opportunity
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
