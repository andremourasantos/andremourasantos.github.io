import { app } from '@/firebase';
import { initializeFirestore, persistentMultipleTabManager, persistentLocalCache, connectFirestoreEmulator, doc, setDoc, serverTimestamp, collection, query, where, orderBy, getDocs, getDocsFromCache, getDoc, getDocFromCache } from 'firebase/firestore';

app;
const db = initializeFirestore(app, { 
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  }),
})

// dev environment script
if(import.meta.env.DEV){
  var sessionStorageKeyForEmulatorCheck:string = 'EmulatorsConnection';
  console.warn('Connecting with Firestore Emulator...');
  connectFirestoreEmulator(db, '0.0.0.0', 8080);
  testFirestoreEmulatorConnection();
}
/**
 * Checks if the current session indicates an emulator connection is true.
 * @returns {boolean} Returns true if the emulator session connection is true, otherwise returns false.
 */
function checkIfEmulatorSessionConnectionIsTrue():boolean {
  if(sessionStorage.getItem(sessionStorageKeyForEmulatorCheck) === 'true') {
    return true;
  } else {
    return false;
  }
}

/**
 * Tests the connection to the Firestore Emulator.
 * If the emulator session connection is already marked as true, logs a message indicating the connection is already OK.
 * If not, attempts to establish a connection to the Firestore Emulator, sets the session connection to true upon success,
 * and creates required collections on the emulator.
 */
async function testFirestoreEmulatorConnection() {
  if(checkIfEmulatorSessionConnectionIsTrue()){
    return console.log('Connection with Firestore Emulator already marked as Ok.');
  };

  console.warn('Testing connection to the Firestore Emulator...');
  
  const ref = doc(db, 'cities', 'CWB')
  await setDoc(ref, {
    population: 'me'
  })
  .then(async () => {
    console.log('Firestore Emulator connection was successfull!');

    sessionStorage.setItem(sessionStorageKeyForEmulatorCheck, 'true');

    // create collections on emulator
    await createRecommendationsCollection();
    await createComplementaryServicesCollection()
      .catch(error => {return console.error(error)})
    await createServicesCollection();
    console.log('All good to go!');
  })
  .catch(error => {
    console.error('Firestore Emulator connection was unsuccessufull due to:', error);
  })
}

import recommendationsJSON from '@/data/recommendations.json';
import marketingJSON from '@/data/mkt-services.json';
import webJSON from '@/data/web-services.json';
import projectsJSON from '@/data/projects.json';

/**
 * Creates the recommendations collection in Firestore based on the data provided in the recommendationsJSON object.
 * @returns {Promise<void>} Returns a promise that resolves when the collection creation is complete.
 */
