<template>
  <section ref="section">
    <div>
      <h2>{{ groupTitle }}</h2>
      <p>{{ groupDescription }}</p>
    </div>
    <article>
      <slot v-if="componentStatus === 'Loading'">
        <ServiceButton v-for="entry in numberOfSkeletons" :key="entry" :service-image="'loading'" :service-title="'Carregando'" :service-description="'Aguarde, as informações sobre este serviço estão sendo recolhidas.'" :service-id="entry + ''" :service-category="'web'" :service-button-loading-status="'Loading'"/>
      </slot>
      <slot v-if="componentStatus === 'Loaded'">

      </slot>
    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref, watch } from 'vue';

// components
import ServiceButton from './ServiceButton.vue';
import FlippingLoader from '@/components/FlippingLoader.vue';

// composables
import { getNumberOfSkeletonsForServiceGroup } from '@/composables/general';

export default defineComponent({
  components: {ServiceButton, FlippingLoader},
  props: {
    'groupTitle': {
      required: true,
      type: String
    },
    'groupDescription': {
      required: true,
      type: String
    },
    'componentStatus': {
      required: false,
      type: String as () => 'Loading' | 'Loaded',
      default: 'Loaded'
    },
    'skeletonGroupName': {
      required: false,
      type: String
    },
    'groupCategory': {
      type: String as () => ServiceCategory
    }
  },
  setup(props) {
    const section = ref<HTMLElement | null>();
    const numberOfSkeletons = ref<number>(5);

    onBeforeMount(() => {
      if(props.groupCategory === null){return};

      const numberOfSkeletonsFromLocalStorage = getNumberOfSkeletonsForServiceGroup(props.groupCategory, props.skeletonGroupName);
      
      if(numberOfSkeletonsFromLocalStorage === 0 || numberOfSkeletonsFromLocalStorage > 7) {
        numberOfSkeletons.value = 5
      } else {
        numberOfSkeletons.value = numberOfSkeletonsFromLocalStorage
      }
    })

    onMounted(() => {
      if(props.componentStatus === 'Loading'){
        section.value.classList.add('loading');
      }
    })

    watch(() => props.componentStatus, (newValue) => {
      if(newValue === 'Loaded'){
        section.value.classList.remove('loading');
      }
    })

    return {
      section,
      numberOfSkeletons
    }
  }
})
</script>


<style scoped>
  section {
    height: fit-content;
    width: 100%;
    max-width: 550px;
    margin: 48px auto 0px auto;
    border-radius: 24px;
    padding: 32px 24px 24px 24px;
    background-color: var(--colors-background);
    box-shadow: var(--neumorphism-inner_shadow);
  }

  h2 {
    margin-bottom: 4px;
  }

  section > div:nth-of-type(1) {
    margin: 0px auto 24px auto;
  }

  section > article {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  @media screen and (min-width: 425px) {
    section > div:nth-of-type(1) {
      text-align: center;
      width: 70%;
    }

    section > article {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-start;
    }
  }
</style>