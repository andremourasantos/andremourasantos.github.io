import { app } from '@/firebase';
import { getFirestore, connectFirestoreEmulator, doc, setDoc } from 'firebase/firestore';

app;
const db = getFirestore();

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

// creating the collections for the emulators
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
        description: info.description
      });
    };

    console.log('OK.');
  } catch (error) {
    console.error('Error while populating Marketing services:', error);
    throw error; // Rethrow the error to handle it outside
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
        description: info.description
      });
    };

    console.log('OK.');
  } catch (error) {
    console.error('Error while populating Web services:', error);
    throw error; // Rethrow the error to handle it outside
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
 

// data
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