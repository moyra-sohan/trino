// Comprehensive Admin Mock Data matching Screenshots 1-5

export const adminMetrics = {
  overview: {
    registeredOrganizations: { count: 214, change: '+11 this month', changeType: 'positive' },
    pendingVerifications: { count: 7, subtext: '2 older than 5 days', badgeType: 'warning' },
    communitiesOnPlatform: { count: '1,086', change: '+38 this month', changeType: 'positive' },
    openFlags: { count: 3, subtext: '1 high priority', badgeType: 'danger' }
  },
  verification: {
    totalPending: { count: 7, label: 'applications queued', badge: '2 overdue >5d' },
    needsDocument: { count: 3, label: 'awaiting upload', badge: 'Partner notified' },
    approvedThisMonth: { count: 34, label: 'onboarded', badge: '+18% vs last mo' },
    avgReviewTime: { count: '1.4', unit: 'Days' }
  },
  organizations: {
    totalOrganizations: { count: 214, change: '+11 this month' },
    activeNgos: { count: 96, percentage: '45% of total' },
    verifiedBusinesses: { count: 71, percentage: '33% of total' },
    shgFederationsAndInstitutes: { count: 47, percentage: '22% of total' }
  },
  communities: {
    totalCommunities: { count: '1,086' },
    activeUser: { count: '24,820' },
    activeOrderLoad: { count: '412', unit: 'Clusters' },
    geographicFootprint: { count: '18', unit: 'Districts' }
  },
  opportunities: {
    activeListings: { count: 84, change: '+12 this week' },
    underReview: { count: 6, badge: 'Priority queue' },
    totalPipelineValue: { count: '₹1.42 Cr', badge: 'Escrow backed', subtext: 'Procurement & grant commitments' },
    flaggedListings: { count: 1, badge: 'Unverified terms', subtext: 'Reported by Gram Panchayat liaison' }
  }
};

export const partnerActivityByType = [
  { type: 'NGOs', count: 96, max: 120, color: 'bg-emerald-800' },
  { type: 'Businesses', count: 71, max: 120, color: 'bg-emerald-700' },
  { type: 'SHG Federations', count: 31, max: 120, color: 'bg-amber-500' },
  { type: 'Training Institutes', count: 16, max: 120, color: 'bg-amber-600' }
];

