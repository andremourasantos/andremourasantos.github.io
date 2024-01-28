<template>
  <dialog class="presentationPopup" ref="dialogEl">
    <HeaderIcons @closeModalButton="closeModal"/>
    <article>
      <div id="mainServiceInfo" v-if="serviceHeader !== null">
        <img :src="getIconURL(serviceHeader.image)" :alt="`Imagem de ${serviceHeader.title}`" height="80" width="80">
        <h2>{{ serviceHeader.title }}</h2>
        <p>{{ serviceHeader.description }}</p>
      </div>
      <div id="detailedServiceInfo">
        <p v-for="(entry, index) in serviceIntroduction" :key="index"> {{ entry }}</p>
        <TabelOfBenefits>
          <BenefitDescription v-for="entry in serviceBenefitsList" :benefit-text="entry[1]" :benefit-image="entry[0]"/>
        </TabelOfBenefits>
      </div>
      <div id="sideServiceInfo">
        <h3>Informações do serviço</h3>
        <p>Veja as informações sobre prazos de entrega, formas de pagamento e valor do serviço.</p>
        <div>
          <SideServiceInfo v-for="entry in serviceSideInfoList" :key="entry[0]" :side-info-image="entry[0]" :side-info-title="entry[1]" :side-info-description="entry[2]" :side-info-description-type="entry[0] == 'calendario' ? 'Date' : 'Price'"/>
          <SideServiceInfo :side-info-image="'pagamento'" :side-info-title="'Formas de pagamento'" :side-info-description="'PIX e Cartão de Crédito.'" :side-info-description-type="'Custom'"/>
        </div>
      </div>
      <div>
        <h3>Informações de contato</h3>
        <p>Converse diretamente comigo, disponível de Segunda a Sábado.</p>
        <ContactButton v-if="serviceHeader !== null" :service-name="serviceHeader.title"/>
      </div>
      <FooterNotes :footer-notes="serviceFooterNotes">
        <p v-if="showONGsDiscount">O valor cobrado para organizações não governamentais (OGNs) ou ações sociais/comunitárias de pequeno porte pode ser combinado abaixo dessa faixa.</p>
        <p>Ao escolher o PIX como forma de pagamento, você ganha um desconto de 5% em cima do valor total. Pagamentos no Cartão de Crédito até 2x sem juros.</p>
        <p>Este contrato exige uma assinatura eletrônica. Você pode realizar essa ação gratuitamente através do site ou aplicativo do Gov.br.</p>
      </FooterNotes>
    </article>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

//components
import HeaderIcons from '../commomModalEls/HeaderIcons.vue';
import TabelOfBenefits from './TabelOfBenefits.vue';
import BenefitDescription from './BenefitDescription.vue';
import SideServiceInfo from './SideServiceInfo.vue';
import ContactButton from './ContactButton.vue';
import FooterNotes from '../commomModalEls/ServiceFooterNotes.vue';

//composables
import { getIconURL, toggleHTMLOverflowY } from "@/composables/general";

//stores
import serviceModalInfo from '@/stores/serviceModal';
import marketingJSON from '@/data/mkt-services.json';
import webJSON from '@/data/web-services.json';

