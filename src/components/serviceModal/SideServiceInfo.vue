<template>
  <div class="sideServiceInfo">
    <img :src="require(`@/assets/icons/${SideInfoImage}.png`)" :alt="`Ícone de ${SideInfoImage}`" height="36" width="36">
    <div>
      <h4>{{ SideInfoTitle }}</h4>
      <p v-if="SideInfoDescriptionType == 'Date'">Até {{ SideInfoDescription }} dias úteis.</p>
      <p v-if="SideInfoDescriptionType == 'Price'">A partir de R$ {{ SideInfoDescription }},00.</p>
      <p v-if="SideInfoDescriptionType == 'Custom'">{{ SideInfoDescription }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    'SideInfoImage': {
      required: true,
      type: String
    },
    'SideInfoTitle': {
      required: true,
      type: String
    },
    'SideInfoDescription': {
      required: true,
      type: [String, Number]
    },
    'SideInfoDescriptionType': {
      required: true,
      type: String as () => "Date" | "Price" | "Custom"
    }
  },
  setup(props) {
    
  },
})
</script>


<style scoped>
  .sideServiceInfo {
    display: flex;
    gap: 16px;
    padding: 24px 16px;
    background-color: var(--colors-background);
    box-shadow: var(--neumorphism-inner_shadow);
    border-radius: 16px;
    margin: 16px 0px;
  }

  h4 {
    margin-bottom: 2px;
  }

  @media screen and (min-width: 425px) {
    .sideServiceInfo {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 200px;
      padding: 24px 16px;
    }

    img {
      height: 44px;
      width: 44px;
    }
  }
</style>