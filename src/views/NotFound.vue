<template>
  <HeroSection title="Ops, algo deu errado..." subtitle="Parece que que a página que você tentou acessar não existe." btn-text="Volte à página inicial" btn-icon="Undo2" btn-link-path="/"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeroSection from '@/components/HeroSection.vue';

export default defineComponent({
  components: {
    HeroSection
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>

</style>