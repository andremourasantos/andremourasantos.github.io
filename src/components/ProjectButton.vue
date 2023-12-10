<template>
  <button :aria-label="projectTitle" @click="openModal(projectId), emitGtmEvent(projectId)">
    <div id="tag" v-if="projectTag !== undefined && projectTag !== null" :class="{
      newService: projectTag === 'Novo' 
    }" aria-label="Estado do serviço">
      <p>{{ projectTag }}</p>
    </div>
    <img :src="require(`@/assets/projects/${projectId}/${projectImage}.png`)" :alt="`Imagem de ${projectTitle}`">
    <div>
      <h3>{{ projectTitle }}</h3>
      <p>{{ projectDescription }}</p>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useGtm } from '@gtm-support/vue-gtm';

//Composables
import { openServiceIDServiceModal } from '@/composables/general';

//Stores
import projectModal from '@/stores/projectModal';

export default defineComponent({
  props: {
    'projectImage': {
      required: true,
      type: String
    },
    'projectTitle': {
      required: true,
      type: String
    },
    'projectDescription': {
      required: true,
      type: String
    },
    'projectTag': {
      required: false,
      type: String as () => "Novo" | null,
    },
    'projectId': {
      required: true,
      type: String
    }
  },
  setup(props) {
    const gtm = useGtm();
    const modalStore = ref(projectModal);

    const openModal = (projectId:string):void => {
      modalStore.value.status = 'Show';
      modalStore.value.projectID = projectId;
      // openServiceIDServiceModal(projectID);
    };

    const emitGtmEvent = (projectID:string) => {
      // gtm?.trackEvent({
      //   event: 'project-button',
      //   action: 'Click',
      //   category: 'ServiceButton',
      //   projectid: projectID
      // })
    }
    
    return {
      openModal,
      emitGtmEvent
    }
  },
})
</script>


<style scoped>
  button {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-items: flex-start;
    gap: 16px;
    height: fit-content;
    width: 100%;
    background-color: var(--colors-background);
    box-shadow: var(--neumorphism-out_shadow);
    text-align: left;
    border: none;
    border-radius: 16px;
    padding: 24px;
    cursor: pointer;
    transition: 200ms;
  }

  button:hover:not(:disabled), button:focus {
    transition: 200ms;
    transform: scale(0.99);
    box-shadow: var(--neumorphism-inner_shadow);
  }

  button:has(#tag) {
    padding: 24px 16px;
  }

  button img {
    height: fit-content;
    width: 100%;
    border-radius: 8px;
    aspect-ratio: 4/3;
  }

  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 2px;
  }

  h3 + p {
    font-size: 16px;
  }

  #tag {
    position: absolute;
    background-color: hsl(0 65% 50% / 1);
    box-shadow: var(--glass_effect-shadow);
    padding: 4px 8px;
    border-radius: 0px 10px 0px 10px;
    right: 0px;
    top: 0px;
    user-select: none;
  }

  #tag.newService {
    background-color: hsl(205 100% 40% / 1);
  }

  #tag p {
    color: white;
    font-size: 14px;
  }

  @media screen and (min-width: 425px) {
    button {
      grid-template-columns: auto;
      grid-template-rows: 56px auto;
      align-items: center;
      justify-items: center;
      row-gap: 16px;
      width: 220px;
      padding: 24px;
      text-align: center;
    }

    button:has(#tag) {
      padding: 36px 24px 24px 24px;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 4px;
    }

    h3 + p {
      font-size: 16px;
    }
  }
</style>