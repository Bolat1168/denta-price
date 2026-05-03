import { NextResponse } from 'next/server';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export const runtime = 'nodejs';

// Инициализация Firebase Admin (как в niche-status)
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
const auth = getAuth();

export async function POST(request: Request) {
  try {
    const { dentistId, serviceId, segment, radius, amount } = await request.json();

    // Валидация
    if (!dentistId || !serviceId || !segment || !radius || !amount) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Проверяем авторизацию (если нужно)
    const token = request.headers.get('authorization')?.split('Bearer ')[1];
    if (token) {
      try {
        await auth.verifyIdToken(token);
      } catch {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Записываем оплату продвижения (вытеснение)
    const promotionRef = db.collection('promotions').doc();
    await promotionRef.set({
      dentistId,
      serviceId,
      segment,
      radius: parseInt(radius),
      price: amount,
      paidAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ 
      success: true, 
      id: promotionRef.id,
      message: 'Продвижение активировано' 
    });

  } catch (error) {
    console.error('Ошибка при активации продвижения:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET для проверки статуса
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dentistId = searchParams.get('dentistId');
  const serviceId = searchParams.get('serviceId');
  const segment = searchParams.get('segment');
  const radius = searchParams.get('radius');

  if (!dentistId || !serviceId || !segment || !radius) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const now = Timestamp.now();
    const fifteenMinsAgo = new Timestamp(now.seconds - 15 * 60, now.nanoseconds);

    // Проверяем, платил ли этот стоматолог за последние 15 минут
    const myRecent = await db.collection('promotions')
      .where('dentistId', '==', dentistId)
      .where('serviceId', '==', serviceId)
      .where('segment', '==', segment)
      .where('radius', '==', parseInt(radius))
      .where('paidAt', '>=', fifteenMinsAgo)
      .get();

    // Считаем общее количество вытеснений
    const totalRecent = await db.collection('promotions')
      .where('serviceId', '==', serviceId)
      .where('segment', '==', segment)
      .where('radius', '==', parseInt(radius))
      .where('paidAt', '>=', fifteenMinsAgo)
      .get();

    return NextResponse.json({
      hasActivePromotion: !myRecent.empty,
      myPromotionsCount: myRecent.size,
      totalDisplacements: totalRecent.size,
      canPromote: myRecent.empty // Нельзя продвигаться, если уже продвинулся в этом окне
    });

  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
