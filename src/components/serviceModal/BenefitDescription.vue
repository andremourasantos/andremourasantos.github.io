<template>
  <li class="benefitDescription">
    <img :src="require(`@/assets/icons/${benefitImage}.png`)" :alt="`Ícone de ${benefitImage}`" height="24" width="24">
    <p>{{ benefitText }}</p>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    'benefitImage': {
      required: false,
      default: 'medalha',
      type: String
    },
    'benefitText': {
      required: true,
      type: String
    }
  },
  setup(props) {
    
  },
})
</script>


<style scoped>
  li {
    display: flex;
    width: 100%;
    padding-bottom: 8px;
    gap: 8px;
    border-bottom: 2px solid #00000030;
  }
</style>