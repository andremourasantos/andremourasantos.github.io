<template>
  <section>
    <div>
      <h1>{{title}}</h1>
      <p>{{subtitle}}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>
  section {
    height: calc(100vh - var(--padding_8x));
    display: grid;
    align-items: center;
    background: transparent;
  }

  section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(var(--colors_background) 10%, #D5FFF3, #ECEBFF, var(--colors_background) 90%);
    z-index: -1;
  }

  section > div {
    margin: auto;
    max-width: 640px;
    display: flex;
    flex-direction: column;
    gap: var(--padding_02x);
    text-align: center;
  }

  h1 {
    font-size: 48px;
  }

  p {
    font-size: 24px;
  }
</style>