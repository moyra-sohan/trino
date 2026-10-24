// Data Entry Operator Master Data & State Defaults
// Matches Hanskhali Block, Nadia South District Operator Console

export const initialOperatorProfile = {
  name: 'Smt. Rekha Mondal',
  id: 'OP-8492',
  role: 'operator',
  displayRole: 'Field Data Entry Operator',
  assignedBlock: 'Hanskhali',
  assignedDistrict: 'Nadia',
  assignedCluster: 'Hanskhali Block, Nadia South',
  state: 'West Bengal',
  avatarInitials: 'RM',
  dailyTarget: 7,
  weeklyTarget: 50,
  approvalRate: 96.2,
  dailyAverage: 7.6
};

export const initialOperatorMetrics = {
  drafts: 14,
  submitted: 42,
  verified: 186,
  rejected: 5,
  totalEnrolled: 186,
  enrolledToday: 8,
  pendingProfileUpdates: 3,
  pendingAudit: 2,
  weeklyAchieved: 42,
  weeklyTarget: 50,
  weeklyPercent: 84
};

export const initialTodayEntries = [
  {
    id: 'NS-WB-7401',
    name: 'Aparna Ghosh',
    bengaliName: 'অপর্ণা ঘোষ',
    initials: 'AG',
    avatarBg: 'bg-amber-100 text-amber-800 border-amber-300',
    village: 'Hanskhali',
    block: 'Hanskhali',
    gramPanchayat: 'Mayurhat-I',
    skillCategory: 'Tailoring & Embroidery',
    skillPillColor: 'bg-orange-50 text-orange-700 border-orange-200',
    time: '09:40 AM',
    status: 'Verified',
    statusPillColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    actionText: 'View',
    actionType: 'view',
    phone: '+91 98321 00042',
    aadhaarRef: 'UID: **** 8109 (OK)',
    age: 34,
    registeredDate: 'Today, 09:40 AM'
  },
  {
    id: 'NS-WB-7402',
    name: 'Sunita Das',
    bengaliName: 'সুনীতা দাস',
    initials: 'SD',
    avatarBg: 'bg-amber-100 text-amber-800 border-amber-300',
    village: 'Govindapur',
    block: 'Chapra',
    gramPanchayat: 'Govindapur GP',
    skillCategory: 'Food Processing',
    skillPillColor: 'bg-amber-50 text-amber-700 border-amber-200',
    time: '10:15 AM',
    status: 'Submitted',
    statusPillColor: 'bg-amber-50 text-amber-700 border-amber-200',
    actionText: 'View',
    actionType: 'view',
    phone: '+91 97320 23456',
    aadhaarRef: 'UID: **** 5521 (OK)',
    age: 38,
    registeredDate: 'Today, 10:15 AM'
  },
  {
    id: 'NS-WB-7403',
    name: 'Ruma Paul',
    bengaliName: 'রুমা পাল',
    initials: 'RP',
    avatarBg: 'bg-neutral-100 text-neutral-800 border-neutral-300',
    village: 'Bagula',
    block: 'Hanskhali',
    gramPanchayat: 'Bagula-II',
    skillCategory: 'Weaving & Handloom',
    skillPillColor: 'bg-orange-50 text-orange-800 border-orange-200',
    time: '11:20 AM',
    status: 'Draft',
    statusPillColor: 'bg-neutral-100 text-neutral-700 border-neutral-300',
    actionText: 'Edit',
    actionType: 'edit',
    phone: '+91 98451 12345',
    aadhaarRef: 'UID: Saved locally',
    age: 29,
    registeredDate: 'Today, 11:20 AM'
  },
  {
    id: 'NS-WB-7404',
    name: 'Manju Halder',
    bengaliName: 'মঞ্জু হালদার',
    initials: 'MH',
    avatarBg: 'bg-rose-100 text-rose-800 border-rose-300',
    village: 'Hanskhali',
    block: 'Hanskhali',
    gramPanchayat: 'Mayurhat-I',
    skillCategory: 'Handicrafts & Jute',
    skillPillColor: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    time: '01:05 PM',
    status: 'Rejected',
    statusPillColor: 'bg-rose-50 text-rose-700 border-rose-200',
    actionText: 'Fix now',
    actionType: 'fix',
    issueType: 'REJECTED DOCUMENT',
    issueDetails: 'Bank passbook IFSC unreadable. Rescan page 1.',
    phone: '+91 94340 00077',
    aadhaarRef: 'UID: Bank IFSC error',
    age: 41,
    registeredDate: 'Today, 01:05 PM'
  },
  {
    id: 'NS-WB-7405',
    name: 'Basanti Biswas',
    bengaliName: 'বাসন্তী বিশ্বাস',
    initials: 'BB',
    avatarBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    village: 'Ramnagar',
    block: 'Hanskhali',
    gramPanchayat: 'Ramnagar GP',
    skillCategory: 'Agri-Allied Dairy',
    skillPillColor: 'bg-teal-50 text-teal-700 border-teal-200',
    time: '02:30 PM',
    status: 'Verified',
    statusPillColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    actionText: 'View',
    actionType: 'view',
    phone: '+91 96411 00033',
    aadhaarRef: 'UID: **** 3319 (OK)',
    age: 36,
    registeredDate: 'Today, 02:30 PM'
  }
];

