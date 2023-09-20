<template>
  <PageTitle :PageTitle="'Marketing Digital'" :PageDescription="'Tenha uma estratégia de Marketing confeccionada especificamente para as necessidades do seu negócio.'"/>
  <img src="../assets/purple.png" id="gradient-top-right">
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