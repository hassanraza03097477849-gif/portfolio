import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminStorage } from '@/lib/firebase/admin';
import { renderToStream } from '@react-pdf/renderer';
import { CVDocument } from '@/components/admin/CVDocument';
import { CVData } from '@/lib/types';
import React from 'react';

// Required for React-PDF in Next.js App Router API routes to avoid some stream polyfill issues
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // 1. Fetch latest CV data
    const docSnap = await adminDb.collection('cv').doc('main').get();
    if (!docSnap.exists) {
      return NextResponse.json({ message: 'CV data not found' }, { status: 404 });
    }
    const data = docSnap.data() as CVData;

    // 2. Render PDF to stream
    const stream = await renderToStream(React.createElement(CVDocument, { data }) as any);
    
    // Convert stream to Buffer
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    const pdfBuffer = Buffer.concat(chunks);

    // 3. Upload to Firebase Storage
    const bucket = adminStorage.bucket(); // Ensure NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET is set
    const file = bucket.file('cv/latest.pdf');
    
    await file.save(pdfBuffer, {
      metadata: {
        contentType: 'application/pdf',
      },
      public: true, // Make it publicly readable
    });

    // Make file public to get a permanent public URL if bucket is not fully public
    await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/cv/latest.pdf`;

    // 4. Update Firestore with new meta
    await adminDb.collection('cv').doc('main').set({
      meta: {
        pdfUrl: publicUrl,
        lastGeneratedAt: new Date().toISOString(),
        version: (data.meta?.version || 0) + 1
      }
    }, { merge: true });

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
