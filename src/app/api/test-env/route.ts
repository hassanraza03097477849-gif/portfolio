import { NextResponse } from 'next/server';

export async function GET() {
  const pk = process.env.FIREBASE_PRIVATE_KEY || '';
  return NextResponse.json({
    projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
    privateKeyProvided: !!pk,
    privateKeyLength: pk.length,
    privateKeyStartsWithBegin: pk.includes('BEGIN PRIVATE KEY'),
    privateKeyHasLiteralSlashN: pk.includes('\\n'),
    privateKeyHasActualNewlines: pk.includes('\n'),
    privateKeyHasQuotes: pk.startsWith('"') || pk.endsWith('"'),
  }, { status: 200 });
}
