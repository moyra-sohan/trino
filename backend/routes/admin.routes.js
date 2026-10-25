import { prisma } from '../db.js';

// In-memory data store for fallback & rapid development
let inMemoryMetrics = {
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

let inMemoryVerificationQueue = [
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
      { id: 'doc-1', title: 'Certificate of Registration', fileName: 'Society_Reg_WB_2019.pdf', size: '2.4 MB', status: 'Verified', verified: true },
      { id: 'doc-2', title: 'PAN Card & Tax Status', fileName: 'MKSF_PAN_Card_2022.pdf', size: '1.1 MB', status: 'Verified', verified: true },
      { id: 'doc-3', title: 'Bank Passbook / Cheque', fileName: 'SBI_Krishnanagar_Cheque.pdf', size: '840 KB', status: 'Verified', verified: true },
      { id: 'doc-4', title: 'Executive Committee Resolution', fileName: 'Resolution_Signatures_2023.pdf', size: '3.2 MB', status: 'Pending Review', verified: false }
    ],
    auditorNotes: 'Submitted copy of meeting resolution needs high-res signature page verification.'
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
    auditorNotes: 'All statutory verifications clear. Ready for executive sign-off.'
  }
];

let inMemoryOrganizations = [
  {
    id: 'org-1',
    regId: 'WB-NGO-2021-042',
    name: 'Rural Sphere Foundation',
    type: 'NGO',
    location: 'Kolkata & Nadia District',
    district: 'Nadia',
    womenImpacted: 1820,
    status: 'Active',
    contactPerson: 'Arpita Sengupta',
    contactEmail: 'partnerships@ruralsphere.org.in',
    contactPhone: '+91 98300 12345'
  },
  {
    id: 'org-2',
    regId: 'WB-PVT-2023-889',
    name: 'Bengal Weaves Pvt. Ltd.',
    type: 'Business',
    location: 'Santipur & Phulia',
    district: 'Nadia',
    womenImpacted: 640,
    status: 'Active',
    contactPerson: 'Subhasish Roy',
    contactEmail: 'contact@bengalweaves.in',
    contactPhone: '+91 94340 55678'
  }
];

let inMemoryCommunities = [
  {
    id: 'comm-1',
    name: 'Mayurhat Nakshi Kantha Producers Group',
    location: 'Hanskhali Block, Nadia',
    leader: 'Smt. Minati Sarkar',
    membersCount: 42,
    activeOrder: '₹1,20,000 Handicrafts Order',
    status: 'Active',
    craft: 'Nakshi Kantha Embroidery'
  },
  {
    id: 'comm-2',
    name: 'Bagula Food Processing Self Help Group',
    location: 'Hanskhali Block, Nadia',
    leader: 'Smt. Pushpa Mondal',
    membersCount: 28,
    activeOrder: '₹75,000 Pickles & Snacks',
    status: 'Active',
    craft: 'Food Processing'
  }
];

let inMemoryOpportunities = [
  {
    id: 'opp-1',
    title: 'Nakshi Kantha Heritage Stoles Procurement',
    issuer: 'Rural Sphere Foundation',
    type: 'Procurement Order',
    budget: '₹4,50,000',
    deadline: '15 Nov 2026',
    region: 'Nadia & Murshidabad',
    status: 'Active',
    womenEnrolled: 85
  },
  {
    id: 'opp-2',
    title: 'Solar Jute Loom Skill Development Fellowship',
    issuer: 'West Bengal Khadi Board',
    type: 'Training Grant',
    budget: '₹2,80,000',
    deadline: '28 Nov 2026',
    region: 'Hanskhali & Santipur',
    status: 'Active',
    womenEnrolled: 40
  }
];

let inMemoryFlaggedContent = [
  {
    id: 'flag-1',
    target: 'Commercial Contract #FL-902',
    reason: 'Reported payment terms discrepancy below minimum wage threshold',
    reporter: 'Gram Panchayat Field Liaison',
    date: '24 Oct 2026',
    priority: 'High',
    status: 'Under Review'
  }
];