export const initialVerificationQueue = [
  {
    id: 'VER-001',
    regNumber: '#WB-NAD-2023-089',
    name: 'Mahila Kisan Samiti Federation',
    location: 'Nadia, West Bengal',
    district: 'Nadia',
    city: 'Krishnanagar',
    type: 'SHG Federation',
    typeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    submittedDate: '21 Oct',
    submittedFreshness: '21 Oct (3d ago)',
    docsStatus: '3/4 1 pending',
    docsRatio: '3/4',
    docsWarning: '1 pending',
    assignedReviewer: 'A. Sen',
    assignedAvatar: 'AS',
    assignedColor: 'bg-teal-700 text-white',
    status: 'Awaiting Review',
    statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
    representative: {
      name: 'Smt. Gita Mondal',
      phone: '+91 98321 44521'
    },
    affiliatedWomen: {
      count: '420 Artisans / Farmers',
      clusters: '14 Local SHG Clusters'
    },
    documents: [
      {
        id: 'doc-1',
        title: 'Certificate of Registration',
        fileName: 'Society_Reg_WB_2019.pdf',
        size: '2.4 MB',
        status: 'Verified',
        verified: true
      },
      {
        id: 'doc-2',
        title: 'PAN Card & Tax Status',
        fileName: 'MKSF_PAN_Card_2022.pdf',
        size: '1.1 MB',
        status: 'Verified',
        verified: true
      },
      {
        id: 'doc-3',
        title: 'Bank Passbook / Cheque',
        fileName: 'SBI_Krishnanagar_Cheque.pdf',
        size: '840 KB',
        status: 'Verified',
        verified: true
      },
      {
        id: 'doc-4',
        title: 'Executive Committee Resolution',
        fileName: 'Resolution_Signatures_2023.pdf',
        size: '3.2 MB',
        status: 'Pending Review',
        verified: false
      }
    ],
    statutoryChecklist: [
      { id: 'sc-1', label: 'Legal identity and signatory Aadhaar e-KYC confirmed', checked: true },
      { id: 'sc-2', label: 'District registration cross-checked with West Bengal State portal', checked: true },
      { id: 'sc-3', label: 'Bank branch verified active with direct DBT linkage', checked: true },
      { id: 'sc-4', label: 'Signed board meeting resolution quorum authenticated', checked: false }
    ],
    auditorNotes: 'Submitted copy of meeting resolution needs high-res signature page verification. Signatory Gita Mondal verified via Aadhaar OTP on 21 Oct.'
  },
  {
    id: 'VER-002',
    regNumber: '#WB-HGY-2023-114',
    name: 'Sabuj Food Collective',
    location: 'Hooghly, West Bengal',
    district: 'Hooghly',
    city: 'Chinsurah',
    type: 'Business',
    typeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    submittedDate: '19 Oct',
    submittedFreshness: '19 Oct (5d ago)',
    docsStatus: '4/4 Complete',
    docsRatio: '4/4',
    docsWarning: null,
    assignedReviewer: 'P. Mukherjee',
    assignedAvatar: 'PM',
    assignedColor: 'bg-emerald-700 text-white',
    status: 'Ready to Sign',
    statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    representative: {
      name: 'Tanmay Das',
      phone: '+91 94332 88201'
    },
    affiliatedWomen: {
      count: '180 Women Producers',
      clusters: '6 Village Hubs'
    },
    documents: [
      { id: 'doc-21', title: 'FSSAI Manufacturing License', fileName: 'FSSAI_Lic_2024.pdf', size: '1.8 MB', status: 'Verified', verified: true },
      { id: 'doc-22', title: 'GST Registration Certificate', fileName: 'GST_Sabuj_Food.pdf', size: '1.2 MB', status: 'Verified', verified: true },
      { id: 'doc-23', title: 'Current Account Bank Statement', fileName: 'HDFC_Current_Stmt.pdf', size: '3.1 MB', status: 'Verified', verified: true },
      { id: 'doc-24', title: 'Board of Directors Incorporation', fileName: 'MoA_Sabuj_Foods.pdf', size: '4.5 MB', status: 'Verified', verified: true }
    ],
    statutoryChecklist: [
      { id: 'sc-21', label: 'Legal identity and signatory Aadhaar e-KYC confirmed', checked: true },
      { id: 'sc-22', label: 'District registration cross-checked with West Bengal State portal', checked: true },
      { id: 'sc-23', label: 'Bank branch verified active with direct DBT linkage', checked: true },
      { id: 'sc-24', label: 'Signed board meeting resolution quorum authenticated', checked: true }
    ],
    auditorNotes: 'All 4 corporate records authenticated against MCA portal and GSTIN 19AABCU9603R1ZM.'
  },
  {
    id: 'VER-003',
    regNumber: '#WB-24N-2023-042',
    name: 'Ganges Skill Institute',
    location: 'North 24 Parganas, West Bengal',
    district: 'North 24 Parganas',
    city: 'Barasat',
    type: 'Training Institute',
    typeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    submittedDate: '22 Oct',
    submittedFreshness: '22 Oct (2d ago)',
    docsStatus: '3/4 Missing 12A/80G',
    docsRatio: '3/4',
    docsWarning: 'Missing 12A/80G',
    assignedReviewer: 'Unassigned',
    assignedAvatar: '--',
    assignedColor: 'bg-neutral-300 text-neutral-600',
    status: 'Missing Docs',
    statusColor: 'bg-rose-50 text-rose-800 border-rose-200',
    representative: {
      name: 'Subir Banerjee',
      phone: '+91 97321 00982'
    },
    affiliatedWomen: {
      count: '650 Trainees Enrolled',
      clusters: '8 Vocational Centers'
    },
    documents: [
      { id: 'doc-31', title: 'Skill Training Accreditation', fileName: 'NSDC_Affiliation_2023.pdf', size: '2.1 MB', status: 'Verified', verified: true },
      { id: 'doc-32', title: 'PAN & Society Reg', fileName: 'Trust_Reg_Barasat.pdf', size: '1.9 MB', status: 'Verified', verified: true },
      { id: 'doc-33', title: 'Bank Account Mandate', fileName: 'PNB_Bank_Passbook.pdf', size: '920 KB', status: 'Verified', verified: true },
      { id: 'doc-34', title: 'Income Tax 12A/80G Certificate', fileName: 'Pending_Upload.pdf', size: '0 KB', status: 'Missing', verified: false }
    ],
    statutoryChecklist: [
      { id: 'sc-31', label: 'Legal identity and signatory Aadhaar e-KYC confirmed', checked: true },
      { id: 'sc-32', label: 'District registration cross-checked with West Bengal State portal', checked: true },
      { id: 'sc-33', label: 'Bank branch verified active with direct DBT linkage', checked: false },
      { id: 'sc-34', label: 'Signed board meeting resolution quorum authenticated', checked: false }
    ],
    auditorNotes: 'Sent official email notice requesting 12A tax exemption order on 23 Oct.'
  },
  {
    id: 'VER-004',
    regNumber: '#WB-MSD-2023-019',
    name: 'Sundarpur Weavers Trust',
    location: 'Murshidabad, West Bengal',
    district: 'Murshidabad',
    city: 'Berhampore',
    type: 'NGO / Trust',
    typeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    submittedDate: '17 Oct',
    submittedFreshness: '17 Oct (7d ago)',
    docsStatus: '4/4 In Audit',
    docsRatio: '4/4',
    docsWarning: null,
    assignedReviewer: 'A. Sen',
    assignedAvatar: 'AS',
    assignedColor: 'bg-teal-700 text-white',
    status: 'Under Audit',
    statusColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    representative: {
      name: 'Kabita Ghosh',
      phone: '+91 98310 12398'
    },
    affiliatedWomen: {
      count: '310 Silk Weavers',
      clusters: '11 Handloom Clusters'
    },
    documents: [
      { id: 'doc-41', title: 'Trust Deed 1998', fileName: 'Deed_Murshidabad.pdf', size: '5.2 MB', status: 'Verified', verified: true },
      { id: 'doc-42', title: 'NITI Aayog Darpan Certificate', fileName: 'Darpan_WB_2022.pdf', size: '1.4 MB', status: 'Verified', verified: true },
      { id: 'doc-43', title: 'Audited Financial Statements (3 Yrs)', fileName: 'Audit_2023_2025.pdf', size: '8.4 MB', status: 'Verified', verified: true },
      { id: 'doc-44', title: 'Bank Certificate with IFSC Match', fileName: 'SBI_Berhampore_Cert.pdf', size: '750 KB', status: 'Verified', verified: true }
    ],
    statutoryChecklist: [
      { id: 'sc-41', label: 'Legal identity and signatory Aadhaar e-KYC confirmed', checked: true },
      { id: 'sc-42', label: 'District registration cross-checked with West Bengal State portal', checked: true },
      { id: 'sc-43', label: 'Bank branch verified active with direct DBT linkage', checked: true },
      { id: 'sc-44', label: 'Signed board meeting resolution quorum authenticated', checked: true }
    ],
    auditorNotes: 'Audit in progress for FCRA registration validity check.'
  },
  {
    id: 'VER-005',
    regNumber: '#WB-24N-2023-088',
    name: 'Barasat Mahila Shilpa',
    location: 'North 24 Parganas, West Bengal',
    district: 'North 24 Parganas',
    city: 'Barasat',
    type: 'SHG Federation',
    typeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    submittedDate: '23 Oct',
    submittedFreshness: '23 Oct (1d ago)',
    docsStatus: '2/4 ID Proofs missing',
    docsRatio: '2/4',
    docsWarning: 'ID Proofs missing',
    assignedReviewer: 'Unassigned',
    assignedAvatar: '--',
    assignedColor: 'bg-neutral-300 text-neutral-600',
    status: 'Missing Docs',
    statusColor: 'bg-rose-50 text-rose-800 border-rose-200',
    representative: {
      name: 'Anjali Majumder',
      phone: '+91 98319 77120'
    },
    affiliatedWomen: {
      count: '240 Artisans',
      clusters: '7 SHG Batches'
    },
    documents: [
      { id: 'doc-51', title: 'SHG Cluster Registration', fileName: 'SHG_WB_Reg.pdf', size: '1.5 MB', status: 'Verified', verified: true },
      { id: 'doc-52', title: 'Bank Account Passbook', fileName: 'UBI_Barasat.pdf', size: '890 KB', status: 'Verified', verified: true },
      { id: 'doc-53', title: 'Office Bearers ID Proofs', fileName: 'Pending.pdf', size: '0 KB', status: 'Missing', verified: false },
      { id: 'doc-54', title: 'Gram Panchayat Recommendation Letter', fileName: 'Pending.pdf', size: '0 KB', status: 'Missing', verified: false }
    ],
    statutoryChecklist: [
      { id: 'sc-51', label: 'Legal identity and signatory Aadhaar e-KYC confirmed', checked: false },
      { id: 'sc-52', label: 'District registration cross-checked with West Bengal State portal', checked: true },
      { id: 'sc-53', label: 'Bank branch verified active with direct DBT linkage', checked: true },
      { id: 'sc-54', label: 'Signed board meeting resolution quorum authenticated', checked: false }
    ],
    auditorNotes: 'Automated SMS sent to coordinator Smt. Majumder requesting IDs.'
  },
  {
    id: 'VER-006',
    regNumber: '#WB-MLD-2023-057',
    name: 'Gramin Vikas Kendra',
    location: 'Malda, West Bengal',
    district: 'Malda',
    city: 'English Bazar',
    type: 'NGO / Trust',
    typeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    submittedDate: '22 Oct',
    submittedFreshness: '22 Oct (2d ago)',
    docsStatus: '4/4 Pending sign-off',
    docsRatio: '4/4',
    docsWarning: 'Pending sign-off',
    assignedReviewer: 'P. Mukherjee',
    assignedAvatar: 'PM',
    assignedColor: 'bg-emerald-700 text-white',
    status: 'Awaiting Review',
    statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
    representative: {
      name: 'Kalyan Sen',
      phone: '+91 94344 55190'
    },
    affiliatedWomen: {
      count: '510 Farmers & Food Processors',
      clusters: '18 Village Collectives'
    },
    documents: [
      { id: 'doc-61', title: 'Societies Registration Act XXI', fileName: 'Malda_Society_Reg.pdf', size: '3.1 MB', status: 'Verified', verified: true },
      { id: 'doc-62', title: 'PAN Card', fileName: 'GVK_PAN.pdf', size: '1.0 MB', status: 'Verified', verified: true },
      { id: 'doc-63', title: 'Bank Authorization Letter', fileName: 'BOI_EnglishBazar.pdf', size: '1.2 MB', status: 'Verified', verified: true },
      { id: 'doc-64', title: 'Governing Body Resolution', fileName: 'GB_Resolution_2023.pdf', size: '2.8 MB', status: 'Verified', verified: true }
    ],
    statutoryChecklist: [
      { id: 'sc-61', label: 'Legal identity and signatory Aadhaar e-KYC confirmed', checked: true },
      { id: 'sc-62', label: 'District registration cross-checked with West Bengal State portal', checked: true },
      { id: 'sc-63', label: 'Bank branch verified active with direct DBT linkage', checked: true },
      { id: 'sc-64', label: 'Signed board meeting resolution quorum authenticated', checked: true }
    ],
    auditorNotes: 'Final approval awaiting Director sign-off on 25 Oct.'
  },
  {
    id: 'VER-007',
    regNumber: '#WB-NAD-2023-144',
    name: 'Kalyani Livelihoods Hub',
    location: 'Nadia, West Bengal',
    district: 'Nadia',
    city: 'Kalyani',
    type: 'Business',
    typeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    submittedDate: '24 Oct',
    submittedFreshness: '24 Oct (Today)',
    docsStatus: '4/4 Initial pass',
    docsRatio: '4/4',
    docsWarning: null,
    assignedReviewer: 'Unassigned',
    assignedAvatar: '--',
    assignedColor: 'bg-neutral-300 text-neutral-600',
    status: 'In Review',
    statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    representative: {
      name: 'Debashis Roy',
      phone: '+91 98305 66112'
    },
    affiliatedWomen: {
      count: '150 Producers',
      clusters: '5 Clusters'
    },
    documents: [
      { id: 'doc-71', title: 'MSME Udyam Registration', fileName: 'UDYAM_WB_09_001.pdf', size: '1.6 MB', status: 'Verified', verified: true },
      { id: 'doc-72', title: 'GST Certificate', fileName: 'GST_Kalyani_Hub.pdf', size: '1.1 MB', status: 'Verified', verified: true },
      { id: 'doc-73', title: 'Bank Cancelled Cheque', fileName: 'Axis_Kalyani_Cheque.pdf', size: '950 KB', status: 'Verified', verified: true },
      { id: 'doc-74', title: 'Partnership Deed', fileName: 'Deed_Kalyani_2021.pdf', size: '3.4 MB', status: 'Verified', verified: true }
    ],
    statutoryChecklist: [
      { id: 'sc-71', label: 'Legal identity and signatory Aadhaar e-KYC confirmed', checked: true },
      { id: 'sc-72', label: 'District registration cross-checked with West Bengal State portal', checked: true },
      { id: 'sc-73', label: 'Bank branch verified active with direct DBT linkage', checked: true },
      { id: 'sc-74', label: 'Signed board meeting resolution quorum authenticated', checked: false }
    ],
    auditorNotes: 'Submitted today. Awaiting reviewer claim.'
  }
];

