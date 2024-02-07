//Firebase
import { initializeApp } from "firebase/app";
import { connectStorageEmulator, getStorage, ref, uploadBytes } from 'firebase/storage';
import fs from "fs";
import path from "path";

const firebaseConfig = {
  apiKey: "AIzaSyAneNAD2jfP63gmC9rlvn2TLF8livxpYxo",
  authDomain: "andremourasantos-2c83a.firebaseapp.com",
  projectId: "andremourasantos-2c83a",
  storageBucket: "andremourasantos-2c83a.appspot.com",
  messagingSenderId: "495363231805",
  appId: "1:495363231805:web:67b7dba4f0dff32d49da54",
  measurementId: "G-RWXZ8BGYKH"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();

// dev environment script
connectStorageEmulator(storage, '0.0.0.0', 9199);

async function uploadAllIconsToStorage() {
  const currentFilePath = new URL(import.meta.url).pathname;
  const currentDir = path.dirname(currentFilePath);
  const iconsFolder = path.join(currentDir, "src", "assets", "icons");

  const icons = fs.readdirSync(iconsFolder);

  try {
    for (const fileName of icons) {
      const filePath = path.join(iconsFolder, fileName);
      const fileData = fs.readFileSync(filePath);
  
      const storageRef = ref(storage, 'icons/' + fileName);
      const snapshot = await uploadBytes(storageRef, fileData);

      console.log('Uploaded file: ' + snapshot.metadata.name);
    }
  } catch (error) {
    console.error(error);
  }
}

uploadAllIconsToStorage();