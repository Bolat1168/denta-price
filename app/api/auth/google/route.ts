import { NextResponse } from 'next/server';

// Добавляем эту строку, чтобы Vercel не кэшировал ошибку 405
export const dynamic = 'force-dynamic';

const GOOGLE_CLIENT_ID = '301770227648-3p2e20d8hugio2aot7af6r21l60690e3.apps.googleusercontent.com';
const REDIRECT_URI = 'https://denta-price.pro/api/auth/google/callback';

function getAuthUrl() {
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile&access_type=online`;
}

export async function GET() {
  return NextResponse.redirect(getAuthUrl());
}

export async function POST() {
  return NextResponse.json({ url: getAuthUrl() });
}