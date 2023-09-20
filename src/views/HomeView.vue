<template>
  <PageTitle :PageTitle="'André Moura'" :PageDescription="'Profissional de Marketing e Desenvolvedor Web freelancer.'"/>
  <section>
    <ButtonToPage :ButtonTitle="'Desenvolvimento Web'" :ButtonDescription="'Criação de sites e landing pages responsivas e de fácil atualização.'" :ButtonImage="'web-development'" @click="goToPage('webDev')"/>
    <ButtonToPage :ButtonTitle="'Marketing Digital'" :ButtonDescription="'Público-alvo, personas, canais e estratégia de anúncios e conteúdos.'" :ButtonImage="'digital-marketing'" @click="goToPage('marketing')"/>
  </section>
  <img src="../assets/lateral.png">
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
    padding: 32px 0px;
  }

  img {
    position: fixed;
    top: -30vh;
    left: -10vw;
    z-index: -1;
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