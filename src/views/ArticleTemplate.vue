<template>
  <HeroSection :title="heroTitle" :subtitle="heroSubtitle"/>
  <div id="content" class="articleContainer">
    <aside></aside>
    <article v-html="htmlContent"></article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import HeroSection from '@/components/HeroSection.vue';

import { marked } from 'marked';

export default defineComponent({
  components: {
    HeroSection
  },
  props:{
    heroTitle: {
      type: String,
      required: true
    },
    heroSubtitle: {
      type: String,
      required: true
    },
    articleText: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const htmlContent = ref('');

    onMounted(async () => {
      htmlContent.value = await marked(props.articleText);
    })

    return {
      htmlContent
    }
  }
})
</script>

<style scoped>
  .articleContainer {
    display: grid;
    grid-template-columns: 320px 880px;
    gap: var(--padding_10x);
    padding: var(--padding_10x) 0px;
  }

  article {
    display: flex;
    flex-direction: column;
  }

  :deep(h2) {
    font-size: 32px;
    margin-top: var(--padding_4x);
    margin-bottom: var(--padding_02x);
  }

  :deep(h3) {
    font-size: 24px;
    margin-bottom: var(--padding_02x);
  }

  :deep(p), :deep(ul) {
    margin-bottom: var(--padding_2x);
  }

  :deep(img) {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    object-position: center;
  }
</style>