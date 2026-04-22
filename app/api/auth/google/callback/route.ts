import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  if (!code) return NextResponse.redirect('https://denta-price.pro/login?error=no_code');

  const response = await fetch('https://denta-price.pro/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  const data = await response.json();
  
  if (data.success) {
    return NextResponse.redirect('https://denta-price.pro/dentist-cabinet?dentistId=' + data.dentistId);
  }
  return NextResponse.redirect('https://denta-price.pro/login?error=auth_failed');
}
