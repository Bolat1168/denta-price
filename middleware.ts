import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Маршруты, которые доступны ВСЕМ без логина и регистрации
const publicRoutes = [
  '/',                          // Главная
  '/login',                     // Страница входа
  '/register',                  // Страница регистрации
  '/services',                  // Услуги
  '/segments',                  // Сегменты
  '/offer',                     // Оферта
  '/rules',                     // Правила
  '/tariffs',                   // Тарифы
  '/privacy',                   // Конфиденциальность
  '/refund',                    // Возврат
  '/contacts',                  // Контакты
  '/api/auth/login', 
  '/api/auth/register',
  '/api/auth/google-new',       // Новый эндпоинт для Google
  '/api/dentists/public',
  '/api/slots/public',
  '/api/prices',
  '/api/hello'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Если путь есть в списке publicRoutes, разрешаем доступ без проверок
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
  
  if (!isPublicRoute) {
    const dentistId = request.cookies.get('dentistId')?.value;
    
    // Если пользователь не авторизован (нет куки) и лезет в защищенный раздел
    if (!dentistId) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Если авторизован, обеспечиваем наличие dentistId в параметрах URL
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