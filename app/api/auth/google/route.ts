import { NextResponse } from 'next/server';

const GOOGLE_CLIENT_ID = '301770227648-3p2e20d8hugio2aot7af6r21l60690e3.apps.googleusercontent.com';
const REDIRECT_URI = 'https://denta-price.pro/api/auth/google/callback';

function getAuthUrl() {
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile&access_type=online`;
}

export async function GET() {
  // Просто перекидывает браузер в Google
  return NextResponse.redirect(getAuthUrl());
}

export async function POST() {
  // Отдает фронтенду ссылку текстом, чтобы не было ошибки 405
  return NextResponse.json({ url: getAuthUrl() });
}