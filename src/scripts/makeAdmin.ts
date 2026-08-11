import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

async function addAdmin() {
  const auth = getAuth();
  const db = getFirestore();
  const email = "kansanrace@gmail.com";
  
  try {
    const user = await auth.getUserByEmail(email);
    await db.collection("admins").doc(user.uid).set({ 
      email: user.email, 
      role: "admin", 
      createdAt: new Date() 
    });
    console.log(`Successfully added ${email} (UID: ${user.uid}) as an admin in Firestore!`);
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      console.error(`User ${email} does not exist in Firebase Authentication yet. Please sign up or log in first, then run this script.`);
    } else {
      console.error("Error adding admin:", error);
    }
  }
}

addAdmin();
