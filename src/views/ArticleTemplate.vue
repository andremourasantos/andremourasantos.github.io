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
import { getFrontmatterFromText } from '@/composables/getBlogContent';
import HeroSection from '@/components/HeroSection.vue';
import SocialMediaShareBar from '@/components/SocialMediaShareBar.vue';
import { useSeoMeta } from "@unhead/vue";
import { useSchemaOrg, defineArticle, definePerson } from "@unhead/schema-org/vue";

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
    useSeoMeta({
      title: getFrontmatterFromText(props.articleText)?.title,
      description: getFrontmatterFromText(props.articleText)?.description,
      articleAuthor: ['André S.'],
      articlePublishedTime: new Date(getFrontmatterFromText(props.articleText)?.date as string).toISOString(),
      ogImage: {
        url: import.meta.env.BASE_URL + 'src/assets/cover-photos/main.png',
        alt: getFrontmatterFromText(props.articleText)?.title,
      },
    });

    useSchemaOrg(
      defineArticle({
        headline: getFrontmatterFromText(props.articleText)?.title,
        image: import.meta.env.BASE_URL + 'src/assets/cover-photos/main.png',
        author: definePerson({
          name: 'André Moura Santos',
          url: 'https://andremourasantos.com.br',
          image: 'https://avatars.githubusercontent.com/u/92397834?v=4',
          sameAs: ['https://www.linkedin.com/in/andremourasantos/', 'https://github.com/andremourasantos/'],
        }),
        datePublished: new Date(getFrontmatterFromText(props.articleText)?.date as string).toISOString(),
        inLanguage: 'pt-BR',
        description: getFrontmatterFromText(props.articleText)?.description,
        keywords: getFrontmatterFromText(props.articleText)?.tags,
        wordCount: props.articleText.trim().split(/\s+/).length,
      })
    )

    const heroTitleRef = ref<string>('');
    const heroSubtitleRef = ref<string>('');
    const heroImageRef = ref<string>('');
    const htmlContent = ref<string>('');
    const toc = ref<HTMLElement | null>(null);

    const generateContent = async (text: string) => {
      const frontmatter = getFrontmatterFromText(text);

      const content = text.replace(/---[\s\S]*?---/, '');

      let tempHtmlContent = await marked(content);
      const parser = new DOMParser();
      const doc = parser.parseFromString(tempHtmlContent, 'text/html');

      const title = frontmatter?.title;
      const subtitle = frontmatter?.description;
      const coverImage = frontmatter?.image;

      heroTitleRef.value = title || '';
      heroSubtitleRef.value = subtitle || '';
      if(coverImage){
        heroImageRef.value = coverImage as string;
      }

      const links = doc.querySelectorAll('a');
      links.forEach((link) => {
        const href = link.getAttribute('href');
        if(href && !href.includes(window.location.origin) && !href.startsWith('/')) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener');
        };
      })

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
    top: 80px;
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
    display: flex;
    flex-direction: column;
    gap: var(--padding_1x);
    font-size: 16px;
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
    font-size: 24px;
    margin-top: var(--padding_4x);
    margin-bottom: var(--padding_02x);
  }

  :deep(article h3) {
    font-size: 20px;
    margin-top: var(--padding_2x);
    margin-bottom: var(--padding_02x);
  }

  :deep(article *:not(ul, ol, blockquote) + h2) {
    margin-top: var(--padding_2x);
  }

  :deep(article *:not(ul, ol, blockquote) + h3) {
    margin-top: 0px;
  }

  :deep(article p) {
    margin-bottom: var(--padding_2x);
  }

  :deep(article blockquote p) {
    margin: 0px;
  }

  :deep(article blockquote) {
    background-color: #f5f5f5;
    padding: var(--padding_2x) var(--padding_4x);
  }

  :deep(article ul), :deep(article ol) {
    display: flex;
    flex-direction: column;
    gap: var(--padding_2x);
  }

  :deep(article ul li), :deep(article ol li) {
    margin-left: var(--padding_4x);
  }

  :deep(article li ul), :deep(article li ol) {
    gap: var(--padding_1x);
    margin-top: var(--padding_1x);
  }

  :deep(article ul + *:not(h2, h3)), :deep(article ol + *:not(h2, h3)) {
    margin-top: var(--padding_2x);
  }

  :deep(hr) {
    display: none;
  }

  :deep(article img) {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    object-position: center;
  }

  @media screen and (max-width: 1312px) {
    .articleContainer {
      grid-template-columns: 400px 1fr;
    }
  }

  @media screen and (max-width: 1056px) {
    .articleContainer {
      grid-template-columns: 320px 1fr;
      gap: var(--padding_5x);
    }
  }

  @media screen and (max-width: 672px) {
    aside {
      display: none;
    }

    .articleContainer {
      grid-template-columns: 1fr;
    }
  }
</style>