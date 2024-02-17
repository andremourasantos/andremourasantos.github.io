import { app } from '@/firebase';
import { initializeFirestore, persistentMultipleTabManager, persistentLocalCache, connectFirestoreEmulator, doc, setDoc, collection, query, where, orderBy, getDocs, getDocsFromCache, getDoc, getDocFromCache, Timestamp, DocumentData } from 'firebase/firestore';

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

    console.log('All good to go!');
  })
  .catch(error => {
    console.error('Firestore Emulator connection was unsuccessufull due to:', error);
  })
}

// getting data from the cloud for the services
/**
 * Retrieves the timestamp of the last cloud update for a specific service category.
 *
 * @param {ServiceCategory} serviceCategory - The category of the service ('marketing' or 'web').
 * @returns {Promise<Number>} A promise that resolves to the timestamp of the last update.
 * @throws {Error} If there is an issue retrieving the document or if the service category is invalid.
 */
async function getLastCloudUpdate(serviceCategory:ServiceCategory):Promise<Number> {
  const docRef = doc(db, 'services', 'pageInfo');
  const info = await getDoc(docRef);
  let lastUpdate:Number;

  if(serviceCategory === 'marketing') {
    lastUpdate = info.data().lastMarketingUpdate.seconds as Number;
  } else {
    lastUpdate = info.data().lastWebUpdate.seconds as Number;
  }

  return lastUpdate;
}

/**
 * Saves the timestamp of the last cloud update for a specific service category in the local storage.
 *
 * @param {ServiceCategory} serviceCategory - The category of the service ('marketing' or 'web').
 * @returns {Promise<void>} A promise that resolves once the timestamp is saved in the local storage.
 */
async function saveLastCloudUpdateOnLocalStorage(serviceCategory:ServiceCategory):Promise<void> {
  const lastCloudUpdate = await getLastCloudUpdate(serviceCategory);
  const cacheName = serviceCategory === 'marketing' ? 'Marketing' : 'Web';

  localStorage.setItem(`last${cacheName}CacheSyncedWithCloud`, lastCloudUpdate.toString());
  updateNeedToSyncCacheOnSessionStorage(serviceCategory, false);
}

/**
 * Updates the status of whether the cache for a specific service category needs to be synced with the session storage.
 *
 * @param {ServiceCategory} serviceCategory - The category of the service ('marketing' or 'web').
 * @param {boolean} status - The status indicating whether the cache needs to be synced.
 * @returns {void}
 */
function updateNeedToSyncCacheOnSessionStorage(serviceCategory:ServiceCategory, status:boolean):void {
  const cacheName = serviceCategory === 'marketing' ? 'Marketing' : 'Web';

  sessionStorage.setItem(`needToSync${cacheName}Cache`, status.toString());
}

/**
 * Retrieves the status indicating whether the cache for a specific service category needs to be synced.
 *
 * @param {ServiceCategory} serviceCategory - The category of the service ('marketing' or 'web').
 * @returns {boolean} True if the cache needs to be synced, false otherwise.
 */
function getNeedToSyncCache(serviceCategory:ServiceCategory):boolean {
  const cacheName = serviceCategory === 'marketing' ? 'Marketing' : 'Web';
  const storage = sessionStorage.getItem(`needToSync${cacheName}Cache`);

  if(storage === null || storage === 'true'){
    return true;
  } else {
    return false;
  }
}

/**
 * Retrieves the timestamp of the last cloud update from local storage.
 * @returns {number} The timestamp of the last cloud update.
 */
function getLastCloudUpdateOnClient(serviceCategory:ServiceCategory):Number {
  const cacheName = serviceCategory === 'marketing' ? 'Marketing' : 'Web';

  return Number(localStorage.getItem(`last${cacheName}CacheSyncedWithCloud`));
}

/**
 * Checks if the cache for a specific service category is synchronized with the cloud.
 *
 * @param {ServiceCategory} serviceCategory - The category of the service ('marketing' or 'web').
 * @returns {Promise<boolean>} A promise that resolves to true if the cache needs to be synced with the cloud, otherwise false.
 */
export async function isCacheSyncedWithCloud(serviceCategory:ServiceCategory):Promise<boolean> {
  if(getNeedToSyncCache(serviceCategory) === false){
    if(import.meta.env.DEV){
      console.warn("Cache already checked on this session, therefore it wouldn't be checked again.")
    }

    return false;
  }

  const lastCloudUpdate = await getLastCloudUpdate(serviceCategory);

  if(getLastCloudUpdateOnClient(serviceCategory) === lastCloudUpdate){
    if(import.meta.env.DEV){
      console.log('Cache already synced with Cloud.');
    };

    updateNeedToSyncCacheOnSessionStorage(serviceCategory, false);

    return false;
  } else {
    if(import.meta.env.DEV){
      console.warn('Cache need to be synced with Cloud.');
    };

    updateNeedToSyncCacheOnSessionStorage(serviceCategory, true);

    return true;
  }
}

