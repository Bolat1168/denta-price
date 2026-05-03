import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}
const db = getFirestore();

export async function GET(
  request: NextRequest,
  { params }: { params: { dentistid: string } }
) {
  try {
    const dentistId = params.dentistid;
    const docRef = db.collection('dentists').doc(dentistId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      // Создаём документ по умолчанию, чтобы избежать 404
      const newDoc = {
        dentistId,
        fullName: '',
        photoUrl: '',
        whatsapp: '',
        address: '',
        services: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await docRef.set(newDoc);
      return NextResponse.json(newDoc);
    }

    return NextResponse.json(docSnap.data());
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch dentist' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { dentistid: string } }
) {
  try {
    const dentistId = params.dentistid;
    const body = await request.json();
    const { fullName, photoUrl, whatsapp, address, services } = body;

    const docRef = db.collection('dentists').doc(dentistId);
    const docSnap = await docRef.get();

    // Если документа нет, создаём новый
    if (!docSnap.exists) {
      const newDoc = {
        dentistId,
        fullName: fullName?.trim() ?? '',
        photoUrl: photoUrl ?? '',
        whatsapp: whatsapp?.trim() ?? '',
        address: address?.trim() ?? '',
        services: services ?? [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await docRef.set(newDoc);
      return NextResponse.json(newDoc);
    }

    // Если документ существует, обновляем
    const existing = docSnap.data()!;
    const updated = {
      ...existing,
      fullName: fullName?.trim() ?? existing.fullName ?? '',
      photoUrl: photoUrl ?? existing.photoUrl ?? '',
      whatsapp: whatsapp?.trim() ?? existing.whatsapp ?? '',
      address: address?.trim() ?? existing.address ?? '',
      services: services ?? existing.services ?? [],
      updatedAt: new Date().toISOString(),
    };
    await docRef.set(updated, { merge: true });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Failed to update dentist' }, { status: 500 });
  }
}

export const runtime = 'nodejs';