<template>
  <HeroSection title="Portfólio" subtitle="Aprecie alguns dos meus trabalhos e aproveite para copiar algumas ideias para sua empresa."/>

  <ContentHolder>

    <Quote quote="Tive o privilégio de trabalhar ao lado do André e testemunhar sua incrível capacidade de lidar com múltiplas responsabilidades ao mesmo tempo" author-name="Caroline Cunha" author-work="CS em VEGA I.T"/>

    <SiteSection title="Programação" description="Confira projetos de programação, incluindo sites, APIs e projetos pessoais. Todos os projetos apresentados contam com código disponível no GitHub.<br><br>Aproveite para copiar algumas ideias ou ver outras formas de solucionar um problema. Caso tenha interesse em algum projeto, você pode entrar em contato." image-name="mika-baumeister-J5yoGZLdpSI-unsplash">
      <RouterLink :to="{name: 'portfolio-programming'}"><Button size="M"/></RouterLink>
    </SiteSection>

    <SiteSection orientation="RTL" title="Automação" description="Confira alguns fluxos com I.A. para automatizar a produção de textos, alterações em sistemas como Google Drive, CRMs, WhatsApp ou YouTube.<br><br>Nesta categoria, apresento algumas ideias de fluxos no Make.com, mas elas podem ser adaptadas para outras plataformas como N8N facilmente." image-name="alvaro-reyes-qWwpHwip31M-unsplash">
      <RouterLink :to="{name: 'portfolio-automation'}"><Button size="M"/></RouterLink>
    </SiteSection>

    <SiteSection title="Design" description="Confira meus projetos de design, como protótipos de sites, aplicativos ou sistemas web, além de alguns esboços de artes (de verdade, não I.A.).<br><br>Caso tenha interesse em algum design ou aplicativo, você pode entrar em contato ou acessar a visualização no Figma." image-name="tirza-van-dijk-o1SKqmgSDbg-unsplash">
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

export default defineComponent({
  components: {
    HeroSection,
    SiteSection,
    Button,
    ContentHolder,
    Quote
  },
  setup () {
    

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