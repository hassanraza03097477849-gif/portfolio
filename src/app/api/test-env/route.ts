import { NextResponse } from 'next/server';
import { cert, initializeApp, getApps } from 'firebase-admin/app';

export async function GET() {
  const pk = process.env.FIREBASE_PRIVATE_KEY || '';
  
  let initError = null;
  
  if (getApps().length === 0) {
    try {
      const privateKey = pk.replace(/\\n/g, '\n').replace(/"/g, '');
      initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
      }, 'test-app');
    } catch (e: any) {
      initError = e.message || e.toString();
    }
  }

  return NextResponse.json({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKeyProvided: !!pk,
    privateKeyLength: pk.length,
    privateKeyStartsWithBegin: pk.includes('BEGIN PRIVATE KEY'),
    privateKeyHasLiteralSlashN: pk.includes('\\n'),
    privateKeyHasActualNewlines: pk.includes('\n'),
    privateKeyHasQuotes: pk.startsWith('"') || pk.endsWith('"'),
    initError,
  }, { status: 200 });
}
