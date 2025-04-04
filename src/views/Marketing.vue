<template>
  <PageTitle :page-title="'Marketing Digital'" :page-description="'Tenha uma estratégia de Marketing confeccionada especificamente para as necessidades do seu negócio.'"/>

  <div class="recommendationsCard">
    <RecommendationsCard/>
  </div>

  <section id="servicesGroup">    
    <!-- <ServicesGroup v-if="!comboServices || comboServices.length !== 0" :component-status="fetchingData ? 'Loading' : 'Loaded'" :group-title="'Combos de serviços'" :group-description="'Economize tempo e dinheiro na hora de criar sua estratégia de Marketing.'" :group-category="'marketing'" :skeleton-group-name="skeletonsInfo.group1.name">
      <ServiceButton v-for="entry in comboServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'marketing'"/>
    </ServicesGroup> -->
    
    <ServicesGroup v-if="!individualServices || individualServices.length !== 0" :component-status="fetchingData ? 'Loading' : 'Loaded'" :group-title="'Primeiros passos'" :group-description="'Você não precisa se sobrecarregar com o Marketing, vamos começar pequeno e desenvolver aos poucos.'" :group-category="'marketing'" :skeleton-group-name="skeletonsInfo.group2.name">
      <ServiceButton v-for="entry in individualServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'marketing'"/>
    </ServicesGroup>

    <ServicesGroup v-if="!ascensionServices || ascensionServices.length !== 0" :component-status="fetchingData ? 'Loading' : 'Loaded'" :group-title="'Em ascensão'" :group-description="'Para você que já tem uma estratégia em andamento, vamos subir o nível com estes serviços.'" :group-category="'marketing'" :skeleton-group-name="skeletonsInfo.group3.name">
      <ServiceButton v-for="entry in ascensionServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'marketing'"/>
    </ServicesGroup>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount, onMounted, ObjectHTMLAttributes } from 'vue';
import RecommendationsCard from '@/components/RecommendationsCard.vue';

// components
import PageTitle from '@/components/PageTitle.vue';
import ServicesGroup from '@/components/ServicesGroup.vue';
import ServiceButton from '@/components/ServiceButton.vue';

// composables
import { searchForURLParam, highligthAdService, openServiceModal, setNumberOfSkeletonsForServiceGroup } from "@/composables/general";
import { getPageInfoForServices, isCacheSyncedWithCloud } from '@/composables/data-base';

export default defineComponent({
  components: {PageTitle, RecommendationsCard, ServicesGroup, ServiceButton},
  setup() {
    const serviceData = ref<TinyServiceInfoMKT[] | null>();
    const fetchingData = ref<boolean>(true);

    // services groups
    const skeletonsInfo = ref({
      group1: {
        name: 'combo',
      },
      group2: {
        name: 'individual'
      },
      group3: {
        name: 'ascensão'
      }
    })
    const comboServices = ref<TinyServiceInfoMKT[] | null>();
    const individualServices = ref<TinyServiceInfoMKT[] | null>();
    const ascensionServices = ref<TinyServiceInfoMKT[] | null>();

    onBeforeMount(async () => {
      await isCacheSyncedWithCloud('marketing');
      serviceData.value = await getPageInfoForServices('marketing') as TinyServiceInfoMKT[];
    })

    watch(serviceData, () => {
      if(!serviceData.value){return};
      fetchingData.value = false;
      
      comboServices.value = serviceData.value.filter(entry => {return entry.group === 'Combo'});
      setNumberOfSkeletonsForServiceGroup('marketing', skeletonsInfo.value.group1.name, comboServices.value.length);
      modifyTagForAdService(comboServices.value);

      individualServices.value = serviceData.value.filter(entry => {return entry.group === 'Individual'});
      setNumberOfSkeletonsForServiceGroup('marketing', skeletonsInfo.value.group2.name, individualServices.value.length);
      modifyTagForAdService(individualServices.value);

      ascensionServices.value = serviceData.value.filter(entry => {return entry.group === 'Ascensão'});
      setNumberOfSkeletonsForServiceGroup('marketing', skeletonsInfo.value.group3.name, ascensionServices.value.length);
      modifyTagForAdService(ascensionServices.value);
    })

    const modifyTagForAdService = (list:TinyServiceInfoMKT[]):void => {
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
        openServiceModal(serviceIDURLParam, 'marketing');
      }
    })

    return {
      fetchingData,
      skeletonsInfo,
      comboServices,
      individualServices,
      ascensionServices
    }
  },
})
</script>