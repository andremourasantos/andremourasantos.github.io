<template>
  <HeroSection title="Meu impacto" subtitle="Confira os problemas que já encontrei e como solucionei eles."/>

  <ContentHolder>
    <Quote quote="Recomendo-o com entusiasmo a qualquer organização que busque um profissional de marketing completo. André é um profissional extremamente dedicado, paciente e engajado. Possui profundo entendimento sobre estratégias de growth, o conceito de máquina de vendas" authorName="Cleverson Marques" author-work="Executivo de vendas em VEGA I.T"/>

    <SiteSection orientation="RTL" title="Reduzindo o CAC em 60% em três meses" description="Entenda o processo de diminuição de um CAC de R$ 540 para R$ 313 em apenas três meses a partir da internalização dos trabalhos do Marketing e produção de conteúdo.">
      <RouterLink to="/trabalhos/reduzindo-o-cac-em-60-em-tres-meses"><Button size="M"/></RouterLink>
    </SiteSection>

    <Quote quote="O André é o tipo de profissional que entrega tudo o que promete e ainda vai além. Extremamente competente, dedicado e atencioso, ele sempre encontra soluções criativas e eficazes para qualquer desafio. Se tem alguém que realmente faz a diferença, esse alguém é ele" authorName="Pablo Ricardo" author-work="Gestor de Tráfego em WorkUp Digital"/>

    <SiteSection title="Obtendo ROAS de campanhas publicitárias" description="Veja o processo para obter o Retorno Sobre o Investimento em Anúncios (ROAS) em uma empresa com mais de R$ 120 mil de investimento anual com anúncios, permitindo a otimização dos recursos e esforço da empresa.">
      <RouterLink to="/trabalhos/obtendo-o-roas-de-campanhas-publicitarias"><Button size="M"/></RouterLink>
    </SiteSection>

    <Quote quote="O André é um profissional dedicado e atencioso, com ótimo conhecimento técnico e que trabalha bem em equipe para implantar soluções" authorName="Rafael Bretas" author-work="CEO em Agência fog"/>

    <SiteSection orientation="RTL" title="Automação de trabalho operacional repetitivo" description="Veja como automatizei diversos fluxos de trabalho, economizando 40 horas por mês com trabalho de baixo valor agregado, a partir de Automação de Processos Inteligentes (SPAs), Inteligência Artificial (IA) e plataformas No-code.">
      <RouterLink to="/trabalhos/automacao-de-trabalho-operacional-repetitivo"><Button size="M"/></RouterLink>
    </SiteSection>
    
    <Quote quote="Profissional excelente e responsável, sou muito contente em trabalhar com o André" authorName="Cássio Pisseti" author-work="CEO em Engepoli"/>

    <!-- <Quote quote="O André é um profissional extremamente competente, organizado e criativo. Trabalhamos juntos há mais de um ano e sempre tivemos ótimos resultados com os clientes" authorName="Wedlin Lucas" author-work="Designer em Agência WX"/>

    <SiteSection title="Implementação de I.A. nos processos de trabalho" description="Veja como implementamos o uso de LLMs nos processos de um escritório de advocacia, em que os detalhes ditam o sucesso ou fracasso de uma ação, além de incentivar o uso e aprimoramento contínuo.">
      <Button size="M"/>
    </SiteSection>

    <SiteSection title="Disseminação de know-how entre times e equipes" description="Veja como organizei os diversos conhecimentos de trabalho de uma empresa com mais de 10 times em uma única Base de Conhecimento, para agilizar o treinamento e rampagem de novos funcionários.">
      <Button size="M"/>
    </SiteSection> -->
  </ContentHolder>

  <ContentHolder orientation="grid">
    <GridCard path-folder="trabalhos" title="Em breve..." description="Logo mais atualizarei esta seção do site com mais novidades." image="test"/>
    <GridCard path-folder="trabalhos" title="Em breve..." description="Logo mais atualizarei esta seção do site com mais novidades." image="test"/>
    <GridCard path-folder="trabalhos" title="Em breve..." description="Logo mais atualizarei esta seção do site com mais novidades." image="test"/>
  </ContentHolder>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import SiteSection from '@/components/SiteSection.vue';
import Button from '@/components/Button.vue';
import ContentHolder from '@/components/ContentHolder.vue';
import GridCard from '@/components/GridCard.vue';
import Quote from '@/components/Quote.vue';
import { useSeoMeta } from "@unhead/vue";
import { useSchemaOrg } from '@unhead/schema-org/vue'
import { defineWebPage } from '@unhead/schema-org';

export default defineComponent({
  components: {
    HeroSection,
    SiteSection,
    Button,
    ContentHolder,
    GridCard,
    Quote
  },
  setup () {
    useSeoMeta({
      title: 'Trabalhos',
      description: 'Confira os problemas que já encontrei e como os solucionei: especializado em estratégias data-driven e crescimento sustentável, meu trabalho contribui substancialmente para o amadurecimento digital da sua empresa.',
    });

    useSchemaOrg(
      defineWebPage({
        name: 'Trabalhos | André S.',
        description: 'Confira os problemas que já encontrei e como os solucionei: especializado em estratégias data-driven e crescimento sustentável, meu trabalho contribui substancialmente para o amadurecimento digital da sua empresa.',
        url: import.meta.url,
        image: 'https://avatars.githubusercontent.com/u/92397834?v=4',
        sameAs: ['https://www.linkedin.com/in/andremourasantos/', 'https://github.com/andremourasantos/']
      })
    )

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