<template>
  <PortfolioPage hero-title="Projetos de design" hero-subtitle="Aprecie aqui alguns dos meus trabalhos ou use como inspiração para o seu próximo projeto." site-section-title="Resolvendo problemas reais" site-section-subtitle='Assim como <a href="/portfolio/programacao">meus projetos de programação</a>, cada projeto foi criado pensando em solucionar um problema do mundo real que eu (ou um cliente) já experienciou.<br><br>Alguns projetos contam com links para um <em>teste-drive</em> nos designs, sinta-se à vontade para explorar.' site-section-image="tirza-van-dijk-o1SKqmgSDbg-unsplash">
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
        return a.date > b.date ? -1 : 1;
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