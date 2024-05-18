<template>
  <Header/>
  <main>
    <router-view :key="forecedRerenderByChangedColorScheme" />
  </main>
  <Transition name="serviceModal">
    <ServiceModal v-if="showModal === true"/>
  </Transition>
  <Footer/>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, provide, onBeforeMount, watch } from 'vue';

// firebase
import { app } from '@/firebase';

// components
import Header from '@/components/Header.vue';
import ServiceModal from './components/serviceModal/ServiceModal.vue';
import Footer from '@/components/Footer.vue';

//composables
import { toggleDarkModeClass, getPreferredColorScheme } from './composables/general';

// stores
import serviceModalInfo from './stores/serviceModal';

export default defineComponent({
  components: {Header, Footer, ServiceModal},
  setup() {
    const modalInfo = ref(serviceModalInfo);
    const showModal = computed(() => modalInfo.value.status === 'Show');
    const currentColorScheme = ref<PreferredColorScheme>('light');
    const forecedRerenderByChangedColorScheme = ref<number>(0);

    onBeforeMount(() => {
      currentColorScheme.value = getPreferredColorScheme();
      toggleColorScheme(currentColorScheme.value);
    })

    const toggleColorScheme = (schemeToSet?:PreferredColorScheme) => {
      if(schemeToSet) {
        switch (schemeToSet) {
          case 'dark':
            return toggleDarkModeClass();
            break;
        
          default:
            return
            break;
        }
      } else {
        currentColorScheme.value === 'light' ? currentColorScheme.value = 'dark' : currentColorScheme.value = 'light';
        toggleDarkModeClass();
      }
    }

    provide("colorScheme", {
      currentColorScheme,
      toggleColorScheme
    })

    watch(currentColorScheme, () => {
      forecedRerenderByChangedColorScheme.value += 1;
    })

    //Phosphor Icons settings
    if(window.innerWidth > 425){
      provide("size", 36);
    } else {
      provide("size", 32);
    }
    provide("weight", "fill");

    return {
      showModal,
      forecedRerenderByChangedColorScheme
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
  --font_color-loading: var(--font_color-paragraph);

  /*COLORS*/
  --colors-background: #f5f5f5;
  --colors-icons: var(--font_color-paragraph);

  /*EFFECTS*/
  --glass_effect-color: #FFFFFF35;
  --glass_effect-shadow: 5px 5px 15px #00000010, inset 0px 0px 5px #00000020;
  --neumorphism-inner_shadow: inset 5px 5px 10px #d0d0d0, inset -5px -5px 10px #FFFFFF;
  --neumorphism-out_shadow: -5px -5px 10px #FFFFFF, 5px 5px 10px #d0d0d0;
}

.dark-mode {
  /* Dark Mode Variables */
  --font_color-title: #ebebeb;
  --font_color-paragraph: #cccccc;

  /* Dark Mode Colors */
  --colors-background: #333333;

  /* Dark Mode Effects */
  --neumorphism-inner_shadow: inset 5px 5px 10px #262626, inset -5px -5px 10px #404040;
  --neumorphism-out_shadow: -5px -5px 10px #404040, 5px 5px 10px #262626;
}


* {margin:0; padding:0; font-family: var(--font-paragraph); color: var(--font_color-paragraph); box-sizing: border-box;}

body {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 24px;
  background: var(--colors-background);
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

button {
  cursor: pointer;
  border: none;
  background: transparent;
}

button:disabled {
  cursor: not-allowed;
}

@media screen and (min-width: 425px) {
  body {
    padding: 36px;
  }

  h1 {
  font-size: 36px;
  }

  h1 + p {
    font-size: 20px;
  }

  h2 {
    font-size: 24px;
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
}

#servicesGroup {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

#gradient-top-right {
  position: absolute;
  max-height: 100%;
  width: 100%;
  overflow: hidden;
  top: 0px;
  left: 0px;
  transform: scaleX(-100%);
  z-index: -1;
}

#gradient-top-right img {
  position: relative;
  right: 300px;
  top: -150px;
}

#gradient-center-left {
  position: absolute;
  width: 100%;
  height: 604px;
  overflow: hidden;
  bottom: -24px;
  left: -24px;
  transform: scaleX(-100%);
  z-index: -1;
}

#gradient-center-left img {
  position: relative;
  left: -150px;
  top: -100px;
  height: 760px;
  width: 900px;
}
</style>

<style>
  .serviceModal-enter-active, .serviceModal-leave-active {
    transition: 100ms ease-in;
  }

  .serviceModal-enter-from,
  .serviceModal-leave-to {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }

</style>