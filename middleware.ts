import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for some auth token or session cookie. 
  // Firebase Auth handles the real security in Firestore Rules.
  // This is purely for UX to redirect unauthenticated users to the login page.
  const session = request.cookies.get('__session');

  if (!session && request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
