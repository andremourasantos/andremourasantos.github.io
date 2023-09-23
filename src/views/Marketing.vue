<template>
  <PageTitle :PageTitle="'Marketing Digital'" :PageDescription="'Tenha uma estratégia de Marketing confeccionada especificamente para as necessidades do seu negócio.'"/>
  <img src="../assets/purple.png" id="gradient-top-right">
  <section id="servicesGroup">
    <ServicesGroup :GroupTitle="'Combos de serviços'" :GroupDescription="'Economize tempo e dinheiro na hora de criar sua estratégia de Marketing.'">
      <ServiceButton :ServiceImage="'general'" :ServiceTitle="'Serviço completo'" :ServiceDescription="'Contrate todos os serviços para começar seu Marketing a todo vapor.'" :ServiceTag="'Indisponível'"/>
      <ServiceButton :ServiceImage="'first-steps'" :ServiceTitle="'Primeiros passos'" :ServiceDescription="'Obtenha o básico para renovar os trabalhos com o Marketing da sua empresa.'" :ServiceTag="'Indisponível'"/>
    </ServicesGroup>
    <ServicesGroup :GroupTitle="'Serviços oferecidos'" :GroupDescription="'Confira abaixo todos os serviços disponíveis, com detalhes.'">
      <ServiceButton :ServiceImage="'presenca-digital'" :ServiceTitle="'Presença digital'" :ServiceDescription="'Receba uma análise de como sua empresa está no ambiente digital com sugestões de melhorias.'"/>
      <ServiceButton :ServiceImage="'publico-alvo'" :ServiceTitle="'Público-alvo'" :ServiceDescription="'Entenda quem é o público da sua empresa ou descubra novas clientes em potencial.'"/>
      <ServiceButton :ServiceImage="'personas'" :ServiceTitle="'Personas'" :ServiceDescription="'Aumente a agilidade e eficiência do seu Marketing atingindo o seu cliente ideal.'"/>
      <ServiceButton :ServiceImage="'estrategia-de-conteudo'" :ServiceTitle="'Estratégia de conteúdo'" :ServiceDescription="'Obtenha uma estratégia de conteúdo para satisfazer o seu público sem estresse.'"/>
      <ServiceButton :ServiceImage="'estrategia-de-anuncios'" :ServiceTitle="'Estratégia de anúncios'" :ServiceDescription="'Comece seus anúncios de forma simples e objetiva nas principais plataformas do mercado.'"/>
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

</style>