<template>
  <PortfolioPage hero-title="Projetos de programação" hero-subtitle="Aprecie alguns dos meus trabalhos e aproveite para copiar algumas ideias para sua empresa." site-section-title="Programação" site-section-subtitle="Confira projetos de programação, incluindo sites, APIs e projetos pessoais. Todos os projetos apresentados contam com código disponível no GitHub. Aproveite para copiar algumas ideias ou ver outras formas de solucionar um problema. Caso tenha interesse em algum projeto, você pode entrar em contato." site-section-image="test">
    <GridCard title="Planilha para acompanhamento de OKRs" description="Description." image="test"/>
    <GridCard title="Projeto Kai" description="Assistente de IA personalizado com interface mobile-first utilizando a API da DeepSeek e OpenAI." image="test"/>
    <GridCard title="Criador de UTM" description="Parametrize suas URLs e obtenha insights sobre suas campanhas.." image="test"/>
    <GridCard title="Calendário de Datas Comemorativas" description="Crie e mantenha um calendário para diversos clientes facilmente." image="test"/>
    <GridCard title="OKDOKEY - Agência de viagens" description="Uma demonstração de site responsivo para uma agência de viagens pequena." image="test"/>
    <GridCard title="Lista de compras" description="Projeto pessoal para aprender mais sobre o gerenciamento de bancos de dados e autenticação de usuários." image="test"/>
    <GridCard title="Ferramentas de André" description="Estes aplicativos foram pensados para serem intuitivos e cumprir o seu papel de maneira não menos que excepcional." image="test"/>
  </PortfolioPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PortfolioPage from '@/components/PortfolioPage.vue';
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