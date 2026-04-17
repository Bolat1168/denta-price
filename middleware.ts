import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/dentist-cabinet')) {
    const dentistId = request.cookies.get('dentistId')?.value;
    if (!dentistId) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    const url = new URL(request.url);
    if (!url.searchParams.has('dentistId')) {
      url.searchParams.set('dentistId', dentistId);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/dentist-cabinet/:path*',
};