<template>
  <header>
    <button aria-label="Navegar para Página Inicial" title="Navegar para Página Inicial" @click="goToPage('home')">
      <PhHouse/>
    </button>
    <a aria-label="Navegar para LinkedIn de André Moura Santos" title="Navegar para LinkedIn de André Moura Santos" href="https://br.linkedin.com/in/andremourasantos" target="_blank" rel="external nofollow noopener noreffer author">
      <PhLinkedinLogo/>
    </a>
    <button @click="changeColorScheme">
      <span v-show="isCurrentThemeLight"><PhMoon/></span>
      <span v-show="!isCurrentThemeLight"><PhSun/></span>
    </button>
    <!-- <a aria-label="Navegar para GitHub de André Moura Santos" title="Navegar para GitHub de André Moura Santos" href="https://github.com/andremourasantos" target="_blank" rel="external nofollow noopener noreffer">
      <PhGithubLogo/>
    </a> -->
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue';
import router from '@/router';

//Icons
import { PhHouse, PhLinkedinLogo, PhGithubLogo, PhMoon, PhSun } from '@phosphor-icons/vue';

export default defineComponent({
  components: {PhHouse, PhLinkedinLogo, PhGithubLogo, PhMoon, PhSun},
  setup() {
    const {currentColorScheme, toggleColorScheme} = inject('colorScheme');
    const isCurrentThemeLight = ref<boolean>(true);

    const changeColorScheme = () => {
      toggleColorScheme();
      isCurrentThemeLight.value = !isCurrentThemeLight.value;
    }

    function goToPage(routeName:string) {
      return router.push({name: routeName});
    }
    return {
      isCurrentThemeLight,
      changeColorScheme,
      goToPage,
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