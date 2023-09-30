//Stores
import marketingJSON from '@/data/mkt-services.json';
import webJSON from '@/data/web-services.json';

export async function checkServiceExistence(serviceID:string):Promise<boolean> {
  const serviceCategory = location.pathname.includes('marketing-digital') ? 'Marketing' : 'Web';
  let serviceInfo:any;

  if(serviceCategory === 'Marketing') {
    serviceInfo = marketingJSON.find(obj => {return obj.id == serviceID}) as ServiceInfo;
  } else {
    serviceInfo = webJSON.find(obj => {return obj.id == serviceID}) as ServiceInfo;
  }

  return new Promise((resolve) => {
    if(serviceInfo !== undefined){
      return resolve(true);
    } else {
      return resolve(false);
    }
  });
}