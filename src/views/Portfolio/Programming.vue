<template>
  <PortfolioPage hero-title="Projetos de programação" hero-subtitle="Caso goste de algum projeto e queira utilizá-lo, saiba que estão sob licença MIT." site-section-title="Inspirações" site-section-subtitle="Tenho uma paixão pela liberdade (e dor de cabeça) de desenvolver sistemas por conta própria, aplicando conceitos e ideias livremente e, com sorte, posso acabar inspirando você a buscar criar suas próprias soluções também!<br><br>Cada projeto conta uma história. Os respectivos links para os repositórios no GitHub também estão disponíveis." site-section-image="mika-baumeister-J5yoGZLdpSI-unsplash">
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
      let articles = await getArticlesByTag('portfolio', 'programming');
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