import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

let app: any;
if (!getApps().length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY 
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/"/g, '')
      : undefined;
      
    app = initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
      storageBucket: "portfolio-cms-9f95dd.firebasestorage.app",
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
} else {
  app = getApps()[0];
}

export const adminDb = app ? getFirestore(app) : null as any;
export const adminAuth = app ? getAuth(app) : null as any;
export const adminStorage = app ? getStorage(app) : null as any;