export const initialOrganizations = [
  {
    id: 'ORG-001',
    name: 'Rural Sphere Foundation',
    location: 'Nadia, WB',
    district: 'Nadia',
    category: 'NGO',
    categoryBadge: 'NGO',
    initials: 'RS',
    avatarBg: 'bg-emerald-700 text-white',
    regId: 'WB-NGO-2021-0891',
    sector: 'Livelihood Training',
    connectedCommunities: '14 villages',
    activeOpps: 3,
    verificationStatus: 'Verified',
    statusType: 'verified',
    joinedDate: '14 Jan 2023'
  },
  {
    id: 'ORG-002',
    name: 'Sabuj Food Collective',
    location: 'Hooghly, WB',
    district: 'Hooghly',
    category: 'Business',
    categoryBadge: 'Business',
    initials: 'SF',
    avatarBg: 'bg-amber-500 text-white',
    regId: 'WB-CORP-44021',
    sector: 'Food Processing',
    connectedCommunities: '8 units',
    activeOpps: 1,
    verificationStatus: 'Verified',
    statusType: 'verified',
    joinedDate: '02 Oct 2023'
  },
  {
    id: 'ORG-003',
    name: 'Sundarpur Craft Collective',
    location: 'Nadia, WB',
    district: 'Nadia',
    category: 'SHG Fed',
    categoryBadge: 'SHG Fed',
    initials: 'SC',
    avatarBg: 'bg-orange-500 text-white',
    regId: 'WB-SHG-10294',
    sector: 'Handicrafts & Textiles',
    connectedCommunities: '22 SHGs',
    activeOpps: 5,
    verificationStatus: 'Pending Review',
    statusType: 'pending',
    joinedDate: '18 Nov 2023'
  },
  {
    id: 'ORG-004',
    name: 'Kolkata Jute Producers',
    location: 'North 24 Parganas, WB',
    district: 'North 24 Parganas',
    category: 'Business',
    categoryBadge: 'Business',
    initials: 'KJ',
    avatarBg: 'bg-teal-700 text-white',
    regId: 'WB-CORP-31088',
    sector: 'Handicrafts & Textiles',
    connectedCommunities: '19 clusters',
    activeOpps: 2,
    verificationStatus: 'Verified',
    statusType: 'verified',
    joinedDate: '05 Dec 2022'
  },
  {
    id: 'ORG-005',
    name: 'Malda Agro Producers',
    location: 'Malda, WB',
    district: 'Malda',
    category: 'Cooperative',
    categoryBadge: 'Cooperative',
    initials: 'MA',
    avatarBg: 'bg-rose-600 text-white',
    regId: 'WB-FPO-88204',
    sector: 'Organic Farming',
    connectedCommunities: '11 groups',
    activeOpps: 0,
    verificationStatus: 'Action Required',
    statusType: 'action_required',
    joinedDate: '09 Feb 2024'
  },
  {
    id: 'ORG-006',
    name: 'Bongo Silk Cooperative',
    location: 'Murshidabad, WB',
    district: 'Murshidabad',
    category: 'Cooperative',
    categoryBadge: 'Cooperative',
    initials: 'BS',
    avatarBg: 'bg-indigo-700 text-white',
    regId: 'WB-COOP-67210',
    sector: 'Handicrafts & Textiles',
    connectedCommunities: '31 artisans',
    activeOpps: 4,
    verificationStatus: 'Verified',
    statusType: 'verified',
    joinedDate: '21 Mar 2023'
  }
];

