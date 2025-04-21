<template>
  <HeroSection title="Prazer, André aqui!" subtitle="Trabalho com Growth Marketing, crescimento data-driven e automações de processos."/>

  <ContentHolder>
    <Quote quote="Recomendo o André sem reservas para qualquer oportunidade que exija competências em marketing digital, analytics e gestão de dados. Tenho plena confiança de que ele continuará a superar expectativas e agregar valor em qualquer projeto ou organização" authorName="Bruno Malvezzi" author-work="Gerente de projetos em Hotel Trianon Paulista"/>

    <SiteSection title="Minha carreira profissional" description="O profissional de Marketing Digital com foco em Growth Marketing, ajudando Pequenas e Médias Empresas a crescer de forma sustentável por meio de estratégias data-driven." image-name="stephen-phillips-hostreviews-co-uk-shr_Xn8S8QU-unsplash">
      <RouterLink :to="{name:'work'}">
        <Button size="M"/>
      </RouterLink>
    </SiteSection>

    <Quote quote="Logo de cara, nas primeiras reuniões ele já entendeu a nossa necessidade e começamos a desenvolver projetos para melhorar nosso marketing, neste momento percebi que ele entende muito no que faz e também vem sempre com ótimas ideias, comprometido com o trabalho" authorName="Humberto Santos" author-work="CEO em Campos Dealer"/>

    <SiteSection title="Habilidades e certificações" description="Com experiência no trabalho com KPIs, OKRs, SEO técnico, SEM e implementação de ferramentas de automação, meu objetivo é impulsionar o crescimento e a eficiência dos negócios." orientation="RTL"/>

    <Quote quote="Pró-ativo, André busca, sugere e implementa soluções, com destaque para processos de organização para completar suas tarefas e entregar resultados aos clientes. Ele usa dados como guia para tomada de decisão, sem achismos, o que é excelente em sua atuação como Analista de Marketing em nossa equipe" authorName="Fillipe Neyl" author-work="CEO em Agência WX"/>

    <SiteSection title="Paixão por compartilhar" description="Projetos, com licença MIT, para uso livre, nas minhas principais áreas de atuação: automação, design e programação." image-name="simon-hurry-4iP8v26huu0-unsplash">
      <RouterLink :to="{name:'portfolio'}">
        <Button size="M"/>
      </RouterLink>
    </SiteSection>

    <Quote quote="No tempo em que trabalhamos juntos, sempre esteve disposto a ajudar a nossa equipe com ideias, sugestões e qualquer melhoria que pudesse ajudar a alavancar nosso negócio. A comunicação com o André sempre foi um ponto forte na parceria" authorName="Myckael Henrique" author-work="Comercial em Campos Dealer"/>

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
import Quote from '@/components/quote.vue';

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

</style>