<template>
  <button
  :arial-label="`Entrar em contato via ${buttonIcon === 'whatsapp-logo' ? 'WhatsApp' : buttonIcon === 'email' ? 'email' : buttonIcon === 'google-meet-logo' ? 'agendamento chamada de vídeo' : ''}`"

  :title="`Entrar em contato via ${buttonIcon === 'whatsapp-logo' ? 'WhatsApp' : buttonIcon === 'email' ? 'email' : buttonIcon === 'google-meet-logo' ? 'agendamento de chamada de vídeo' : ''}`"

  @click="handleClick(), emitGtmEvent()">
    <img :src="getIconURL(buttonIcon)" alt="Ícone de avião de papel" height="36" width="36">
    <div v-if="buttonIcon === 'whatsapp-logo'">
      <h4>Bate-papo</h4>
      <p>Vamos iniciar uma conversa pelo WhatsApp.</p>
    </div>
    <div v-if="buttonIcon === 'email'">
      <h4>Email</h4>
      <p>Envie um email com os detalhes do seu projeto.</p>
    </div>
    <div v-if="buttonIcon === 'google-meet-logo'">
      <h4>Chamada de vídeo</h4>
      <p>Vamos conversar tête-à-tête sobre a sua ideia.</p>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useGtm } from "@gtm-support/vue-gtm";

//composables
import { getIconURL } from '@/composables/general';

//stores
import serviceModalInfo from '../../stores/serviceModal';

export default defineComponent({
  props: {
    serviceName: {
      required: true,
      type: String
    },
    buttonIcon: {
      required: true,
      type: String as () => 'whatsapp-logo' | 'email' | 'google-meet-logo'
    }
  },
  setup(props) {
    const gtm = useGtm();
    const serviceInfo = ref(serviceModalInfo);

    const handleClick = ():void => {
      setTimeout(() => {
        if(props.buttonIcon === 'whatsapp-logo'){
          goToWhatsApp();
        } else if (props.buttonIcon === 'email'){
          goToEmail();
        } else if (props.buttonIcon === 'google-meet-logo'){
          return
        }
      }, 250);
    };

    const goToWhatsApp = ():void => {
      const link:string = 'https://api.whatsapp.com/send/?phone=5541935009236&text=';
      const message:Array<string[]> = [
        ['Olá, prazer!'],
        [`Vi o serviço de *${props.serviceName.toLocaleLowerCase()}*, para ${serviceInfo.value.serviceCategory}, e gostaria de saber mais sobre como funciona.`],
        ['O que tenho em mente é:']
      ];

      window.open(link + encodeURIComponent(message.join('\n\n')), '_blank');
    };

    const goToEmail = ():void => {
      const email:string = 'contato@andremourasantos.com.br';
      const subject:string = `Proposta de trabalho de ${props.serviceName.toLocaleLowerCase()}`;
      const message:Array<string[]> = [
        ['Olá, prazer!'],
        [`Me chamo [SEU NOME] e vi o serviço de ${props.serviceName.toLocaleLowerCase()}, para ${serviceInfo.value.serviceCategory}, e gostaria de apresentar a minha ideia de projeto.`],
        ['O que tenho em mente é:']
      ];

      window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message.join('\n\n'))}`, '_blank');
    };

    const emitGtmEvent = () => {
      gtm?.trackEvent({
        event: 'contact-button',
        action: 'Click',
        category: 'contactButton',
        serviceid: serviceInfo.value.serviceID,
      })
    };

    return {
      getIconURL,
      handleClick,
      emitGtmEvent
    }
  },
})
</script>


<style scoped>
  button {
    display: grid;
    grid-template-columns: 36px auto;
    justify-items: center;
    align-items: center;
    row-gap: 16px;
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
    transition: 200ms;
  }

  @media screen and (min-width: 425px) {
    button {
      grid-template-columns: auto;
      max-width: 200px;
      text-align: center;
    }

    button img {
      height: 44px;
      width: 44px;
    }
  }

  button:hover {
    box-shadow: var(--neumorphism-inner_shadow);
    transform: scale(0.99);
  }
</style>