export const initialCommunities = [
  {
    id: 'COMM-001',
    code: 'SHG-ND-0442',
    name: 'Sundarpur Stitching Collective',
    domain: 'Tailoring & Embroidery',
    domainBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    purpose: 'School Uniform & Apparel Batches',
    location: 'Kaliganj Block',
    district: 'Nadia District',
    leader: {
      name: 'Rekha Mondal',
      initials: 'RM',
      avatarBg: 'bg-emerald-100 text-emerald-800',
      verified: true
    },
    equipment: '18 Pedal Sewing Machines, 4 Overlockers, 2 Steam Press Tables',
    status: 'Available for Orders',
    statusDetails: '2 Live Batches',
    statusType: 'available'
  },
  {
    id: 'COMM-002',
    code: 'SHG-ND-0219',
    name: 'Ranaghat Organic Growers',
    domain: 'Organic Food & Spices',
    domainBg: 'bg-amber-50 text-amber-800 border-amber-200',
    purpose: 'Turmeric Root & Herb Dehydration',
    location: 'Ranaghat I Block',
    district: 'Nadia District',
    leader: {
      name: 'Pratima Biswas',
      initials: 'PB',
      avatarBg: 'bg-amber-100 text-amber-800',
      verified: true
    },
    equipment: '1 Pulverizer Unit, 1 Solar Dehydration Chamber, FSSAI Certified',
    status: 'In Discussion',
    statusDetails: '1 Bulk Order RFP',
    statusType: 'discussion'
  },
  {
    id: 'COMM-003',
    code: 'SHG-24N-1102',
    name: 'Bongaon Handicraft Circle',
    domain: 'Jute & Bamboo Craft',
    domainBg: 'bg-amber-50 text-amber-900 border-amber-300',
    purpose: 'Braided Baskets & Eco Storage',
    location: 'Bongaon Block',
    district: 'North 24 Parganas',
    leader: {
      name: 'Anjali Majumder',
      initials: 'AM',
      avatarBg: 'bg-purple-100 text-purple-800',
      verified: true
    },
    equipment: '6 Heavy Jute Braiding Rigs, Bamboo Slicing Machine, 2 Lacquer Units',
    status: 'Seeking Buyer Links',
    statusDetails: '0 Active Orders',
    statusType: 'seeking'
  },
  {
    id: 'COMM-004',
    code: 'SHG-ND-0881',
    name: 'Hanskhali Kantha Weavers',
    domain: 'Kantha Stitch & Textiles',
    domainBg: 'bg-purple-50 text-purple-800 border-purple-200',
    purpose: 'Silk & Tussar Heritage Embroidery',
    location: 'Hanskhali Block',
    district: 'Nadia District',
    leader: {
      name: 'Kalpana Das',
      initials: 'KD',
      avatarBg: 'bg-teal-100 text-teal-800',
      verified: true
    },
    equipment: '34 Kantha Stretcher Frames, Color Fastness Lab Kit, Steam Press',
    status: 'At Full Capacity',
    statusDetails: '3 Export Orders',
    statusType: 'full'
  },
  {
    id: 'COMM-005',
    code: 'SHG-ND-0304',
    name: 'Santipur Handloom Guild',
    domain: 'Jamdani & Cotton Weaving',
    domainBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    purpose: 'Fine Translucent Handloom Sarees',
    location: 'Santipur Municipality',
    district: 'Nadia District',
    leader: {
      name: 'Shanti Roy',
      initials: 'SR',
      avatarBg: 'bg-neutral-200 text-neutral-800',
      verified: true
    },
    equipment: '22 Fly Shuttle Handlooms, 8 Jacquard Heads, Bobbin Winder',
    status: 'Available for Orders',
    statusDetails: '2 Consignments',
    statusType: 'available'
  },
  {
    id: 'COMM-006',
    code: 'SHG-HG-0917',
    name: 'Chinsurah Pickles & Spices Cluster',
    domain: 'Food Processing & Spices',
    domainBg: 'bg-rose-50 text-rose-800 border-rose-200',
    purpose: 'Preserves, Pickles & Mustard Seasonings',
    location: 'Chinsurah Sadar',
    district: 'Hooghly District',
    leader: {
      name: 'Bula Chatterjee',
      initials: 'BC',
      avatarBg: 'bg-rose-100 text-rose-800',
      verified: true
    },
    equipment: 'Vacuum Jar Sealing Line, 2 Blenders, Stainless Steel Tables',
    status: 'Available for Orders',
    statusDetails: '1 Bulk Procurement',
    statusType: 'available'
  }
];

