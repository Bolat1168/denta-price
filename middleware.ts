import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/dentist-cabinet')) {
    const dentistId = request.cookies.get('dentistId')?.value;
    if (!dentistId) {
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }
    const url = new URL(request.url);
    if (!url.searchParams.has('id')) {
      url.searchParams.set('id', dentistId);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    const dentistId = request.cookies.get('dentistId')?.value;
    if (dentistId) {
      return NextResponse.redirect(new URL('/dentist-cabinet', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dentist-cabinet/:path*', '/login', '/register'],
};