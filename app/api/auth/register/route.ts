import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import path from 'path';

const DENTISTS_FILE = path.join(process.cwd(), 'data-src', 'dentists.json');
const SALT_ROUNDS = 10;

async function readDentists() {
  try {
    const data = await fs.readFile(DENTISTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeDentists(dentists: any[]) {
  await fs.writeFile(DENTISTS_FILE, JSON.stringify(dentists, null, 2));
}

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

    const dentists = await readDentists();

    if (email && dentists.some((d: any) => d.email === email)) {
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

    const newDentist: any = {
      id: newId,
      fullName,
      passwordHash,
      photoUrl: '/images/doctors/doctor1.png',
      whatsapp: '',
      address: '',
      services: [],
      createdAt: new Date().toISOString(),
    };

    if (email) newDentist.email = email;
    if (phone) newDentist.phone = phone;

    dentists.push(newDentist);
    await writeDentists(dentists);

    return NextResponse.json({ dentistId: newId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
}