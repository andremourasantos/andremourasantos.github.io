<template>
  <PortfolioPage hero-title="Projetos de design" hero-subtitle="Aprecie alguns dos meus trabalhos e aproveite para copiar algumas ideias para sua empresa." site-section-title="Design" site-section-subtitle="Confira meus projetos de design, como protótipos de sites, aplicativos ou sistemas web, além de alguns esboços de artes (de verdade, não I.A.). Caso tenha interesse em algum design ou aplicativo, você pode entrar em contato ou acessar a visualização no Figma." site-section-image="tirza-van-dijk-o1SKqmgSDbg-unsplash">
    <GridCard v-for="bits in articlesBits" :title="bits.title" :description="bits.description" :image="bits.image" :keyPath="bits.key"/>
  </PortfolioPage>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
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
      let articles = await getArticlesByTag('portfolio', 'design');
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