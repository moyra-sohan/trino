import React, { useState } from 'react';
import { X, Users, Plus } from 'lucide-react';

export default function RegisterCollectiveModal({
  isOpen,
  onClose,
  onSubmit,
  onNotify
}) {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('Tailoring & Embroidery');
  const [purpose, setPurpose] = useState('');
  const [district, setDistrict] = useState('Nadia District');
  const [block, setBlock] = useState('Kaliganj Block');
  const [leaderName, setLeaderName] = useState('');
  const [equipment, setEquipment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      onNotify?.('error', 'Please enter a collective name.');
      return;
    }

    const initials = (leaderName || name)
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();

    const code = `SHG-WB-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCollective = {
      id: `COMM-${Date.now()}`,
      code,
      name: name.trim(),
      domain,
      domainBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      purpose: purpose.trim() || 'Women livelihood production cohort',
      location: block,
      district,
      leader: {
        name: leaderName.trim() || 'Coordinator',
        initials,
        avatarBg: 'bg-emerald-100 text-emerald-800',
        verified: true
      },
      equipment: equipment.trim() || 'Standard shared artisan tools',
      status: 'Available for Orders',
      statusDetails: 'Initial Cohort',
      statusType: 'available'
    };

    onSubmit?.(newCollective);
    onNotify?.('success', `Registered collective "${name}" successfully!`);
    onClose();
    setName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 max-w-lg w-full overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Register New Collective</h3>
              <p className="text-xs text-neutral-500">Add rural artisan cohort or self-help group cluster</p>
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
            <label className="block font-bold text-neutral-700 mb-1">Collective / SHG Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hanskhali Jute Weavers Guild"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Domain / Craft</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Tailoring & Embroidery</option>
                <option>Organic Food & Spices</option>
                <option>Jute & Bamboo Craft</option>
                <option>Kantha Stitch & Textiles</option>
                <option>Jamdani & Cotton Weaving</option>
                <option>Food Processing & Spices</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Nadia District">Nadia District</option>
                <option value="Hooghly District">Hooghly District</option>
                <option value="North 24 Parganas">North 24 Parganas</option>
                <option value="Murshidabad">Murshidabad</option>
                <option value="Malda District">Malda District</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Block / Village</label>
              <input
                type="text"
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                placeholder="e.g. Kaliganj Block"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">Lead Coordinator</label>
              <input
                type="text"
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
                placeholder="e.g. Rekha Mondal"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-700 mb-1">Primary Product / Purpose</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. School Uniform & Apparel Batches"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-700 mb-1">Key Equipment & Machine Capacity</label>
            <input
              type="text"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              placeholder="e.g. 15 Sewing Machines, 2 Steam Irons"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#064e3b] hover:bg-[#053b2d] text-white font-bold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Register Collective</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
