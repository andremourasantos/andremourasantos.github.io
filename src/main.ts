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
      { name: 'author', content: 'André S.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Growth Marketing' },
      { property: 'og:description', content: 'Prazer, me chamo André e trabalho com Growth Marketing, automações de processos e Desenvolvimento Web. Sou o profissional de Marketing Digital com foco em Growth Marketing e experiência de trabalho em empresas de referência no Brasil e pelo mundo afora.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:image', content: '/default-cover.png' },
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