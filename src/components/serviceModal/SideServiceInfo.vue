<template>
  <div class="sideServiceInfo">
    <img :src="getIconURL(sideInfoImage)" :alt="`Ícone de ${sideInfoImage}`" height="36" width="36">
    <div>
      <h4>{{ sideInfoTitle }}</h4>
      <p v-if="sideInfoDescriptionType == 'Date'">Por volta de {{ sideInfoDescription }} dias úteis.</p>
      <p v-if="sideInfoDescriptionType == 'Price'">A partir de {{ styledPriceNumber }}.</p>
      <p v-if="sideInfoDescriptionType == 'Custom'">{{ sideInfoDescription }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

//composables
import { getIconURL } from '@/composables/general';

export default defineComponent({
  props: {
    'sideInfoImage': {
      required: true,
      type: String
    },
    'sideInfoTitle': {
      required: true,
      type: String
    },
    'sideInfoDescription': {
      required: true,
      type: [String, Number]
    },
    'sideInfoDescriptionType': {
      required: true,
      type: String as () => "Date" | "Price" | "Custom"
    }
  },
  setup(props) {
    const styledPriceNumber = ref<string>('0');

    if(props.sideInfoDescriptionType === 'Price'){
      styledPriceNumber.value = new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(Number(props.sideInfoDescription));
    }

    return {
      getIconURL,
      styledPriceNumber
    }
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