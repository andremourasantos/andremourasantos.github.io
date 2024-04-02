<template>
  <button :class="{
    loadingSkeleton: serviceButtonLoadingStatus === 'Loading'
  }" :disabled="serviceButtonLoadingStatus === 'Loading' || serviceTag === 'Indisponível'" :aria-label="serviceTitle" @click="handleClick(serviceId), emitGtmEvent(serviceId)">
    
    <div id="tag" v-if="serviceTag !== undefined && serviceTag !== null" :class="{
      newService: serviceTag === 'Novo' 
    }" aria-label="Estado do serviço">
      <p>{{ serviceTag }}</p>
    </div>

    <div v-if="serviceButtonLoadingStatus === 'Loading'" class="skeletonIcon"></div>
    <img v-if="serviceButtonLoadingStatus === 'Loaded'" class="img" :src="serviceImage" :alt="`Imagem de ${serviceTitle}`">
    
    <div>
      <h3>{{ serviceTitle }}</h3>
      <p>{{ serviceDescription }}</p>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import { useGtm } from '@gtm-support/vue-gtm';

// composables
import { openServiceModal } from '@/composables/general';

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
      type: String as () => ServiceCategory
    },
    'serviceButtonEnviroment': {
      required: false,
      default: 'Page',
      type: String as () => 'Page' | 'Popup'
    },
    'serviceButtonLoadingStatus': {
      required: false,
      default: 'Loaded',
      type: String as () => 'Loading' | 'Loaded'
    }
  },
  setup(props) {
    const gtm = useGtm()

    const handleClick = (serviceId:string):void => {
      switch (props.serviceButtonEnviroment) {
        case 'Popup':
          goToService(serviceId);
          break;
      
        default:
          openModal();
          break;
      }
    };

    const goToService = (serviceId:string):void => {
      const page = props.serviceCategory === 'marketing' ? 'marketing' : 'webDev';
      router.push({name: page, query:{
        serviceID: serviceId,
        'utm_source': 'website',
        'utm_medium': 'projectModal'
      }})
    }

    const openModal = ():void => {
      openServiceModal(props.serviceId, props.serviceCategory);
    };

    const emitGtmEvent = (serviceId:string) => {
      gtm?.trackEvent({
        event: 'service-button',
        action: 'click',
        category: 'ServiceButton',
        serviceID: serviceId
      })
    }
    
    return {
      handleClick,
      emitGtmEvent
    }
  },
})
</script>


<style scoped>
  @import '../assets/styles/loading.css';

  button {
    position: relative;
    display: grid;
    grid-template-columns: 48px auto;
    align-items: start;
    justify-items: start;
    column-gap: 16px;
    height: fit-content;
    width: 100%;
    background-color: var(--colors-background);
    box-shadow: var(--neumorphism-out_shadow);
    text-align: left;
    border: none;
    border-radius: 16px;
    padding: 16px;
    cursor: pointer;
    transition: 200ms;
  }

  button:hover:not(:disabled), button:focus {
    transition: 200ms;
    transform: scale(0.99);
    box-shadow: var(--neumorphism-inner_shadow);
  }

  button:has(#tag) {
    padding: 24px 16px;
  }

  button img {
    height: fit-content;
    width: 48px;
    aspect-ratio: 1/1;
  }

  div.skeletonIcon {
    height: 48px;
    width: 48px;
    aspect-ratio: 1/1;
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
    background-color: hsl(0 65% 50% / 1);
    box-shadow: var(--glass_effect-shadow);
    padding: 4px 8px;
    border-radius: 0px 10px 0px 10px;
    right: 0px;
    top: 0px;
    user-select: none;
  }

  #tag.newService {
    background-color: hsl(205 100% 40% / 1);
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