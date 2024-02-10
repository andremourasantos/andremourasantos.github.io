<template>
  <dialog class="presentationPopup" ref="dialogEl">
    <HeaderIcons @closeModalButton="closeModal"/>
    <article v-if="isLoading === true" class="loadingSkeleton">
      <div class="mainServiceInfo" v-if="isLoading === true">
        <div class="skeletonIcon"></div>
        <h2>Lorem, ipsum dolor.</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, distinctio.</p>
      </div>

      <div class="detailedServiceInfo" v-if="isLoading === true">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus velit quidem soluta ea dolore culpa laboriosam repellat at sapiente incidunt? Aut optio explicabo, eum architecto beatae ipsa culpa aliquam ipsam, modi minima, magnam neque porro suscipit quis harum quia. Ratione nobis et blanditiis provident natus magnam deserunt non commodi dolore.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus velit quidem soluta ea dolore culpa laboriosam repellat at sapiente incidunt? Aut optio explicabo, eum architecto beatae ipsa culpa aliquam ipsam, modi minima, magnam neque porro suscipit quis harum quia. Ratione nobis et blanditiis provident natus magnam deserunt non commodi dolore.</p>

        <TabelOfBenefits>
          <BenefitDescription v-for="entry in 5" :benefit-text="'Carregando benefícios deste serviço.'" :benefit-image="'loading'"/>
        </TabelOfBenefits>
      </div>
    </article>

    <article v-if="isLoading === false">
      <div class="mainServiceInfo" v-if="serviceHeader !== null">
        <img :src="serviceHeader.image" :alt="`Imagem de ${serviceHeader.title}`" height="80" width="80">
        <h2>{{ serviceHeader.title }}</h2>
        <p>{{ serviceHeader.description }}</p>
      </div>

      <div class="detailedServiceInfo">
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
        <p>Entre em contato para apresentar a sua ideia e obter um orçamento para execução do seu projeto. Escolha dentre as opções abaixo para começar.</p>
        <div id="contactInfo">
          <ContactButton v-if="serviceHeader !== null" :service-name="serviceHeader.title" :button-icon="'whatsapp-logo'"/>
          <ContactButton v-if="serviceHeader !== null" :service-name="serviceHeader.title" :button-icon="'email'"/>
          <!-- <ContactButton v-if="serviceHeader !== null" :service-name="serviceHeader.title" :button-icon="'google-meet-logo'"/> -->
        </div>
      </div>

      <FooterNotes v-if="serviceDetailedInfo" :footer-notes="serviceFooterNotes">
        <p v-if="showONGsDiscount">O valor cobrado para organizações não governamentais (OGNs) ou ações sociais/comunitárias de pequeno porte pode ser combinado abaixo dessa faixa.</p>
        <p>Ao escolher o PIX como forma de pagamento, você ganha um desconto de 5% em cima do valor total. Pagamentos no Cartão de Crédito até 2x sem juros.</p>
        <p>Este contrato exige uma assinatura eletrônica. Você pode realizar essa ação gratuitamente através do site ou aplicativo do Gov.br.</p>
      </FooterNotes>
    </article>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount, watch } from 'vue';

// components
import HeaderIcons from '../commomModalEls/HeaderIcons.vue';
import TabelOfBenefits from './TabelOfBenefits.vue';
import BenefitDescription from './BenefitDescription.vue';
import SideServiceInfo from './SideServiceInfo.vue';
import ContactButton from './ContactButton.vue';
import FooterNotes from '../commomModalEls/ServiceFooterNotes.vue';

// composables
import { toggleHTMLOverflowY } from "@/composables/general";
import { getModalInfoForServices, getPageInfoForIndividualService } from '@/composables/data-base';

// stores
import serviceModalInfo from '@/stores/serviceModal';

export default defineComponent({
  components: {HeaderIcons, TabelOfBenefits, BenefitDescription, SideServiceInfo, ContactButton, FooterNotes},
  setup() {
    const dialogEl = ref<HTMLDialogElement | null>(null);
    const serviceDetailedInfo = ref<ServiceInfo | null>(null);
    const serviceBasicInfo = ref<TinyServiceInfo | null>(null);
    const modalInfo = ref(serviceModalInfo);

    const isLoading = ref<boolean>(true);

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

    onBeforeMount(async () => {
      serviceBasicInfo.value = await getPageInfoForIndividualService(modalInfo.value.serviceCategory, modalInfo.value.serviceID);
      serviceDetailedInfo.value = await getModalInfoForServices(modalInfo.value.serviceCategory, modalInfo.value.serviceID);
      
      isLoading.value = false;
    })

    watch(serviceDetailedInfo, () => {
      fillHeader(serviceBasicInfo.value.title, serviceBasicInfo.value.description, serviceBasicInfo.value.image);
      fillIntroduction(serviceDetailedInfo.value.introduction);
      fillBenefitsTable(serviceDetailedInfo.value.tableOfBenefits);
      fillServiceSideInfoList(serviceDetailedInfo.value.serviceInfo);
      fillServiceFooterNotes(serviceDetailedInfo.value.footerNotes);
    })

    onMounted(()=>{
      if(!(dialogEl.value instanceof HTMLElement)){
        closeModal();
        return alert('Desculpe, ocorreu um erro ao exibir as informações sobre este serviço.');
      };

      const el = dialogEl.value;
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

    const fillBenefitsTable = (benefitsArray:ServiceTableOfBenefits[]):void => {
      if(benefitsArray[benefitsArray.length - 1].col3 !== true){showONGsDiscount.value = false};

      const array:[string,string][] = Array.from(benefitsArray.filter(entry => {return entry.col3 === true})).map((entry) => {return [entry.col1, entry.col2]})

      serviceBenefitsList.value = array;
    };

    const fillServiceSideInfoList = (infoArray:sideInfo):void => {
      const array = Array.from(Object.entries(infoArray)).map((array) => {return array[1]}) as [string,string,number];
      serviceSideInfoList.value = array;
    };

    const fillServiceFooterNotes = (footerNotes:string[]):void => {
      serviceFooterNotes.value = footerNotes;
    }

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
      serviceDetailedInfo,
      dialogEl,
      isLoading,
      modalInfo,
      serviceHeader,
      serviceIntroduction,
      serviceBenefitsList,
      showONGsDiscount,
      serviceSideInfoList,
      serviceFooterNotes,
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
  @import '../../assets/styles/loading.css';
  
  .mainServiceInfo img {
    filter: drop-shadow(0px 0px 5px #00000015);
  }

  .detailedServiceInfo {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .loadingSkeleton .skeletonIcon {
    height: 80px;
    width: 80px;
    margin-bottom: 16px;
  }

  #contactInfo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 16px;
  }

  @media screen and (min-width: 425px) {
    #contactInfo {
      gap: 32px;
    }
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