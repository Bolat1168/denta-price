import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getDentists, saveDentists } from '@/lib/storage';

const SALT_ROUNDS = 10;

export async function POST(req: Request) {
  try {
    const { email, phone, password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Пароль обязателен' },
        { status: 400 }
      );
    }

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Укажите email или телефон' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Пароль должен быть не менее 6 символов' },
        { status: 400 }
      );
    }

    const dentists = await getDentists();
    const normalizedEmail = email ? email.toLowerCase() : null;

    if (normalizedEmail && dentists.some((d: any) => d.email === normalizedEmail)) {
      return NextResponse.json(
        { error: 'Email уже используется' },
        { status: 400 }
      );
    }

    if (phone && dentists.some((d: any) => d.phone === phone)) {
      return NextResponse.json(
        { error: 'Телефон уже используется' },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const newId = `doctor-${Date.now()}`;
    const login = normalizedEmail || phone;

    const newDentist: any = {
      id: newId,
      fullName: login,
      passwordHash,
      photoUrl: '/images/doctors/doctor1.png',
      whatsapp: '',
      address: '',
      services: [],
      createdAt: new Date().toISOString(),
    };

    if (normalizedEmail) newDentist.email = normalizedEmail;
    if (phone) newDentist.phone = phone;

    dentists.push(newDentist);
    await saveDentists(dentists);

    return NextResponse.json({ dentistId: newId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
}