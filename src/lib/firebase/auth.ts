import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export function initAuthOnly() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const pk = process.env.FIREBASE_PRIVATE_KEY || '';
  const privateKey = pk.replace(/\\n/g, '\n').replace(/"/g, '');

  return initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
    storageBucket: "portfolio-cms-9f95dd.firebasestorage.app",
  });
}

export function getAdminAuthOnly() {
  return getAuth(initAuthOnly());
}
