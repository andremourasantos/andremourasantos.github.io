<template>
  <header>
    <router-link :to="{name: 'home'}" class="title">André S.</router-link>
    <nav>
      <router-link :to="{name: 'home'}">Início</router-link>
      <router-link :to="{name: 'work'}">Trabalhos</router-link>
      <router-link :to="{name: 'portfolio'}">Portfólio</router-link>
      <a href="https://api.whatsapp.com/send/?phone=5541935009236&text=Oi%2C%20gostaria%20de%20entrar%20em%20contato%20para%20apresentar%20meu%20projeto" target="_blank"><Button text="Contato" icon-name="WhatsApp"/></a>
      <div class="mobileNav">
        <Button icon-name="WhatsApp" text="none"/>
        <Button icon-name="Menu" text="none"/>
      </div>
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

  nav, .mobileNav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--padding_2x);
  }

  .mobileNav {
    display: none;
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

  @media screen and (max-width: 672px) {
    header {
      grid-template-columns: 1fr 1fr;
    }

    nav a {
      display: none;
    }

    .mobileNav {
      display: flex;
    }
  }
</style>