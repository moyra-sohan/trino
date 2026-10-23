// Centralized mock data and initial states for Business & NGO Entity (Rural Sphere Foundation)

export const initialNgoProfile = {
  id: 'ngo-rural-sphere',
  name: 'Rural Sphere Foundation',
  type: 'NGO (Non-Governmental Organization)',
  registrationNumber: 'WB/2018/0198421 - FCRA/80G Reg.',
  yearEstablished: '2018',
  status: 'Verified partner',
  isVerified: true,
  tier: 'Tier-1 Partner',
  submissionDate: '14 Mar 2025',
  verifiedDate: '22 Mar 2024',
  profileCompletion: 100,
  logo: null,
  initials: 'RS',
  workEmail: 'partnerships@ruralsphere.org.in',
  workPhone: '+91 33 2456 7890 (Office Desk)',
  website: 'ruralsphere.org',
  focusStates: ['West Bengal', 'Odisha'],
  focusDistricts: ['Nadia', 'Hooghly', 'North 24 Parganas'],
  focusSectors: ['Tailoring', 'Handicrafts', 'Organic farming', 'Food processing'],
  availableSectors: [
    'Tailoring',
    'Handicrafts',
    'Organic farming',
    'Food processing',
    'Digital skills',
    'Entrepreneurship',
    'Handloom & Textiles',
    'Poultry & Dairy'
  ],
  complianceDocs: [
    { name: 'FCRA Registration Certificate', code: 'FCRA-2022-WB-892', status: 'Approved' },
    { name: '80G Tax Exemption Certificate', code: '80G/CIT/KOL/2020', status: 'Approved' },
    { name: '12A Income Tax Exemption', code: '12A/2019/REG', status: 'Approved' },
    { name: 'Registered Trust Deed & Bylaws', code: 'DEED-BK-IV-412', status: 'Approved' }
  ]
};

export const ngoMetrics = {
  communitiesReached: {
    value: 38,
    change: '+6 this quarter',
    trend: 'up'
  },
  totalActivity: {
    value: 12,
    subtext: '3 awaiting response',
    highlight: true
  },
  ongoingActivity: {
    value: 9,
    subtext: '2 drafts pending',
    highlight: false
  },
  upcomingActivities: {
    value: 5,
    subtext: 'Next: 28 Oct',
    highlight: false
  }
};

export const recentActivities = [
  {
    id: 'act-1',
    initials: 'MK',
    avatarBg: 'bg-amber-100 text-amber-800',
    title: 'Partnership request from Mahila Kisan Samiti',
    sector: 'Organic farming',
    time: '2 hrs ago',
    type: 'request',
    unread: true
  },
  {
    id: 'act-2',
    initials: 'AR',
    avatarBg: 'bg-rose-100 text-rose-800',
    title: 'New application for Embroidery Buyer Programme',
    sector: 'Kaliganj block',
    time: 'Yesterday',
    type: 'application',
    unread: false
  },
  {
    id: 'act-3',
    initials: 'SB',
    avatarBg: 'bg-emerald-100 text-emerald-800',
    title: 'Message from Sabuj Food Collective',
    sector: 'Food processing',
    time: '2 days ago',
    type: 'message',
    unread: false
  },
  {
    id: 'act-4',
    initials: 'KD',
    avatarBg: 'bg-blue-100 text-blue-800',
    title: 'Compliance verification completed for Tehatta cluster',
    sector: 'Field audit',
    time: '3 days ago',
    type: 'system',
    unread: false
  }
];

export const upcomingEvents = [
  {
    id: 'ev-1',
    day: '28',
    month: 'OCT',
    title: 'Digital payments training',
    location: 'Krishnanagar',
    time: '10:30 AM',
    participants: 24,
    mode: 'In-person'
  },
  {
    id: 'ev-2',
    day: '02',
    month: 'NOV',
    title: 'Community meeting: tailoring cluster',
    location: 'Ranaghat',
    time: '2:00 PM',
    participants: 35,
    mode: 'Online and in-person'
  },
  {
    id: 'ev-3',
    day: '07',
    month: 'NOV',
    title: 'Food processing hygiene session',
    location: 'Bongaon',
    time: '11:00 AM',
    participants: 18,
    mode: 'In-person'
  },
  {
    id: 'ev-4',
    day: '14',
    month: 'NOV',
    title: 'Buyer-Seller meet: Winter Kantha Exhibition',
    location: 'Kolkata Hub',
    time: '03:30 PM',
    participants: 45,
    mode: 'In-person'
  }
];