export const initialOpportunities = [
  {
    id: 'NARI-704',
    code: 'NARI-704',
    title: 'Bulk school uniform order',
    type: 'Bulk Buyer Order',
    deadline: '18 Oct 2024',
    publisher: {
      name: 'Apex Garments Ltd.',
      verified: true,
      gstin: 'GSTIN: 19AABCU9603R1ZM'
    },
    region: 'Nadia',
    skill: 'Tailoring & Garments',
    budget: '₹4,200',
    unit: 'artisan',
    escrowStatus: 'Advance Deposited',
    escrowBadgeColor: 'text-emerald-700 bg-emerald-50',
    applicants: { current: 14, total: 20 },
    status: 'Published',
    statusType: 'published',
    reason: null
  },
  {
    id: 'NARI-701',
    code: 'NARI-701',
    title: 'Solar drying equipment grant',
    type: 'Equipment Grant',
    deadline: '25 Oct 2024',
    publisher: {
      name: 'Rural Sphere Foundation',
      verified: true,
      gstin: 'FCRA Registered Body'
    },
    region: 'Nadia',
    skill: 'Food Preservation',
    budget: '₹3.5 Lakhs',
    unit: 'grant',
    escrowStatus: '100% Capital Subsidy',
    escrowBadgeColor: 'text-neutral-600 bg-neutral-100',
    applicants: { current: 6, total: 4, customText: '6 applications (4 SHG federations eligible)' },
    status: 'Published',
    statusType: 'published',
    reason: null
  },
  {
    id: 'NARI-698',
    code: 'NARI-698',
    title: 'Kantha stitch silk dupattas',
    type: 'Export Order',
    deadline: null,
    publisher: {
      name: 'WB Artisan Dev Council',
      verified: false,
      infoNote: true,
      gstin: 'Regional Liaison Node'
    },
    region: 'Nadia, Hooghly',
    skill: 'Embroidery & Needlework',
    budget: '₹6,800',
    unit: 'artisan',
    escrowStatus: 'Escrow Not Settled',
    escrowBadgeColor: 'text-rose-700 bg-rose-50',
    applicants: { current: 22, total: 22, customText: '22 applications (Applications frozen)' },
    status: 'Paused by admin',
    statusType: 'paused',
    reason: 'Payment clause ambiguous'
  },
  {
    id: 'NARI-708',
    code: 'NARI-708',
    title: 'Digital accounting & bookkeeping workshop',
    type: 'Skill Workshop',
    deadline: 'Submitted 2h ago',
    publisher: {
      name: 'NABARD District Cell',
      verified: true,
      gstin: 'Public Sector Entity'
    },
    region: 'South 24 Parganas',
    skill: 'Financial Literacy',
    budget: 'Fully Funded',
    unit: '',
    escrowStatus: 'Daily Stipend Incl.',
    escrowBadgeColor: 'text-emerald-700 bg-emerald-50',
    applicants: { current: 0, total: 40, customText: '- / 40 slots (Pending publication)' },
    status: 'Under Review',
    statusType: 'under_review',
    reason: null
  },
  {
    id: 'NARI-710',
    code: 'NARI-710',
    title: 'Organic honey collection & processing',
    type: 'Food Processing',
    deadline: '30 Nov 2024',
    publisher: {
      name: 'Sabuj Food Collective',
      verified: true,
      gstin: 'FSSAI: 12821019000214'
    },
    region: 'North 24 Parganas',
    skill: 'Food Processing',
    budget: '₹8,500',
    unit: 'batch',
    escrowStatus: 'Escrow Secured',
    escrowBadgeColor: 'text-emerald-700 bg-emerald-50',
    applicants: { current: 9, total: 15, customText: '9 applications' },
    status: 'Published',
    statusType: 'published',
    reason: null
  }
];

