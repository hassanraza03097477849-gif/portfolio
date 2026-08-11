import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

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

async function fixTimelineData() {
  console.log("Injecting proper dummy data to cv/main...");
  await db.collection("cv").doc("main").set({
    name: "Hassan Raza",
    title: "Full Stack Developer",
    email: "hassanraza03097477849@gmail.com",
    phone: "0309-7477849",
    location: "Karachi, Pakistan",
    avatarUrl: "",
    summary: "I am a highly driven Full Stack Developer based in Karachi, Pakistan, specializing in architecting robust, scalable backend systems and dynamic frontend interfaces. My approach is deeply analytical, stemming from a foundation in Pre-Engineering, which allows me to approach software development as a rigorous discipline of logic and optimization.",
    experience: [
      {
        role: "Full Stack Developer",
        company: "Raddium Technology",
        dates: "Jan 2025 - May 2026",
        description: "- Engineered mission-critical backend architecture...\n- Designed and deployed secure RESTful APIs...\n- Implemented comprehensive OAuth 2.0...",
        tags: ["Laravel", "MySQL", "REST API", "OAuth"]
      },
      {
        role: "Receptionist / Admin",
        company: "Al-Azhar School",
        dates: "2024 - 2025",
        description: "Managed fast-paced front-desk operations, visitor handling, and highly detailed student administrative records, fostering a strong foundation in data organization.",
        tags: ["Admin", "Data Entry"]
      },
      {
        role: "Billing Operator",
        company: "Nafey Traders",
        dates: "2023 - 2024",
        description: "Operated high-throughput POS systems for billing execution and implemented proactive inventory stock level management protocols.",
        tags: ["POS", "Inventory"]
      }
    ]
  });
  console.log("Done!");
}

fixTimelineData().catch(console.error);
