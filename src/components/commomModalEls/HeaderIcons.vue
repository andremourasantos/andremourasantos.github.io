<template>
  <div>
    <button v-if="modalType === 'Project'" aria-label="Visualizar projeto" title="Visualizar projeto" @click="handleViewProject">
      <PhArrowSquareOut/>
    </button>
    <button aria-label="Compartilhar" title="Compartilhar" @click="handleShare">
      <PhShareNetwork/>
    </button>
    <button aria-label="Fechar" title="Fechar" @click="$emit('closeModalButton')">
      <PhXCircle/>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useGtm } from "@gtm-support/vue-gtm";
import { PhShareNetwork, PhXCircle, PhArrowSquareOut, PhGithubLogo } from '@phosphor-icons/vue';

//Stores
import serviceModalInfo from "@/stores/serviceModal";
import projectModalInfo from "@/stores/projectModal";

export default defineComponent({
  components: {PhShareNetwork, PhXCircle, PhArrowSquareOut, PhGithubLogo},
  props: {
    modalType: {
      required: false,
      default: 'Service',
      type: String as () => 'Service' | 'Project'
    }
  },
  emit: ['closeModalButton', 'viewLiveDeploy', 'viewGitHubRepository'],
  setup(props, { emit }) {
    const gtm = useGtm();

    const serviceModal = ref(serviceModalInfo);
    const projectModal = ref(projectModalInfo);

    const shareService = async () => {
      try {
        await navigator.clipboard.writeText(`https://${location.host + location.pathname}?serviceID=${serviceModal.value.serviceID}&utm_source=website&utm_medium=serviceModal&utm_campaign=${serviceModal.value.serviceID}`);

        emitGTMShareEvent();
        alert('Link copiado para sua área de transferência!');
      } catch (error) {
        alert(`Ocorreu um erro ao copiar o link: ${error}`);
      }
    };

    const shareProject = async () => {
      try {
        await navigator.clipboard.writeText(`https://${location.host + location.pathname}?projectID=${projectModal.value.projectID}&utm_source=website&utm_medium=projectModal&utm_campaign=${projectModal.value.projectID}`);

        emitGTMShareEvent();
        alert('Link copiado para sua área de transferência!');

      } catch (error) {
        alert(`Ocorreu um erro ao copiar o link: ${error}`);
      }
    }

    const handleShare = () => {
      if(props.modalType === 'Project'){
        shareProject();
      } else {
        shareService();
      }
    }

    const emitGTMShareEvent = () => {
      switch (props.modalType) {
        case 'Project':
          gtm?.trackEvent({
            event: 'share-project',
            action: 'click',
            category: 'HeaderIcons',
            projectID: projectModal.value.projectID
          })
          break;
      
        default:
          gtm?.trackEvent({
            event: 'share-service',
            action: 'click',
            category: 'HeaderIcons',
            serviceID: serviceModal.value.serviceID
          })
          break;
      }
    }

    const handleViewProject = () => {
      emit('viewLiveDeploy');

      gtm?.trackEvent({
        event: 'view-project',
        action: 'click',
        category: 'HeaderIcons',
        projectID: projectModal.value.projectID
      })
    }

    return {
      handleShare,
      handleViewProject
    }
  },
})
</script>


<style scoped>
  div {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    z-index: 2;
  }

  button {
    background: transparent;
    border: none;
    height: fit-content;
    width: fit-content;
  }

  i {
    color: var(--font_color-title);
    font-size: 32px;
  }
</style>