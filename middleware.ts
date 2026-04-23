import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Список публичных маршрутов, не требующих авторизации
const publicRoutes = [
  '/login', 
  '/register', 
  '/',
  '/api/auth/login', 
  '/api/auth/register',
  '/api/auth/google',
  '/api/auth/google/callback',
  '/api/dentists/public',
  '/api/slots/public',
  '/api/prices',
  '/api/prices/almaty',
  '/api/prices/promotion',
  '/api/hello',
  '/api/ping'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Проверяем, является ли маршрут публичным
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  
  if (!isPublicRoute) {
    const dentistId = request.cookies.get('dentistId')?.value;
    
    if (!dentistId) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Добавляем dentistId в URL для API и кабинета
    if (!request.nextUrl.searchParams.has('dentistId')) {
      const newUrl = new URL(request.url);
      newUrl.searchParams.set('dentistId', dentistId);
      return NextResponse.redirect(newUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next|static|favicon.ico).*)',
};