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
      <ServiceButton :service-image="'general'" :service-title="'Serviço completo'" :service-description="'A solução tudo-em-um que você estava procurando.'" :service-tag="'Indisponível'" :service-id="'geral'" :service-category="'Web'"/>

      <ServiceButton :service-image="'first-steps'" :service-title="'Primeiros passos'" :service-description="'Tire suas ideias do papel e leve-as para a internet.'" :service-tag="'Indisponível'" :service-id="'primeiros-passos'" :service-category="'Web'"/>
    </ServicesGroup>

    <ServicesGroup :GroupTitle="'Serviços oferecidos'" :GroupDescription="'Confira abaixo todos os serviços disponíveis, com detalhes.'">
      <ServiceButton v-for="entry in servicesToShow" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'Web'"/>
    </ServicesGroup>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

//Components
import PageTitle from '@/components/PageTitle.vue';
import ServicesGroup from '@/components/ServicesGroup.vue';
import ServiceButton from '@/components/ServiceButton.vue';

//Composables
import { filterServicesToShow, openServiceIDServiceModal, searchForURLParam } from "@/composables/general";

//Data
import servicesJSON from '@/data/web-services.json';

export default defineComponent({
  components: {PageTitle, ServicesGroup, ServiceButton},
  setup() {
    let servicesToShow:NonNullable<ServiceInfo>[] = filterServicesToShow(servicesJSON as ServiceInfo[]);

    onMounted(() => {
      const serviceIDURLParam = searchForURLParam('serviceID');

      if(serviceIDURLParam !== null) {
        openServiceIDServiceModal(serviceIDURLParam, 'Web');
      }
    })

    return {
      servicesToShow
    }
  },
})
</script>


<style scoped>
</style>