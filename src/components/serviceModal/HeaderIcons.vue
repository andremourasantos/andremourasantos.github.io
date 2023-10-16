<template>
  <div>
    <button aria-label="Compartilhar" title="Compartilhar" @click="shareService"><i class="ph-fill ph-share-network"></i></button>
    <button aria-label="Fechar" title="Fechar" @click="$emit('closeModalButton')"><i class="ph-fill ph-x-circle"></i></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useGtm } from "@gtm-support/vue-gtm";

//Stores
import serviceModalnfo from "@/stores/serviceModal";

export default defineComponent({
  setup() {
    const gtm = useGtm();

    const modalInfo = ref(serviceModalnfo)

    const shareService = async () => {
      try {
        await navigator.clipboard.writeText(`https://${location.host + location.pathname}?serviceID=${modalInfo.value.serviceID}&utm_source=website&utm_medium=serviceModal&utm_campaign=${modalInfo.value.serviceID}`);

        emitGtmEvent();
        alert('Link copiado para sua área de transferência!');
      } catch (error) {
        alert(`Ocorreu um erro ao copiar o link: ${error}`);
      }
    };

    const emitGtmEvent = () => {
      gtm?.trackEvent({
        event: 'share-service',
        action: 'Click',
        category: 'HeaderIcons',
        serviceid: modalInfo.value.serviceID
      })
    }

    return {
      shareService,
      emitGtmEvent
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
    gap: 16px;
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