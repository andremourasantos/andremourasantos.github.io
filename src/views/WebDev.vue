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
      <ServiceButton v-for="entry in comboServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'Web'"/>
    </ServicesGroup>

    <ServicesGroup :GroupTitle="'Serviços oferecidos'" :GroupDescription="'Confira abaixo todos os serviços disponíveis, com detalhes.'">
      <ServiceButton v-for="entry in individualServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'Web'"/>
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
    const servicesToShow:NonNullable<ServiceInfo>[] = filterServicesToShow(servicesJSON as ServiceInfo[]);

    const individualServices:NonNullable<ServiceInfo>[] = servicesToShow.filter(entry => {return entry.group === 'Individual'});
    const comboServices:NonNullable<ServiceInfo>[] = servicesToShow.filter(entry => {return entry.group === 'Combo'});

    onMounted(() => {
      const serviceIDURLParam = searchForURLParam('serviceID');

      if(serviceIDURLParam !== null) {
        openServiceIDServiceModal(serviceIDURLParam, 'Web');
      }
    })

    return {
      individualServices,
      comboServices
    }
  },
})
</script>


<style scoped>
</style>