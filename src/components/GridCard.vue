<template>
  <div class="card">
    <img :src="imagePath" alt="Card Image" class="card-image" />
    <div class="text-content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <RouterLink :to="{ path: `${keyPath}` }"><Button/></RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Button from './Button.vue';

export default defineComponent({
  components: {
    Button
  },
  props:
  {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    description: {
      type: String,
      default: '',
      required: true
    },
    keyPath: {
      type: String,
      default: '/',
      required: false
    }
  },
  setup (props) {
    const imagePath = computed(() => {
      if(!props.image){return ''}
      return new URL(`../assets/photos/${props.image}.jpg`, import.meta.url).href;
    })

    return {
      imagePath
    }
  }
})
</script>

<style scoped>
  .card {
    min-width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--colors_accent);
  }

  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }

  .text-content {
    padding: var(--padding_2x);
  }

  .text-content p {
    margin-bottom: var(--padding_2x);
  }
</style>