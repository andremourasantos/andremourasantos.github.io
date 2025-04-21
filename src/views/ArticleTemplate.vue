<template>
  <HeroSection :title="heroTitleRef" :subtitle="heroSubtitleRef" :image-name="heroImageRef"/>
  <div id="content" class="articleContainer">
    <aside>
      <div>
        <ol ref="toc" class="toc">
        </ol>
      </div>
      <SocialMediaShareBar v-if="showMediaShareBar"/>
    </aside>
    <article v-html="htmlContent"></article>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { marked } from 'marked';
import { useKebabConverter } from "@/composables/kebabConverter";
import HeroSection from '@/components/HeroSection.vue';
import SocialMediaShareBar from '@/components/SocialMediaShareBar.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    HeroSection,
    SocialMediaShareBar
  },
  props: {
    articleText: {
      type: String,
      required: true
    },
    showMediaShareBar: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const route = useRoute();
    const heroTitleRef = ref<string>('');
    const heroSubtitleRef = ref<string>('');
    const heroImageRef = ref<string>('');
    const htmlContent = ref<string>('');
    const toc = ref<HTMLElement | null>(null);

    const generateContent = async (text: string) => {
      let tempHtmlContent = await marked(text);
      const parser = new DOMParser();
      const doc = parser.parseFromString(tempHtmlContent, 'text/html');

      const title = doc.querySelector('h1');
      const subtitle = doc.querySelector('p');
      const coverImage = doc.querySelector('img');

      heroTitleRef.value = title?.innerHTML || '';
      heroSubtitleRef.value = subtitle?.innerHTML || '';
      if(coverImage && !coverImage.getAttribute('src')?.includes('http')){
        heroImageRef.value = coverImage.getAttribute('src') as string;
      }
      
      title?.remove();
      subtitle?.remove();
      coverImage?.remove();

      const headings = doc.querySelectorAll('h2, h3');
      headings.forEach((head) => {
        const id = useKebabConverter(head.innerHTML);
        head.setAttribute('id', id);
      });

      htmlContent.value = doc.body.innerHTML;
    }

    const generateToc = (content: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const headings = doc.querySelectorAll('h2');
      if (toc.value) toc.value.innerHTML = '';

      headings.forEach((head) => {
        const id = head.getAttribute('id');
        if (!id) return;

        const li = document.createElement('li');
        const link = document.createElement('a');
        link.innerText = head.innerHTML;
        link.setAttribute('href', `#${id}`);
        li.appendChild(link);
        toc.value?.appendChild(li);
      });
    }

    onMounted(async () => {
      await generateContent(props.articleText);
      generateToc(htmlContent.value);
    });

    watch(() => props.articleText, async (newArticleText) => {
      await generateContent(newArticleText);
      generateToc(htmlContent.value);
    });

    watch(htmlContent, (newHtmlContent) => {
      generateToc(newHtmlContent);
    });

    return {
      heroTitleRef,
      heroSubtitleRef,
      heroImageRef,
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
    font-size: 20px;
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
    margin-top: var(--padding_2x);
    margin-bottom: var(--padding_02x);
  }

  :deep(article p), :deep(article ul), :deep(article ol li) {
    margin-bottom: var(--padding_2x);
  }

  :deep(article ul li), :deep(article ol li) {
    margin-left: var(--padding_4x);
  }

  :deep(article img) {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    object-position: center;
  }
</style>