export const initialRecentRegistrations = [
  {
    id: 'NS-WB-7401',
    name: 'Aparna Ghosh',
    bengaliName: 'অপর্ণা ঘোষ',
    age: 34,
    craft: 'Nakshi Kantha',
    location: 'Mayurhat-I • Hanskhali',
    timeAgo: '18 min ago',
    image: '/images/aparna_ghosh.jpg'
  },
  {
    id: 'NS-WB-7402',
    name: 'Basanti Halder',
    bengaliName: 'বাসন্তী হালদার',
    age: 41,
    craft: 'Terracotta Clay',
    location: 'Govindapur • Chapra',
    timeAgo: '35 min ago',
    image: '/images/women_meeting.jpg'
  },
  {
    id: 'NS-WB-7403',
    name: 'Swapna Biswas',
    bengaliName: 'স্বপ্না বিশ্বাস',
    age: 28,
    craft: 'Jamdani Weaving',
    location: 'Bagula • Hanskhali',
    timeAgo: '58 min ago',
    image: '/images/weaving.jpg'
  }
];

export const initialAttentionItems = [
  {
    id: 'ATTN-01',
    type: 'REJECTED DOCUMENT',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    name: 'Manju Halder',
    uid: 'NS-WB-7404',
    description: 'Bank passbook IFSC unreadable. Rescan page 1.',
    actionLabel: 'Open & Fix →',
    field: 'bankPassbook',
    solution: 'Re-upload clean scan of SBI / PNB passbook page 1 with legible IFSC code PUNB0123400.'
  },
  {
    id: 'ATTN-02',
    type: 'VERIFICATION MISMATCH',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    name: 'Pratima Roy',
    uid: 'NS-WB-7389',
    description: 'Gram Panchayat mismatch with voter ID.',
    actionLabel: 'Open & Fix →',
    field: 'panchayatMismatch',
    solution: 'Reconciled Mayurhat-I GP with National Voter Portal (EPIC: WB/12/084/29381).'
  },
  {
    id: 'ATTN-03',
    type: 'COMMUNITY MANAGER REQUEST',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
    name: 'Community Manager Requests',
    uid: 'CM-REQ-2',
    description: '2 requests from Community Manager (Name spelling & Phone number update).',
    actionLabel: 'Review requests →',
    field: 'cmUpdate',
    solution: 'Approve phone number correction for Swapna Biswas and spelling on Aadhaar registry.'
  }
];

