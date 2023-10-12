<template>
  <button :disabled="serviceTag === 'Indisponível'" @click="openModal(serviceId)">
    <div id="tag" v-if="serviceTag !== undefined && serviceTag !== null" aria-label="Estado do serviço">
      <p>{{ serviceTag }}</p>
    </div>
    <img :src="require(`@/assets/icons/${serviceImage}.png`)" :alt="`Imagem de ${serviceTitle}`">
    <div>
      <h3>{{ serviceTitle }}</h3>
      <p>{{ serviceDescription }}</p>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

//Composables
import { openServiceIDServiceModal } from '@/composables/general';

//Stores
import serviceModalInfo from '@/stores/serviceModal';

export default defineComponent({
  props: {
    'serviceImage': {
      required: true,
      type: String
    },
    'serviceTitle': {
      required: true,
      type: String
    },
    'serviceDescription': {
      required: true,
      type: String
    },
    'serviceTag': {
      required: false,
      type: String as () => "Novo" | "Indisponível" | null,
    },
    'serviceId': {
      required: true,
      type: String
    },
    'serviceCategory': {
      required: true,
      type: String as () => 'Marketing' | 'Web'
    }
  },
  setup(props) {
    const modalInfo = ref(serviceModalInfo);

    const openModal = (serviceID:string):void => {
      openServiceIDServiceModal(serviceID, props.serviceCategory);
    };
    
    return {
      openModal
    }
  },
})
</script>


<style scoped>
  button {
    position: relative;
    display: grid;
    grid-template-columns: 48px auto;
    align-items: start;
    justify-items: start;
    column-gap: 16px;
    height: fit-content;
    width: 100%;
    background-color: var(--glass_effect-color);
    box-shadow: var(--glass_effect-shadow);
    text-align: left;
    border: none;
    border-radius: 16px;
    padding: 16px;
    cursor: pointer;
  }

  button:has(#tag) {
    padding: 24px 16px;
  }

  button img {
    height: fit-content;
    width: 48px;
  }

  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 2px;
  }

  h3 + p {
    font-size: 16px;
  }

  #tag {
    position: absolute;
    background-color: #FF000099;
    box-shadow: var(--glass_effect-shadow);
    padding: 4px 8px;
    border-radius: 0px 10px 0px 10px;
    right: 0px;
    top: 0px;
    user-select: none;
  }

  #tag p {
    color: white;
    font-size: 14px;
  }

  @media screen and (min-width: 425px) {
    button {
      grid-template-columns: auto;
      grid-template-rows: 56px auto;
      align-items: center;
      justify-items: center;
      row-gap: 16px;
      width: 220px;
      padding: 24px;
      text-align: center;
    }

    button:has(#tag) {
      padding: 36px 24px 24px 24px;
    }

    button img {
      width: 56px;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 4px;
    }

    h3 + p {
      font-size: 16px;
    }
  }
</style>