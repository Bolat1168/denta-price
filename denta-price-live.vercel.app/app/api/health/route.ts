import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseadmin';

export async function GET() {
  console.log('Health check: Started');
  try {
    // 1. Простая попытка чтения (менее требовательна к правам, чем listCollections)
    // Замени 'test' на имя любой существующей коллекции
    const snapshot = await db.collection('settings').limit(1).get();
    
    return NextResponse.json({
      success: true,
      message: 'Connection verified',
      empty: snapshot.empty,
      env: {
        projectId: process.env.FIREBASE_PROJECT_ID ? 'set' : 'missing',
        hasKey: !!process.env.FIREBASE_PRIVATE_KEY
      }
    });
  } catch (error: any) {
    // Вывод детальной ошибки в логи Vercel
    console.error('CRITICAL_HEALTH_ERROR:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code
    }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';