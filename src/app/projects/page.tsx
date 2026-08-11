import { adminDb } from "@/lib/firebase/admin";
import ProjectsClient from "./ProjectsClient";

export const revalidate = 60; // ISR cache

export default async function Page() {
  const projectsSnapshot = await adminDb.collection("projects").get();
  const projectsData = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Sort by year descending if desired, or however they are ordered.
  projectsData.sort((a: any, b: any) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));

  return <ProjectsClient projectsData={projectsData} />;
}
