import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const SLOTS_FILE = path.join(process.cwd(), 'data', 'slots.json');
const DENTISTS_FILE = path.join(process.cwd(), 'data-src', 'dentists.json');

async function readSlots() {
  try {
    const data = await fs.readFile(SLOTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { slots: {}, history: [] };
  }
}

async function writeSlots(data: any) {
  await fs.writeFile(SLOTS_FILE, JSON.stringify(data, null, 2));
}

async function readDentists() {
  const data = await fs.readFile(DENTISTS_FILE, 'utf-8');
  return JSON.parse(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body);
    const { dentistId, serviceId, address, basePrice } = body;

    if (!dentistId || !serviceId || !address) {
      console.log('Missing fields:', { dentistId, serviceId, address });
      return NextResponse.json(
        { error: 'Missing required fields: dentistId, serviceId, address' },
        { status: 400 }
      );
    }

    const slotId = `${address}_${serviceId}`;
    console.log('slotId:', slotId);
    const slotsDb = await readSlots();
    const dentists = await readDentists();

    const dentist = dentists.find((d: any) => d.id === dentistId);
    if (!dentist) {
      console.log('Dentist not found:', dentistId);
      return NextResponse.json({ error: 'Dentist not found' }, { status: 404 });
    }

    // Проверяем адрес: сначала profile.addresses, потом поле address
    let addresses = dentist.profile?.addresses || [];
    if (dentist.address && !addresses.includes(dentist.address)) {
      addresses.push(dentist.address);
    }
    
    console.log('Dentist addresses:', addresses);
    console.log('Request address:', address);
    
    if (!addresses.includes(address)) {
      console.log('Address not found in dentist profile');
      return NextResponse.json(
        { error: 'Address not found in dentist profile' },
        { status: 400 }
      );
    }

    const existingSlot = slotsDb.slots[slotId];
    console.log('Existing slot:', existingSlot);

    if (!existingSlot || existingSlot.isFreeUsed === false) {
      const cabinetSlots = Object.values(slotsDb.slots).filter(
        (slot: any) => slot.address === address && slot.wasFree === true
      );
      console.log('Cabinet free slots count:', cabinetSlots.length);

      if (cabinetSlots.length >= 6) {
        return NextResponse.json(
          { error: 'Free slots limit reached for this cabinet (max 6)' },
          { status: 400 }
        );
      }

      const newSlot = {
        slotId,
        dentistId,
        serviceId,
        address,
        occupiedAt: Date.now(),
        isFreeUsed: true,
        wasFree: true,
        basePrice: basePrice || 0
      };

      slotsDb.slots[slotId] = newSlot;
      slotsDb.history.push({
        slotId,
        dentistId,
        address,
        serviceId,
        occupiedAt: Date.now(),
        wasFree: true,
        action: 'occupy_free'
      });

      await writeSlots(slotsDb);
      console.log('Slot created successfully:', newSlot);
      return NextResponse.json({ success: true, free: true, slot: newSlot });
    }

    return NextResponse.json(
      {
        success: false,
        free: false,
        error: 'Slot already occupied before, paid displacement required',
        minBid: existingSlot.basePrice * 1.1
      },
      { status: 403 }
    );
  } catch (error) {
    console.error('Error in /api/slots/occupy:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
