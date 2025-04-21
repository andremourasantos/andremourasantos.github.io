<template>
  <div>
    <q>{{ quote }}.</q>
    <p><strong>{{ authorName }}</strong><span>, {{ authorWork }}.</span></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    quote: {
      type: String,
      required: true
    },
    authorName: {
      type: String,
      required: true
    },
    authorWork: {
      type: String,
      required: true
    }
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>
  div {
    width: 80%;
    padding: var(--padding_10x) var(--padding_2x);
    text-align: center;
    margin-inline: auto;
  }

  q {
    font-style: italic;
    font-family: var(--font_title);
    font-weight: 200;
    font-size: 32px;
    color: var(--colors_title);
  }

  p {
    margin-top: var(--padding_2x);
    font-size: 20px;
  }

  p * {
    font-family: var(--font_title);
  }

  p:last-of-type > span {
    font-weight: 300;
  }
</style>