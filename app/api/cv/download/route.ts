import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { CVData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const docSnap = await adminDb.collection('cv').doc('main').get();
    if (docSnap.exists) {
      const data = docSnap.data() as CVData;
      if (data.meta?.pdfUrl) {
        return NextResponse.redirect(data.meta.pdfUrl);
      }
    }
    return NextResponse.json({ message: 'CV not available' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching CV:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
