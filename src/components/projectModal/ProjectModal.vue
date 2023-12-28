<template>
  <dialog class="presentationPopup" ref="projectDialogEl">
    <HeaderIcons :modal-type="'Project'" @closeModalButton="closeModal" @viewLiveDeploy="handleViewLiveDeploy"/>

    <article v-if="projectHeader !== null">
      <div>
        <img :src="require(`@/assets/projects/${projectHeader.id}/${projectHeader.favicon}.png`)" :alt="`Imagem do projeto ${projectHeader.title}`" height="80" width="80" style="border-radius: 100px;">
        <h2>{{ projectHeader.title }}</h2>
        <p>{{ projectHeader.description }}</p>
      </div>

      <div class="content">
        <p>{{ introductionText }}</p>

        <img :src="require(`@/assets/projects/${projectHeader.id}/${images1And2[0]}.png`)" :alt="`Imagem do projeto ${projectHeader.title}`">

        <p v-for="paragraph in developmentText">{{ paragraph }}</p>

        <img loading="lazy" :src="require(`@/assets/projects/${projectHeader.id}/${images1And2[1]}.png`)" :alt="`Imagem do projeto ${projectHeader.title}`">

        <p v-for="paragraph in conclusionText">{{ paragraph }}</p>
      </div>

      <div class="relatedServices" v-if="relatedServices">
        <h3>Serviços relacionados</h3>
        <p>Confira os serviços que foram contratados por este cliente para a realização do projeto.</p>
        <div>
          <ServiceButton @click="closeModal" v-for="service in relatedServices" :service-button-enviroment="'Popup'" :service-id="service[0].id" :service-image="service[0].image" :service-title="service[0].title" :service-description="service[0].description" :service-category="service[1]" @click.prevent="" :service-tag="service[0].status"/>
        </div>
      </div>

      <ServiceFooterNotes v-if="footerNotes" :FooterNotes="footerNotes" />
    </article>

  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

//Components
import HeaderIcons from '../commomModalEls/HeaderIcons.vue';
import ServiceButton from '../ServiceButton.vue';
import ServiceFooterNotes from '../commomModalEls/ServiceFooterNotes.vue';

//Composables
import { toggleHTMLOverflowY } from '@/composables/general';
import { checkServiceExistenceV2, getServiceInfo } from '@/composables/data-base';

//Data
import projectsJSON from '@/data/projects.json';

//Store
import projectModalInfo from '@/stores/projectModal';

export default defineComponent({
  components: { HeaderIcons, ServiceButton, ServiceFooterNotes },
  setup() {
    const projectDialogEl = ref<HTMLDialogElement | null>(null);
    const modalInfo = ref(projectModalInfo);

    //Dialog content related
    const projectHeader = ref<{ id: string, title: string, description: string, favicon: string } | null>(null);
    const introductionText = ref<string>("");
    const images1And2 = ref<[string, string]>(["", ""]);
    const developmentText = ref<string[]>([""]);
    const conclusionText = ref<string[]>([""]);
    const relatedServices = ref<[NonNullable<ServiceInfo>,"Marketing" | "Web"][] | null>(null);
    const footerNotes = ref<string[] | null>(null);
    const projectInfo = ref<ProjectInfo | null>(null);

    onMounted(() => {
      if (!(projectDialogEl.value instanceof HTMLElement)) {
        closeModal();
        return alert('Desculpe, ocorreu um erro ao exibir as informações sobre este serviço.');
      };

      const el = projectDialogEl.value;
      projectInfo.value = projectsJSON.find(obj => { return obj.id === modalInfo.value.projectID }) as NonNullable<ProjectInfo>;

      fillProjectHeader(projectInfo.value);
      fillIntroduction(projectInfo.value.introductionText);
      fillImages(projectInfo.value.image1, projectInfo.value.image2);
      fillDevelopmentText(projectInfo.value.developmentText);
      fillConclusionText(projectInfo.value.conclusionText);
      if(projectInfo.value.relatedServices){
        fillRelatedServices(projectInfo.value.relatedServices.servicesID);
      }
      fillFooterNotes(projectInfo.value.footerNotes);

      toggleHTMLOverflowY();
      el.showModal();
    })

    const fillProjectHeader = (projectInfo: NonNullable<ProjectInfo>):void => {
      projectHeader.value = {
        id: projectInfo.id,
        title: projectInfo.title,
        description: projectInfo.description,
        favicon: projectInfo.favicon
      }
    };

    const fillIntroduction = (text:string):void => {
      introductionText.value = text;
    };

    const fillImages = (image1:string, image2:string):void => {
      images1And2.value = [image1, image2];
    };

    const fillDevelopmentText = (text:string[]):void => {
      developmentText.value = text;
    };

    const fillConclusionText = (text:string[]):void => {
      conclusionText.value = text;
    };

    const fillRelatedServices = async (servicesArray: ["Marketing" | "Web", string][]):Promise<void> => {
      const filteredServices = await Promise.all(servicesArray.map(async (array) => {
        if (await checkServiceExistenceV2(array[1], array[0]) === true) {
          return array;
        }
      }));

      const servicesToShow = filteredServices.filter(Boolean) as ["Marketing" | "Web", string][];

      relatedServices.value = [];
      servicesToShow.forEach((service) => {
        getServiceInfo(service[1], service[0])
          .then(res => {
            relatedServices.value?.push([res as NonNullable<ServiceInfo>, service[0]]);
          })
          .catch(error => {
            console.error(error);
          })
      })
    };

    const fillFooterNotes = (footerNotesArray:string[]) => {
      footerNotes.value = footerNotesArray;
    }

    const closeModal = ():void => {
      if (projectDialogEl.value instanceof HTMLElement) {
        const el = projectDialogEl.value;
        setTimeout(() => {
          //This timeOut function is here to sync with the transition in-and-out of the element (available in /src/App.vue).
          el.close();
        }, 100);
      };

      modalInfo.value.status = 'Hide';
      toggleHTMLOverflowY();
    };

    const handleViewLiveDeploy = ():void => {
      if(projectInfo.value === null){return}

      window.open(projectInfo.value?.liveDeployURL);
    }

    return {
      projectDialogEl,
      projectHeader,
      introductionText,
      images1And2,
      developmentText,
      conclusionText,
      relatedServices,
      footerNotes,
      closeModal,
      handleViewLiveDeploy
    }
  }
})
</script>

<style scoped>
div.content img {
  width: 100%;
  border-radius: 24px;
}

div.content img:nth-of-type(1) {
  aspect-ratio: 4/3;
}

div.content img:nth-of-type(2) {
  aspect-ratio: 1/1;
}

div.content p {
  margin: 8px auto;
}

div.content p:first-of-type {
  margin-top: 0px;
}

div.content p:last-of-type {
  margin-bottom: 0px;
}

div.relatedServices > div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  width: 100%;
  margin: 16px auto;
}

@media screen and (min-width: 425px) {
  div.relatedServices > div > button {
    width: 200px;
  }
}
</style>