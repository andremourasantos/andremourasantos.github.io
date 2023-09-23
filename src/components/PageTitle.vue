<template>
  <section>
    <h1>{{ PageTitle }}</h1>
    <p>{{ PageDescription }}</p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    'PageTitle': {
      required: true,
      type: String
    },
    'PageDescription': {
      required: true,
      type: String
    }
  },
  setup(props) {
    
  },
})
</script>


<style scoped>
  section {
    height: fit-content;
    width: 230px;
  }
  
  h1 {
    font-size: 36px;
    margin-bottom: 16px;
  }

  p {
    font-size: 18px;
  }
</style>