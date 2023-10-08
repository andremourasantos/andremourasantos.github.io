<template>
  <details>
    <summary><h4>Notas de rodapé</h4><i class="ph-fill ph-caret-circle-down"></i></summary>
    <p v-for="(note, index) in FooterNotes" :key="index"><span>{{ generateAsterisks(index + 1) }}</span>{{ note }}</p>
  </details>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    'FooterNotes': {
      required: true,
      type: Array as () => string[]
    }
  },
  setup(props) {
    const generateAsterisks = (count:number):string => {
      return "*".repeat(count);
    };

    return {
      generateAsterisks
    }
  },
})
</script>


<style scoped>
  details p {
    margin-bottom: 8px;
  }

  summary {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    font-weight: bold;
    color: var(--font_color-title);
    transition: 200ms;
    cursor: pointer;
  }

  details[open] summary {
    padding-bottom: 4px;
    border-bottom: 2px solid #00000030;
    margin-bottom: 16px;
  }

  i {
    font-size: 24px;
    transition: 200ms;
  }
  
  details[open] i {
    transform: rotate(180deg);
  }

  details p:last-of-type {
    margin-bottom: 0px;
  }
</style>