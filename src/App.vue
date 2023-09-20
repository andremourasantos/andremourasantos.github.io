<template>
  <Header/>
  <main>
    <router-view/>
  </main>
  <Footer/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

//Components
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  components: {Header, Footer},
  setup() {
    
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
}

* {margin:0; padding:0; font-family: var(--font-paragraph); color: var(--font_color-paragraph); box-sizing: border-box;}

body {
  min-height: 100vh;
  min-height: 100dvh;
  padding:16px;
}

h1,h2,h3,h4,h5,h6 {
  font-family: var(--font-title);
  color: var(--font_color-title);
  font-weight: bold;
  line-height: 100%;
}

p {
  line-height: 100%;
  font-weight: 500;
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