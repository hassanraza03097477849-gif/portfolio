import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './client';

export async function getDocument<T>(collection: string, documentId: string): Promise<T | null> {
  const docRef = doc(db, collection, documentId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as T;
  }
  return null;
}

export async function setDocument<T extends Record<string, any>>(collectionName: string, documentId: string, data: T): Promise<void> {
  const docRef = doc(db, collectionName, documentId);
  await setDoc(docRef, data, { merge: true });
}

import { collection, getDocs, addDoc, deleteDoc, query, orderBy, where, QueryConstraint } from 'firebase/firestore';

export async function getCollection<T>(collectionName: string, constraints: QueryConstraint[] = []): Promise<(T & { id: string })[]> {
  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T & { id: string }));
}

export async function addDocument<T extends Record<string, any>>(collectionName: string, data: T): Promise<string> {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
}

export async function deleteDocument(collectionName: string, documentId: string): Promise<void> {
  const docRef = doc(db, collectionName, documentId);
  await deleteDoc(docRef);
}
