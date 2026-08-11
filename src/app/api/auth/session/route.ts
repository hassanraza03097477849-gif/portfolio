import { NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/firebase/admin';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: 'Missing ID Token' }, { status: 400 });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await getAdminAuth().createSessionCookie(idToken, { expiresIn });

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
    });

    return response;
  } catch (error: any) {
    console.error('Session creation error:', error);
    const errorMessage = error && error.message ? error.message : String(error);
    const errorStack = error && error.stack ? error.stack : 'No stack';
    
    // Return 200 so Vercel doesn't intercept it, and we can see exactly what's failing in the UI
    return NextResponse.json({ 
      error: errorMessage,
      details: errorStack 
    }, { status: 200 });
  }
}
