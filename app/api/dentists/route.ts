import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const DATA_FILE = path.join(process.cwd(), 'data-src', 'dentists.json');

type DentistProfile = {
  fullName: string;
  photoUrl: string;
  whatsapp: string;
  addresses: string[];
};

type DentistService = {
  serviceId: string;
  price: number;
  radiusKm: 1 | 3 | 6;
  segment: 'econom' | 'comfort' | 'optimum' | 'premium' | 'luxury';
  activeFrom: string;
  isPaid: boolean;
};

type Dentist = {
  id: string;
  createdAt: string;
  profile: DentistProfile;
  services: DentistService[];
};

async function readDentists(): Promise<Dentist[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read dentists.json:', error);
    return [];
  }
}

async function writeDentists(dentists: Dentist[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(dentists, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write dentists.json:', error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const dentists = await readDentists();
    return NextResponse.json(dentists);
  } catch (error) {
    console.error('GET /api/dentists error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dentists' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { whatsapp } = body;

    if (!whatsapp || typeof whatsapp !== 'string' || whatsapp.trim() === '') {
      return NextResponse.json(
        { error: 'WhatsApp number is required' },
        { status: 400 }
      );
    }

    const dentists = await readDentists();
    
    // Check if dentist with this whatsapp already exists
    const existing = dentists.find(d => 
      d.profile.whatsapp && d.profile.whatsapp.trim() === whatsapp.trim()
    );
    
    if (existing) {
      return NextResponse.json(
        { error: 'Dentist with this WhatsApp already exists', dentistId: existing.id },
        { status: 409 }
      );
    }

    const dentistId = randomUUID();
    const newDentist: Dentist = {
      id: dentistId,
      createdAt: new Date().toISOString(),
      profile: {
        fullName: '',
        photoUrl: '',
        whatsapp: whatsapp.trim(),
        addresses: ['']
      },
      services: []
    };

    dentists.push(newDentist);
    await writeDentists(dentists);

    return NextResponse.json({ dentistId });
  } catch (error) {
    console.error('POST /api/dentists error:', error);
    return NextResponse.json(
      { error: 'Failed to register dentist' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';