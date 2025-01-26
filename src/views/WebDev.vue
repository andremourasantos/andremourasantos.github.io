<template>
  <PageTitle :page-title="'Criação de sites'" :page-description="'Desde a concepção ao produto final, ou apenas a etapa que precisar.'"/>

  <section id="servicesGroup">
    <ServicesGroup v-if="!comboServices || comboServices.length !== 0" :component-status="fetchingData ? 'Loading' : 'Loaded'" :group-title="'Serviços tudo-em-um'" :group-description="'Precisa de um serviço completo? Veja as ofertas de serviços abaixo e confira mais detalhes.'" :skeleton-group-name="skeletonsInfo.group1.name" :group-category="'web'">
      <ServiceButton v-for="entry in comboServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'web'"/>
    </ServicesGroup>

    <ServicesGroup v-if="!individualServices || individualServices.length !== 0" :component-status="fetchingData ? 'Loading' : 'Loaded'" :group-title="'Serviços oferecidos'" :group-description="'Está buscando apenas por um serviço em específico? Confira a seleção abaixo e saiba mais.'" :skeleton-group-name="skeletonsInfo.group2.name" :group-category="'web'">
      <ServiceButton v-for="entry in individualServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'web'"/>
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
import { openServiceModal, highligthAdService, searchForURLParam, setNumberOfSkeletonsForServiceGroup } from "@/composables/general";
import { getPageInfoForServices, isCacheSyncedWithCloud } from '@/composables/data-base';

export default defineComponent({
  components: {PageTitle, ServicesGroup, ServiceButton},
  setup() {
    const serviceData = ref<TinyServiceInfoWEB[] | null>();
    const fetchingData = ref<boolean>(true);

    // services groups
    const skeletonsInfo = ref({
      group1: {
        name: 'combo',
      },
      group2: {
        name: 'individual'
      }
    })
    const comboServices = ref<TinyServiceInfoWEB[] | null>();
    const individualServices = ref<TinyServiceInfoWEB[] | null>();

    onBeforeMount(async () => {
      await isCacheSyncedWithCloud('web');
      serviceData.value = await getPageInfoForServices('web') as TinyServiceInfoWEB[];
    })

    watch(serviceData, () => {
      if(!serviceData.value){return};
      fetchingData.value = false;

      comboServices.value = serviceData.value.filter(entry => {return entry.group === 'Tudo-em-um'});
      setNumberOfSkeletonsForServiceGroup('web', skeletonsInfo.value.group1.name, comboServices.value.length);
      modifyTagForAdService(comboServices.value);

      individualServices.value = serviceData.value.filter(entry => {return entry.group === 'Individual'});
      setNumberOfSkeletonsForServiceGroup('web', skeletonsInfo.value.group2.name, individualServices.value.length);
      modifyTagForAdService(individualServices.value);
    })

    const modifyTagForAdService = (list:TinyServiceInfo[]):void => {
      const serviceToHighlight:string|null = highligthAdService();
      if(serviceToHighlight === null){return};

      list.forEach(service => {
        if(service.id === serviceToHighlight){
          service.status = 'Ad';
        }
      });
    }

    onMounted(() => {
      const serviceIDURLParam = searchForURLParam('serviceID');

      if(serviceIDURLParam !== null) {
        openServiceModal(serviceIDURLParam, 'web');
      }
    })

    return {
      fetchingData,
      skeletonsInfo,
      comboServices,
      individualServices,
    }
  },
})
</script>

<style scoped>
</style>