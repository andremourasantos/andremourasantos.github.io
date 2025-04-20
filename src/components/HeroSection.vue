<template>
  <section :class="{'imageBckg': imageName}">
    <img v-if="imageName" :src="imagePath" :alt="imageName"/>
    <div>
      <h1>{{title}}</h1>
      <p>{{subtitle}}</p>
      <Button size="L" icon-name="ChevronDown" @click="scrollToContent"/>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Button from './Button.vue';

export default defineComponent({
  components: {
    Button
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    imageName: {
      type: String,
    }
  },
  setup (props) {
    const imagePath = computed(() => {
      return props.imageName ? new URL(`../assets/photos/${props.imageName}.jpg`, import.meta.url).href : '';
    })

    const scrollToContent = () => {
      const content = document.getElementById('content')
      if (content) {
        content.scrollIntoView({ behavior: 'smooth' })
      }
    }

    return {
      scrollToContent,
      imagePath
    }
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

  section.imageBckg * {
    color: var(--colors_background);
  }

  section.imageBckg::before {
    background: none;
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

  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    filter: blur(0px) saturate(0.3) brightness(0.5);
  }

  section > div {
    position: relative;
    margin: auto;
    max-width: 640px;
    display: flex;
    flex-direction: column;
    gap: var(--padding_02x);
    text-align: center;
    align-items: center;
  }

  h1 {
    font-size: 48px;
  }

  p {
    font-size: 24px;
    margin-bottom: 24px;
  }
</style>