export const initialMasterRecords = [
  {
    id: 'NS-WB-7401',
    name: 'Aparna Ghosh',
    bengaliName: 'অপর্ণা ঘোষ',
    uid: 'NS-WB-7401',
    avatar: '/images/aparna_ghosh.jpg',
    craft: 'Nakshi Kantha',
    craftDetail: 'Hand embroidery (5 hrs/day)',
    panchayat: 'Mayurhat-I',
    habitation: 'Dakshinpara, Hanskhali',
    block: 'Hanskhali',
    phone: '+91 98321 00042',
    aadhaarRef: 'UID: **** 8109 (OK)',
    registered: 'Today, 10:42 AM',
    syncStatus: 'Verified',
    syncBadgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    age: 34,
    income: '₹ 7,500 / month',
    education: 'Secondary (10th Pass / Madhyamik)',
    maritalStatus: 'Married',
    category: ['BPL Household', 'Female-Headed']
  },
  {
    id: 'NS-WB-7402',
    name: 'Basanti Halder',
    bengaliName: 'বাসন্তী হালদার',
    uid: 'NS-WB-7402',
    avatar: '/images/women_meeting.jpg',
    craft: 'Terracotta Craft',
    craftDetail: 'Clay sculpture (6 hrs/day)',
    panchayat: 'Govindapur',
    habitation: 'Kumarpara, Chapra',
    block: 'Chapra',
    phone: '+91 97334 00018',
    aadhaarRef: 'UID: **** 4421 (OK)',
    registered: 'Today, 10:15 AM',
    syncStatus: 'Verified',
    syncBadgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    age: 41,
    income: '₹ 8,200 / month',
    education: 'Primary (5th Pass)',
    maritalStatus: 'Married',
    category: ['Marginalized Artisan']
  },
  {
    id: 'NS-WB-7403',
    name: 'Swapna Biswas',
    bengaliName: 'স্বপ্না বিশ্বাস',
    uid: 'NS-WB-7403',
    avatar: '/images/weaving.jpg',
    craft: 'Jamdani Weaving',
    craftDetail: 'Fine cotton weave (4 hrs/day)',
    panchayat: 'Bagula-II',
    habitation: 'Tanti Para, Hanskhali',
    block: 'Hanskhali',
    phone: '+91 81452 00063',
    aadhaarRef: 'UID: Bank link pending',
    registered: 'Today, 09:50 AM',
    syncStatus: 'Pending',
    syncBadgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    age: 28,
    income: '₹ 6,500 / month',
    education: 'Secondary (10th Pass)',
    maritalStatus: 'Married',
    category: ['BPL Household']
  },
  {
    id: 'NS-WB-7404',
    name: 'Monowara Khatun',
    bengaliName: 'মনোয়ারা খাতুন',
    uid: 'NS-WB-7404',
    avatar: '/images/login_bg_user.jpg',
    craft: 'Zari Needlework',
    craftDetail: 'Bridal borders (5 hrs/day)',
    panchayat: 'Hriddaypur',
    habitation: 'Mondal Para, Chapra',
    block: 'Chapra',
    phone: '+91 94745 00012',
    aadhaarRef: 'UID: **** 1277 (OK)',
    registered: 'Today, 09:30 AM',
    syncStatus: 'Verified',
    syncBadgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    age: 39,
    income: '₹ 9,000 / month',
    education: 'Higher Secondary (12th)',
    maritalStatus: 'Married',
    category: ['Marginalized Artisan']
  },
  {
    id: 'NS-WB-7390',
    name: 'Ruma Debnath',
    bengaliName: 'রুমা দেবনাথ',
    uid: 'NS-WB-7390',
    avatar: '/images/aparna_ghosh.jpg',
    craft: 'Shitalpati Mats',
    craftDetail: 'Cane & Bamboo reed (4 hrs/day)',
    panchayat: 'Bagula-I',
    habitation: 'Debnath Para, Hanskhali',
    block: 'Hanskhali',
    phone: '+91 96472 00033',
    aadhaarRef: 'UID: **** 9031 (OK)',
    registered: '23 Oct, 04:15 PM',
    syncStatus: 'Verified',
    syncBadgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    age: 35,
    income: '₹ 7,000 / month',
    education: 'Primary (8th Pass)',
    maritalStatus: 'Widowed',
    category: ['Female-Headed', 'BPL Household']
  },
  {
    id: 'NS-WB-7388',
    name: 'Champa Majumdar',
    bengaliName: 'চাঁপা মজুমদার',
    uid: 'NS-WB-7388',
    avatar: '/images/women_meeting.jpg',
    craft: 'Jute Braiding',
    craftDetail: 'Rope baskets & macrame (6 hrs/day)',
    panchayat: 'Mayurhat-II',
    habitation: 'Majumdarpara, Hanskhali',
    block: 'Hanskhali',
    phone: '+91 98318 00055',
    aadhaarRef: 'UID: **** 7024 (OK)',
    registered: '23 Oct, 02:40 PM',
    syncStatus: 'Verified',
    syncBadgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    age: 43,
    income: '₹ 8,400 / month',
    education: 'Secondary (10th Pass)',
    maritalStatus: 'Married',
    category: ['Marginalized Artisan']
  },
  {
    id: 'NS-WB-7389',
    name: 'Pratima Roy',
    bengaliName: 'প্রতিমা রায়',
    uid: 'NS-WB-7389',
    avatar: '/images/login_bg_user.jpg',
    craft: 'Kantha Stitching',
    craftDetail: 'Floral border quilts (5 hrs/day)',
    panchayat: 'Hanskhali',
    habitation: 'Ghoshpara, Hanskhali',
    block: 'Hanskhali',
    phone: '+91 97321 00099',
    aadhaarRef: 'UID: GP mismatch',
    registered: '23 Oct, 11:20 AM',
    syncStatus: 'Rejected',
    syncBadgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    age: 32,
    income: '₹ 6,800 / month',
    education: 'Higher Secondary',
    maritalStatus: 'Married',
    category: ['BPL Household']
  },
  {
    id: 'NS-WB-7391',
    name: 'Manju Halder',
    bengaliName: 'মঞ্জু হালদার',
    uid: 'NS-WB-7391',
    avatar: '/images/weaving.jpg',
    craft: 'Jute & Sikki Grass',
    craftDetail: 'Handicraft bags (4 hrs/day)',
    panchayat: 'Mayurhat-I',
    habitation: 'Palpara, Hanskhali',
    block: 'Hanskhali',
    phone: '+91 94340 00077',
    aadhaarRef: 'UID: IFSC unreadable',
    registered: '23 Oct, 10:05 AM',
    syncStatus: 'Rejected',
    syncBadgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    age: 41,
    income: '₹ 7,200 / month',
    education: 'Primary (8th Pass)',
    maritalStatus: 'Married',
    category: ['Marginalized Artisan']
  }
];