export const allCommunities = [
  {
    id: 'comm-1',
    name: 'Sundarpur Stitching Collective',
    iconType: 'craft',
    iconBg: 'bg-orange-50 text-orange-600 border-orange-200',
    village: 'Sundarpur',
    block: 'Kaliganj',
    district: 'Nadia',
    category: 'Tailoring & Textiles',
    skills: ['Tailoring', 'Embroidery', 'Digital skills'],
    members: 46,
    products: 'Uniforms, table linen',
    trainingNeed: 'Bulk order management',
    partnershipStatus: 'Partnership open',
    statusType: 'open',
    leadCoordinator: 'Parul Mondal',
    phone: '+91 94321 88412',
    established: '2021',
    avgMonthlyOutput: '800 pieces',
    rating: 4.8
  },
  {
    id: 'comm-2',
    name: 'Ranaghat Organic Growers',
    iconType: 'organic',
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    village: 'Ranaghat I',
    block: 'Ranaghat',
    district: 'Nadia',
    category: 'Organic Farming',
    skills: ['Organic farming', 'Food processing'],
    members: 32,
    products: 'Pickles, dried vegetables',
    trainingNeed: 'FSSAI packaging & labelling',
    partnershipStatus: 'Partnership in discussion',
    statusType: 'discussion',
    leadCoordinator: 'Sabita Roy',
    phone: '+91 98302 44192',
    established: '2019',
    avgMonthlyOutput: '1.2 metric tons',
    rating: 4.7
  },
  {
    id: 'comm-3',
    name: 'Bongaon Handicraft Circle',
    iconType: 'handicraft',
    iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
    village: 'Bongaon',
    block: 'Bongaon',
    district: 'North 24 Parganas',
    category: 'Handicrafts',
    skills: ['Handicrafts', 'Jute weaving', 'Teaching'],
    members: 28,
    products: 'Jute bags, home décor',
    trainingNeed: 'Direct buyer linkage & e-commerce',
    partnershipStatus: 'No partnership yet',
    statusType: 'none',
    leadCoordinator: 'Chitra Das',
    phone: '+91 91234 56789',
    established: '2022',
    avgMonthlyOutput: '450 units',
    rating: 4.5
  },
  {
    id: 'comm-4',
    name: 'Krishnanagar Kantha Producers',
    iconType: 'kantha',
    iconBg: 'bg-rose-50 text-rose-600 border-rose-200',
    village: 'Deypara',
    block: 'Krishnanagar II',
    district: 'Nadia',
    category: 'Tailoring & Textiles',
    skills: ['Embroidery', 'Kantha stitch', 'Silk finishing'],
    members: 54,
    products: 'Kantha stoles, tussar quilts',
    trainingNeed: 'Natural vegetable dyeing methods',
    partnershipStatus: 'Partnership open',
    statusType: 'open',
    leadCoordinator: 'Malati Biswas',
    phone: '+91 97334 11209',
    established: '2018',
    avgMonthlyOutput: '320 quilts & stoles',
    rating: 4.9
  },
  {
    id: 'comm-5',
    name: 'Tehatta Digital Weavers SHG',
    iconType: 'digital',
    iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
    village: 'Betai',
    block: 'Tehatta I',
    district: 'Nadia',
    category: 'Handloom & Textiles',
    skills: ['Digital skills', 'Handloom', 'Inventory tracking'],
    members: 22,
    products: 'Cotton gamchas, handloom sarees',
    trainingNeed: 'Digital UPI billing & catalogs',
    partnershipStatus: 'Partnership in discussion',
    statusType: 'discussion',
    leadCoordinator: 'Aloka Bagchi',
    phone: '+91 93310 99882',
    established: '2023',
    avgMonthlyOutput: '600 sarees',
    rating: 4.6
  },
  {
    id: 'comm-6',
    name: 'Chakdaha Women Apparel Unit',
    iconType: 'sewing',
    iconBg: 'bg-orange-50 text-orange-600 border-orange-200',
    village: 'Silinda',
    block: 'Chakdaha',
    district: 'Nadia',
    category: 'Tailoring & Textiles',
    skills: ['Tailoring', 'Garment finishing'],
    members: 38,
    products: 'School uniforms, masks, aprons',
    trainingNeed: 'Industrial machine operation',
    partnershipStatus: 'No partnership yet',
    statusType: 'none',
    leadCoordinator: 'Rekha Haldar',
    phone: '+91 98001 22334',
    established: '2020',
    avgMonthlyOutput: '1,500 garments',
    rating: 4.4
  },
  {
    id: 'comm-7',
    name: 'Hanskhali Clay & Terracotta Guild',
    iconType: 'craft',
    iconBg: 'bg-stone-50 text-stone-600 border-stone-200',
    village: 'Hanskhali',
    block: 'Hanskhali',
    district: 'Nadia',
    category: 'Handicrafts',
    skills: ['Handicrafts', 'Ceramics', 'Product photography'],
    members: 19,
    products: 'Terracotta lamps, eco pottery',
    trainingNeed: 'Export-grade bubble packaging',
    partnershipStatus: 'Partnership open',
    statusType: 'open',
    leadCoordinator: 'Aparna Ghosh',
    phone: '+91 98765 43210',
    established: '2021',
    avgMonthlyOutput: '1,000 units',
    rating: 4.9
  },
  {
    id: 'comm-8',
    name: 'Hooghly Jute & Macrame Artists',
    iconType: 'handicraft',
    iconBg: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    village: 'Chinsurah',
    block: 'Polba Dadpur',
    district: 'Hooghly',
    category: 'Handicrafts',
    skills: ['Handicrafts', 'Jute weaving', 'Design styling'],
    members: 31,
    products: 'Macrame wall hangings, jute baskets',
    trainingNeed: 'Costing & price negotiation',
    partnershipStatus: 'Partnership in discussion',
    statusType: 'discussion',
    leadCoordinator: 'Tanushree Ghosh',
    phone: '+91 94332 88129',
    established: '2020',
    avgMonthlyOutput: '500 pieces',
    rating: 4.7
  }
];

