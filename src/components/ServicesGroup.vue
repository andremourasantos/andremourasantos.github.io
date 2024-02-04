<template>
  <section ref="section">
    <div>
      <h2>{{ groupTitle }}</h2>
      <p>{{ groupDescription }}</p>
    </div>
    <article>
      <slot>

      </slot>
    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
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
      required: true,
      type: String as () => 'Loading' | 'Loaded'
    } 
  },
  setup(props) {
    const section = ref<HTMLElement | null>();

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
      section
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

  .loading * {
    font-family: var(--font-loading);
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