<template>
  <div :id="id" class="contentHolder" :class="orientation">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    orientation: {
      type: String as () => 'column' | 'grid',
      default: 'column'
    },
    id: {
      type: String,
      default: 'content'
    }
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>
  .contentHolder {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--padding_10x);
    padding: var(--padding_10x) 0px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--padding_5x);
    justify-content: flex-start;
  }

  @media screen and (max-width: 1056px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 672px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>