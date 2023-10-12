import { createApp } from 'vue'
import { createGtm } from '@gtm-support/vue-gtm';
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .use(
    createGtm({
      id: "GTM-PWVNLHS",
      defer: true,
      compatibility: true,
      vueRouter: router
    })
  )
  .mount('#app')