async function createRecommendationsCollection():Promise<void> {
  console.warn('Creating recommendations collection...');

  for (const [index, entry] of Object.entries(recommendationsJSON)) {
    const info:PresentationCardInfo = entry as PresentationCardInfo;

    const ref = doc(db, 'recommendations', info.author.name);
    await setDoc(ref, {
      type: info.type,
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
 * Creates the complementary services collection in Firestore based on the data provided in the marketingJSON and webJSON objects.
 * @returns {Promise<void>} Returns a promise that resolves when the collection creation and population are complete.
 */
async function createComplementaryServicesCollection(): Promise<void> {
  console.warn('Creating complementary services collection...');

  const docCategory: string = 'pageInfo';
  const docRefPath: string = `services/${docCategory}/`;

  try {
    console.warn('Populating with Marketing related services...');

    for (const [index, entry] of Object.entries(marketingJSON)) {
      const info: ServiceInfoJSON = entry as ServiceInfoJSON;

      const ref = doc(db, docRefPath + 'marketing', entry.id);
      await setDoc(ref, {
        id: info.id,
        show: info.show,
        status: info.status,
        group: info.group,
        image: info.image,
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
      const info: ServiceInfoJSON = entry as ServiceInfoJSON;

      const ref = doc(db, docRefPath + 'web', entry.id);
      await setDoc(ref, {
        id: info.id,
        show: info.show,
        status: info.status,
        group: info.group,
        image: info.image,
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
}

/**
 * Creates the services collection in Firestore based on the data provided in the marketingJSON and webJSON objects.
 * @returns {Promise<void>} Returns a promise that resolves when the collection creation and population are complete.
 */
async function createServicesCollection():Promise<void> {
  console.warn('Creating services collection...');

  const docCategory:string = 'modalInfo';
  const docRefPath:string = `services/${docCategory}/`;

  console.warn('Populating with Marketing related services...');
  for (const [index, entry] of Object.entries(marketingJSON)) {
    const info:ServiceInfoJSON = entry as ServiceInfoJSON;

    // flatten tableOfBenefits
    const flattenedTableOfBenefits = info.tableOfBenefits.map(([col1, col2, col3]) => ({ col1, col2, col3 }));

    const ref = doc(db, docRefPath + 'marketing', entry.id);
    await setDoc(ref, {
      id: info.id,
      show: info.show,
      status: info.status,
      group: info.group,
      image: info.image,
      title: info.title,
      description: info.description,
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
    const info:ServiceInfoJSON = entry as ServiceInfoJSON;

    // flatten tableOfBenefits
    const flattenedTableOfBenefits = info.tableOfBenefits.map(([col1, col2, col3]) => ({ col1, col2, col3 }));

    const ref = doc(db, docRefPath + 'web', entry.id);
    await setDoc(ref, {
      id: info.id,
      show: info.show,
      status: info.status,
      group: info.group,
      image: info.image,
      title: info.title,
      description: info.description,
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

// getting data from the cloud
/**
 * Sets a cookie to mark the cache as synced with the cloud, with an expiration date set to 7 days from the current date.
 * The cookie will be valid across the entire website.
 * @returns {void} This function does not return anything.
 */
function setCookieWithCacheToCloudSyncedDate():void {
  var currentDate = new Date();

  var expirationDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds

  var expiresUTC = expirationDate.toUTCString();

  document.cookie = "cacheSyncedWithCloud=true; expires=" + expiresUTC + "; path=/";
}

/**
 * Retrieves the value of the specified cookie by its name.
 * @param {string} cookieName - The name of the cookie to retrieve.
 * @returns {string | 'Not found'} Returns the value of the cookie if found, otherwise returns 'Not found'.
 */
function getCookieValue(cookieName:string):string | 'Not found' {
  const cookies = document.cookie.split(';');

  for (const entry of cookies) {
    const cookie = entry.trim();

    if(cookie.split('=')[0] === cookieName){
      return cookie.split('=')[1];
    }
  }

  return 'Not found';
}

/**
 * Checks if there is a need to synchronize the cache with the cloud by examining the value of the 'cacheSyncedWithCloud' cookie.
 * @returns {boolean} Returns true if the cache needs to be synced with the cloud, otherwise returns false.
 */
function checkNeedToSyncCacheWithCloud():boolean {
  if(getCookieValue('cacheSyncedWithCloud') === 'true'){
    if(import.meta.env.DEV){
      console.log('Cache already synced with Cloud.');
    };

    return false;
  } else {
    if(import.meta.env.DEV){
      console.warn('Cache need to be synced with Cloud.');
    };

    return true;
  }
}

/**
 * Retrieves page information for services of the specified service category.
 * @param {ServiceCategory} serviceCategory - The category of services to retrieve page information for.
 * @returns {Promise<TinyServiceInfo[]>} Returns a promise that resolves with an array of TinyServiceInfo objects representing the page information for the services.
 */
export async function getPageInfoForServices(serviceCategory:ServiceCategory):Promise<TinyServiceInfo[]> {
  const q = query(collection(db, `services/pageInfo/${serviceCategory}`), where('show', '==', true), orderBy("timeStamp", "asc"));

  const cachedSnapshot = await getDocsFromCache(q);
  const servicesArray:TinyServiceInfo[] = [];
  
  if(checkNeedToSyncCacheWithCloud() || cachedSnapshot.empty){
    if(import.meta.env.DEV){console.log('Information fetched from the server.')}

    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const docData = doc.data() as TinyServiceInfo;
  
      servicesArray.push({id: doc.id, ...docData});
    });
    
    setCookieWithCacheToCloudSyncedDate();
  } else {
    if(import.meta.env.DEV){console.log('Information fetched from cache.')}

    cachedSnapshot.forEach(doc => {
      const docData = doc.data() as TinyServiceInfo;
  
      servicesArray.push({id: doc.id, ...docData});
    })
  }

  return servicesArray;
}

/**
 * Retrieves page information for an individual service of the specified service category.
 * @param {ServiceCategory} serviceCategory - The category of the service to retrieve page information for.
 * @param {string} serviceID - The ID of the individual service to retrieve page information for.
 * @returns {Promise<TinyServiceInfo>} Returns a promise that resolves with a TinyServiceInfo object representing the page information for the individual service.
 */
export async function getPageInfoForIndividualService(serviceCategory:ServiceCategory, serviceID:string):Promise<TinyServiceInfo> {
  const docRef = doc(db, `services/pageInfo/${serviceCategory}`, serviceID);
  let cachedVersionExists:boolean;
  let serviceInfo:TinyServiceInfo;
    
  try {
    const cachedSnapshot = await getDocFromCache(docRef);

    if(cachedSnapshot.data() === undefined){
      cachedVersionExists = false;
      throw new Error()
    } else {
      serviceInfo = cachedSnapshot.data() as TinyServiceInfo;
      cachedVersionExists = true;
    }
  } catch (error) {
    const snapshot = await getDoc(docRef);

    serviceInfo = snapshot.data() as TinyServiceInfo;
  }
  
  return serviceInfo;
}

// getting data for the modal
/**
 * Checks the existence and availability of a service based on its ID and category.
 * @param {string} serviceID - The ID of the service to check.
 * @param {ServiceCategory} serviceCategory - The category of the service to check.
 * @returns {Promise<"exists" | "does_not" | "unavailable">} Returns a promise that resolves with a string indicating the existence and availability status of the service.
 */
export async function checkServiceExistenceV3(serviceID:string, serviceCategory:ServiceCategory):Promise<"exists" | "does_not" | "unavailable"> {
  let serviceInfo:ServiceInfo;
  const docRef = doc(db, `services/pageInfo/${serviceCategory}`, serviceID);

  const cachedSnapshot = await getDocFromCache(docRef);
  
  if(checkNeedToSyncCacheWithCloud() || cachedSnapshot.data() === undefined){
    const cloudSnapshot = await getDoc(docRef);

    serviceInfo = cloudSnapshot.data() as ServiceInfo;
  } else {
    serviceInfo = cachedSnapshot.data() as ServiceInfo;
  }

  return new Promise(resolve => {
    if(serviceInfo === undefined){
      alert('Desculpe, ocorreu um erro ao recuperar as informações sobre este serviço.');
      return resolve('does_not');
    } else if (serviceInfo.status === 'Indisponível') {
      alert('Desculpe, este serviço não está disponível no momento.');
      return resolve('unavailable');
    } else {
      return resolve('exists');
    }
  })
}

/**
 * Retrieves modal information for services of the specified service category and service ID.
 * @param {ServiceCategory} serviceCategory - The category of the service to retrieve modal information for.
 * @param {string} serviceID - The ID of the service to retrieve modal information for.
 * @returns {Promise<ServiceInfo>} Returns a promise that resolves with a ServiceInfo object representing the modal information for the service.
 */
export async function getModalInfoForServices(serviceCategory:ServiceCategory, serviceID:string):Promise<ServiceInfo> {
  const docRef = doc(db, `services/modalInfo/${serviceCategory}`, serviceID);

  let cachedVersionExists:boolean;
  let serviceInfo:ServiceInfo;

  try {
    const cachedSnapshot = await getDocFromCache(docRef);
    
    if(cachedSnapshot.data() === undefined){throw new Error()}

    serviceInfo = cachedSnapshot.data() as ServiceInfo;
    cachedVersionExists = true;
  } catch (error) {
    cachedVersionExists = false;
  }

  if(!cachedVersionExists){
    const snapshot = await getDoc(docRef);

    serviceInfo = snapshot.data() as ServiceInfo;
  }

  if(import.meta.env.DEV){
    console.log('Cached version of modal exists: ', cachedVersionExists);
  }

  return serviceInfo;
}

// offline code
/**
 * Checks the existence of a project based on its ID.
 * @param {string} projectId - The ID of the project to check.
 * @returns {Promise<boolean>} Returns a promise that resolves with a boolean value indicating whether the project exists.
 */
export async function checkProjectExistence(projectId:string):Promise<boolean> {
  let projectInfo:ProjectInfo = projectsJSON.find(obj => {return obj.id === projectId}) as ProjectInfo;

  return new Promise<boolean>((resolve) => {
    if(projectInfo !== undefined){
      return resolve(true);
    } else {
      return resolve(false);
    }
  });
}