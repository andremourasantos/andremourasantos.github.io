<template>
  <button :aria-label="`Navegar para página de ${buttonTitle}`" :title="`Navegar para página de ${buttonTitle}`">
    <img :src="getIconURL(buttonImage)" height="48" width="48" :alt="`Imagem de representação da página de ${buttonTitle}`">
    <div>
      <h2>{{ buttonTitle }}</h2>
      <p>{{ buttonDescription }}</p>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { getIconURL } from '@/composables/general';

export default defineComponent({
  props: {
    'buttonTitle': {
      required: true,
      type: String
    },
    'buttonDescription': {
      required: true,
      type: String
    },
    'buttonImage': {
      required: true,
      type: String
    }
  },
  setup() {

    return {
      getIconURL
    }
  },
})
</script>


<style scoped>
  button {
    display: grid;
    align-items: center;
    grid-template-columns: 48px auto;
    column-gap: 16px;
    width: 100%;
    height: fit-content;
    min-height: 100px;
    background: var(--colors-background);
    backdrop-filter: blur(50px);
    box-shadow: var(--neumorphism-out_shadow);
    text-align: left;
    padding: 24px;
    border: none;
    border-radius: 16px;
    cursor: pointer;
  }

  button:hover, button:focus {
    transition: 200ms;
    transform: scale(0.99);
    box-shadow: var(--neumorphism-inner_shadow);
  }

  h2 {
    font-size: 17px;
    margin-bottom: 2px;
  }

  @media screen and (min-width: 425px) {
    button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      row-gap: 16px;
      width: 300px;
      padding: 24px;
    }

    button img {
      height: 56px;
      width: 56px;
    }

    h2 {
      font-size: 18px;
    }

    h2 + p {
      font-size: 18px;
    }
  }
</style>