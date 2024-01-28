<template>
  <li class="benefitDescription">
    <img :src="getIconURL(benefitImage)" :alt="`Ícone de ${benefitImage}`" height="24" width="24">
    <p>{{ benefitText }}</p>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//composables
import { getIconURL } from '@/composables/general';

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
  setup() {
    return {
      getIconURL
    }
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