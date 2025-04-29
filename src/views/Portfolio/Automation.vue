<template>
  <PortfolioPage hero-title="Projetos de automação" hero-subtitle="Veja como se livrar do trabalho repetitivo e tornar a sua operação mais dinâmica." site-section-title="Eliminando tarefas repetitivas" site-section-subtitle="Quanto maior fica a sua operação, mais e mais tarefas são necessárias, como preencher formulários, atualizar o CRM, modificar uma planilha ou criar documentos padrão.<br><br>Aqui você pode encontrar algumas soluções para liberar o seu tempo dessas atividades de baixo valor agregado para o cliente." site-section-image="alvaro-reyes-qWwpHwip31M-unsplash">
    <GridCard v-for="bits in articlesBits" :title="bits.title" :description="bits.description" :image="bits.image" :key-path="bits.key"/>
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
      let articles = await getArticlesByTag('portfolio', 'automation');
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