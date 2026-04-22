import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dentistid = searchParams.get('id');

  if (!dentistid) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  try {
    const doc = await db.collection('dentists').doc(dentistid).get();
    if (!doc.exists) {
      return NextResponse.json({ error: 'Dentist not found' }, { status: 404 });
    }
    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Failed to fetch dentist:', error);
    return NextResponse.json({ error: 'Failed to fetch dentist' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dentistid = searchParams.get('id');

  if (!dentistid) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { fullName, photoUrl, whatsapp, address, services } = body;

    const docRef = db.collection('dentists').doc(dentistid);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Dentist not found' }, { status: 404 });
    }

    await docRef.update({
      fullName: fullName || '',
      photoUrl: photoUrl || '',
      whatsapp: whatsapp || '',
      address: address || '',
      services: services || [],
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update dentist:', error);
    return NextResponse.json({ error: 'Failed to update dentist' }, { status: 500 });
  }
}