export const initialFlaggedContent = [
  {
    id: 'flag-1',
    title: 'Opportunity listing needs review',
    description: 'Possible unverified payment request. Reported by a partner. Opened 2 hrs ago.',
    category: 'Opportunity',
    priority: 'high',
    targetId: 'NARI-698',
    targetName: 'Kantha stitch silk dupattas',
    bgColor: 'bg-rose-50 border-rose-200 text-rose-900',
    dotColor: 'bg-rose-500',
    status: 'Open',
    timestamp: '2 hours ago',
    reporter: 'Sabuj Food Collective (Partner ID: WB-CORP-44021)'
  },
  {
    id: 'flag-2',
    title: 'Community description edited',
    description: 'Text changed after verification. Re-verify before publishing.',
    category: 'Community',
    priority: 'medium',
    targetId: 'SHG-ND-0219',
    targetName: 'Ranaghat Organic Growers',
    bgColor: 'bg-amber-50 border-amber-200 text-amber-900',
    dotColor: 'bg-amber-500',
    status: 'Open',
    timestamp: '5 hours ago',
    reporter: 'Automated Audit Bot'
  },
  {
    id: 'flag-3',
    title: 'Duplicate organization name',
    description: 'Similar name registered in Hooghly. Confirm it is a separate entity.',
    category: 'Organization',
    priority: 'low',
    targetId: 'VER-007',
    targetName: 'Kalyani Livelihoods Hub vs Hooghly Livelihoods Hub',
    bgColor: 'bg-sky-50 border-sky-200 text-sky-900',
    dotColor: 'bg-sky-500',
    status: 'Open',
    timestamp: '1 day ago',
    reporter: 'Registry Cross-Check'
  }
];

