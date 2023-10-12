<template>
  <header>
    <button aria-label="Navegar para Página Inicial" title="Navegar para Página Inicial">
      <i class="ph-fill ph-house" @click="goToPage('home')"></i>
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
  setup() {
    function goToPage(routeName:string) {
      return router.push({name: routeName});
    }
    return {
      goToPage
    }
  },
})
</script>


<style scoped>
  header {
    display: grid;
    align-items: center;
    justify-items: end;
    height: 32px;
    width: 100%;
  }

  button {
    height: fit-content;
    width: fit-content;
    background: transparent;
  }

  i {
    color: var(--font_color-title);
    cursor: pointer;
  }
</style>