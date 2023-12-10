<template>
  <PageTitle :PageTitle="'Criação de sites'" :PageDescription="'Desde a concepção ao produto final, ou apenas a etapa que precisar, confira os serviços fornecidos.'"/>

  <ButtonToPage id="portfolioButton" :button-title="'Meus projetos'" :button-description="'Conheça os projetos que já realizei e os resultados obtidos.'" :button-image="'medalha'" @click="goToPortfolio"/>

  <section id="servicesGroup">
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
  #portfolioButton {
    margin-top: 32px;
    margin-inline: auto;
    box-shadow: var(--neumorphism-out_shadow);
    transition: all 250ms;
  }

  #portfolioButton:hover, #portfolioButton:active, #portfolioButton:focus {
    transform: scale(0.99);
    box-shadow: var(--neumorphism-inner_shadow);
  }
</style>