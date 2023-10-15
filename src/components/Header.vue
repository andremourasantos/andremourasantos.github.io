<template>
  <header>
    <button aria-label="Navegar para Página Inicial" title="Navegar para Página Inicial">
      <i class="ph-fill ph-house" @click="goToPage('home')"></i>
    </button>
    <a aria-label="Navegar para LinkedIn de André Moura Santos" title="Navegar para LinkedIn de André Moura Santos" href="https://br.linkedin.com/in/andremourasantos" target="_blank" rel="external">
      <i class="ph-fill ph-linkedin-logo"></i>
    </a>
    <!-- <a aria-label="Navegar para GitHub de André Moura Santos" title="Navegar para GitHub de André Moura Santos" href="https://github.com/andremourasantos" target="_blank" rel="external">
      <i class="ph-fill ph-github-logo"></i>
    </a> -->
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
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-start;
    height: 32px;
    width: 100%;
    gap: 8px;
  }

  button, a {
    height: fit-content;
    width: fit-content;
    background: transparent;
    text-decoration: none;
  }

  i {
    color: var(--font_color-title);
    cursor: pointer;
  }
</style>