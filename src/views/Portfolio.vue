<template>
  <PageTitle :page-title="'Meus projetos'" :page-description="'Veja uma coletânea dos meus projetos de Desenvolvimento Web aqui, com informações detalhadas sobre cada caso.'"/>

  <div class="recommendationsCard">
    <RecommendationsCard />
  </div>

  <section id="servicesGroup">
    <ServicesGroup :group-title="'Projetos em destaque'" :group-description="'Essas são os projetos que me dão orgulho, saiba mais sobre cada um deles.'">
      <ProjectButton v-for="item in featuredProjects" :project-title="item.title" :project-description="item.description" :project-image="item.featuredImage" :project-id="item.id" :project-tag="item.status"/>
    </ServicesGroup>
    
    <ServicesGroup :group-title="'Protótipos funcionais'" :group-description="'Veja uma coletânea de protótipos de sites e teste suas funcionalidades.'">
      <ProjectButton v-for="item in prototypesProjects" :project-title="item.title" :project-description="item.description" :project-image="item.featuredImage" :project-id="item.id" :project-tag="item.status"/>
    </ServicesGroup>
  </section>

  <Transition name="serviceModal">
    <ProjectModal v-if="modalStore.status === 'Show'"/>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

//composables
import { searchForURLParam, openProjectModal } from "@/composables/general";

//components
import PageTitle from '@/components/PageTitle.vue';
import ServicesGroup from '@/components/ServicesGroup.vue';
import ProjectButton from '@/components/ProjectButton.vue';
import ProjectModal from '@/components/projectModal/ProjectModal.vue';
import RecommendationsCard from '@/components/RecommendationsCard.vue';

//data
import projectsJSON from '@/data/projects.json';

//stores
import projectModal from '@/stores/projectModal';

export default defineComponent({
  components: {PageTitle, ServicesGroup, ProjectButton, ProjectModal, RecommendationsCard},
  setup () {
    const modalStore = ref(projectModal);

    const featuredProjects:NonNullable<ProjectInfo>[] = projectsJSON.filter(obj => {return obj.group === 'Featured'}) as (NonNullable<ProjectInfo>[]);
    const prototypesProjects:NonNullable<ProjectInfo>[] = projectsJSON.filter(obj => {return obj.group !== 'Featured'}) as (NonNullable<ProjectInfo>[]);

    onMounted(() => {
      let urlProjectIDParam = searchForURLParam('projectID');

      if(urlProjectIDParam){
        openProjectModal(urlProjectIDParam)
          .catch(error => console.error(error))
      }
    })

    return {
      featuredProjects,
      prototypesProjects,
      modalStore
    }
  }
})
</script>

<style scoped>

</style>