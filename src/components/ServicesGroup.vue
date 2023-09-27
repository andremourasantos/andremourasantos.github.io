<template>
  <section>
    <div>
      <h2>{{ GroupTitle }}</h2>
      <p>{{ GroupDescription }}</p>
    </div>
    <article>
      <slot>

      </slot>
    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    'GroupTitle': {
      required: true,
      type: String
    },
    'GroupDescription': {
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
    width: 100%;
    margin-top: 48px;
    border-radius: 24px;
    padding: 24px;
    background-color: #d5d5d535;
    box-shadow: var(--glass_effect-shadow);
  }

  h2 {
    margin-bottom: 4px;
  }

  section > div:nth-of-type(1) {
    margin-bottom: 24px;
  }

  section > article {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>