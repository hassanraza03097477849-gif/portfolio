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

async function seed() {
  console.log("Seeding site settings...");
  await db.collection("siteSettings").doc("main").set({
    title: "Hassan Raza | Portfolio",
    description: "Full Stack Engineer portfolio",
    theme: "light",
  });

  console.log("Seeding site content - Hero...");
  await db.collection("siteContent").doc("hero").set({
    line1: "Architecting",
    line2: "Digital",
    line3: "Systems.",
    tagline: "Full Stack Engineer based in Karachi, PK.",
    ctaText: "View Case Studies",
    marqueeItems: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Node.js"],
  });

  console.log("Seeding projects...");
  for (const proj of allProjects) {
    await db.collection("projects").doc(proj.id).set(proj);
  }

  console.log("Seeding categories...");
  const categories = Array.from(new Set(allProjects.map(p => p.category)));
  for (const cat of categories) {
    const docId = cat.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
    await db.collection("categories").doc(docId).set({ name: cat });
  }

  console.log("Seeding CV data...");
  await db.collection("cv").doc("main").set({
    name: "Hassan Raza",
    title: "Full Stack Engineer",
    summary: "Detail-oriented Full Stack Developer with robust experience...",
    experience: [
      { role: "Senior Developer", company: "Tech Co", year: "2023-Present" }
    ],
    skills: ["React", "Next.js", "Firebase", "Node.js", "TypeScript"]
  });

  console.log("Seeding completed!");
}

seed().catch(console.error);
