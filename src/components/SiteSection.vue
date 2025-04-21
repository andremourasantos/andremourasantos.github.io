<template>
  <section :class="orientation">
    <div>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="slot"><slot></slot></div>
    </div>
    <img :src="imagePath" :alt="imageAltText">
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

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
    },
    imageName: {
      type: String,
      default: 'test',
      required: true
    },
    imageAltText: {
      type: String,
      required: false
    }
  },
  setup (props) {
    const imagePath = computed(() => {
      return new URL(`../assets/photos/${props.imageName}.jpg`, import.meta.url).href;
    })

    return {
      imagePath
    }
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
    font-size: var(--font-size_large);
  }

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 4/3;
    object-fit: cover;
    grid-area: col2;
    filter: saturate(0.5);
  }

  @media screen and (min-width: 1057px) {
    .RTL {
      grid-template-columns: 1fr 540px;
    }

    .RTL div {
      grid-area: col2;
    }

    .RTL img {
      grid-area: col1;
    }
  }

  .slot {
    margin-top: var(--padding_3x);
  }

  @media screen and (max-width: 1056px) {
    section {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      grid-template-areas:
        "col2"
        "col1";
      gap: var(--padding_2x);
    }

    div {
      width: 100%;
    }

    h2 {
      margin-bottom: var(--padding_02x);
    }
  }
</style>