<template>
  <div class="flipping">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FlippingLoader',
  setup () {
    

    return {}
  }
})
</script>

<style scoped>
  .flipping {
    width: 67.2px;
    height: 67.2px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .flipping div {
    animation: flipping-18i5bq 1.2000000000000002s calc(var(--delay) * 0.8s) infinite backwards;
    background-color: var(--font_color-loading);
  }

  .flipping div:nth-child(1) {
    --delay: 0.08000000000000002;
  }

  .flipping div:nth-child(2) {
    --delay: 0.16000000000000003;
  }

  .flipping div:nth-child(3) {
    --delay: 0.24;
  }

  .flipping div:nth-child(4) {
    --delay: 0.32000000000000006;
  }

  .flipping div:nth-child(5) {
    --delay: 0.4;
  }

  .flipping div:nth-child(6) {
    --delay: 0.48;
  }

  .flipping div:nth-child(7) {
    --delay: 0.5599999999999999;
  }

  .flipping div:nth-child(8) {
    --delay: 0.6400000000000001;
  }

  .flipping div:nth-child(9) {
    --delay: 0.7200000000000001;
  }

  @keyframes flipping-18i5bq {
    0% {
      transform: perspective(67.2px) rotateX(-90deg);
    }

    50%, 75% {
      transform: perspective(67.2px) rotateX(0);
    }

    100% {
      opacity: 0;
      transform: perspective(67.2px) rotateX(0);
    }
  }
</style>