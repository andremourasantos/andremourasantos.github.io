<template>
  <section :class="orientation">
    <div>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="slot"><slot></slot></div>
    </div>
    <img src="../assets/photos/test.png" alt="">
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    orientation: {
      type: String as () => 'LTR' | 'RTL',
      default: 'LTR',
      required: true,
    },
    imageName: {
      type: String,
      required: false
    },
    imageAltText: {
      type: String,
      required: false
    }
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>
  section {
    display: grid;
    grid-template-columns: 540px 1fr;
    grid-template-areas: "col1 col2";
    align-items: center;
    justify-content: space-between;
    gap: var(--padding_10x);
  }

  div {
    width: 540px;
    grid-area: col1;
  }

  h2 {
    margin-bottom: var(--padding_04x);
    font-size: 32px;
  }

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 4/3;
    object-fit: cover;
    grid-area: col2;
  }

  .RTL {
    grid-template-columns: 1fr 540px;
  }

  .RTL div {
    grid-area: col2;
  }

  .RTL img {
    grid-area: col1;
  }

  .slot {
    margin-top: var(--padding_3x);
  }
</style>