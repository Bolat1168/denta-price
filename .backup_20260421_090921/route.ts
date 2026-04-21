import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city') || 'Almaty';
  const serviceId = searchParams.get('serviceId');

  try {
    const dentistsSnapshot = await db.collection('dentists').get();
    const dentists = [];
    
    for (const doc of dentistsSnapshot.docs) {
      const data = doc.data();
      const dentistCity = data.city || 'Almaty';
      if (dentistCity !== city) continue;
      
      const activeServices = (data.services || []).filter((s: any) => s.isPaid && s.activeFrom);
      if (serviceId) {
        const hasService = activeServices.some((s: any) => s.serviceId === serviceId);
        if (!hasService) continue;
      } else if (activeServices.length === 0) continue;
      
      dentists.push({
        id: doc.id,
        name: data.fullName || data.name || 'рач',
        photoUrl: data.photoUrl || '',
        address: data.address || '',
        whatsapp: data.whatsapp || '',
        services: activeServices.map((s: any) => ({
          serviceId: s.serviceId,
          price: s.price,
          radiusKm: s.radiusKm,
          segment: s.segment,
        })),
      });
    }
    
    return NextResponse.json({ success: true, city, dentists });
  } catch (error) {
    console.error('Failed to fetch dentists:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
