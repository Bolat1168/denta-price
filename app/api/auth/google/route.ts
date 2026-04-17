import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Инициализация Firebase Admin (если не инициализирован)
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

// Создаём OAuth2 клиент для обмена кода на токен
const googleClient = new OAuth2Client(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage' // должно совпадать с redirect_uri на фронте
);

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Authorization code required' }, { status: 400 });
    }

    // Обмениваем код на токены
    const { tokens } = await googleClient.getToken(code);
    const accessToken = tokens.access_token;

    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to obtain access token' }, { status: 401 });
    }

    // Получаем информацию о пользователе
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!userInfoRes.ok) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
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
        email,
        whatsapp: '',
        address: '',
        services: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      await docRef.set(
        {
          fullName: name || docSnap.data()?.fullName,
          photoUrl: picture || docSnap.data()?.photoUrl,
          email: email || docSnap.data()?.email,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }

    return NextResponse.json({ dentistId });
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const runtime = 'nodejs';