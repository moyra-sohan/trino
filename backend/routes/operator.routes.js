import { prisma } from '../db.js';

// In-memory cache fallback for resilient field operations
let inMemoryOperatorRecords = [
  {
    id: 'NS-WB-7401',
    uid: 'NS-WB-7401',
    name: 'Aparna Ghosh',
    bengaliName: 'অপর্ণা ঘোষ',
    craft: 'Nakshi Kantha',
    panchayat: 'Mayurhat-I',
    block: 'Hanskhali',
    district: 'Nadia',
    phone: '+91 98321 00042',
    aadhaarRef: 'UID: **** 8109',
    syncStatus: 'Verified',
    age: 34,
    registeredAt: new Date().toISOString()
  },
  {
    id: 'NS-WB-7402',
    uid: 'NS-WB-7402',
    name: 'Sunita Das',
    bengaliName: 'সুনীতা দাস',
    craft: 'Food Processing',
    panchayat: 'Govindapur GP',
    block: 'Chapra',
    district: 'Nadia',
    phone: '+91 97320 23456',
    aadhaarRef: 'UID: **** 5521 (OK)',
    syncStatus: 'Submitted',
    age: 38,
    registeredAt: new Date().toISOString()
  },
  {
    id: 'NS-WB-7403',
    uid: 'NS-WB-7403',
    name: 'Ruma Paul',
    bengaliName: 'রুমা পাল',
    craft: 'Weaving & Handloom',
    panchayat: 'Bagula-II',
    block: 'Hanskhali',
    district: 'Nadia',
    phone: '+91 98451 12345',
    aadhaarRef: 'UID: Saved locally',
    syncStatus: 'Draft',
    age: 29,
    registeredAt: new Date().toISOString()
  },
  {
    id: 'NS-WB-7404',
    uid: 'NS-WB-7404',
    name: 'Manju Halder',
    bengaliName: 'মঞ্জু হালদার',
    craft: 'Handicrafts & Jute',
    panchayat: 'Mayurhat-I',
    block: 'Hanskhali',
    district: 'Nadia',
    phone: '+91 94340 00077',
    aadhaarRef: 'UID: Bank IFSC error',
    syncStatus: 'Rejected',
    age: 41,
    registeredAt: new Date().toISOString()
  },
  {
    id: 'NS-WB-7405',
    uid: 'NS-WB-7405',
    name: 'Basanti Biswas',
    bengaliName: 'বাসন্তী বিশ্বাস',
    craft: 'Agri-Allied Dairy',
    panchayat: 'Ramnagar GP',
    block: 'Hanskhali',
    district: 'Nadia',
    phone: '+91 96411 00033',
    aadhaarRef: 'UID: **** 3319 (OK)',
    syncStatus: 'Verified',
    age: 36,
    registeredAt: new Date().toISOString()
  }
];

/**
 * Field Operator Routes Plugin
 * @param {import('fastify').FastifyInstance} fastify
 */
