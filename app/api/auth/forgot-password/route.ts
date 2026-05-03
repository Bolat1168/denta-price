import { NextResponse } from 'next/server';
import { getDentists } from '@/lib/storage';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const RESET_TOKENS_FILE = path.join(process.cwd(), 'data-src', 'reset-tokens.json');

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
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email обязателен' },
        { status: 400 }
      );
    }

    const dentists = await getDentists();
    const normalizedEmail = email.toLowerCase();
    const dentist = dentists.find((d: any) => d.email === normalizedEmail);

    if (!dentist) {
      return NextResponse.json(
        { error: 'Пользователь с таким email не найден' },
        { status: 404 }
      );
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 60 * 60 * 1000;

    const tokens = await readTokens();
    tokens[token] = {
      dentistId: dentist.id,
      email: normalizedEmail,
      expiresAt: expiresAt,
    };
    await writeTokens(tokens);

    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

    console.log('=== ССЫЛКА ДЛЯ СБРОСА ПАРОЛЯ ===');
    console.log(`Для пользователя: ${normalizedEmail}`);
    console.log(`Ссылка: ${resetUrl}`);
    console.log('================================');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
}