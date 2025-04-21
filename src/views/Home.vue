<template>
  <HeroSection title="Prazer, André aqui!" subtitle="Trabalho com Growth Marketing, crescimento data-driven e automações de processos."/>
  
  <ContentHolder>
    <SiteSection title="Minha carreira profissional" description="O profissional de Marketing Digital com foco em Growth Marketing, ajudando Pequenas e Médias Empresas a crescer de forma sustentável por meio de estratégias data-driven." image-name="stephen-phillips-hostreviews-co-uk-shr_Xn8S8QU-unsplash">
      <RouterLink :to="{name:'work'}">
        <Button size="M"/>
      </RouterLink>
    </SiteSection>

    <SiteSection title="Habilidades e certificações" description="Com experiência no trabalho com KPIs, OKRs, SEO técnico, SEM e implementação de ferramentas de automação, meu objetivo é impulsionar o crescimento e a eficiência dos negócios." orientation="RTL"/>

    <SiteSection title="Paixão por compartilhar" description="Projetos, com licença MIT, para uso livre, nas minhas principais áreas de atuação: automação, design e programação." image-name="simon-hurry-4iP8v26huu0-unsplash">
      <RouterLink :to="{name:'portfolio'}">
        <Button size="M"/>
      </RouterLink>
    </SiteSection>

    <SiteSection title="Entre em contato" description="Com experiência no trabalho com KPIs, OKRs, SEO técnico, SEM e implementação de ferramentas de automação, meu objetivo é impulsionar o crescimento e a eficiência dos negócios." orientation="RTL" image-name="mourizal-zativa-bNBl5cHclMA-unsplash">
      <Button text="Fale comigo" icon-name="WhatsApp" size="M"/>
    </SiteSection>
  </ContentHolder>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import SiteSection from '@/components/SiteSection.vue';
import Button from '@/components/Button.vue';
import ContentHolder from '@/components/ContentHolder.vue';

export default defineComponent({
  components: {
    HeroSection,
    SiteSection,
    Button,
    ContentHolder
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>

</style>