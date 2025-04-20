<template>
  <HeroSection :title="heroTitle" :subtitle="heroSubtitle"/>
  <ContentHolder>
    <SiteSection :title="siteSectionTitle" :description="siteSectionSubtitle" :image-name="siteSectionImage" :image-alt-text="siteSectionImage">
      <Button @click="srollToSection('projects')" text="Continuar" icon-name="ChevronDown"/>
    </SiteSection>
    <ContentHolder orientation="grid" id="projects">
      <slot></slot>
    </ContentHolder>
  </ContentHolder>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import ContentHolder from './ContentHolder.vue';
import SiteSection from '@/components/SiteSection.vue';
import Button from './Button.vue';
import GridCard from './GridCard.vue';

export default defineComponent({
  components: {
    HeroSection,
    SiteSection,
    ContentHolder,
    Button,
    GridCard
  },
  props: {
    heroTitle: {
      type: String,
      required: true
    },
    heroSubtitle: {
      type: String,
      required: true
    },
    siteSectionTitle: {
      type: String,
      required: true
    },
    siteSectionSubtitle: {
      type: String,
      required: true
    },
    siteSectionImage: {
      type: String,
      required: true
    },
  },
  setup (props) {
    const srollToSection = (elId:string) => {
      const element = document.getElementById(elId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    
    return {
      srollToSection
    }
  }
})
</script>

<style scoped>

</style>