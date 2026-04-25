import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Список публичных маршрутов, которые доступны ВСЕМ без регистрации
const publicRoutes = [
  '/',                          // Главная
  '/login',                     // Вход
  '/register',                  // Регистрация (если решишь вернуть ссылку)
  '/services',                  // Услуги
  '/segments',                  // Сегменты
  '/prices',                    // Цены
  '/offer',                     // Оферта
  '/rules',                     // Правила
  '/tariffs',                   // Тарифы
  '/privacy',                   // Конфиденциальность
  '/refund',                    // Возврат
  '/contacts',                  // Контакты
  '/api/auth/login', 
  '/api/auth/register',
  '/api/auth/google',
  '/api/auth/google/callback',
  '/api/auth/google-new',       // Новый эндпоинт для Google
  '/api/dentists/public',
  '/api/slots/public',
  '/api/prices/almaty',
  '/api/prices/promotion',
  '/api/hello',
  '/api/ping'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Проверяем, является ли маршрут публичным
  // Если путь начинается с любого из publicRoutes, пропускаем без проверки
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  
  if (!isPublicRoute) {
    const dentistId = request.cookies.get('dentistId')?.value;
    
    // Если пользователь не залогинен и лезет в защищенную зону (кабинет)
    if (!dentistId) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Если залогинен, добавляем ID в параметры для работы системы
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