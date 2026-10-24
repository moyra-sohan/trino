import React, { useState } from 'react';
import { X, Building2, Plus, Check } from 'lucide-react';

export default function RegisterOrgModal({
  isOpen,
  onClose,
  onSubmit,
  onNotify
}) {
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('Nadia');
  const [category, setCategory] = useState('NGO');
  const [sector, setSector] = useState('Livelihood Training');
  const [regId, setRegId] = useState('');
  const [connectedCommunities, setConnectedCommunities] = useState('5 villages');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      onNotify?.('error', 'Please enter an organization name.');
      return;
    }

    const initials = name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();

    const generatedRegId = regId.trim() || `WB-${category.toUpperCase().slice(0, 3)}-2024-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrg = {
      id: `ORG-${Date.now()}`,
      name: name.trim(),
      location: `${district}, WB`,
      district,
      category,
      categoryBadge: category,
      initials,
      avatarBg: category === 'NGO' ? 'bg-emerald-700 text-white' : category === 'Business' ? 'bg-amber-500 text-white' : 'bg-orange-500 text-white',
      regId: generatedRegId,
      sector,
      connectedCommunities,
      activeOpps: 0,
      verificationStatus: 'Verified',
      statusType: 'verified',
      joinedDate: 'Just now'
    };

    onSubmit?.(newOrg);
    onNotify?.('success', `Registered organization "${name}" successfully!`);
    onClose();
    setName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 max-w-lg w-full overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Register New Organization</h3>
              <p className="text-xs text-neutral-500">Add partner federation, business, or NGO entity</p>
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
            <label className="block font-bold text-neutral-700 mb-1">Organization Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Nadia Handloom Development Society"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Entity Type</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="NGO">NGO</option>
                <option value="Business">Business</option>
                <option value="SHG Fed">SHG Federation</option>
                <option value="Cooperative">Cooperative</option>
                <option value="Training Institute">Training Institute</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Nadia">Nadia</option>
                <option value="Hooghly">Hooghly</option>
                <option value="North 24 Parganas">North 24 Parganas</option>
                <option value="South 24 Parganas">South 24 Parganas</option>
                <option value="Murshidabad">Murshidabad</option>
                <option value="Malda">Malda</option>
                <option value="Birbhum">Birbhum</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Primary Sector</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>Livelihood Training</option>
                <option>Handicrafts & Textiles</option>
                <option>Food Processing</option>
                <option>Organic Farming</option>
                <option>Financial Inclusion</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">Registration ID (optional)</label>
              <input
                type="text"
                value={regId}
                onChange={(e) => setRegId(e.target.value)}
                placeholder="Auto-generated if blank"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-700 mb-1">Connected Communities Coverage</label>
            <input
              type="text"
              value={connectedCommunities}
              onChange={(e) => setConnectedCommunities(e.target.value)}
              placeholder="e.g. 10 clusters / 14 villages"
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
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
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Register Entity</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
