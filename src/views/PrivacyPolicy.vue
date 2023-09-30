<template>
  <PageTitle :PageTitle="'Política de Privacidade'" :PageDescription="'Este site com funcionalidades de terceiros e coleta informações sobre a sua sessão. Confira mais aqui.'"/>
  <div id="gradient-top-right">
    <img src="../assets/purple.png">
  </div>
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