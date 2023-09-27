<template>
  <Header/>
  <main>
    <router-view/>
  </main>
  <ServiceModal v-if="modalInfo.status == 'Show'"/>
  <Footer/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

//Components
import Header from '@/components/Header.vue';
import ServiceModal from './components/ServiceModal.vue';
import Footer from '@/components/Footer.vue';

//Stores
import serviceModalInfo from './stores/serviceModal';

export default defineComponent({
  components: {Header, Footer, ServiceModal},
  setup() {
    const modalInfo = ref(serviceModalInfo);

    return {
      modalInfo
    }
  },
})
</script>


<style>
@charset "UTF-8";

@import url('https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300;400;500;600;700;800;900&family=Flow+Circular&family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&display=swap');

:root {
  /*FONTS*/
  --font-title: 'Lexend Deca', sans-serif;
  --font-paragraph: 'Darker Grotesque', sans-serif;
  --font-loading: 'Flow Circular', cursive;
  --font_color-title: #333333;
  --font_color-paragraph: #4a4a4a;
  --font_color-loading: #4a4a4a;

  /*COLORS*/
  --colors-background: #ffffff;
  --colors-icons: #ffffff;

  /*EFFECTS*/
  --glass_effect-color: #FFFFFF35;
  --glass_effect-shadow: 5px 5px 15px #00000010, inset 0px 0px 5px #00000020;
}

* {margin:0; padding:0; font-family: var(--font-paragraph); color: var(--font_color-paragraph); box-sizing: border-box;}

body {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 24px;
}

h1,h2,h3,h4,h5,h6 {
  font-family: var(--font-title);
  color: var(--font_color-title);
  font-weight: bold;
  line-height: 100%;
}

h1 {
  font-size: 28px;
}

h1 + p {
  font-size: 18px;
}

h2 {
  font-size: 20px;
}

h2 + p {
  font-size: 18px;
}

h4 {
  font-size: 16px;
  font-weight: 500;
}

h4 + p {
  font-size: 16px;
}

p {
  line-height: 100%;
  font-weight: 500;
  font-size: 18px
}

i {font-size: 32px;}

#gradient-top-right {
  position: fixed;
  transform: scaleX(-100%);
  top: -25vh;
  rotate: 360deg;
  left: 14vw;
  z-index: -1;
}
</style>