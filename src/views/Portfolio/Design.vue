<template>
  <PortfolioPage hero-title="Projetos de design" hero-subtitle="Aprecie alguns dos meus trabalhos e aproveite para copiar algumas ideias para sua empresa." site-section-title="Design" site-section-subtitle="Confira meus projetos de design, como protótipos de sites, aplicativos ou sistemas web, além de alguns esboços de artes (de verdade, não I.A.). Caso tenha interesse em algum design ou aplicativo, você pode entrar em contato ou acessar a visualização no Figma." site-section-image="tirza-van-dijk-o1SKqmgSDbg-unsplash">
    <GridCard title="Site da Engel Advogados" description="Description." image="test"/>
    <GridCard title="Site da VEGA I.T." description="Description." image="test"/>
    <GridCard title="Proposita" description="Description." image="test"/>
    <GridCard title="Meu site profissional" description="O meu novo site profissional, adotando o neumorphism e as melhores práticas para manutenção." image="test"/>
    <GridCard title="Site do Dr. André" description="Um site, no estilo aplicativo de telefone, para um oftalmologista conhecido de Porto Velho, RO." image="test"/>
    <GridCard title="Aplicativo de delivery" description="Description." image="test"/>
    <GridCard title="Currículo no Figma" description="Description." image="test"/> 
  </PortfolioPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PortfolioPage from '@/views/portfolio/PageTemplate.vue';
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