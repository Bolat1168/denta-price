import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import path from 'path';

const DENTISTS_FILE = path.join(process.cwd(), 'data-src', 'dentists.json');

export async function POST(req: Request) {
  try {
    const { email, phone, password } = await req.json();

    if (!password || (!email && !phone)) {
      return NextResponse.json(
        { error: 'Email/телефон и пароль обязательны' },
        { status: 400 }
      );
    }

    const data = await fs.readFile(DENTISTS_FILE, 'utf-8');
    const dentists = JSON.parse(data);

    const dentist = dentists.find((d: any) => 
      (email && d.email === email) || (phone && d.phone === phone)
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

    return NextResponse.json({ dentistId: dentist.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
}