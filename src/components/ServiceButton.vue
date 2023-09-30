<template>
  <button :disabled="ServiceTag !== undefined" @click="checkService(ServiceID)">
    <img :src="require(`../assets/icons/${ServiceImage}.png`)">
    <div>
      <h3>{{ ServiceTitle }}</h3>
      <p>{{ ServiceDescription }}</p>
    </div>
    <div id="tag" v-if="ServiceTag !== undefined">
      <p>{{ ServiceTag }}</p>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

//Composables
import { checkServiceExistence } from '@/composables/data-base';

//Stores
import serviceModalInfo from '@/stores/serviceModal';

export default defineComponent({
  props: {
    'ServiceImage': {
      required: true,
      type: String
    },
    'ServiceTitle': {
      required: true,
      type: String
    },
    'ServiceDescription': {
      required: true,
      type: String
    },
    'ServiceTag': {
      required: false,
      type: String as () => "Novo" | "Indisponível",
    },
    'ServiceID': {
      required: true,
      type: String
    }
  },
  setup(props) {
    const modalInfo = ref(serviceModalInfo);

    const checkService = async (serviceID:string):Promise<void> => {
      return new Promise(async (resolve) => {
        if(await checkServiceExistence(serviceID)){
        const info = modalInfo.value;
        location.pathname.includes('marketing-digital') ? info.serviceCategory = 'Marketing' : info.serviceCategory = 'Web'
        info.serviceID = serviceID;
        info.serviceImage = props.ServiceImage;
        info.serviceName = props.ServiceTitle;
        info.serviceButtonDescription = props.ServiceDescription
        info.status = 'Show';

        return resolve();
      } else {
        alert('Desculpe, ocorreu um erro ao recuperar as informações sobre este serviço.');
        return resolve();
      }
      })
    } 
    
    return {
      checkService
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
  }

  #tag p {
    color: white;
    font-size: 14px;
  }
</style>