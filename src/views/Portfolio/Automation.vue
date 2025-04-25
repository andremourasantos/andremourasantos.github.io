<template>
  <PortfolioPage hero-title="Projetos de automação" hero-subtitle="Aprecie alguns dos meus trabalhos e aproveite para copiar algumas ideias para sua empresa." site-section-title="Automação" site-section-subtitle="Confira alguns fluxos com I.A. para automatizar a produção de textos, alterações em sistemas como Google Drive, CRMs, WhatsApp ou YouTube. Nesta categoria, apresento algumas ideias de fluxos no Make.com, mas elas podem ser adaptadas para outras plataformas como N8N facilmente." site-section-image="alvaro-reyes-qWwpHwip31M-unsplash">
    <GridCard v-for="bits in articlesBits" :title="bits.title" :description="bits.description" :image="bits.image"/>
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
      let articles = await getArticlesByTag('automation');
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