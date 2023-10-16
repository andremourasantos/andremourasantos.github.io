<template>
  <button aria-label="Entrar em contato pelo WhatsApp" title="Entrar em contato pelo WhatsApp" @click="goToWhatsApp(), emitGtmEvent()">
    <img src="@/assets/icons/aviao-de-papel.png" alt="Ícone de avião de papel" height="48" width="48">
    <div>
      <h4>Entre em contato</h4>
      <p>Apresente suas ideias ou sane suas dúvidas pelo WhatsApp.</p>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useGtm } from "@gtm-support/vue-gtm";

//Stores
import serviceModalInfo from '@/stores/serviceModal';

export default defineComponent({
  props: {
    serviceName: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const gtm = useGtm();
    const serviceInfo = ref(serviceModalInfo);

    const goToWhatsApp = ():void => {
      const link = 'https://api.whatsapp.com/send/?phone=5541935009236&text=';
      const message = `Olá, prazer!
      
Vi o serviço de *${props.serviceName.toLocaleLowerCase()}*, para ${serviceInfo.value.serviceCategory}, e gostaria de apresentar minha empresa:
`;

      window.open(link + encodeURIComponent(message), '_blank');
    };

    const emitGtmEvent = () => {
      gtm?.trackEvent({
        event: 'contact-button',
        action: 'Click',
        category: 'contactButton',
        serviceid: serviceInfo.value.serviceID,
      })
    }

    return {
      goToWhatsApp,
      emitGtmEvent
    }
  },
})
</script>


<style scoped>
  button {
    display: grid;
    align-items: center;
    grid-template-columns: 48px auto;
    column-gap: 16px;
    width: 100%;
    height: fit-content;
    min-height: 100px;
    background: #FFFFFF35;
    backdrop-filter: blur(50px);
    box-shadow: var(--neumorphism-out_shadow);
    text-align: left;
    padding: 16px 24px;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    margin: 16px auto;
    transition: 200ms;
  }

  button:hover {
    box-shadow: var(--neumorphism-inner_shadow);
    transform: scale(0.99);
  }

  h4 {
    margin-bottom: 4px;
  }
</style>