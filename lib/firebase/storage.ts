import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { storage } from './client';

export async function uploadFile(path: string, file: File): Promise<string> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

export async function listAllFiles(path: string) {
  const listRef = ref(storage, path);
  const res = await listAll(listRef);
  
  const files = await Promise.all(res.items.map(async (itemRef) => {
    const url = await getDownloadURL(itemRef);
    return {
      name: itemRef.name,
      fullPath: itemRef.fullPath,
      url
    };
  }));
  return files;
}

export async function deleteFile(path: string): Promise<void> {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}
