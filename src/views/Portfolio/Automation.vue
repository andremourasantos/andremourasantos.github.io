<template>
  <PortfolioPage hero-title="Projetos de automação" hero-subtitle="Aprecie alguns dos meus trabalhos e aproveite para copiar algumas ideias para sua empresa." site-section-title="Automação" site-section-subtitle="Confira alguns fluxos com I.A. para automatizar a produção de textos, alterações em sistemas como Google Drive, CRMs, WhatsApp ou YouTube. Nesta categoria, apresento algumas ideias de fluxos no Make.com, mas elas podem ser adaptadas para outras plataformas como N8N facilmente." site-section-image="test">
    <GridCard title="Fluxo para planjemaneto de LIVES/Webinares" description="Description." image="test"/>
    <GridCard title="Produção textual para blog com I.A." description="Description." image="test"/>
    <GridCard title="Produção textual para vídeos com I.A." description="Description." image="test"/>
    <GridCard title="Estrutura de PROMPT para I.A." description="Description." image="test"/>
    <GridCard title="Bitrix24 API Assistant App (Make.com)" description="Description." image="test"/>
  </PortfolioPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PortfolioPage from '@/views/Portfolio/PageTemplate.vue';
import GridCard from '@/components/GridCard.vue';

export default defineComponent({
  components: {
    PortfolioPage,
    GridCard
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>

</style>