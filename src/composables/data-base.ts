import { app } from '@/firebase';
import { initializeFirestore, persistentMultipleTabManager, persistentLocalCache, connectFirestoreEmulator, doc, setDoc, serverTimestamp, collection, query, where, orderBy, getDocs, getDocsFromCache } from 'firebase/firestore';

app;
const db = initializeFirestore(app, { 
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  }),
 });

// dev environment script
if(import.meta.env.DEV){
  var sessionStorageKeyForEmulatorCheck:string = 'EmulatorsConnection';
  console.warn('Connecting with Firestore Emulator...');
  connectFirestoreEmulator(db, '0.0.0.0', 8080);
  testFirestoreEmulatorConnection();
}

function checkIfEmulatorSessionConnectionIsTrue():boolean {
  if(sessionStorage.getItem(sessionStorageKeyForEmulatorCheck) === 'true') {
    return true;
  } else {
    return false;
  }
}

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

async function createComplementaryServicesCollection(): Promise<void> {
  console.warn('Creating complementary services collection...');

  const docCategory: string = 'pageInfo';
  const docRefPath: string = `services/${docCategory}/`;

  try {
    console.warn('Populating with Marketing related services...');

    for (const [index, entry] of Object.entries(marketingJSON)) {
      const info: ServiceInfoMKT = entry as ServiceInfoMKT;

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
      const info: ServiceInfoWEB = entry as ServiceInfoWEB;

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

async function createServicesCollection():Promise<void> {
  console.warn('Creating services collection...');

  const docCategory:string = 'modalInfo';
  const docRefPath:string = `services/${docCategory}/`;

  console.warn('Populating with Marketing related services...');
  for (const [index, entry] of Object.entries(marketingJSON)) {
    const info:ServiceInfoMKT = entry as ServiceInfoMKT;

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
    const info:ServiceInfoWEB = entry as ServiceInfoWEB;

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
function setCookieWithCacheToCloudSyncedDate():void {
  var currentDate = new Date();

  var expirationDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds

  var expiresUTC = expirationDate.toUTCString();

  document.cookie = "cacheSyncedWithCloud=true; expires=" + expiresUTC + "; path=/";
}

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

// old code
export async function checkServiceExistence(serviceID:string):Promise<"exists" | "does_not" | "unavailable"> {
  const serviceCategory = location.pathname.includes('marketing-digital') ? 'Marketing' : 'Web';
  let serviceInfo:ServiceInfo;

  if(serviceCategory === 'Marketing') {
    serviceInfo = marketingJSON.find(obj => {return obj.id == serviceID}) as ServiceInfo;
  } else {
    serviceInfo = webJSON.find(obj => {return obj.id == serviceID}) as ServiceInfo;
  }

  return new Promise((resolve) => {
    if(serviceInfo === undefined){
      return resolve('does_not');
    } else if (serviceInfo.status === 'Indisponível') {
      return resolve('unavailable');
    } else {
      return resolve('exists');
    }
  });
};

export async function checkServiceExistenceV2(serviceId:string, serviceCategory:"Marketing" | "Web"):Promise<"exists" | "does_not" | "unavailable"> {
  let serviceInfo:ServiceInfo;

  if(serviceCategory === 'Marketing') {
    serviceInfo = marketingJSON.find(obj => {return obj.id == serviceId}) as ServiceInfo;
  } else {
    serviceInfo = webJSON.find(obj => {return obj.id == serviceId}) as ServiceInfo;
  }

  return new Promise((resolve) => {
    if(serviceInfo === undefined){
      return resolve('does_not');
    } else if (serviceInfo.status === 'Indisponível') {
      return resolve('unavailable')
    } else {
      return resolve('exists');
    }
  });
};

export async function checkProjectExistence(projectId:string):Promise<boolean> {
  let projectInfo:ProjectInfo = projectsJSON.find(obj => {return obj.id === projectId}) as ProjectInfo;

  return new Promise<boolean>((resolve) => {
    if(projectInfo !== undefined){
      return resolve(true);
    } else {
      return resolve(false);
    }
  });
};

export async function getServiceInfo(serviceId:string, serviceCategory:"Marketing" | "Web"):Promise<ServiceInfo> {
  let serviceInfo:ServiceInfo | undefined;

  if(serviceCategory === 'Marketing') {
    serviceInfo = marketingJSON.find(obj => {return obj.id == serviceId}) as ServiceInfo;
  } else {
    serviceInfo = webJSON.find(obj => {return obj.id == serviceId}) as ServiceInfo;
  }

  return new Promise<ServiceInfo>((resolve, reject) => {
    if(serviceInfo !== undefined){
      return resolve(serviceInfo);
    } else {
      return reject('Serviço não encontrado');
    }
  })
};