<template>
  <HeroSection title="Meu impacto" subtitle="Confira os problemas que já encontrei e como solucionei eles."/>

  <ContentHolder>
    <SiteSection title="Automação de trabalho operacional repetitivo" description="Veja como automatizei diversos fluxos de trabalho, economizando 40 horas por mês com trabalho de baixo valor agregado, a partir de Automação de Processos Inteligentes (SPAs), Inteligência Artificial (IA) e plataformas No-code.">
      <Button size="M"/>
    </SiteSection>

    <SiteSection orientation="RTL" title="Reduzindo o CAC em 60% em três meses" description="Entenda o processo de diminuição de um CAC de R$ 540 para R$ 313 em apenas três meses a partir da internalização dos trabalhos do Marketing e produção de conteúdo.">
      <Button size="M"/>
    </SiteSection>

    <SiteSection title="Obtendo ROAS de campanhas publicitárias" description="Veja o processo para obter o Retorno Sobre o Investimento em Anúncios (ROAS) em uma empresa com mais de R$ 10 mil em gastos mensais com anúncios, permitindo a otimização dos recursos e esforço da empresa.">
      <Button size="M"/>
    </SiteSection>

    <SiteSection orientation="RTL" title="Implementação de I.A. nos processos de trabalho" description="Veja como implementamos o uso de LLMs nos processos de um escritório de advocacia, em que os detalhes ditam o sucesso ou fracasso de uma ação, além de incentivar o uso e aprimoramento contínuo.">
      <Button size="M"/>
    </SiteSection>

    <SiteSection title="Disseminação de know-how entre times e equipes" description="Veja como organizei os diversos conhecimentos de trabalho de uma empresa com mais de 10 times em uma única Base de Conhecimento, para agilizar o treinamento e rampagem de novos funcionários.">
      <Button size="M"/>
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
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--padding_10x);
    padding-bottom: var(--padding_10x);
  }
</style>