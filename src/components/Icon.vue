<template>
  <component :is="name" :size="size" absoluteStrokeWidth :color="color" stroke-width="2" v-if="name !== 'WhatsApp' && name !== 'Facebook' && name !== 'Instagram' && name !== 'Twitter'" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ChevronDown, ExternalLink, Mail } from "lucide-vue-next";

export default defineComponent({
  props: {
    size: {
      type: Number as () => 14 | 16,
      default: 14
    },
    name: {
      type: String as () => IconName,
      default: 'ChevronDown',
      required: true
    },
    color: {
      type: String,
      default: 'white'
    }
  },
  components: {
    ChevronDown
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>

</style>