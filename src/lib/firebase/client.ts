import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  projectId: "portfolio-cms-9f95dd",
  appId: "1:181112726552:web:2bb6c5f4d0632f695f0f6d",
  storageBucket: "portfolio-cms-9f95dd.firebasestorage.app",
  apiKey: "AIzaSyAo7nqu6rmWq-RZjgP43Z7zT_mHunYJ2iE",
  authDomain: "portfolio-cms-9f95dd.firebaseapp.com",
  messagingSenderId: "181112726552",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
