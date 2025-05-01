<template>
  <HeroSection title="Portfólio" subtitle="Ideias e projetos que você pode usar de inspiração ou adaptar para utilizar na sua operação."/>

  <ContentHolder>

    <Quote quote="Tive o privilégio de trabalhar ao lado do André e testemunhar sua incrível capacidade de lidar com múltiplas responsabilidades ao mesmo tempo" author-name="Caroline Cunha" author-work="CS em VEGA I.T"/>

    <SiteSection title="Programação" description="Confira sites, apps e projetos pessoais, abrangendo linguagens como JavaScript e seus supersets, como TypeScript e Google Apps Script, além de frameworks, como Vue e Nuxt.<br><br>Sinta-se à vontade para conferir os códigos utilizados e tomar de inspiração para as suas próximas criações! Caso goste de algum projeto e queira utilizá-lo, saiba que estão sob licença MIT." image-name="mika-baumeister-J5yoGZLdpSI-unsplash">
      <RouterLink :to="{name: 'portfolio-programming'}"><Button size="M"/></RouterLink>
    </SiteSection>

    <SiteSection orientation="RTL" title="Automação" description="Precisa de ajuda para automatizar criação de documentos, atualização de planilhas ou tarefas e preenchimento de campos no CRM? Aqui é o lugar.<br><br>Todos os projetos apresentados contam com as <em>blueprints</em> dos respectivos softwares utilizados para rápida interação." image-name="alvaro-reyes-qWwpHwip31M-unsplash">
      <RouterLink :to="{name: 'portfolio-automation'}"><Button size="M"/></RouterLink>
    </SiteSection>

    <SiteSection title="Design" description="Guardo um grande apreço por design gráfico e aqui disponibilizo alguns protótipos de sites, aplicativos e sistemas Web para sua inspiração.<br><br>Alguns projetos contam com link de visualização no Figma para que você possa fazer um <em>test-drive</em> nos designs." image-name="tirza-van-dijk-o1SKqmgSDbg-unsplash">
      <RouterLink :to="{name: 'portfolio-design'}"><Button size="M"/></RouterLink>
    </SiteSection>
  </ContentHolder>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import SiteSection from '@/components/SiteSection.vue';
import Button from '@/components/Button.vue';
import ContentHolder from '@/components/ContentHolder.vue';
import Quote from '@/components/Quote.vue';
import { useSeoMeta } from "@unhead/vue";

export default defineComponent({
  components: {
    HeroSection,
    SiteSection,
    Button,
    ContentHolder,
    Quote
  },
  setup () {
    useSeoMeta({
      title: 'Portfolio',
      description: 'Ideias e projetos que você pode usar de inspiração ou adaptar para utilizar na sua operação: Sinta-se à vontade para conferir os projetos e saiba que estão todos sob licença MIT.',
    });

    return {}
  }
})
</script>

<style scoped>
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--padding_10x);
    padding-bottom: var(--padding_10x);
  }
</style>