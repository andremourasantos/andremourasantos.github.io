<template>
  <PageTitle :page-title="'Criação de sites'" :page-description="'Desde a concepção ao produto final, ou apenas a etapa que precisar.'"/>

  <section id="servicesGroup">
    <ServicesGroup :group-title="'Serviços tudo-em-um'" :group-description="'Precisa de um serviço completo? Veja as ofertas de serviços abaixo e confira mais detalhes.'">
      <ServiceButton v-for="entry in comboServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'Web'"/>
    </ServicesGroup>

    <ServicesGroup :group-title="'Serviços oferecidos'" :group-description="'Está buscando apenas por um serviço em específico? Confira a seleção abaixo e saiba mais.'">
      <ServiceButton v-for="entry in individualServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'Web'"/>
    </ServicesGroup>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

//Components
import PageTitle from '@/components/PageTitle.vue';
import ButtonToPage from '@/components/ButtonToPage.vue';
import ServicesGroup from '@/components/ServicesGroup.vue';
import ServiceButton from '@/components/ServiceButton.vue';

//Composables
import { filterServicesToShow, openServiceIDServiceModal, searchForURLParam } from "@/composables/general";

//Data
import servicesJSON from '@/data/web-services.json';
import router from '@/router';

export default defineComponent({
  components: {PageTitle, ButtonToPage, ServicesGroup, ServiceButton},
  setup() {
    const goToPortfolio = () => {
      router.push({name:'portfolio'});
    }

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
      goToPortfolio,
      individualServices,
      comboServices
    }
  },
})
</script>


<style scoped>
</style>