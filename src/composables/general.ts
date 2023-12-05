import { reactive, ref } from "vue";

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
  return new Promise(async (resolve, reject) => {
    if(await checkServiceExistence(serviceID)){
      const info = ref(serviceModalStore);
      info.value.serviceID = serviceID;
      info.value.serviceCategory = serviceCategory;
      info.value.status = 'Show';

      return resolve();
    } else {
      alert('Desculpe, ocorreu um erro ao recuperar as informações sobre este serviço.');
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