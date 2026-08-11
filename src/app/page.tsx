import { adminDb } from "@/lib/firebase/admin";
import HomeClient from "./HomeClient";
import type { Metadata } from "next";

export const revalidate = 60; // ISR

export async function generateMetadata(): Promise<Metadata> {
  const settingsDoc = await adminDb.collection("siteSettings").doc("main").get();
  const settings = settingsDoc.data() || { title: "Hassan Raza | Portfolio", description: "Portfolio" };

  return {
    title: settings.title,
    description: settings.description,
  };
}

export default async function Page() {
  const heroDoc = await adminDb.collection("siteContent").doc("hero").get();
  const heroData = heroDoc.exists ? heroDoc.data() : {
    line1: "HASSAN",
    line2: "RAZA",
    line3: "",
    tagline: "Detail-oriented Full Stack Developer...",
    ctaText: "View Value Add"
  };

  const settingsDoc = await adminDb.collection("siteSettings").doc("main").get();
  const settings = settingsDoc.data() || { title: "Hassan Raza | Portfolio" };

  const projectsSnapshot = await adminDb.collection("projects").get();
  const projectsData = projectsSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));

  const aboutDoc = await adminDb.collection("siteContent").doc("about").get();
  const aboutData = aboutDoc.exists ? aboutDoc.data() : {
    headline: "Engineered\nfor Scale.",
    description: "I am a Full Stack Developer...",
    metrics: []
  };

  const cvDoc = await adminDb.collection("cv").doc("main").get();
  const cvData = cvDoc.exists ? cvDoc.data() : {
    experience: []
  };

  const stackDoc = await adminDb.collection("siteContent").doc("stack").get();
  const stackData = stackDoc.exists ? stackDoc.data() : {
    items: [
      "NEXT.JS",
      "TYPESCRIPT",
      "TAILWIND CSS",
      "NODE.JS",
      "POSTGRESQL",
      "FIREBASE",
      "DOCKER",
      "REDIS",
      "AWS",
      "LARAVEL",
      "VUE.JS",
      "MONGODB"
    ]
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": settings.title,
    "jobTitle": heroData?.tagline || "",
    "url": "https://hassanraza.portfolio",
    "sameAs": []
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient heroData={heroData} projectsData={projectsData} aboutData={aboutData} cvData={cvData} stackData={stackData} />
    </>
  );
}
