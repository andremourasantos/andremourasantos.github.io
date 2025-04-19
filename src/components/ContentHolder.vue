<template>
  <div id="content">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
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
</style>