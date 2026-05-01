import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const SLOTS_FILE = path.join(process.cwd(), 'data', 'slots.json');
const DENTISTS_FILE = path.join(process.cwd(), 'data-src', 'dentists.json');
const ADMIN_KEY = process.env.ADMIN_STATS_KEY || 'denta-price-admin-2026';

async function readSlots() {
  try {
    const data = await fs.readFile(SLOTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { slots: {}, history: [] };
  }
}

async function readDentists() {
  try {
    const data = await fs.readFile(DENTISTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('X-Admin-Key');
  if (authHeader !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const slotsDb = await readSlots();
    const dentists = await readDentists();
    const slots = Object.values(slotsDb.slots || {}) as any[];
    const history = slotsDb.history || [];

    // 1. Активность врачей (с ФИО)
    const dentistActivity: Record<string, any> = {};

    for (const slot of slots) {
      if (!dentistActivity[slot.dentistId]) {
        const dentist = dentists.find((d: any) => d.id === slot.dentistId);
        let fullName = 'Unknown';
        if (dentist) {
          fullName = dentist.fullName || 
                     dentist.profile?.fullName || 
                     dentist.name ||
                     'Unknown';
        }
        
        dentistActivity[slot.dentistId] = {
          dentistId: slot.dentistId,
          fullName: fullName,
          totalSlots: 0,
          services: [],
          addresses: [],
          segments: [],
          freeSlotsUsed: 0,
          paidDisplacements: 0
        };
      }
      dentistActivity[slot.dentistId].totalSlots++;
      if (!dentistActivity[slot.dentistId].services.includes(slot.serviceId)) {
        dentistActivity[slot.dentistId].services.push(slot.serviceId);
      }
      if (!dentistActivity[slot.dentistId].addresses.includes(slot.address)) {
        dentistActivity[slot.dentistId].addresses.push(slot.address);
      }
      if (slot.segment && !dentistActivity[slot.dentistId].segments.includes(slot.segment)) {
        dentistActivity[slot.dentistId].segments.push(slot.segment);
      }
      if (slot.wasFree) {
        dentistActivity[slot.dentistId].freeSlotsUsed++;
      }
    }

    for (const record of history) {
      if (record.action === 'displace' && dentistActivity[record.dentistId]) {
        dentistActivity[record.dentistId].paidDisplacements++;
      }
    }

    // 2. Популярность услуг
    const servicePopularity: Record<string, any> = {};
    for (const slot of slots) {
      if (!servicePopularity[slot.serviceId]) {
        servicePopularity[slot.serviceId] = { 
          serviceId: slot.serviceId, 
          count: 0, 
          freeCount: 0, 
          paidCount: 0,
          segments: {}
        };
      }
      servicePopularity[slot.serviceId].count++;
      if (slot.wasFree) {
        servicePopularity[slot.serviceId].freeCount++;
      } else {
        servicePopularity[slot.serviceId].paidCount++;
      }
      if (slot.segment) {
        servicePopularity[slot.serviceId].segments[slot.segment] = 
          (servicePopularity[slot.serviceId].segments[slot.segment] || 0) + 1;
      }
    }

    // 3. Популярность радиусов (локаций)
    const radiusPopularity: Record<string, any> = {};
    for (const slot of slots) {
      if (!radiusPopularity[slot.address]) {
        radiusPopularity[slot.address] = { 
          address: slot.address, 
          slots: 0, 
          freeSlots: 0, 
          paidSlots: 0,
          segments: {}
        };
      }
      radiusPopularity[slot.address].slots++;
      if (slot.wasFree) {
        radiusPopularity[slot.address].freeSlots++;
      } else {
        radiusPopularity[slot.address].paidSlots++;
      }
      if (slot.segment) {
        radiusPopularity[slot.address].segments[slot.segment] = 
          (radiusPopularity[slot.address].segments[slot.segment] || 0) + 1;
      }
    }

    // 4. Популярность сегментов
    const segmentPopularity: Record<string, any> = {};
    for (const slot of slots) {
      if (!slot.segment) continue;
      if (!segmentPopularity[slot.segment]) {
        segmentPopularity[slot.segment] = {
          segment: slot.segment,
          totalSlots: 0,
          freeSlots: 0,
          paidSlots: 0,
          byService: {},
          byAddress: {}
        };
      }
      segmentPopularity[slot.segment].totalSlots++;
      if (slot.wasFree) {
        segmentPopularity[slot.segment].freeSlots++;
      } else {
        segmentPopularity[slot.segment].paidSlots++;
      }
      segmentPopularity[slot.segment].byService[slot.serviceId] = 
        (segmentPopularity[slot.segment].byService[slot.serviceId] || 0) + 1;
      segmentPopularity[slot.segment].byAddress[slot.address] = 
        (segmentPopularity[slot.segment].byAddress[slot.address] || 0) + 1;
    }

    // 5. Свободные бесплатные слоты
    const freeSlots = slots.filter((slot: any) => !slot.isFreeUsed);
    const freeSlotsByService: Record<string, number> = {};
    const freeSlotsBySegment: Record<string, number> = {};
    for (const slot of freeSlots) {
      freeSlotsByService[slot.serviceId] = (freeSlotsByService[slot.serviceId] || 0) + 1;
      if (slot.segment) {
        freeSlotsBySegment[slot.segment] = (freeSlotsBySegment[slot.segment] || 0) + 1;
      }
    }

    // 6. Статистика вытеснений
    const displacements = history.filter((record: any) => record.action === 'displace');
    const displacementsByService: Record<string, number> = {};
    const displacementsBySegment: Record<string, number> = {};
    for (const disp of displacements) {
      displacementsByService[disp.serviceId] = (displacementsByService[disp.serviceId] || 0) + 1;
      if (disp.segment) {
        displacementsBySegment[disp.segment] = (displacementsBySegment[disp.segment] || 0) + 1;
      }
    }

    return NextResponse.json({
      summary: {
        totalSlots: slots.length,
        occupiedSlots: slots.filter((s: any) => s.currentDentistId).length,
        freeSlots: slots.filter((s: any) => !s.currentDentistId).length,
        totalFreeSlotsEver: slots.filter((s: any) => s.wasFree).length,
        totalPaidSlotsEver: slots.filter((s: any) => !s.wasFree).length,
        totalDisplacements: displacements.length,
        availableFreeSlotsNow: freeSlots.length
      },
      dentistActivity: Object.values(dentistActivity),
      servicePopularity: Object.values(servicePopularity),
      radiusPopularity: Object.values(radiusPopularity),
      segmentPopularity: Object.values(segmentPopularity),
      freeSlotsByService,
      freeSlotsBySegment,
      displacementsByService,
      displacementsBySegment
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
