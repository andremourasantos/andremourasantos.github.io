<template>
  <button :aria-label="`Navegar para página de ${ButtonTitle}`" :title="`Navegar para página de ${ButtonTitle}`">
    <img :src="require(`@/assets/icons/${ButtonImage}.png`)" height="48" width="48" :alt="`Imagem de representação da página de ${ButtonTitle}`">
    <div>
      <h2>{{ ButtonTitle }}</h2>
      <p>{{ ButtonDescription }}</p>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    'ButtonTitle': {
      required: true,
      type: String
    },
    'ButtonDescription': {
      required: true,
      type: String
    },
    'ButtonImage': {
      required: true,
      type: String
    }
  },
  setup(props) {
    
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
    box-shadow: var(--neumorphism-inner_shadow);
    text-align: left;
    padding: 24px;
    border: none;
    border-radius: 16px;
    cursor: pointer;
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