export const allOpportunities = [
  {
    id: 'opp-1',
    title: 'Embroidery buyer programme',
    skills: ['Tailoring', 'Hand embroidery'],
    type: 'Market Linkage',
    typeColor: 'text-orange-600',
    location: 'Nadia',
    deadline: '20 Nov 2025',
    deadlineSub: '12 days remaining',
    deadlineUrgent: false,
    applications: 14,
    status: 'Published',
    budget: '₹4,50,000',
    description: 'Direct institutional buy-back contracts for hand-embroidered home textiles for pan-India retail export.'
  },
  {
    id: 'opp-2',
    title: 'Solar drying equipment grant',
    skills: ['Food processing', 'Solar drying'],
    type: 'Equipment Support',
    typeColor: 'text-amber-600',
    location: 'North 24 Parganas',
    deadline: '30 Nov 2025',
    deadlineSub: '22 days remaining',
    deadlineUrgent: false,
    applications: 6,
    status: 'Paused',
    budget: '₹2,80,000',
    description: 'Subsidized provision of 5 commercial tunnel solar dryers for women fruit and vegetable processing collectives.'
  },
  {
    id: 'opp-3',
    title: 'Digital bookkeeping course',
    skills: ['Digital skills', 'Basic numeracy'],
    type: 'Training',
    typeColor: 'text-blue-600',
    location: 'Nadia',
    deadline: '15 Nov 2025',
    deadlineSub: 'Closes in 4 days',
    deadlineUrgent: true,
    applications: 22,
    status: 'Published',
    budget: '₹1,20,000',
    description: '30-day intensive cohort on smartphone-based UPI, ledger accounting, and Vyapar app training.'
  },
  {
    id: 'opp-4',
    title: 'Organic produce supply contract',
    skills: ['Organic farming', 'Sorting & grading'],
    type: 'Employment',
    typeColor: 'text-emerald-600',
    location: 'Nadia, Hooghly',
    deadline: '05 Dec 2025',
    deadlineSub: '27 days remaining',
    deadlineUrgent: false,
    applications: 0,
    status: 'Draft',
    budget: '₹6,00,000',
    description: 'Year-round farm-to-table procurement agreement for pesticide-free seasonal greens and root crops.'
  },
  {
    id: 'opp-5',
    title: 'Kantha stoles bulk export order',
    skills: ['Kantha stitch', 'Silk finishing'],
    type: 'Market Linkage',
    typeColor: 'text-orange-600',
    location: 'Nadia',
    deadline: '18 Dec 2025',
    deadlineSub: '40 days remaining',
    deadlineUrgent: false,
    applications: 18,
    status: 'Published',
    budget: '₹8,50,000',
    description: 'Export batch order of 1,200 pure mulberry silk stoles with GI-certified Bengal Kantha embroidery motifs.'
  },
  {
    id: 'opp-6',
    title: 'Entrepreneurship mentorship cohort',
    skills: ['Micro-enterprise', 'Inventory management'],
    type: 'Mentorship',
    typeColor: 'text-purple-600',
    location: 'Bongaon',
    deadline: 'Expired · 15 Oct 2025',
    deadlineSub: 'Cohort graduated',
    deadlineUrgent: false,
    applications: 9,
    status: 'Closed',
    budget: '₹95,000',
    description: '1-on-1 business advisory pairing seasoned women business leaders with first-generation village artisans.'
  },
  {
    id: 'opp-7',
    title: 'Industrial sewing machine operation',
    skills: ['Industrial machine stitching', 'Quality control'],
    type: 'Training',
    typeColor: 'text-blue-600',
    location: 'North 24 Parganas',
    deadline: '25 Nov 2025',
    deadlineSub: '17 days remaining',
    deadlineUrgent: false,
    applications: 11,
    status: 'Published',
    budget: '₹1,75,000',
    description: 'Hands-on motorized Juki machine training to certify artisans for garment factory export quality norms.'
  },
  {
    id: 'opp-8',
    title: 'Mushroom cultivation & spawn hub',
    skills: ['Organic farming', 'Spawn lab'],
    type: 'Employment',
    typeColor: 'text-emerald-600',
    location: 'Nadia',
    deadline: '10 Dec 2025',
    deadlineSub: '32 days remaining',
    deadlineUrgent: false,
    applications: 5,
    status: 'Draft',
    budget: '₹3,20,000',
    description: 'Establishment of climate-controlled oyster mushroom growing units managed by SHG federations.'
  }
];

