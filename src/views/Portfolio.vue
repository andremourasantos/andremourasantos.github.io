<template>
  <PageTitle :PageTitle="'Meus projetos'" :PageDescription="'Veja uma coletânea dos meus projetos de Desenvolvimento Web aqui, com informações detalhadas sobre cada caso.'"/>

  <section id="servicesGroup">
    <ServicesGroup :GroupTitle="'Projetos em destaque'" :GroupDescription="'Essas são os projetos que me dão orgulho, saiba mais sobre cada um deles.'">
      <ProjectButton v-for="item in portfolioProjects" :project-title="item.title" :project-description="item.description" :project-image="item.featuredImage" :project-id="item.id" :project-tag="item.status"/>
    </ServicesGroup>
    
    <ServicesGroup :GroupTitle="'Protótipos funcionais'" :GroupDescription="'Veja uma coletânea de protótipos de sites e teste suas funcionalidades.'">

    </ServicesGroup>
  </section>

  <ProjectModal v-if="modalStore.status === 'Show'"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

//Components
import PageTitle from '@/components/PageTitle.vue';
import ServicesGroup from '@/components/ServicesGroup.vue';
import ProjectButton from '@/components/ProjectButton.vue';
import ProjectModal from '@/components/projectModal/ProjectModal.vue';

//Data
import projectsJSON from '@/data/projects.json';

//Stores
import projectModal from '@/stores/projectModal';

export default defineComponent({
  components: {PageTitle, ServicesGroup, ProjectButton, ProjectModal},
  setup () {
    const portfolioProjects:NonNullable<ProjectInfo>[] = projectsJSON as NonNullable<ProjectInfo>[];
    const modalStore = ref(projectModal);

    return {
      portfolioProjects,
      modalStore
    }
  }
})
</script>

<style scoped>

</style>