export default defineComponent({
  components: {HeaderIcons, TabelOfBenefits, BenefitDescription, SideServiceInfo, ContactButton, FooterNotes},
  setup() {
    const dialogEl = ref<HTMLDialogElement | null>(null);
    const modalInfo = ref(serviceModalInfo);

    const serviceHeader = ref<{title:string, description:string, image:string} | null>(null);
    const serviceIntroduction = ref<string[] | null>(null);
    const serviceBenefitsList = ref<[string,string][] | null>(null);
    const showONGsDiscount = ref(true);
    const serviceFooterNotes = ref<string[]>([]);

    interface sideInfo {
      deadline:[string,string,number],
      price:[string,string,number]
    };

    const serviceSideInfoList = ref<sideInfo | [string,string,number] | null>(null);

    onMounted(()=>{
      if(!(dialogEl.value instanceof HTMLElement)){
        closeModal();
        return alert('Desculpe, ocorreu um erro ao exibir as informações sobre este serviço.');
      };

      const el = dialogEl.value;
      let serviceInfo;

      if(modalInfo.value.serviceCategory === 'Marketing'){
        serviceInfo = marketingJSON.find(obj => {return obj.id == modalInfo.value.serviceID}) as ServiceInfo;
      } else {
        serviceInfo = webJSON.find(obj => {return obj.id == modalInfo.value.serviceID}) as ServiceInfo;
      };

      if(serviceInfo === undefined){
        closeModal();
        return alert('Desculpe, ocorreu um erro ao recolher as informações sobre este serviço.');
      };

      fillHeader(serviceInfo.title,serviceInfo.description, serviceInfo.image);
      fillIntroduction(serviceInfo.introduction);
      fillBenefitsTable(serviceInfo.tableOfBenefits);
      fillServiceSideInfoList(serviceInfo.serviceInfo);
      fillServiceFooterNotes(serviceInfo.footerNotes);

      el.showModal();
      el.scrollTo(0,0);

      toggleHTMLOverflowY();
    });

    const fillHeader = (title:string, description:string, image:string):void => {
      serviceHeader.value = {
        title: title,
        description: description,
        image: image
      }
    };

    const fillIntroduction = (introductionTextArray:string[]):void => {
      serviceIntroduction.value = introductionTextArray;
    };

    const fillBenefitsTable = (benefitsArray:[string,string,boolean][]):void => {
      if(benefitsArray[benefitsArray.length - 1][2] !== true){showONGsDiscount.value = false};
      
      const array:[string,string][] = Array.from(benefitsArray.filter(entry => {return entry[2] == true}).map((value) => {return [value[0],value[1]]}));
      serviceBenefitsList.value = array;
    };

    const fillServiceSideInfoList = (infoArray:sideInfo):void => {
      const array = Array.from(Object.entries(infoArray)).map((array) => {return array[1]}) as [string,string,number];
      serviceSideInfoList.value = array;
    };

    const fillServiceFooterNotes = (footerNotes:string[]):void => {
      serviceFooterNotes.value = footerNotes;
    }

    const shareModal = ():void => {
      alert('A opção de compartilhar ainda não está disponível.');
    };

    const closeModal = ():void => {
      if(dialogEl.value instanceof HTMLElement){
        const el = dialogEl.value;
        setTimeout(() => {
          //This timeOut function is here to sync with the transition in-and-out of the element (available in /src/App.vue).
          el.close();
        }, 100);
      };

      modalInfo.value.status = 'Hide';
      toggleHTMLOverflowY();
    };

    return {
      getIconURL,
      dialogEl,
      modalInfo,
      serviceHeader,
      serviceIntroduction,
      serviceBenefitsList,
      showONGsDiscount,
      serviceSideInfoList,
      serviceFooterNotes,
      shareModal,
      closeModal
    }
  },
})
</script>

<style>
  dialog.presentationPopup {
    border-radius: 24px;
    border: none;
    background-color: var(--colors-background);
    margin: auto 24px;
    padding: 24px;
    max-width: 520px;
  }

  dialog.presentationPopup > article {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  dialog.presentationPopup > article > div:first-of-type > img {
    margin-bottom: 16px;
  }

  dialog.presentationPopup h2 {
    margin-bottom: 8px;
  }

  dialog.presentationPopup h3 {
    font-size: 18px;
    margin-bottom: 4px;
  }

  @media screen and (min-width: 425px) {
    dialog.presentationPopup {
      padding: 24px 36px;
      margin: auto;
    }
  }
</style>

<style scoped>
  #mainServiceInfo img {
    filter: drop-shadow(0px 0px 5px #00000015);
  }

  #detailedServiceInfo {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media screen and (min-width: 425px) {
    #sideServiceInfo > div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;
      column-gap: 32px;
    }
  }
</style>