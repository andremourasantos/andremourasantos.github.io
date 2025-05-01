import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createHead } from '@unhead/vue/client';

const head = createHead({
  init: [{
    title: 'Growth Marketing',
    titleTemplate: '%s | André S.',
    meta: [
      { name: 'description', content: 'Prazer, me chamo André e trabalho com Growth Marketing, automações de processos e Desenvolvimento Web. Sou o profissional de Marketing Digital com foco em Growth Marketing e experiência de trabalho em empresas de referência no Brasil e pelo mundo afora.' },
    ],
    htmlAttrs: {
      lang: 'pt'
    }
  }]
});

createApp(App)
  .use(router)
  .use(head)
  .mount('#app');