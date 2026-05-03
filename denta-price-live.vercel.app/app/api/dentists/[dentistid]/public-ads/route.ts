import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data-src', 'dentists.json');

type PublicAdsService = {
  serviceId: string;
  price: number;
  radiusKm: 1 | 3 | 6 | 'city';
  segment: 'econom' | 'comfort' | 'optimum' | 'premium' | 'luxury';
  activeFrom: string;
  isPaid: boolean;
};

type Dentist = {
  id: string;
  createdAt: string;
  profile: any;
  services: PublicAdsService[];
};

async function readDentists(): Promise<Dentist[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { dentistid: string } }
) {
  try {
    const dentistid = params.dentistid;
    const body = await request.json();
    
    const { services } = body;
    
    if (!Array.isArray(services)) {
      return NextResponse.json(
        { error: 'Services must be an array' },
        { status: 400 }
      );
    }

    const validRadii = ['city', 1, 3, 6];

    for (const service of services) {
      if (
        !service.serviceId || 
        typeof service.price !== 'number' ||
        !validRadii.includes(service.radiusKm) ||
        !['econom', 'comfort', 'optimum', 'premium', 'luxury'].includes(service.segment) ||
        !service.activeFrom ||
        typeof service.isPaid !== 'boolean'
      ) {
        return NextResponse.json(
          { error: 'Invalid service data structure' },
          { status: 400 }
        );
      }
    }

    const dentists = await readDentists();
    const dentistIndex = dentists.findIndex(d => d.id === dentistid);

    if (dentistIndex === -1) {
      return NextResponse.json(
        { error: 'Dentist not found' },
        { status: 404 }
      );
    }

    const paidServices = services.filter(s => s.isPaid && s.activeFrom);
    dentists[dentistIndex].services = paidServices;

    await writeDentists(dentists);

    return NextResponse.json({ 
      success: true, 
      updatedServices: paidServices.length 
    });
  } catch (error) {
    console.error(`PUT /api/dentists/${params.dentistid}/public-ads error:`, error);
    return NextResponse.json(
      { error: 'Failed to update public ads' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';