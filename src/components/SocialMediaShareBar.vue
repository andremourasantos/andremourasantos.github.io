<template>
  <div>
    <Button text="none" icon-name="WhatsApp" size="M" @btnClick="handleClick('WhatsApp')" title="Compartilhar em WhatsApp"/>
    <Button text="none" icon-name="Facebook" size="M" @btnClick="handleClick('Facebook')" title="Compartilhar em Facebook"/>
    <Button text="none" icon-name="LinkedIn" size="M" @btnClick="handleClick('LinkedIn')" title="Compartilhar em LinkedIn"/>
    <Button text="none" icon-name="Twitter" size="M" @btnClick="handleClick('Twitter')" title="Compartilhar em Twitter"/>
    <Button text="none" icon-name="Link" size="M" @btnClick="handleClick('Link')" title="Copiar link"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from './Button.vue';

export default defineComponent({
  components: {
    Button
  },
  setup () {
    const handleClick = (btnType:'WhatsApp' | 'Facebook' | 'LinkedIn' | 'Twitter' | 'Link') => {
      const url = window.location.href;
      let shareUrl = '';
      let utms = `?utm_source=share&utm_medium=${btnType.toLocaleLowerCase()}&utm_campaign=share_button_article`;

      switch (btnType) {
        case 'WhatsApp':
          shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url + utms)}`;
          break;
        case 'Facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url + utms)}`;
          break;
        case 'LinkedIn':
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url + utms)}`;
          break;
        case 'Twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(url + utms)}`;
          break;
        case 'Link':
          navigator.clipboard.writeText(url);
          alert('Link copiado para área de transferência!');
          return;
      }

      window.open(shareUrl, '_blank');
    }

    return {
      handleClick
    }
  }
})
</script>

<style scoped>
  div {
    display: flex;
    flex-wrap: wrap;
    gap: var(--padding_2x);
  }

  button:nth-of-type(1) {
    background-color: #25D366;
  }

  button:nth-of-type(2) {
    background-color: #1877F2;
  }

  button:nth-of-type(3) {
    background-color: #0073B1;
  }

  button:nth-of-type(4) {
    background-color: #1D9BF0;
  }
</style>