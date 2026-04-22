import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '@/lib/firebaseAdmin';

const SALT_ROUNDS = 10;

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, password } = await req.json();

    if (!fullName || !password) {
      return NextResponse.json(
        { error: 'Имя и пароль обязательны' },
        { status: 400 }
      );
    }

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Необходимо указать email или телефон' },
        { status: 400 }
      );
    }

    // Проверка на существование email
    if (email) {
      const emailSnapshot = await db.collection('dentists').where('email', '==', email).get();
      if (!emailSnapshot.empty) {
        return NextResponse.json(
          { error: 'Email уже используется' },
          { status: 400 }
        );
      }
    }

    // Проверка на существование телефона
    if (phone) {
      const phoneSnapshot = await db.collection('dentists').where('phone', '==', phone).get();
      if (!phoneSnapshot.empty) {
        return NextResponse.json(
          { error: 'Телефон уже используется' },
          { status: 400 }
        );
      }
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const dentistId = `doctor-${Date.now()}`;

    const newDentist: any = {
      id: dentistId,
      dentistId,
      fullName,
      passwordHash,
      photoUrl: '/images/doctors/doctor1.png',
      whatsapp: phone || '',
      address: '',
      services: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (email) newDentist.email = email;
    if (phone) newDentist.phone = phone;

    await db.collection('dentists').doc(dentistId).set(newDentist);

    return NextResponse.json({ success: true, dentistId });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
}