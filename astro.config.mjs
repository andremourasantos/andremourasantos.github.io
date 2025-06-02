// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import { experimental_AstroContainer } from 'astro/container';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://andremourasantos.com.br',
  integrations: [vue(), sitemap()],
  server: {
    open: true,
    host: true,
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  },
  experimental: {
    responsiveImages: true
  },
  image: {
    experimentalLayout: 'fixed',
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        removeHTMLSizeAttributes: true,
      }
    },
  },
});