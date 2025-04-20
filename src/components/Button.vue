<template>
  <button :class="[`size_${size}`, { 'hasIcon': iconName ? true : false }]">
    <span v-if="text !== 'none'">{{ text }}</span>
    <div v-if="iconName"><Icon :name="iconName" :size="size !== 'L' ? 14 : 16"/></div>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Icon from './Icon.vue';

export default defineComponent({
  components: {
    Icon
  },
  props: {
    text: {
      type: String,
      default: 'Saiba mais'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as () => 'S' | 'M' | 'L',
      default: 'S'
    },
    variant: {
      type: String,
      default: 'primary'
    },
    iconName: {
      type: String as () => IconName
    }
  },
  setup (props, { emit }) {
    
    
    return {}
  }
})
</script>

<style scoped>
  button.hasIcon {
    gap: 32px;
    padding-right: var(--padding_2x);
  }

  button div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    width: fit-content;
    height: 32px;
    display: flex;
    align-items: center;
    padding: 0px var(--padding_8x) 0px var(--padding_2x);
    color: var(--colors_text);
    background-color: var(--colors_accent);
    box-shadow: none;
    cursor: pointer;
    border: none;
  }

  button span {
    font-size: 14px;
    color: var(--colors_background);
  }

  button.size_M {
    height: 40px;
  }

  button.size_L {
    height: 48px;
  }

  button.size_L span {
    font-size: 16px;
  }
</style>