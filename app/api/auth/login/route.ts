import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '../../../../lib/firebaseAdmin';

export async function POST(req: Request) {
  try {
    const { email, phone, password } = await req.json();

    if (!password || (!email && !phone)) {
      return NextResponse.json(
        { error: 'Email/телефон и пароль обязательны' },
        { status: 400 }
      );
    }

    let dentist = null;
    let snapshot = null;

    if (email) {
      snapshot = await db.collection('dentists').where('email', '==', email).limit(1).get();
      if (!snapshot.empty) dentist = snapshot.docs[0].data();
    }

    if (!dentist && phone) {
      snapshot = await db.collection('dentists').where('phone', '==', phone).limit(1).get();
      if (!snapshot.empty) dentist = snapshot.docs[0].data();
    }

    if (!dentist || !dentist.passwordHash) {
      return NextResponse.json(
        { error: 'Неверный email/телефон или пароль' },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, dentist.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Неверный email/телефон или пароль' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true, dentistId: dentist.id || dentist.dentistId });

    response.cookies.set('dentistId', dentist.id || dentist.dentistId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
}