<template>
  <div>
    <button aria-label="Visualizar projeto" title="Visualizar projeto" @click="$emit('viewLiveDeploy')">
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
  setup(props) {
    const gtm = useGtm();

    const serviceModal = ref(serviceModalInfo);
    const projectModal = ref(projectModalInfo);

    const shareService = async () => {
      try {
        await navigator.clipboard.writeText(`https://${location.host + location.pathname}?serviceID=${serviceModal.value.serviceID}&utm_source=website&utm_medium=serviceModal&utm_campaign=${serviceModal.value.serviceID}`);

        emitGtmShareServiceEvent();
        alert('Link copiado para sua área de transferência!');
      } catch (error) {
        alert(`Ocorreu um erro ao copiar o link: ${error}`);
      }
    };

    const shareProject = async () => {
      try {
        await navigator.clipboard.writeText(`https://${location.host + location.pathname}?projectID=${projectModal.value.projectID}&utm_source=website&utm_medium=projectModal&utm_campaign=${projectModal.value.projectID}`);

        emitGtmShareProjectEvent();
        alert('Link copiado para sua área de transferência!');

      } catch (error) {
        alert(`Ocorreu um erro ao copiar o link: ${error}`);
      }
    }

    const handleShare = () => {
      if(props.modalType === 'Service'){
        shareService();
      } else {
        shareProject();
      }
    }

    const emitGtmShareServiceEvent = () => {
      gtm?.trackEvent({
        event: 'share-service',
        action: 'Click',
        category: 'HeaderIcons',
        serviceid: serviceModal.value.serviceID
      })
    }

    const emitGtmShareProjectEvent = () => {
      gtm?.trackEvent({
        event: 'share-project',
        action: 'Click',
        category: 'HeaderIcons',
        serviceid: projectModal.value.projectID
      })
    }

    return {
      handleShare
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