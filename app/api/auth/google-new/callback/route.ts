import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  const GOOGLE_CLIENT_ID = '301770227648-3p2e20d8hugio2aot7af6r21l60690e3.apps.googleusercontent.com';
  const GOOGLE_CLIENT_SECRET = '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';
  const REDIRECT_URI = 'https://denta-price.pro/api/auth/google/callback';

  try {
    // Обмен code на токен
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();
    
    if (!tokens.access_token) {
      return NextResponse.json({ error: 'Failed to get token', details: tokens }, { status: 401 });
    }

    // Получение информации о пользователе
    const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    
    const userInfo = await userRes.json();
    const dentistId = `doctor-${userInfo.sub}`;

    // Редирект с установкой cookie
    const response = NextResponse.redirect('https://denta-price.pro/dashboard');
    response.cookies.set('dentistId', dentistId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    
    return response;
  } catch (error: any) {
    console.error('Callback error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}