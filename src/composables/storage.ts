import { app } from '@/firebase';
import { connectStorageEmulator, getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

// dev environment script
if(import.meta.env.DEV){
  console.warn('Connecting with Storage Emulator...');
  connectStorageEmulator(storage, '0.0.0.0', 9199);
}

export async function getIconURLFromStorage(iconName:string):Promise<string> {
  const iconRef = ref(storage, `icons/${iconName}.png`);
  const path = await getDownloadURL(iconRef);

  return path;
}