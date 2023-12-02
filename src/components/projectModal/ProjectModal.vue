<template>
  <dialog class="presentationPopup" ref="projectDialogEl">
    <HeaderIcons :modal-type="'Project'" @closeModalButton="closeModal"/>

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

        <img :src="require(`@/assets/projects/${projectHeader.id}/${images1And2[1]}.png`)" :alt="`Imagem do projeto ${projectHeader.title}`">

        <p v-for="paragraph in conclusionText">{{ paragraph }}</p>
      </div>

    </article>

  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

//Components
import HeaderIcons from '../serviceModal/HeaderIcons.vue';

//Composables
import { toggleHTMLOverflowY } from '@/composables/general';

//Data
import projectsJSON from '@/data/projects.json';

//Store
import projectModalInfo from '@/stores/projectModal';

export default defineComponent({
  components: {HeaderIcons},
  setup () {
    const projectDialogEl = ref<HTMLDialogElement | null>(null);
    const modalInfo = ref(projectModalInfo);

    //Dialog content related
    const projectHeader = ref<{id:string, title:string, description:string, favicon:string} | null>(null);
    const introductionText = ref<string>("");
    const images1And2 = ref<[string, string]>(["",""]);
    const developmentText = ref<string[]>([""]);
    const conclusionText = ref<string[]>([""]);

    onMounted(() => {
      if(!(projectDialogEl.value instanceof HTMLElement)){
        closeModal();
        return alert('Desculpe, ocorreu um erro ao exibir as informações sobre este serviço.');
      };

      const el = projectDialogEl.value;
      const projectInfo:ProjectInfo  = projectsJSON.find(obj => {return obj.id === modalInfo.value.projectID}) as NonNullable<ProjectInfo>;

      fillProjectHeader(projectInfo);
      fillIntroduction(projectInfo.introductionText);
      fillImages(projectInfo.image1, projectInfo.image2);
      fillDevelopmentText(projectInfo.developmentText);
      fillConclusionText(projectInfo.conclusionText);

      toggleHTMLOverflowY();
      el.showModal();
    })

    const fillProjectHeader = (projectInfo:NonNullable<ProjectInfo>):void => {
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

    const fillImages = (image1:string, image2:string) => {
      images1And2.value = [image1, image2];
    };

    const fillDevelopmentText = (text:string[]) => {
      developmentText.value = text;
    };

    const fillConclusionText = (text:string[]) => {
      conclusionText.value = text;
    }

    const closeModal = ():void => {
      if(projectDialogEl.value instanceof HTMLElement){
        const el = projectDialogEl.value;
        setTimeout(() => {
          //This timeOut function is here to sync with the transition in-and-out of the element (available in /src/App.vue).
          el.close();
        }, 100);
      };

      modalInfo.value.status = 'Hide';
      toggleHTMLOverflowY();
    };

    return {
      projectDialogEl,
      projectHeader,
      introductionText,
      images1And2,
      developmentText,
      conclusionText,
      closeModal
    }
  }
})
</script>

<style scoped>
  div.content img {
    width: 100%;
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
</style>