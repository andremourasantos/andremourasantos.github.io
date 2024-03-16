import { app } from '@/firebase';
import { connectStorageEmulator, getStorage, ref, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

// dev environment script
if(import.meta.env.DEV){
  console.warn('Connecting with Storage Emulator...');
  connectStorageEmulator(storage, '127.0.0.1', 9199);
}

/**
 * Retrieves the download URL for a specific icon from Firebase Storage.
 * @param {string} iconName - The name of the icon.
 * @returns {Promise<string>} Returns a promise that resolves with the download URL of the specified icon.
 */
export async function getIconURLFromStorage(iconName:string):Promise<string> {
  const iconRef = ref(storage, `icons/${iconName}.png`);
  const path = await getDownloadURL(iconRef);

  return path;
}