let inMemoryAuditLogs = [
  {
    id: 'audit-1',
    action: 'Administrator elevated user role to Field Operator',
    detail: 'User: rekha.operator@narisetu.org (OP-8492)',
    reviewer: 'Director of Rural Development',
    date: 'Today, 11:42 AM',
    dotColor: 'bg-emerald-500',
    category: 'Security'
  },
  {
    id: 'audit-2',
    action: 'Document verified: GST Registration Certificate',
    detail: 'Entity: Sabuj Food Collective (#WB-HGY-2023-114)',
    reviewer: 'P. Mukherjee',
    date: 'Yesterday, 04:15 PM',
    dotColor: 'bg-emerald-500',
    category: 'Verification'
  }
];

/**
 * Admin Entity Routes Plugin
 * @param {import('fastify').FastifyInstance} fastify
 */
export async function adminRoutes(fastify) {

  // GET /api/admin/metrics
  fastify.get('/metrics', async () => {
    return {
      status: 'ok',
      metrics: inMemoryMetrics
    };
  });

  // GET /api/admin/verification-queue
  fastify.get('/verification-queue', async (request) => {
    const { status, type, search } = request.query || {};
    let items = [...inMemoryVerificationQueue];

    if (status && status !== 'all') {
      items = items.filter(i => i.status.toLowerCase().includes(status.toLowerCase()));
    }
    if (type && type !== 'all') {
      items = items.filter(i => i.type.toLowerCase().includes(type.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.regNumber.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q)
      );
    }

    return {
      total: items.length,
      queue: items
    };
  });

  // PUT /api/admin/verification-queue/:id
  fastify.put('/verification-queue/:id', async (request, reply) => {
    const { id } = request.params;
    const updateData = request.body || {};

    const idx = inMemoryVerificationQueue.findIndex(i => i.id === id || i.regNumber === id);
    if (idx === -1) {
      return reply.code(404).send({ error: 'Not Found', message: `Verification item ${id} not found` });
    }

    inMemoryVerificationQueue[idx] = {
      ...inMemoryVerificationQueue[idx],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    // Log update
    inMemoryAuditLogs.unshift({
      id: `audit-${Date.now()}`,
      action: `Verification updated for ${inMemoryVerificationQueue[idx].name}`,
      detail: `Status: ${inMemoryVerificationQueue[idx].status}`,
      reviewer: 'Administrator',
      date: 'Just now',
      dotColor: 'bg-emerald-500',
      category: 'Verification'
    });

    return {
      status: 'ok',
      item: inMemoryVerificationQueue[idx]
    };
  });

  // GET /api/admin/organizations
  fastify.get('/organizations', async () => {
    return {
      total: inMemoryOrganizations.length,
      organizations: inMemoryOrganizations
    };
  });

  // POST /api/admin/organizations
  fastify.post('/organizations', async (request, reply) => {
    const org = request.body || {};
    if (!org.name) {
      return reply.code(400).send({ error: 'Bad Request', message: 'Organization name is required' });
    }

    const newOrg = {
      id: `org-${Date.now()}`,
      regId: org.regId || `WB-${Math.floor(1000 + Math.random() * 9000)}`,
      name: org.name,
      type: org.type || 'NGO',
      location: org.location || 'Nadia, West Bengal',
      district: org.district || 'Nadia',
      womenImpacted: Number(org.womenImpacted) || 0,
      status: org.status || 'Active',
      contactPerson: org.contactPerson || null,
      contactEmail: org.contactEmail || null,
      contactPhone: org.contactPhone || null,
      createdAt: new Date().toISOString()
    };

    inMemoryOrganizations.unshift(newOrg);

    inMemoryAuditLogs.unshift({
      id: `audit-${Date.now()}`,
      action: `New organization registered: ${newOrg.name}`,
      detail: `Reg ID: ${newOrg.regId}`,
      reviewer: 'Administrator',
      date: 'Just now',
      dotColor: 'bg-emerald-500',
      category: 'Organization'
    });

    return reply.code(201).send({
      status: 'ok',
      organization: newOrg
    });
  });

  // GET /api/admin/communities
  fastify.get('/communities', async () => {
    return {
      total: inMemoryCommunities.length,
      communities: inMemoryCommunities
    };
  });

  // POST /api/admin/communities
  fastify.post('/communities', async (request, reply) => {
    const comm = request.body || {};
    if (!comm.name) {
      return reply.code(400).send({ error: 'Bad Request', message: 'Community name is required' });
    }

    const newComm = {
      id: `comm-${Date.now()}`,
      name: comm.name,
      location: comm.location || 'Hanskhali Block, Nadia',
      leader: comm.leader || 'Self-Help Group Leader',
      membersCount: Number(comm.membersCount) || 10,
      activeOrder: comm.activeOrder || 'Direct SHG orders active',
      status: 'Active',
      craft: comm.craft || 'Handicrafts & Stitch'
    };

    inMemoryCommunities.unshift(newComm);

    inMemoryAuditLogs.unshift({
      id: `audit-${Date.now()}`,
      action: `New collective registered: ${newComm.name}`,
      detail: `Block: ${newComm.location}`,
      reviewer: 'Administrator',
      date: 'Just now',
      dotColor: 'bg-emerald-500',
      category: 'Organization'
    });

    return reply.code(201).send({
      status: 'ok',
      community: newComm
    });
  });

  // GET /api/admin/opportunities
  fastify.get('/opportunities', async () => {
    return {
      total: inMemoryOpportunities.length,
      opportunities: inMemoryOpportunities
    };
  });

  // POST /api/admin/opportunities
  fastify.post('/opportunities', async (request, reply) => {
    const opp = request.body || {};
    if (!opp.title) {
      return reply.code(400).send({ error: 'Bad Request', message: 'Opportunity title is required' });
    }

    const newOpp = {
      id: `opp-${Date.now()}`,
      title: opp.title,
      issuer: opp.issuer || 'NariSetu Directorate',
      type: opp.type || 'Procurement Order',
      budget: opp.budget || '₹1,00,000',
      deadline: opp.deadline || '30 days',
      region: opp.region || 'West Bengal',
      status: 'Active',
      womenEnrolled: Number(opp.womenEnrolled) || 0,
      createdAt: new Date().toISOString()
    };

    inMemoryOpportunities.unshift(newOpp);

    inMemoryAuditLogs.unshift({
      id: `audit-${Date.now()}`,
      action: `Admin dispatch published: ${newOpp.title}`,
      detail: `Region: ${newOpp.region}`,
      reviewer: 'Administrator',
      date: 'Just now',
      dotColor: 'bg-emerald-500',
      category: 'Moderation'
    });

    return reply.code(201).send({
      status: 'ok',
      opportunity: newOpp
    });
  });

  // GET /api/admin/flags
  fastify.get('/flags', async () => {
    return {
      total: inMemoryFlaggedContent.length,
      flags: inMemoryFlaggedContent
    };
  });

  // PUT /api/admin/flags/:id
  fastify.put('/flags/:id', async (request, reply) => {
    const { id } = request.params;
    const body = request.body || {};

    const idx = inMemoryFlaggedContent.findIndex(f => f.id === id);
    if (idx === -1) {
      return reply.code(404).send({ error: 'Not Found', message: `Flag ${id} not found` });
    }

    inMemoryFlaggedContent[idx] = {
      ...inMemoryFlaggedContent[idx],
      ...body,
      status: body.status || 'Resolved',
      updatedAt: new Date().toISOString()
    };

    inMemoryAuditLogs.unshift({
      id: `audit-${Date.now()}`,
      action: `Flag resolved on ${inMemoryFlaggedContent[idx].target}`,
      detail: `Action: ${body.resolutionAction || 'Content reinstated / verified'}`,
      reviewer: 'Administrator',
      date: 'Just now',
      dotColor: 'bg-emerald-500',
      category: 'Moderation'
    });

    return {
      status: 'ok',
      flag: inMemoryFlaggedContent[idx]
    };
  });

  // GET /api/admin/audit-logs
  fastify.get('/audit-logs', async () => {
    return {
      total: inMemoryAuditLogs.length,
      logs: inMemoryAuditLogs
    };
  });

  // POST /api/admin/audit-logs
  fastify.post('/audit-logs', async (request, reply) => {
    const body = request.body || {};
    if (!body.action) {
      return reply.code(400).send({ error: 'Bad Request', message: 'Action description is required' });
    }

    const newLog = {
      id: `audit-${Date.now()}`,
      action: body.action,
      detail: body.detail || null,
      reviewer: body.reviewer || 'Administrator',
      date: body.date || 'Just now',
      dotColor: body.dotColor || 'bg-emerald-500',
      category: body.category || 'Security',
      createdAt: new Date().toISOString()
    };

    inMemoryAuditLogs.unshift(newLog);

    return reply.code(201).send({
      status: 'ok',
      log: newLog
    });
  });
}
