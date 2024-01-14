//Data
import marketingJSON from '@/data/mkt-services.json';
import webJSON from '@/data/web-services.json';
import projectsJSON from '@/data/projects.json'; 

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