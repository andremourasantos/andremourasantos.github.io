<template>
  <div>
    <button aria-label="Compartilhar" title="Compartilhar" @click="shareService">
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
import { PhShareNetwork, PhXCircle } from '@phosphor-icons/vue';

//Stores
import serviceModalnfo from "@/stores/serviceModal";

export default defineComponent({
  components: {PhShareNetwork, PhXCircle},
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