export const filterOptions = {
  districts: [
    { value: 'all', label: 'All Districts' },
    { value: 'Nadia', label: 'Nadia (West Bengal)' },
    { value: 'North 24 Parganas', label: 'North 24 Parganas' },
    { value: 'Hooghly', label: 'Hooghly' },
    { value: 'Kolkata', label: 'Kolkata Hub' }
  ],
  blocks: [
    { value: 'all', label: 'All Blocks' },
    { value: 'Kaliganj', label: 'Kaliganj' },
    { value: 'Ranaghat', label: 'Ranaghat I' },
    { value: 'Krishnanagar II', label: 'Krishnanagar II' },
    { value: 'Tehatta I', label: 'Tehatta I' },
    { value: 'Tehatta II', label: 'Tehatta II' },
    { value: 'Chakdaha', label: 'Chakdaha' },
    { value: 'Bongaon', label: 'Bongaon' },
    { value: 'Hanskhali', label: 'Hanskhali' }
  ],
  categories: [
    { value: 'all', label: 'All Product Categories' },
    { value: 'Tailoring & Textiles', label: 'Tailoring & Textiles' },
    { value: 'Organic Farming', label: 'Organic Farming' },
    { value: 'Handicrafts', label: 'Handicrafts' },
    { value: 'Handloom & Textiles', label: 'Handloom & Textiles' },
    { value: 'Solar Powered Dryers', label: 'Solar Powered Dryers' }
  ],
  partnershipStatuses: [
    { value: 'all', label: 'All Statuses' },
    { value: 'open', label: 'Partnership Open' },
    { value: 'discussion', label: 'In Discussion' },
    { value: 'none', label: 'No Partnership Yet' }
  ],
  skillsList: [
    'Tailoring',
    'Embroidery',
    'Handicrafts',
    'Organic farming',
    'Food processing',
    'Digital skills'
  ],
  opportunityTypes: [
    { value: 'all', label: 'All Types' },
    { value: 'Market Linkage', label: 'Market Linkage' },
    { value: 'Equipment Support', label: 'Equipment Support' },
    { value: 'Training', label: 'Training' },
    { value: 'Employment', label: 'Employment' },
    { value: 'Mentorship', label: 'Mentorship' }
  ]
};
