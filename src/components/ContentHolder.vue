<template>
  <div id="content" :class="orientation">
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
    }
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>
  #content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--padding_10x);
    padding: var(--padding_10x) 0px;
  }

  #content.grid {
    flex-direction: row;
    gap: var(--padding_5x);
    flex-wrap: wrap;
    justify-content: center;
  }
</style>