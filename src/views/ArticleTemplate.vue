<template>
  <HeroSection :title="heroTitle" :subtitle="heroSubtitle"/>
  <div id="content" class="articleContainer">
    <aside>
      <div>
        <ol ref="toc" class="toc">
        </ol>
      </div>
      <SocialMediaShareBar/>
    </aside>
    <article v-html="htmlContent"></article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import SocialMediaShareBar from '@/components/SocialMediaShareBar.vue';

import { marked } from 'marked';

import { useKebabConverter } from "@/composables/kebabConverter";

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
    const toc = ref<HTMLElement | null>(null);

    onMounted(async () => {
      let tempHmltContent = await marked(props.articleText);
      const parser = new DOMParser();

      const doc = parser.parseFromString(tempHmltContent, 'text/html');
      const headings = doc.querySelectorAll('h2, h3');

      headings.forEach((head) => {
        const id = useKebabConverter(head.innerHTML);
        head.setAttribute('id', id);
      })

      htmlContent.value = doc.body.innerHTML;
    })

    watch(htmlContent, (newValue) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(newValue, 'text/html');
      const headings = doc.querySelectorAll('h2');

      let list:HTMLElement[] = [];

      const tocList = headings.forEach((head) => {
        const id = head.getAttribute('id');
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.innerText = head.innerHTML;
        link.setAttribute('href', `#${id}`);
        li.appendChild(link);
        toc.value?.appendChild(li);
        list.push(li);
      })
    })

    return {
      htmlContent,
      toc
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

  .toc {
    line-height: 32px;
  }

  :deep(.toc a) {
    text-decoration: none;
  }

  :deep(.toc a):hover {
    text-decoration: underline;
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