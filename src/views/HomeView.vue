<template>
  <PageTitle :page-title="'André Moura'" :page-description="'Profissional de Marketing e Desenvolvedor Web freelancer.'"/>

  <section>
    <RecommendationsCard/>
  </section>

  <section>
    <ButtonToPage :button-title="'Desenvolvimento Web'" :button-description="'Serviços para internet, como Web Design e Criação de sites.'" :button-image="'web-development'" @click="goToPage('webDev')"/>
    <ButtonToPage :button-title="'Marketing Digital'" :button-description="'Produção e análise de estratégias para as redes sociais e anúncios.'" :button-image="'digital-marketing'" @click="goToPage('marketing')"/>
    <ButtonToPage :button-title="'Portfólio'" :button-description="'Conheça os projetos que já realizei e os resultados obtidos.'" :button-image="'medalha'" @click="goToPage('portfolio')"/>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';

//Components
import PageTitle from '@/components/PageTitle.vue';
import RecommendationsCard from '@/components/RecommendationsCard.vue';
import ButtonToPage from '@/components/ButtonToPage.vue';

export default defineComponent({
  components: {PageTitle, RecommendationsCard, ButtonToPage},
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
  section:nth-of-type(2) {
    margin: 64px auto 24px auto;
  }

  section:nth-of-type(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
    gap: 24px;
    height: 100%;
    width: 100%;
  }

  @media screen and (min-width: 425px) {
    section:nth-of-type(3) {
      flex-direction: row;
      flex-wrap: wrap;
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

  div.recommendationsCard {
    margin-inline: auto;
    margin-top: 64px;
    margin-inline: auto;
    max-width: 550px;
  }
</style>