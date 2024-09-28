<template>
  <PageTitle :page-title="'Política de Privacidade'" :page-description="'Este site com funcionalidades de terceiros e coleta informações sobre a sua sessão. Confira mais aqui.'"/>
  <section id="pp-section">
    <article v-for="entry in PPJSON" :key="entry.title" class="pp-entry">
      <div class="pp-entry-title">
        <h3>{{ entry.title }}</h3>
        <p>{{ entry.description }}</p>
      </div>
      <p v-for="content in entry.content" class="pp-entry-content">{{ content }}</p>
    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Components
import PageTitle from '@/components/PageTitle.vue';

//Data
import PPJSON from '@/data/pp.json';

export default defineComponent({
  components: {PageTitle},
  setup() {
    return {
      PPJSON
    }
  },
})
</script>


<style scoped>
  #pp-section {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 32px;
    padding: 64px 0px 0px 0px;
    max-width: 550px;
    margin-inline: auto;
  }

  .pp-entry-title {
    margin-bottom: 16px;
  }

  .pp-entry-title h3 {
    margin-bottom: 4px;
  }

  .pp-entry-title p {
    font-weight: 600;
  }

  .pp-entry-content {
    margin: 8px auto;
  }
</style>