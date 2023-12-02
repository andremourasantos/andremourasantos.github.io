<template>
  <PageTitle :PageTitle="'André Moura'" :PageDescription="'Profissional de Marketing e Desenvolvedor Web freelancer.'"/>
  <section>
    <ButtonToPage :button-title="'Desenvolvimento Web'" :button-description="'Criação de sites e landing pages responsivas e de fácil atualização.'" :button-image="'web-development'" @click="goToPage('webDev')"/>
    <ButtonToPage :button-title="'Marketing Digital'" :button-description="'Público-alvo, personas, canais e estratégia de anúncios e conteúdos.'" :button-image="'digital-marketing'" @click="goToPage('marketing')"/>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';

//Components
import PageTitle from '@/components/PageTitle.vue';
import ButtonToPage from '@/components/ButtonToPage.vue';

export default defineComponent({
  components: {PageTitle, ButtonToPage},
  setup() {
    function goToPage(routeName:string) {
      return router.push({name: routeName});
    }
    return {
      goToPage
    }
  },
})
</script>

<style scoped>
  section:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
    gap: 16px;
    height: 100%;
    width: 100%;
  }

  #gradient-top-right img {
    right: 400px;
    top: -300px;
  }

  @media screen and (min-width: 425px) {
    section:nth-child(2) {
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
</style>

<style>
  body {
    display: flex;
    flex-direction: column;
  }

  #app, main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
</style>