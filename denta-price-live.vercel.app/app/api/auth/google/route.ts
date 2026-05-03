import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

if (!getApps().length) {
  const pKey = process.env.FIREBASE_PRIVATE_KEY || '';
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Очистка от кавычек и замена текстовых \n на реальные переносы
      privateKey: pKey.replace(/^"(.*)"$/, '$1').replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    const googleClient = new OAuth2Client(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'postmessage'
    );

    const { tokens } = await googleClient.getToken(code);
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    
    const userInfo = await userInfoRes.json();
    const { sub: googleId, name, email, picture } = userInfo;
    const dentistId = `doctor-${googleId}`;

    const docRef = db.collection('dentists').doc(dentistId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      await docRef.set({
        dentistId,
        fullName: name || '',
        photoUrl: picture || '',
        email: email || '',
        whatsapp: '',
        address: '',
        services: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      await docRef.set({
        fullName: name || docSnap.data()?.fullName,
        photoUrl: picture || docSnap.data()?.photoUrl,
        email: email || docSnap.data()?.email,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    }

    return NextResponse.json({ dentistId });
  } catch (error: any) {
    // Вывод ошибки в логи Vercel для дебага
    console.error('API ERROR:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const runtime = 'nodejs';