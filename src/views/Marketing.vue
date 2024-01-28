<template>
  <PageTitle :page-title="'Marketing Digital'" :page-description="'Tenha uma estratégia de Marketing confeccionada especificamente para as necessidades do seu negócio.'"/>

  <PresentationCard id="presentationCard"/>

  <section id="servicesGroup">
    <ServicesGroup v-if="comboServices.length !== 0" :group-title="'Combos de serviços'" :group-description="'Economize tempo e dinheiro na hora de criar sua estratégia de Marketing.'">
      <ServiceButton v-for="entry in comboServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'Marketing'"/>
    </ServicesGroup>
    
    <ServicesGroup v-if="individualServices.length !== 0" :group-title="'Primeiros passos'" :group-description="'Você não precisa se sobrecarregar com o Marketing, vamos começar pequeno e desenvolver aos poucos.'">
      <ServiceButton v-for="entry in individualServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'Marketing'"/>
    </ServicesGroup>

    <ServicesGroup v-if="ascensionServices.length !== 0" :group-title="'Em ascensão'" :group-description="'Para você que já tem uma estratégia em andamento, vamos subir o nível com estes serviços.'">
      <ServiceButton v-for="entry in ascensionServices" :key="entry.id" :service-image="entry.image" :service-title="entry.title" :service-description="entry.description" :service-id="entry.id" :service-tag="entry.status" :service-category="'Marketing'"/>
    </ServicesGroup>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import PresentationCard from '@/components/PresentationCard.vue';

//Components
import PageTitle from '@/components/PageTitle.vue';
import ServicesGroup from '@/components/ServicesGroup.vue';
import ServiceButton from '@/components/ServiceButton.vue';

//Composables
import { filterServicesToShow, searchForURLParam, openServiceIDServiceModal } from "@/composables/general";

//Data
import servicesJSON from '@/data/mkt-services.json';

export default defineComponent({
  components: {PageTitle, PresentationCard, ServicesGroup, ServiceButton},
  setup() {
    let servicesToShow:NonNullable<ServiceInfoMKT>[] = filterServicesToShow(servicesJSON as ServiceInfo[]) as NonNullable<ServiceInfoMKT>[];

    const comboServices = servicesToShow.filter(entry => {return entry.group === 'Combo'});
    const individualServices = servicesToShow.filter(entry => {return entry.group === 'Individual'});
    const ascensionServices = servicesToShow.filter(entry => {return entry.group === 'Ascensão'});

    onMounted(() => {
      const serviceIDURLParam = searchForURLParam('serviceID');

      if(serviceIDURLParam !== null) {
        openServiceIDServiceModal(serviceIDURLParam, 'Marketing');
      }
    })

    return {
      comboServices,
      individualServices,
      ascensionServices
    }
  },
})
</script>


<style scoped>
#presentationCard {
  margin-top: 64px;
  margin-inline: auto;
  max-width: 550px;
}
</style>