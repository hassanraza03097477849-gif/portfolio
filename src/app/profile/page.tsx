import { adminDb } from "@/lib/firebase/admin";
import ProfileClient from "./ProfileClient";

export const revalidate = 0; // Dynamic route

export default async function ProfilePage() {
  const cvDoc = await adminDb.collection("cv").doc("main").get();
  const cvData = cvDoc.exists ? cvDoc.data() : {
    name: "Hassan Raza",
    title: "Full Stack Developer",
    email: "",
    phone: "",
    summary: "",
    experience: [],
    education: []
  };

  return <ProfileClient cvData={cvData} />;
}
