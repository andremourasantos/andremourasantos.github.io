<template>
  <PageTitle :PageTitle="'Criação de sites'" :PageDescription="'Desde a concepção ao produto final, ou apenas a etapa que precisar, confira os serviços fornecidos.'"/>
  <div id="gradient-top-right">
    <img src="../assets/blue.png">
  </div>
  <section id="servicesGroup">
    <div id="gradient-center-left">
      <img src="../assets/lateral.png">
    </div>
    <ServicesGroup :GroupTitle="'Combos de serviços'" :GroupDescription="'Não sabe por onde começar, então você está no lugar certo!'">
      <ServiceButton :ServiceImage="'general'" :ServiceTitle="'Serviço completo'" :ServiceDescription="'A solução tudo-em-um que você estava procurando.'" :ServiceTag="'Indisponível'" :ServiceID="'geral'"/>

      <ServiceButton :ServiceImage="'first-steps'" :ServiceTitle="'Primeiros passos'" :ServiceDescription="'Tire suas ideias do papel e leve-as para a internet.'" :ServiceTag="'Indisponível'" :ServiceID="'primeiros-passos'"/>
    </ServicesGroup>
    <ServicesGroup :GroupTitle="'Serviços oferecidos'" :GroupDescription="'Confira abaixo todos os serviços disponíveis, com detalhes.'">
      <ServiceButton v-for="entry in servicesToShow" :key="entry.id" :ServiceImage="entry.image" :ServiceTitle="entry.title" :ServiceDescription="entry.description" :ServiceID="entry.id" :ServiceTag="entry.status"/>
      </ServicesGroup>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Components
import PageTitle from '@/components/PageTitle.vue';
import ServicesGroup from '@/components/ServicesGroup.vue';
import ServiceButton from '@/components/ServiceButton.vue';

//Composables
import { filterServicesToShow } from "@/composables/general";

//Data
import servicesJSON from '@/data/web-services.json';

export default defineComponent({
  components: {PageTitle, ServicesGroup, ServiceButton},
  setup() {
    let servicesToShow:NonNullable<ServiceInfo>[] = filterServicesToShow(servicesJSON as ServiceInfo[]);

    return {
      servicesToShow
    }
  },
})
</script>


<style scoped>
</style>