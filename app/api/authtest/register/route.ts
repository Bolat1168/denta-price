import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DENTISTS_FILE = path.join(process.cwd(), 'data-src', 'dentists.json');

async function readDentists() {
  try {
    const data = await fs.readFile(DENTISTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeDentists(dentists: any[]) {
  await fs.writeFile(DENTISTS_FILE, JSON.stringify(dentists, null, 2));
}

export async function POST(req: Request) {
  try {
    const { fullName } = await req.json();
    if (!fullName) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const dentists = await readDentists();
    const newId = `doctor-${Date.now()}`;
    const newDentist = {
      id: newId,
      fullName,
      photoUrl: '/images/doctors/doctor1.png',
      whatsapp: '',
      address: '',
      services: [],
      createdAt: new Date().toISOString(),
    };

    dentists.push(newDentist);
    await writeDentists(dentists);

    return NextResponse.json({ dentistId: newId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
