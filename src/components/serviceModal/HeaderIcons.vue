<template>
  <div>
    <button aria-label="Compartilhar" @click="shareService"><i class="ph-fill ph-share-network"></i></button>
    <button arial-label="Fechar" @click="$emit('closeModalButton')"><i class="ph-fill ph-x-circle"></i></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Stores
import serviceModalnfo from "@/stores/serviceModal";

export default defineComponent({
  setup() {
    const shareService = async () => {
      try {
        await navigator.clipboard.writeText(`https://${location.host + location.pathname}?serviceID=${serviceModalnfo.serviceID}`)
        alert('Link copiado para sua área de transferência!')
      } catch (error) {
        alert(`Ocorreu um erro ao copiar o link: ${error}`)
      }
    }

    return {
      shareService
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