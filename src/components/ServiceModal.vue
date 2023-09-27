<template>
  <dialog ref="dialogEl">
    <div id="headerIcons">
      <i class="ph-fill ph-x-circle" @click="closeModal"></i>
    </div>
    <article>
      <div id="mainServiceInfo">
        <img :src="require(`../assets/icons/${modalInfo.serviceImage}.png`)">
        <h2>{{ modalInfo.serviceName }}</h2>
        <p>{{ modalInfo.serviceButtonDescription }}</p>
      </div>
      <div id="detailedServiceInfo">
        <p v-for="(entry, index) in serviceIntroduction" :key="index"> {{ entry }}</p>
        <TabelOfBenefits>
          <BenefitDescription v-for="entry in serviceBenefitsList" :BenefitText="entry[1]" :BenefitImage="entry[0]"/>
        </TabelOfBenefits>
      </div>
      <div id="sideServiceInfo">
        <h3>Informações do serviço</h3>
        <p>Veja as informações sobre prazos de entrega, formas de pagamento e valor do serviço.</p>
        <SideServiceInfo v-for="entry in serviceSideInfoList" :key="entry[0]" :SideInfoImage="entry[0]" :SideInfoTitle="entry[1]" :SideInfoDescription="entry[2]" :SideInfoDescriptionType="entry[0] == 'calendario' ? 'Date' : 'Price'"/>
        <SideServiceInfo :SideInfoImage="'pagamento'" :SideInfoTitle="'Formas de pagamento'" :SideInfoDescription="'PIX e cartão de crédito.'" :SideInfoDescriptionType="'Custom'"/>
      </div>
      <FooterNotes :FooterNotes="serviceFooterNotes"/>
    </article>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

//Components
import TabelOfBenefits from './TabelOfBenefits.vue';
import BenefitDescription from './BenefitDescription.vue';
import SideServiceInfo from './SideServiceInfo.vue';
import FooterNotes from './serviceModal/ServiceFooterNotes.vue';

//Stores
import serviceModalInfo from '@/stores/serviceModal';
import marketingJSON from '@/data/mkt-services.json';
import webJSON from '@/data/web-services.json';

export default defineComponent({
  components: {TabelOfBenefits, BenefitDescription, SideServiceInfo, FooterNotes},
  setup() {
    const dialogEl = ref<HTMLDialogElement | null>(null);
    const modalInfo = ref(serviceModalInfo);
    const serviceIntroduction = ref<string[] | null>(null);
    const serviceBenefitsList = ref<[string,string][] | null>(null);
    const serviceFooterNotes = ref<string[]>([]);

    interface sideInfo {
      deadline:[string,string,number][],
      price:[string,string,number][]
    };

    const serviceSideInfoList = ref<sideInfo | [string,string,number][] | null>(null);

    onMounted(()=>{
      if(dialogEl.value instanceof HTMLElement){
        const el = dialogEl.value;
        
        let serviceInfo;
        if(modalInfo.value.serviceCategory === 'Marketing'){
          serviceInfo = marketingJSON.find(obj => {return obj.id == modalInfo.value.serviceID}) as ServiceInfo;
        } else {
          serviceInfo = webJSON.find(obj => {return obj.id == modalInfo.value.serviceID}) as ServiceInfo;
        };

        if(serviceInfo !== undefined){
          fillIntroduction(serviceInfo.introduction);
          fillBenefitsTable(serviceInfo.tableOfBenefits);
          fillServiceSideInfoList(serviceInfo.serviceInfo);
          fillServiceFooterNotes(serviceInfo.footerNotes);
          el.showModal();
        } else {
          closeModal();
          return alert('Desculpe, ocorreu um erro ao recuperar as informações sobre este serviço.');
        }
      }
    });

    const fillIntroduction = (introductionTextArray:string[]):void => {
      serviceIntroduction.value = introductionTextArray;
    };

    const fillBenefitsTable = (benefitsArray:[string,string,boolean][]):void => {
      const array:[string,string][] = Array.from(benefitsArray.filter(entry => {return entry[2] == true}).map((value, index) => {return [value[0],value[1]]}));
      serviceBenefitsList.value = array;
    };

    const fillServiceSideInfoList = (infoArray:sideInfo):void => {
      const array:[string,string,number][] = Array.from(Object.entries(infoArray)).map((array,index) => {return array[1]});
      serviceSideInfoList.value = array;
    };

    const fillServiceFooterNotes = (footerNotes:string[]):void => {
      serviceFooterNotes.value = footerNotes;
    }

    const closeModal = () => {
      if(dialogEl.value instanceof HTMLElement){
        const el = dialogEl.value;
        el.close();
      };

      modalInfo.value.status = 'Hide';
    };

    return {
      dialogEl,
      modalInfo,
      serviceIntroduction,
      serviceBenefitsList,
      serviceSideInfoList,
      serviceFooterNotes,
      closeModal
    }
  },
})
</script>


<style scoped>
  dialog {
    border-radius: 24px;
    border: none;
    background-color: #ffffff90;
    box-shadow: var(--glass_effect-shadow);
    backdrop-filter: blur(50px);
    margin: auto;
    padding: 24px;
  }

  #headerIcons {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  #headerIcons i {
    color: var(--font_color-title);
    font-size: 32px;
  }

  dialog > article {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  #mainServiceInfo img {
    height: 80px;
    width: fit-content;
    margin-bottom: 16px;
  }

  h2 {
    margin-bottom: 8px;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 4px;
  }

  #detailedServiceInfo {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>