import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  // Protect all routes under /admin except /admin/login
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    // We would normally verify the session here, but since this is middleware
    // and Firebase Admin is Node-only, we just check existence and verify fully on the server components
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
