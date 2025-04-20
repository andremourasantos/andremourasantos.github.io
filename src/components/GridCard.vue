<template>
  <div class="card">
    <img :src="imagePath" alt="Card Image" class="card-image" />
    <div class="text-content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <Button/>
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
    }
  },
  setup (props) {
    const imagePath = computed(() => {
      return `../src/assets/photos/${props.image}.jpg`;
    })

    return {
      imagePath
    }
  }
})
</script>

<style scoped>
  .card {
    min-width: 288px;
    max-width: 501px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--colors_accent);
  }

  img {
    width: 100%;
    aspect-ratio: 16/9;
  }

  .text-content {
    padding: var(--padding_2x);
  }

  .text-content p {
    margin-bottom: var(--padding_2x);
  }
</style>