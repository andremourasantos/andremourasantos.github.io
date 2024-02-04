<template>
  <PageTitle :page-title="'Criação de sites'" :page-description="'Desde a concepção ao produto final, ou apenas a etapa que precisar.'"/>

  <section id="servicesGroup">
    <ServicesGroup v-if="!comboServices || comboServices.length !== 0" :component-status="fetchingData ? 'Loading' : 'Loaded'" :group-title="'Serviços tudo-em-um'" :group-description="'Precisa de um serviço completo? Veja as ofertas de serviços abaixo e confira mais detalhes.'">
      <ServiceButton v-for="entry in comboServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'Web'"/>
    </ServicesGroup>

    <ServicesGroup v-if="!individualServices || individualServices.length !== 0" :component-status="fetchingData ? 'Loading' : 'Loaded'" :group-title="'Serviços oferecidos'" :group-description="'Está buscando apenas por um serviço em específico? Confira a seleção abaixo e saiba mais.'">
      <ServiceButton v-for="entry in individualServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'Web'"/>
    </ServicesGroup>
    
    <!-- <ServicesGroup v-if="individualServices.length !== 0" :group-title="'Complementos'" :group-description="'Precisa de algo específico em seu site? Veja os complementos disponíveis para serviços Web.'">
      <ServiceButton v-for="entry in individualServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'Web'"/>
    </ServicesGroup> -->
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount, onMounted } from 'vue';

// components
import PageTitle from '@/components/PageTitle.vue';
import ServicesGroup from '@/components/ServicesGroup.vue';
import ServiceButton from '@/components/ServiceButton.vue';

// composables
import { filterServicesToShow, openServiceIDServiceModal, searchForURLParam } from "@/composables/general";
import { getPageInfoForServices } from '@/composables/data-base';

//Data
import servicesJSON from '@/data/web-services.json';

export default defineComponent({
  components: {PageTitle, ServicesGroup, ServiceButton},
  setup() {
    const serviceData = ref<TinyServiceInfoWEB[] | null>();
    const fetchingData = ref<boolean>(true);

    // services groups
    const comboServices = ref<TinyServiceInfoWEB[] | null>();
    const individualServices = ref<TinyServiceInfoWEB[] | null>();

    onBeforeMount(async () => {
      serviceData.value = await getPageInfoForServices('web') as TinyServiceInfoWEB[];
    })

    watch(serviceData, () => {
      fetchingData.value = false;

      comboServices.value = serviceData.value.filter(entry => {return entry.group === 'Tudo-em-um'});
      individualServices.value = serviceData.value.filter(entry => {return entry.group === 'Individual'});
    })

    onMounted(() => {
      const serviceIDURLParam = searchForURLParam('serviceID');

      if(serviceIDURLParam !== null) {
        openServiceIDServiceModal(serviceIDURLParam, 'Web');
      }
    })

    return {
      fetchingData,
      comboServices,
      individualServices,
    }
  },
})
</script>

<style scoped>
</style>