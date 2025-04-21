<template>
  <header>
    <router-link :to="{name: 'home'}" class="title">André S.</router-link>
    <nav>
      <router-link :to="{name: 'home'}">Início</router-link>
      <router-link :to="{name: 'work'}">Trabalhos</router-link>
      <router-link :to="{name: 'portfolio'}">Portfólio</router-link>
      <Button text="Contato" icon-name="WhatsApp"/>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from './Button.vue';

export default defineComponent({
  components: {
    Button
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>
  header {
    height: 64px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    position: sticky;
    top: 0px;
    background-color: var(--colors_background);
    box-shadow: 0px 0px 0px 100vw var(--colors_background);
    clip-path: inset(0 -100vw 0 -100vw);
    z-index: 999;
  }

  header > a {
    width: fit-content;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--padding_2x);
  }

  nav > a {
    text-decoration: none;
    color: inherit;
  }

  nav > a:hover:not(.router-link-active) {
    text-decoration: underline;
  }

  nav > a.router-link-active {
    font-weight: bold;
  }
</style>