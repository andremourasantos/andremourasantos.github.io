import { reactive, ref } from "vue";

export function getIconURL(iconName:string):string {
  return new URL(`/src/assets/icons/${iconName}.png`, import.meta.url).href;
}

export function getImageURL(path:string, imageName:string, imageFileType?:'png' | 'jpg' | 'webp'):string {
  return new URL(`/src/assets/${path}/${imageName}.${imageFileType ? imageFileType : 'png'}`, import.meta.url).href;
}

export function toggleHTMLOverflowY():void {
  const htmlEl = document.querySelector('html') as HTMLHtmlElement;
  
  htmlEl.style.overflow == 'hidden' ?  htmlEl.style.overflow = 'scroll' :  htmlEl.style.overflow = 'hidden';
}

export function filterServicesToShow(servicesJSON:ServiceInfo[]):NonNullable<ServiceInfo>[] {
  return servicesJSON.filter(entry => {
    return entry !== undefined && entry.show === true;
  }) as NonNullable<ServiceInfo>[];
}

export function searchForURLParam(param:string):string | null {
  const url = new URLSearchParams(location.href.split('?',2)[1]);
    if(url.get(param)){
      return url.get(param);
    } else {
      return null;
    }
}

import { checkServiceExistence, checkProjectExistence } from "@/composables/data-base";
import serviceModalStore from "@/stores/serviceModal";
import projectsModalStore from "@/stores/projectModal";

export async function openServiceIDServiceModal(serviceID:string, serviceCategory:"Marketing" | "Web"):Promise<void> {
  return new Promise(async (resolve) => {
    if(await checkServiceExistence(serviceID) === 'exists'){
      const info = ref(serviceModalStore);
      info.value.serviceID = serviceID;
      info.value.serviceCategory = serviceCategory;
      info.value.status = 'Show';

      return resolve();
    } else if (await checkServiceExistence(serviceID) === 'unavailable') {
      setTimeout(() => {
        alert('Desculpe, este serviço não está disponível no momento.');
      }, 1000);

      return resolve();
    } else {
      setTimeout(() => {
        alert('Desculpe, ocorreu um erro ao recuperar as informações sobre este serviço.');
      }, 1000);
      
      return resolve();
    }
  })
}

export async function openProjectModal(projectId:string):Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    if(await checkProjectExistence(projectId)){
      const info = ref(projectsModalStore);
      info.value.projectID = projectId;
      info.value.status = 'Show';

      return resolve();
    } else {
      return reject(`O projeto "${projectId}" não existe.`);
    }
  })
}