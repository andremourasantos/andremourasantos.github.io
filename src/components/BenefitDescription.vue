<template>
  <div>
    <img :src="require(`../assets/icons/${BenefitImage}.png`)">
    <p>{{ BenefitText }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    'BenefitImage': {
      required: false,
      default: 'medalha',
      type: String
    },
    'BenefitText': {
      required: true,
      type: String
    }
  },
  setup(props) {
    
  },
})
</script>


<style>

</style>