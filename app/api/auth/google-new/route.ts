import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage'
);

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    
    // Обмен кода на токены
    const { tokens } = await client.getToken(code);
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json({ error: 'Ошибка Google Auth' }, { status: 400 });
    }

    // Здесь должна быть твоя логика поиска стоматолога в БД по email
    // Пример (замени на свой вызов к БД/Firebase):
    const dentistId = "ID_ИЗ_ТВОЕЙ_БАЗЫ"; 

    return NextResponse.json({ dentistId });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}