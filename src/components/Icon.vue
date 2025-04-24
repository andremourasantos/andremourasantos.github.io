<template>
  <component :is="name" :size="size" absoluteStrokeWidth :color="color" stroke-width="2" v-if="!isSocialMediaIcon" />
  <img v-if="isSocialMediaIcon" :src="imagePath" :alt="`Ícone de ${name}`" :height="size">
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { ChevronDown, ExternalLink, Link, Menu } from "lucide-vue-next";

export default defineComponent({
  components: {
    ChevronDown,
    ExternalLink,
    Link,
    Menu
  },
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
  setup (props) {
    const socialMedias = ref(['WhatsApp', 'Facebook', 'LinkedIn', 'Twitter']);

    const isSocialMediaIcon = computed(() => {
      if (socialMedias.value.includes(props.name)) {
        return true;
      } else {
        return false;
      }
    });

    const imagePath = computed(() => {
      return new URL(`../assets/social_media_logos/${props.name}.svg`, import.meta.url).href;
    });

    return {
      isSocialMediaIcon,
      imagePath
    }
  }
})
</script>

<style scoped>

</style>