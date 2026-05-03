import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getDentists } from '@/lib/storage';

export async function POST(req: Request) {
  try {
    const { email, phone, password, rememberMe } = await req.json();

    if (!password || (!email && !phone)) {
      return NextResponse.json(
        { error: 'Email/телефон и пароль обязательны' },
        { status: 400 }
      );
    }

    const dentists = await getDentists();

    const dentist = dentists.find((d: any) => 
      (email && d.email === email.toLowerCase()) || (phone && d.phone === phone)
    );

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

    const response = NextResponse.json({ dentistId: dentist.id });
    
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
    response.cookies.set('dentistId', dentist.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: maxAge,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
}