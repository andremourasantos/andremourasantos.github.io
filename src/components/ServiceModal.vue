<template>
  <dialog ref="dialogEl">
    <div></div>
    <article>
      <div>
        <img :src="require(`../assets/icons/${modalInfo.serviceImage}.png`)">
        <h2>{{ modalInfo.serviceName }}</h2>
        <p>{{ modalInfo.serviceButtonDescription }}</p>
      </div>
      <p>Introdução.</p>
      <TabelOfBenefits>
        
      </TabelOfBenefits>
    </article>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

//Components
import TabelOfBenefits from './TabelOfBenefits.vue';
import BenefitDescription from './BenefitDescription.vue';

//Stores
import serviceModalInfo from '../stores/serviceModal';
import marketingJSON from '@/data/mkt-services.json';
import webJSON from '@/data/web-services.json';

export default defineComponent({
  components: {TabelOfBenefits, BenefitDescription},
  setup() {
    const dialogEl = ref<HTMLDialogElement | null>(null);
    const modalInfo = ref(serviceModalInfo);

    onMounted(()=>{
      if(dialogEl.value instanceof HTMLElement){
        const el = dialogEl.value;
        
        let serviceInfo;
        if(modalInfo.value.serviceCategory === 'Marketing'){
          serviceInfo = marketingJSON.find(obj => {return obj.id == modalInfo.value.serviceID});
        } else {
          serviceInfo = webJSON.find(obj => {return obj.id == modalInfo.value.serviceID});
        }

        el.showModal();
      }
    })

    return {
      dialogEl,
      modalInfo
    }
  },
})
</script>


<style scoped>

</style>