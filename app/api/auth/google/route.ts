// Cache buster: 20260425180644
import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'postmessage');
    const { code } = await request.json();
    const { tokens } = await client.getToken(code);
    const ticket = await client.verifyIdToken({ idToken: tokens.id_token!, audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID });
    return NextResponse.json({ dentistId: ticket.getPayload()?.sub });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
