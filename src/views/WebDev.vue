<template>
  <PageTitle :PageTitle="'Criação de sites'" :PageDescription="'Desde a concepção ao produto final, ou apenas a etapa que precisar, confira os serviços fornecidos.'"/>
  <img src="../assets/blue.png" id="gradient-top-right">
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Components
import PageTitle from '@/components/PageTitle.vue';

export default defineComponent({
  components: {PageTitle},
  setup() {
    
  },
})
</script>


<style scoped>
</style>