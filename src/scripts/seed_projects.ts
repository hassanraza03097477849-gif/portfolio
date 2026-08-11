import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { allProjects } from '../data/projects';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

async function seedProjects() {
  console.log("Seeding projects...");
  for (const project of allProjects) {
    const docRef = db.collection("projects").doc(project.id);
    await docRef.set(project);
    console.log(`Seeded project: ${project.id}`);
  }
  console.log("Done!");
}

seedProjects().catch(console.error);
