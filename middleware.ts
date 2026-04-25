import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Список публичных маршрутов, доступных БЕЗ регистрации
const publicRoutes = [
  '/',                          // Главная
  '/login',                     // Вход
  '/services',                  // Услуги
  '/segments',                  // Сегменты
  '/offer',                     // Оферта (из Footer.tsx)
  '/rules',                     // Правила (из Footer.tsx)
  '/tariffs',                   // Тарифы (из Footer.tsx)
  '/privacy',                   // Конфиденциальность (из Footer.tsx)
  '/refund',                    // Возврат (из Footer.tsx)
  '/contacts',                  // Контакты (из Footer.tsx)
  '/api/auth/login', 
  '/api/auth/google-new',       // Новый эндпоинт
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
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
  
  if (!isPublicRoute) {
    const dentistId = request.cookies.get('dentistId')?.value;
    
    // Перенаправляем на логин ТОЛЬКО если это не публичный путь и нет куки
    if (!dentistId) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Если залогинен, добавляем dentistId в URL для кабинета
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