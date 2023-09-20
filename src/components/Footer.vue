<template>
  <footer>
    <p>Criado por André Moura Santos, ©2023.<br><router-link :to="{name:'pp'}" title="Acessar política de privacidade" hreflang="pt-br">Política de Privacidade</router-link>.</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },
})
</script>


<style scoped>
  p {
    text-align: center;
  }
</style>