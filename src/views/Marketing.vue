<template>
  <PageTitle :PageTitle="'Marketing Digital'" :PageDescription="'Tenha uma estratégia de Marketing confeccionada especificamente para as necessidades do seu negócio.'"/>
  <div id="gradient-top-right">
    <img src="../assets/purple.png">
  </div>
  <section id="servicesGroup">
    <div id="gradient-center-left">
      <img src="../assets/lateral.png">
    </div>
    <ServicesGroup :GroupTitle="'Combos de serviços'" :GroupDescription="'Economize tempo e dinheiro na hora de criar sua estratégia de Marketing.'">
      <ServiceButton :ServiceImage="'general'" :ServiceTitle="'Serviço completo'" :ServiceDescription="'Contrate todos os serviços para começar seu Marketing a todo vapor.'" :ServiceTag="'Indisponível'" :ServiceID="'geral'"/>

      <ServiceButton :ServiceImage="'first-steps'" :ServiceTitle="'Primeiros passos'" :ServiceDescription="'Obtenha o básico para renovar os trabalhos com o Marketing da sua empresa.'" :ServiceTag="'Indisponível'" :ServiceID="'primeiros-passos'"/>
    </ServicesGroup>
    <ServicesGroup :GroupTitle="'Serviços oferecidos'" :GroupDescription="'Confira abaixo todos os serviços disponíveis, com detalhes.'">
      <ServiceButton v-for="entry in servicesToShow" :key="entry.id" :ServiceImage="entry.image" :ServiceTitle="entry.title" :ServiceDescription="entry.description" :ServiceID="entry.id"/>
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
import servicesJSON from '@/data/mkt-services.json';

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