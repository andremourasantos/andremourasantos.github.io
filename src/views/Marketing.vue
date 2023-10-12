<template>
  <PageTitle :PageTitle="'Marketing Digital'" :PageDescription="'Tenha uma estratégia de Marketing confeccionada especificamente para as necessidades do seu negócio.'"/>
  <!-- <div id="gradient-top-right">
    <img src="../assets/purple.png">
  </div> -->
  <section id="servicesGroup">
    <!-- <div id="gradient-center-left">
      <img src="../assets/lateral.png">
    </div> -->
    <ServicesGroup :GroupTitle="'Combos de serviços'" :GroupDescription="'Economize tempo e dinheiro na hora de criar sua estratégia de Marketing.'">
      <ServiceButton v-for="entry in comboServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'Web'"/>
    </ServicesGroup>
    
    <ServicesGroup :GroupTitle="'Serviços oferecidos'" :GroupDescription="'Confira abaixo todos os serviços disponíveis, com detalhes.'">
      <ServiceButton v-for="entry in individualServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'Marketing'"/>
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
import { filterServicesToShow, searchForURLParam, openServiceIDServiceModal } from "@/composables/general";

//Data
import servicesJSON from '@/data/mkt-services.json';

export default defineComponent({
  components: {PageTitle, ServicesGroup, ServiceButton},
  setup() {
    let servicesToShow:NonNullable<ServiceInfo>[] = filterServicesToShow(servicesJSON as ServiceInfo[]);

    const individualServices:NonNullable<ServiceInfo>[] = servicesToShow.filter(entry => {return entry.group === 'Individual'});
    const comboServices:NonNullable<ServiceInfo>[] = servicesToShow.filter(entry => {return entry.group === 'Combo'});

    onMounted(() => {
      const serviceIDURLParam = searchForURLParam('serviceID');

      if(serviceIDURLParam !== null) {
        openServiceIDServiceModal(serviceIDURLParam, 'Marketing');
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
#gradient-center-left {
  height: 718px !important;
}

#gradient-center-left img {
  position: relative;
  left: -150px;
  top: -100px;
  height: 850px;
  width: 900px;
}
</style>