/**
 * Checks if the cache for a specific service category needs to be synced.
 *
 * @param {ServiceCategory} serviceCategory - The category of the service ('marketing' or 'web').
 * @returns {boolean} True if the cache needs to be synced, false otherwise.
 */
function checkNeedToSyncCache(serviceCategory:ServiceCategory):boolean {
  if(getNeedToSyncCache(serviceCategory)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Retrieves page information for services of the specified service category.
 * @param {ServiceCategory} serviceCategory - The category of services to retrieve page information for.
 * @returns {Promise<TinyServiceInfo[]>} Returns a promise that resolves with an array of TinyServiceInfo objects representing the page information for the services.
 */
export async function getPageInfoForServices(serviceCategory:ServiceCategory):Promise<TinyServiceInfo[]> {
  const q = query(collection(db, `services/pageInfo/${serviceCategory}`), where('show', '==', true), orderBy("timeStamp", "asc"));
  const qModal = query(collection(db, `services/modalInfo/${serviceCategory}`));

  const cachedSnapshot = await getDocsFromCache(q);
  const servicesArray:TinyServiceInfo[] = [];
  
  if(checkNeedToSyncCache(serviceCategory) || cachedSnapshot.empty){
    if(import.meta.env.DEV){console.log('Information fetched from the server.')}

    const snapshot = await getDocs(q);
    
    // update the modal cache for this specific service.
    await getDocs(qModal);

    snapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const docData = doc.data() as TinyServiceInfo;
  
      servicesArray.push({id: doc.id, ...docData});
    });
    
    await saveLastCloudUpdateOnLocalStorage(serviceCategory);
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

    if(checkNeedToSyncCache(serviceCategory) || cachedSnapshot.data() === undefined){
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

// getting data for the services modal
/**
 * Checks the existence and availability of a service based on its ID and category.
 * @param {string} serviceID - The ID of the service to check.
 * @param {ServiceCategory} serviceCategory - The category of the service.
 * @returns {Promise<"exists" | "does_not" | "unavailable">} Returns a promise that resolves with a string indicating the existence and availability status of the service.
 */
export async function checkServiceExistenceV3(serviceID:string, serviceCategory:ServiceCategory):Promise<"exists" | "does_not" | "unavailable"> {
  let serviceInfo:ServiceInfo;
  const docRef = doc(db, `services/pageInfo/${serviceCategory}`, serviceID);
  let cachedSnapshot:DocumentData;

  try {
    cachedSnapshot = await getDocFromCache(docRef);

    serviceInfo = cachedSnapshot.data() as ServiceInfo;
    
    if(import.meta.env.DEV) {
      console.log('Cached data does exists for this service: ' + serviceID)
    }
  } catch (error) {
    if(import.meta.env.DEV) {
      console.log("Cached data doesn't exists for this service: " + serviceID)
    }
  } finally {
    if(checkNeedToSyncCache(serviceCategory)){
      if(import.meta.env.DEV) {
        console.log('Need to update information checked. Update is needed.')
      }

      const cloudSnapshot = await getDoc(docRef);
      serviceInfo = cloudSnapshot.data() as ServiceInfo;
    } else {
      if(import.meta.env.DEV) {
        console.log('Need to update information checked. Already up to date.')
      }
    }
  }

  return new Promise(resolve => {
    if(serviceInfo === undefined){
      return resolve('does_not');
    } else if (serviceInfo.status === 'Indisponível') {
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

    if(checkNeedToSyncCache(serviceCategory) || cachedSnapshot.data() === undefined){throw new Error()};

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

// offline code for the services
import projectsJSON from '@/data/projects.json';

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

// getting data for the recommendations
import { setNumberOfSkeletonsForNavIndicatorOnRecommendationsCard } from './general';
export async function getRecommendationsFromCloud():Promise<RecommendationsCard[]> {
  const q = query(collection(db, 'recommendations'), orderBy('order', 'asc'));

  let recommendationsArray:RecommendationsCard[] = [];
  let infoToUse;
  const cachedSnapshot = await getDocsFromCache(q);

  if(checkNeedToSyncCache('marketing') && checkNeedToSyncCache('web') || cachedSnapshot.empty){
    if(import.meta.env.DEV){
      console.log('Recommendations fetched from the server.');
    }

    const serverSnapshot = await getDocs(q);
    infoToUse = serverSnapshot;
  } else {
    if(import.meta.env.DEV){
      console.log('Recommendations fetched from the cache.');
    }

    infoToUse = cachedSnapshot;
  }

  infoToUse.forEach(doc => {
    const docData = doc.data() as RecommendationsCard;
    
    recommendationsArray.push({id: doc.id, ...docData});
  })

  setNumberOfSkeletonsForNavIndicatorOnRecommendationsCard(recommendationsArray.length);

  return recommendationsArray;
}