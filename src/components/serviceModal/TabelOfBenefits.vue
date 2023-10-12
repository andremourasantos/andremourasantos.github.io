<template>
  <ul id="tableOfBenefits">
      <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },
})
</script>

<style>
  #tableOfBenefits {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
    gap: 16px;
    background-color: var(--colors-background);
    box-shadow: var(--neumorphism-inner_shadow);
    border-radius: 24px;
    padding: 24px;
    list-style-type: none;
  }

  #tableOfBenefits > .benefitDescription:last-child {
    border-bottom: 0px !important;
    padding-bottom: unset;
  }
</style>