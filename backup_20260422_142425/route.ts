import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'Almaty';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  try {
    const slotsSnapshot = await db.collection('slots')
      .where('city', '==', city)
      .where('date', '==', date)
      .get();

    const slots = slotsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, city, date, slots });
  } catch (error) {
    console.error('Public slots error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
