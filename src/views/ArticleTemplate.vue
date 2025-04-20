<template>
  <HeroSection :title="heroTitle" :subtitle="heroSubtitle"/>
  <div id="content" class="articleContainer">
    <aside>
      <div>
        <ol>
          <li><a href="#introduction">Introducción</a></li>
          <li><a href="#section1">Sección 1</a></li>
          <li><a href="#section2">Sección 2</a></li>
          <li><a href="#section3">Sección 3</a></li>
          <li><a href="#conclusion">Conclusión</a></li>
        </ol>
      </div>
      <SocialMediaShareBar/>
    </aside>
    <article v-html="htmlContent"></article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import SocialMediaShareBar from '@/components/SocialMediaShareBar.vue';

import { marked } from 'marked';

export default defineComponent({
  components: {
    HeroSection,
    SocialMediaShareBar
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
    const htmlContent = ref<string>('');

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
  aside {
    height: fit-content;
    width: 100%;
    position: sticky;
    top: 96px;
    display: flex;
    flex-direction: column;
    gap: var(--padding_2x);
    padding: var(--padding_4x);
    background-color: #F5F5F5;
  }

  .articleContainer {
    display: grid;
    grid-template-columns: 480px 1fr;
    gap: var(--padding_10x);
    padding: var(--padding_10x) 0px;
  }

  article {
    display: flex;
    flex-direction: column;
  }

  :deep(article h2) {
    font-size: 32px;
    margin-top: var(--padding_4x);
    margin-bottom: var(--padding_02x);
  }

  :deep(article h3) {
    font-size: 24px;
    margin-bottom: var(--padding_02x);
  }

  :deep(article p), :deep(article ul) {
    margin-bottom: var(--padding_2x);
  }

  :deep(article img) {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    object-position: center;
  }
</style>