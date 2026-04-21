import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dentistid = searchParams.get('id');
  
  if (!dentistid) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }
  
  try {
    const snapshot = await db.collection('dentists').get();
    const ids = snapshot.docs.map(doc => doc.id);
    
    const doc = await db.collection('dentists').doc(dentistid).get();
    
    if (!doc.exists) {
      return NextResponse.json({ 
        error: 'Dentist not found', 
        requestedId: dentistid,
        availableIds: ids 
      }, { status: 404 });
    }
    
    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Failed to fetch dentist:', error);
    return NextResponse.json({ error: 'Failed to fetch dentist' }, { status: 500 });
  }
}
