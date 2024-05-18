//Firebase
import { initializeApp } from "firebase/app";
import { connectStorageEmulator, getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, connectFirestoreEmulator, doc, setDoc, serverTimestamp } from 'firebase/firestore';
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
}

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore(app);

// dev environment script
connectStorageEmulator(storage, '127.0.0.1', 9199);
connectFirestoreEmulator(db, '127.0.0.1', 8080);

/**
 * Main function to execute various tasks, including uploadAllIconsToStorage, createComplementaryServicesCollection and createServicesCollection.
 * @returns {Promise<void>} Returns a promise that resolves when all tasks are complete.
 */
async function main() {
  await uploadAllIconsToStorage();
  await createRecommendationsCollection();
  await createComplementaryServicesCollection();
  await createServicesCollection();
  return console.log('All good to go!');
}

/**
 * Uploads all icons from the specified folder to Firebase Storage.
 * @returns {Promise<void>} Returns a promise that resolves when all icons are successfully uploaded.
 */
async function uploadAllIconsToStorage() {
  //@ts-ignore
  const currentFilePath = new URL(import.meta.url).pathname;
  const currentDir = path.dirname(currentFilePath);
  const iconsFolder = path.join("scripts", "icons");
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

  return;
}

/**
 * Retrieves the download URL for a specific icon from Firebase Storage.
 * @param {string} iconName - The name of the icon.
 * @returns {Promise<string>} Returns a promise that resolves with the download URL of the specified icon.
 */
async function getIconURLFromStorage(iconName) {
  const iconRef = ref(storage, `icons/${iconName}.png`);
  const path = await getDownloadURL(iconRef);

  return path;
}

// information to add to the database
import recommendationsJSON from '../src/data/recommendations.json' assert { type: 'json' };
import marketingJSON from '../src/data/mkt-services.json' assert { type: 'json' };
import webJSON from '../src/data/web-services.json' assert { type: 'json' };

/**
 * Creates the recommendations collection in Firestore based on the data provided in the recommendationsJSON object.
 * @returns {Promise<void>} Returns a promise that resolves when the collection creation is complete.
 */
async function createRecommendationsCollection() {
  console.warn('Creating recommendations collection...');

  for (const [index, entry] of Object.entries(recommendationsJSON)) {
    const info = entry; // as RecommendationsCard

    const id = info.author.name.normalize('NFKD').replace(/[\u0300-\u036f]/g, "").replace(' ', '-').toLocaleLowerCase();

    const ref = doc(db, 'recommendations', id);
    await setDoc(ref, {
      order: info.order,
      source: info.source,
      author: info.author,
      icon: info.icon,
      text: info.text
    });
  };

  return new Promise((resolve) => {
    console.log('OK.');
    return resolve();
  })
}

/**
 * Creates and populates the complementary services collection in Firestore based on provided JSON data.
 * @returns {Promise<void>} Returns a promise that resolves when the collection creation and population are complete.
 */
async function createComplementaryServicesCollection() {
  console.warn('Creating complementary services collection...');

  const docCategory = 'pageInfo';
  const docRefPath = `services/${docCategory}/`;

  try {
    console.warn('Populating with Marketing related services...');

    for (const [index, entry] of Object.entries(marketingJSON)) {
      const info = entry; //as ServiceInfoJSON

      const ref = doc(db, docRefPath + 'marketing', entry.id);
      await setDoc(ref, {
        id: info.id,
        show: info.show,
        status: info.status,
        group: info.group,
        image: await getIconURLFromStorage(info.image),
        title: info.title,
        description: info.description,
        timeStamp: serverTimestamp()
      });
    };

    console.log('OK.');
  } catch (error) {
    console.error('Error while populating Marketing services:', error);
    throw error;
  }

  try {
    console.warn('Populating with Web related services...');

    for (const [index, entry] of Object.entries(webJSON)) {
      const info = entry; // as ServiceInfoJSON

      const ref = doc(db, docRefPath + 'web', entry.id);
      await setDoc(ref, {
        id: info.id,
        show: info.show,
        status: info.status,
        group: info.group,
        image: await getIconURLFromStorage(info.image),
        title: info.title,
        description: info.description,
        timeStamp: serverTimestamp()
      });
    };

    console.log('OK.');
  } catch (error) {
    console.error('Error while populating Web services:', error);
    throw error;
  }

  const docRef = doc(db, 'services', 'pageInfo');
  await setDoc(docRef, {
    lastWebUpdate: serverTimestamp(),
    lastMarketingUpdate: serverTimestamp()
  });

  return;
}

/**
 * Creates and populates the services collection in Firestore based on provided JSON data.
 * @returns {Promise<void>} Returns a promise that resolves when the collection creation and population are complete.
 */
async function createServicesCollection() {
  console.warn('Creating services collection...');

  const docCategory = 'modalInfo';
  const docRefPath = `services/${docCategory}/`;

  console.warn('Populating with Marketing related services...');
  for (const [index, entry] of Object.entries(marketingJSON)) {
    const info = entry; // as ServiceInfoJSON

    // flatten tableOfBenefits
    const flattenedTableOfBenefits = info.tableOfBenefits.map(([col1, col2, col3]) => ({ col1, col2, col3 }));

    const ref = doc(db, docRefPath + 'marketing', entry.id);
    await setDoc(ref, {
      id: info.id,
      introduction: info.introduction,
      tableOfBenefits: flattenedTableOfBenefits,
      serviceInfo: {
        deadline: info.serviceInfo.deadline,
        price: info.serviceInfo.price
      },
      footerNotes: info.footerNotes
    });
  };

  console.log('OK.');

  console.warn('Populating with Web related services...');
  for (const [index, entry] of Object.entries(webJSON)) {
    const info = entry; // as ServiceInfoJSON

    // flatten tableOfBenefits
    const flattenedTableOfBenefits = info.tableOfBenefits.map(([col1, col2, col3]) => ({ col1, col2, col3 }));

    const ref = doc(db, docRefPath + 'web', entry.id);
    await setDoc(ref, {
      id: info.id,
      introduction: info.introduction,
      tableOfBenefits: flattenedTableOfBenefits,
      serviceInfo: {
        deadline: info.serviceInfo.deadline,
        price: info.serviceInfo.price
      },
      footerNotes: info.footerNotes
    });
  };

  return new Promise((resolve) => {
    console.log('OK.');
    return resolve();
  })
}

main();