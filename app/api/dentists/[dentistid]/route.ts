import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET(
  request: NextRequest,
  { params }: { params: { dentistid: string } }
) {
  try {
    const { dentistid } = params;
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