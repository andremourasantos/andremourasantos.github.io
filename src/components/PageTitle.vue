<template>
  <section>
    <h1>{{ pageTitle }}</h1>
    <p>{{ pageDescription }}</p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    'pageTitle': {
      required: true,
      type: String
    },
    'pageDescription': {
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
    margin-bottom: 8px;
  }

  @media screen and (min-width: 425px) {
    section {
      width: 400px;
      margin: auto;
      text-align: center;
    }
  }
</style>