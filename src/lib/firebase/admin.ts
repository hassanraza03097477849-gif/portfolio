import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

export function initAdmin() {
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

export const adminDb = new Proxy({}, {
  get(target, prop) {
    const db = getFirestore(initAdmin());
    const val = db[prop as keyof typeof db];
    return typeof val === 'function' ? val.bind(db) : val;
  }
}) as ReturnType<typeof getFirestore>;

export const adminAuth = new Proxy({}, {
  get(target, prop) {
    const auth = getAuth(initAdmin());
    const val = auth[prop as keyof typeof auth];
    return typeof val === 'function' ? val.bind(auth) : val;
  }
}) as ReturnType<typeof getAuth>;

export const adminStorage = new Proxy({}, {
  get(target, prop) {
    const storage = getStorage(initAdmin());
    const val = storage[prop as keyof typeof storage];
    return typeof val === 'function' ? val.bind(storage) : val;
  }
}) as ReturnType<typeof getStorage>;