export const initialAuditLogs = [
  {
    id: 'audit-1',
    action: 'Verification approved: Rural Sphere Foundation',
    reviewer: 'Reviewer A. Sen',
    date: '02 Oct 2026',
    dotColor: 'bg-emerald-500',
    category: 'Verification'
  },
  {
    id: 'audit-2',
    action: 'Opportunity paused by admin',
    detail: 'Solar drying equipment grant',
    reviewer: 'Administrator',
    date: '23 Oct',
    dotColor: 'bg-amber-500',
    category: 'Moderation'
  },
  {
    id: 'audit-3',
    action: 'Failed two-factor attempt recorded',
    detail: 'Admin account · 22 Oct, 21:14',
    reviewer: 'Security Daemon',
    date: '22 Oct, 21:14',
    dotColor: 'bg-rose-500',
    category: 'Security'
  },
  {
    id: 'audit-4',
    action: 'Admin signed in with two-factor',
    detail: 'Administrator · 24 Oct, 21:28',
    reviewer: 'Auth Subsystem',
    date: '24 Oct, 21:28',
    dotColor: 'bg-emerald-500',
    category: 'Security'
  },
  {
    id: 'audit-5',
    action: 'Document requested for Ganges Skill Institute',
    detail: 'Tax exemption certificate (12A/80G)',
    reviewer: 'A. Sen',
    date: '23 Oct, 11:05',
    dotColor: 'bg-blue-500',
    category: 'Verification'
  }
];