export async function operatorRoutes(fastify) {

  // GET Operator Metrics & Summary Stats
  fastify.get('/metrics', async () => {
    const verified = inMemoryOperatorRecords.filter(r => r.syncStatus === 'Verified').length + 181;
    const submitted = inMemoryOperatorRecords.filter(r => r.syncStatus === 'Submitted').length + 41;
    const drafts = inMemoryOperatorRecords.filter(r => r.syncStatus === 'Draft').length + 13;
    const rejected = inMemoryOperatorRecords.filter(r => r.syncStatus === 'Rejected').length + 4;

    return {
      status: 'ok',
      operatorId: 'OP-8492',
      operatorName: 'Smt. Rekha Mondal',
      assignedBlock: 'Hanskhali',
      assignedDistrict: 'Nadia South',
      metrics: {
        drafts,
        submitted,
        verified,
        rejected,
        totalEnrolled: verified,
        enrolledToday: 8,
        pendingProfileUpdates: 3,
        approvalRate: 96.2,
        dailyAverage: 7.6,
        weeklyQuota: {
          target: 50,
          achieved: 42,
          percent: 84
        }
      }
    };
  });

  // GET All Artisan Records
  fastify.get('/records', async (request) => {
    const { status, block, search } = request.query || {};
    let records = [...inMemoryOperatorRecords];

    if (status && status !== 'All') {
      records = records.filter(r => r.syncStatus.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      records = records.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.uid.toLowerCase().includes(q) ||
        (r.craft && r.craft.toLowerCase().includes(q))
      );
    }

    return {
      total: records.length,
      records
    };
  });

  // POST Create New Artisan Registration
  fastify.post('/records', async (request, reply) => {
    const body = request.body || {};

    if (!body.name && (!body.firstName || !body.lastName)) {
      return reply.code(400).send({
        error: 'Bad Request',
        message: 'Artisan Name is required'
      });
    }

    const uid = body.uid || `NS-WB-${Math.floor(7406 + Math.random() * 500)}`;
    const newRecord = {
      id: uid,
      uid,
      name: body.name || `${body.firstName} ${body.lastName}`,
      bengaliName: body.bengaliName || null,
      age: Number(body.age) || 32,
      education: body.education || body.educationLevel || 'Secondary (10th Pass)',
      craft: body.craft || body.primaryCraft || 'Handicrafts & Stitch',
      panchayat: body.panchayat || body.gramPanchayat || 'Mayurhat-I',
      village: body.village || 'Dakshinpara',
      block: body.block || 'Hanskhali',
      district: body.district || 'Nadia',
      phone: body.phone || '+91 98321 00042',
      aadhaarRef: body.aadhaarRef || 'UID: **** 8109 (OK)',
      syncStatus: body.syncStatus || 'Verified',
      operatorId: 'OP-8492',
      registeredAt: new Date().toISOString()
    };

    inMemoryOperatorRecords.unshift(newRecord);

    return reply.code(201).send({
      message: 'Artisan registered successfully by Field Operator',
      record: newRecord
    });
  });

  // PUT Update / Fix Record
  fastify.put('/records/:id', async (request, reply) => {
    const { id } = request.params;
    const body = request.body || {};

    const idx = inMemoryOperatorRecords.findIndex(r => r.id === id || r.uid === id);
    if (idx === -1) {
      return reply.code(404).send({
        error: 'Not Found',
        message: `Artisan record ${id} not found`
      });
    }

    inMemoryOperatorRecords[idx] = {
      ...inMemoryOperatorRecords[idx],
      ...body,
      updatedAt: new Date().toISOString()
    };

    return {
      message: 'Record updated successfully',
      record: inMemoryOperatorRecords[idx]
    };
  });

  // POST Batch Import Records from Offline Survey CSV
  fastify.post('/records/batch', async (request, reply) => {
    const { records = [] } = request.body || {};

    if (!Array.isArray(records) || records.length === 0) {
      return reply.code(400).send({
        error: 'Bad Request',
        message: 'Array of records is required'
      });
    }

    const imported = records.map((r, i) => {
      const uid = `NS-WB-${7430 + i}`;
      return {
        id: uid,
        uid,
        name: r.fullName || r.name || 'Artisan Beneficiary',
        phone: r.phone || r.mobile_no || '+91 9832100000',
        craft: r.skillCategory || r.primary_trade || 'Handicrafts',
        panchayat: r.gpVillage || 'Hanskhali',
        block: 'Hanskhali',
        district: 'Nadia',
        aadhaarRef: 'UID: **** OK (Batch Import)',
        syncStatus: 'Verified',
        registeredAt: new Date().toISOString()
      };
    });

    inMemoryOperatorRecords = [...imported, ...inMemoryOperatorRecords];

    return reply.code(201).send({
      message: `Batch of ${imported.length} artisan records imported successfully`,
      importedCount: imported.length
    });
  });
}
