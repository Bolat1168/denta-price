import { NextRequest, NextResponse } from 'next/server';
import { db, adminAuth } from '@/lib/firebaseAdmin';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }
    
    const dentistRef = db.collection('dentists').doc(id);
    const dentistDoc = await dentistRef.get();
    
    if (!dentistDoc.exists) {
      return NextResponse.json({ error: 'Dentist not found' }, { status: 404 });
    }
    
    const data = dentistDoc.data();
    return NextResponse.json({
      id: dentistDoc.id,
      ...data,
      createdAt: data?.createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: data?.updatedAt?.toDate?.()?.toISOString() || null,
    });
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch dentist', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

async function verifyAuth(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session')?.value;
    if (!sessionCookie) return { authenticated: false, uid: null };
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    return { authenticated: true, uid: decodedClaims.uid, email: decodedClaims.email };
  } catch (error) {
    return { authenticated: false, uid: null };
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    
    if (authResult.uid !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const dentistRef = db.collection('dentists').doc(id);
    const dentistDoc = await dentistRef.get();
    
    if (!dentistDoc.exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    const allowedFields = ['fullName', 'specialization', 'experience', 'education', 'clinicName', 'clinicAddress', 'phone', 'price', 'about', 'workingHours', 'avatar', 'city'];
    
    const sanitizedUpdate: any = {};
    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        sanitizedUpdate[field] = updateData[field];
      }
    }
    
    sanitizedUpdate['updatedAt'] = new Date();
    await dentistRef.update(sanitizedUpdate);
    
    const updatedDoc = await dentistRef.get();
    const updatedData = updatedDoc.data();
    
    return NextResponse.json({
      success: true,
      dentist: {
        id: updatedDoc.id,
        ...updatedData,
        updatedAt: updatedData?.updatedAt?.toDate?.()?.toISOString() || null,
      }
    });
  } catch (error: any) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Failed to update', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}