import { prisma } from '../db.js';
import {
  adminMetrics,
  initialVerificationQueue,
  initialOrganizations,
  initialCommunities,
  initialOpportunities,
  initialFlaggedContent,
  initialAuditLogs
} from './adminData.js';

// In-memory data store for fallback & rapid development
let inMemoryMetrics = { ...adminMetrics };
let inMemoryVerificationQueue = initialVerificationQueue.map(item => ({ ...item }));
let inMemoryOrganizations = initialOrganizations.map(item => ({ ...item }));
let inMemoryCommunities = initialCommunities.map(item => ({ ...item }));
let inMemoryOpportunities = initialOpportunities.map(item => ({ ...item }));
let inMemoryFlaggedContent = initialFlaggedContent.map(item => ({ ...item }));
let inMemoryAuditLogs = initialAuditLogs.map(item => ({ ...item }));

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
