<template>
  <PortfolioPage hero-title="Projetos de programação" hero-subtitle="Aprecie alguns dos meus trabalhos e aproveite para copiar algumas ideias para sua empresa." site-section-title="Programação" site-section-subtitle="Confira projetos de programação, incluindo sites, APIs e projetos pessoais. Todos os projetos apresentados contam com código disponível no GitHub. Aproveite para copiar algumas ideias ou ver outras formas de solucionar um problema. Caso tenha interesse em algum projeto, você pode entrar em contato." site-section-image="mika-baumeister-J5yoGZLdpSI-unsplash">
    <GridCard v-for="bits in articlesBits" :title="bits.title" :description="bits.description" :image="bits.image" :key-path="bits.key"/>
  </PortfolioPage>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import PortfolioPage from '@/views/portfolio/PageTemplate.vue';
import GridCard from '@/components/GridCard.vue';
import { getArticlesByTag } from '@/composables/getBlogContent';

export default defineComponent({
  components: {
    PortfolioPage,
    GridCard
  },
  setup () {
    const articlesBits = ref<Frontmatter[]>([]);
    onMounted(async () => {
      let articles = await getArticlesByTag('programming');
      articles.sort((a, b) => {
        return a.date < b.date ? -1 : 1;
      });

      articlesBits.value = articles;
    })

    return {
      articlesBits
    }
  }
})
</script>

<style scoped>

</style>