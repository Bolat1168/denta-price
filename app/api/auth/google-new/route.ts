import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: 'Env variables missing' }, { status: 500 });
    }

    const client = new OAuth2Client(clientId, clientSecret, 'postmessage');
    const { code } = await request.json();
    
    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    const { tokens } = await client.getToken(code);
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: clientId,
    });
    
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json({ error: 'Auth failed' }, { status: 400 });
    }

    // Заглушка ID (здесь должен быть поиск в твоем Firebase)
    const dentistId = payload.sub; 

    return NextResponse.json({ dentistId });
  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}