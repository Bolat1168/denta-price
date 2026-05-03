import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getDentists, saveDentists } from '@/lib/storage';
import fs from 'fs/promises';
import path from 'path';

const RESET_TOKENS_FILE = path.join(process.cwd(), 'data-src', 'reset-tokens.json');
const SALT_ROUNDS = 10;

async function readTokens() {
  try {
    const data = await fs.readFile(RESET_TOKENS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeTokens(tokens: any) {
  await fs.writeFile(RESET_TOKENS_FILE, JSON.stringify(tokens, null, 2));
}

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Токен и пароль обязательны' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Пароль должен быть не менее 6 символов' },
        { status: 400 }
      );
    }

    const tokens = await readTokens();
    const tokenData = tokens[token];

    if (!tokenData) {
      return NextResponse.json(
        { error: 'Недействительный токен' },
        { status: 400 }
      );
    }

    if (tokenData.expiresAt < Date.now()) {
      delete tokens[token];
      await writeTokens(tokens);
      return NextResponse.json(
        { error: 'Срок действия ссылки истек' },
        { status: 400 }
      );
    }

    const dentists = await getDentists();
    const dentistIndex = dentists.findIndex((d: any) => d.id === tokenData.dentistId);

    if (dentistIndex === -1) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    dentists[dentistIndex].passwordHash = passwordHash;

    await saveDentists(dentists);

    delete tokens[token];
    await writeTokens(tokens);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
}