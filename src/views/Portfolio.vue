<template>
  <PageTitle :PageTitle="'Meus projetos'" :PageDescription="'Veja uma coletânea dos meus projetos de Desenvolvimento Web aqui, com informações detalhadas sobre cada caso.'"/>

  <section id="servicesGroup">
    <ServicesGroup :GroupTitle="'Projetos em destaque'" :GroupDescription="'Essas são os projetos que me dão orgulho, saiba mais sobre cada um deles.'">
      
    </ServicesGroup>
    
    <ServicesGroup :GroupTitle="'Protótipos funcionais'" :GroupDescription="'Veja uma coletânea de protótipos de sites e teste suas funcionalidades.'">

    </ServicesGroup>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Components
import PageTitle from '@/components/PageTitle.vue';
import ServicesGroup from '@/components/ServicesGroup.vue';

export default defineComponent({
  components: {PageTitle, ServicesGroup},
  setup () {
    

    return {}
  }
})
</script>

<style scoped>

</style>