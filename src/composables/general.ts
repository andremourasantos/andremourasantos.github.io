import { reactive, ref } from "vue";

/**
 * Retrieves the URL of an icon based on its name.
 * @param {string} iconName - The name of the icon to retrieve the URL for.
 * @returns {string} Returns the URL of the icon.
 */
export function getIconURL(iconName:string):string {
  return new URL(`/src/assets/icons/${iconName}.png`, import.meta.url).href;
}

/**
 * Retrieves the URL of an image based on its path, name, and optional file type.
 * @param {string} path - The path where the image is located.
 * @param {string} imageName - The name of the image file.
 * @param {'png' | 'jpg' | 'webp'} [imageFileType] - Optional. The file type of the image (defaults to 'png' if not provided).
 * @returns {string} Returns the URL of the image.
 */
export function getImageURL(path:string, imageName:string, imageFileType?:'png' | 'jpg' | 'webp'):string {
  return new URL(`/src/assets/${path}/${imageName}.${imageFileType ? imageFileType : 'png'}`, import.meta.url).href;
}

/**
 * Toggles the overflow-y property of the HTML element between 'hidden' and 'scroll'.
 * If the current overflow-y is 'hidden', it changes it to 'scroll', and vice versa.
 * This function does not return anything.
 */
export function toggleHTMLOverflowY():void {
  const htmlEl = document.querySelector('html') as HTMLHtmlElement;
  
  htmlEl.style.overflow == 'hidden' ?  htmlEl.style.overflow = 'scroll' :  htmlEl.style.overflow = 'hidden';
}

/**
 * Searches for a URL parameter by name in the current page URL.
 * @param {string} param - The name of the URL parameter to search for.
 * @returns {string | null} Returns the value of the URL parameter if found, otherwise returns null.
 */
export function searchForURLParam(param:string):string | null {
  const url = new URLSearchParams(location.href.split('?',2)[1]);
    if(url.get(param)){
      return url.get(param);
    } else {
      return null;
    }
}

import { checkServiceExistenceV3, checkProjectExistence } from "@/composables/data-base";
import serviceModalStore from "@/stores/serviceModal";
import projectsModalStore from "@/stores/projectModal";

/**
 * Opens a modal for the specified service ID and category after checking its existence and availability.
 * @param {string} serviceID - The ID of the service to open the modal for.
 * @param {ServiceCategory} serviceCategory - The category of the service.
 * @returns {Promise<void>} Returns a promise that resolves when the modal is opened.
 */
export async function openServiceModal(serviceID:string, serviceCategory:ServiceCategory):Promise<void> {
  return new Promise(async (resolve) => {
    const serviceStatus = await checkServiceExistenceV3(serviceID, serviceCategory);

    if(serviceStatus === 'exists'){
      const infoStored = ref(serviceModalStore);

      infoStored.value.serviceID = serviceID;
      infoStored.value.serviceCategory = serviceCategory;
      infoStored.value.status = 'Show';
  
      return resolve();
    }
  })
}

/**
 * Opens a modal for the specified project ID after checking its existence.
 * @param {string} projectId - The ID of the project to open the modal for.
 * @returns {Promise<void>} Returns a promise that resolves when the modal is opened or rejects with an error message if the project does not exist.
 */
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