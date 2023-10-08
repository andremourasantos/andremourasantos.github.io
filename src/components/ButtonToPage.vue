<template>
  <button :title="`Navegar para página de ${ButtonTitle}`">
    <img :src="require(`@/assets/icons/${ButtonImage}.png`)" height="48" width="48">
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
    background: #FFFFFF35;
    backdrop-filter: blur(50px);
    box-shadow: 5px 5px 15px #00000010, inset 0px 0px 5px #00000020;
    text-align: left;
    padding: 16px 24px;
    border: none;
    border-radius: 16px;
    cursor: pointer;
  }

  h2 {
    font-size: 16px;
    margin-bottom: 4px;
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