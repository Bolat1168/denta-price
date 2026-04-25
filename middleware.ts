import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Маршруты, которые открываются БЕЗ логина
const publicRoutes = [
  '/', 
  '/login', 
  '/services', 
  '/segments', 
  '/prices',
  '/offer',
  '/rules',
  '/tariffs',
  '/privacy',
  '/refund',
  '/contacts',
  '/api/auth/login', 
  '/api/auth/google-new',
  '/api/dentists/public',
  '/api/slots/public',
  '/api/hello'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Пропускаем, если это публичный раздел
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
  
  if (!isPublicRoute) {
    const dentistId = request.cookies.get('dentistId')?.value;
    
    // Если нет куки — только тогда на логин
    if (!dentistId) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Если залогинен, проверяем наличие dentistId в URL
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