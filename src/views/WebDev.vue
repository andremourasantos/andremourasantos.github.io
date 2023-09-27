<template>
  <PageTitle :PageTitle="'Criação de sites'" :PageDescription="'Desde a concepção ao produto final, ou apenas a etapa que precisar, confira os serviços fornecidos.'"/>
  <img src="../assets/blue.png" id="gradient-top-right">
  <section id="servicesGroup">
    <ServicesGroup :GroupTitle="'Combos de serviços'" :GroupDescription="'Não sabe por onde começar, então você está no lugar certo!'">
      <ServiceButton :ServiceImage="'general'" :ServiceTitle="'Serviço completo'" :ServiceDescription="'A solução tudo-em-um que você estava procurando.'" :ServiceTag="'Indisponível'" :ServiceID="'geral'"/>

      <ServiceButton :ServiceImage="'first-steps'" :ServiceTitle="'Primeiros passos'" :ServiceDescription="'Tire suas ideias do papel e leve-as para a internet.'" :ServiceTag="'Indisponível'" :ServiceID="'primeiros-passos'"/>
    </ServicesGroup>
    <ServicesGroup :GroupTitle="'Serviços oferecidos'" :GroupDescription="'Confira abaixo todos os serviços disponíveis, com detalhes.'">
      <ServiceButton :ServiceImage="'criacao-de-sites'" :ServiceTitle="'Criação de sites'" :ServiceDescription="'Um site criado a partir de um design completo. Rápido, otimizado para SEO e acessibilidade.'" :ServiceID="'criacao-de-sites'"/>

      <ServiceButton :ServiceImage="'design-de-sites'" :ServiceTitle="'Design de sites'" :ServiceDescription="'Só tem uma ideia? Vamos transformá-la em um design para que tome vida.'" :ServiceID="'design-de-sites'"/>

      <ServiceButton :ServiceImage="'consultoria-web'" :ServiceTitle="'Consultoria'" :ServiceDescription="'Tenha uma segunda opinião sobre o seu site, com sugestões de melhorias.'" :ServiceID="'consultoria-web'"/>

      <ServiceButton :ServiceImage="'relatorios-web'" :ServiceTitle="'Relatórios personalizados'" :ServiceDescription="'Não fique no escuro quanto a eficácia do seu site, tenha um relatório detalhado.'" :ServiceID="'relatorios-web'"/>
    </ServicesGroup>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Components
import PageTitle from '@/components/PageTitle.vue';
import ServicesGroup from '@/components/ServicesGroup.vue';
import ServiceButton from '@/components/ServiceButton.vue';

export default defineComponent({
  components: {PageTitle, ServicesGroup, ServiceButton},
  setup() {
    
  },
})
</script>


<style scoped>
  #servicesGroup {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>