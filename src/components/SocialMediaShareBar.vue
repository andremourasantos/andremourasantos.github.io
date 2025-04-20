<template>
  <div>
    <Button text="none" icon-name="WhatsApp" size="M"/>
    <Button text="none" icon-name="Facebook" size="M"/>
    <Button text="none" icon-name="Instagram" size="M"/>
    <Button text="none" icon-name="Twitter" size="M"/>
    <Button text="none" icon-name="Link" size="M"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from './Button.vue';

export default defineComponent({
  components: {
    Button
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>
  div {
    display: flex;
    flex-wrap: wrap;
    gap: var(--padding_2x);
  }

  button:nth-of-type(1) {
    background-color: #25D366;
  }

  button:nth-of-type(2) {
    background-color: #1877F2;
  }

  button:nth-of-type(3) {
    background-color: #FF0069;
  }

  button:nth-of-type(4) {
    background-color: #1D9BF0;
  }
</style>