import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { services } from '../../../data/services';

const DATA_FILE = path.join(process.cwd(), 'data-src', 'dentists.json');

type DentistService = {
  serviceId: string;
  price: number;
  radiusKm: 1 | 3 | 6 | 'city';
  segment: 'econom' | 'comfort' | 'optimum' | 'premium' | 'luxury';
  activeFrom: string;
  isPaid: boolean;
};

type DentistRecord = {
  id: string;
  createdAt: string;
  profile: {
    fullName: string;
    photoUrl: string;
    whatsapp: string;
    addresses: string[];
  };
  services: DentistService[];
};

type DoctorPublic = {
  id: string;
  name: string;
  photoUrl: string;
  specialty: string;
  experienceYears: number;
  phone: string;
  servicesIds: string[];
  serviceName: string;
  price: number;
  segment: string;
  radius: string;
  isPaid: boolean;
  paymentDate?: string;
};

async function readDentists(): Promise<DentistRecord[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function getServiceName(serviceId: string): string {
  const service = services.find(s => s.id === serviceId);
  return service?.nameKZ || service?.nameRU || '';
}

export async function GET() {
  try {
    const dentists = await readDentists();
    const now = new Date().toISOString();
    const publicDoctors: DoctorPublic[] = [];

    for (const dentist of dentists) {
      // Активные услуги: платные (оплачены и активны) ИЛИ бесплатные (не оплачены)
      const activeServices = dentist.services.filter(s => 
        (s.isPaid && s.activeFrom <= now) ||  // платные
        (!s.isPaid)                            // бесплатные (демо-размещение)
      );
      if (activeServices.length === 0) continue;

      activeServices.sort((a, b) => {
        // Платные выше по приоритету
        if (a.isPaid !== b.isPaid) return a.isPaid ? -1 : 1;
        // Сортировка по дате активации (свежие первые)
        return b.activeFrom.localeCompare(a.activeFrom);
      });

      // Берём только одну услугу от врача (самую приоритетную)
      const service = activeServices[0];

      publicDoctors.push({
        id: dentist.id,
        name: dentist.profile.fullName,
        photoUrl: dentist.profile.photoUrl,
        specialty: '',
        experienceYears: 0,
        phone: dentist.profile.whatsapp,
        servicesIds: [service.serviceId],
        serviceName: getServiceName(service.serviceId),
        price: service.price,
        segment: service.segment,
        radius: service.radiusKm === 'city' ? 'Город' : `${service.radiusKm} км`,
        isPaid: service.isPaid,
        paymentDate: service.activeFrom,
      });
    }

    return NextResponse.json(publicDoctors);
  } catch (error) {
    console.error('GET /api/dentists/public error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch public dentists' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';