export const initialBatchValidatedRoster = [
  {
    row: '#01',
    fullName: 'Shanti Soren',
    phone: '9832101234',
    skillCategory: 'Tailoring & Embroidery',
    gpVillage: 'Hanskhali',
    aadhaarStatus: 'Formatted OK',
    statusBadge: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  },
  {
    row: '#02',
    fullName: 'Rupa Mondal',
    phone: '9845112345',
    skillCategory: 'Weaving & Handloom',
    gpVillage: 'Bagula',
    aadhaarStatus: 'Formatted OK',
    statusBadge: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  },
  {
    row: '#03',
    fullName: 'Bela Rani Das',
    phone: '9732023456',
    skillCategory: 'Food Processing',
    gpVillage: 'Govindapur',
    aadhaarStatus: 'Missing Voter ID (Optional)',
    statusBadge: 'text-amber-700 bg-amber-50 border-amber-200'
  },
  {
    row: '#04',
    fullName: 'Kalyani Ghosh',
    phone: '9641034567',
    skillCategory: 'Jute Handicrafts',
    gpVillage: 'Ramnagar',
    aadhaarStatus: 'Formatted OK',
    statusBadge: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  },
  {
    row: '#05',
    fullName: 'Saraswati Mal',
    phone: '9933145678',
    skillCategory: 'Kantha Embroidery',
    gpVillage: 'Hanskhali',
    aadhaarStatus: 'Mobile check passed',
    statusBadge: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  },
  {
    row: '#06',
    fullName: 'Anjali Baidya',
    phone: '9832155667',
    skillCategory: 'Tailoring & Embroidery',
    gpVillage: 'Mayurhat',
    aadhaarStatus: 'Formatted OK',
    statusBadge: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  },
  {
    row: '#07',
    fullName: 'Mita Sarkar',
    phone: '9732199881',
    skillCategory: 'Weaving & Handloom',
    gpVillage: 'Chapra',
    aadhaarStatus: 'Formatted OK',
    statusBadge: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  },
  {
    row: '#08',
    fullName: 'Purnima Karmakar',
    phone: '9434011223',
    skillCategory: 'Terracotta Pottery',
    gpVillage: 'Govindapur',
    aadhaarStatus: 'Formatted OK',
    statusBadge: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  }
];

export const initialBatchComposition = [
  { trade: 'Tailoring & Embroidery', records: 16, percent: 45, color: '#f97316' },
  { trade: 'Weaving & Handloom', records: 9, percent: 25, color: '#eab308' },
  { trade: 'Kantha & Jute Handicrafts', records: 10, percent: 30, color: '#10b981' }
];

export const initialRecentImportHistory = [
  {
    filename: 'camp_bagula_oct22.csv',
    records: 42,
    timeAgo: 'Imported 2 days ago',
    status: 'Verified',
    statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    filename: 'hanskhali_survey_oct19....',
    records: 50,
    timeAgo: 'Imported 5 days ago',
    status: 'Verified',
    statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    filename: 'ranaghat_cluster_oct14....',
    records: 28,
    timeAgo: 'Local cache',
    status: 'Pending',
    statusBadge: 'bg-amber-50 text-amber-700 border-amber-200'
  }
];

export const schemaMappings = [
  {
    sheetHeader: 'Full Name',
    schemaField: 'artisan_name',
    type: 'string',
    status: 'aligned'
  },
  {
    sheetHeader: 'Mobile No',
    schemaField: 'mobile_no',
    type: 'phone_10digit',
    status: 'aligned'
  },
  {
    sheetHeader: 'GP / Gram',
    schemaField: 'gp_village',
    type: 'jurisdiction',
    status: 'aligned'
  },
  {
    sheetHeader: 'Craft Trade',
    schemaField: 'primary_trade',
    type: 'craft_taxonomy',
    status: 'aligned'
  }
];
