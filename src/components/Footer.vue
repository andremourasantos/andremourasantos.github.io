<template>
  <footer>
    <p>Criado por André Moura Santos, ©2021-2024.<br><router-link :to="{name:'pp'}" title="Acessar política de privacidade" hreflang="pt-br">Política de Privacidade</router-link>.</p>
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
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
    margin-top: 32px;
  }
  
  p {
    text-align: center;
  }
</style>