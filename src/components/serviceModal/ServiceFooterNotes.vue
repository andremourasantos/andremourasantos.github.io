<template>
  <details ref="notesDetails">
    <summary><h4>Notas de rodapé</h4><i class="ph-fill ph-caret-circle-down"></i></summary>
    <p v-for="note in filteredFooterNotes">{{ note }}</p>
    <slot></slot>
  </details>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick, watch } from 'vue'

export default defineComponent({
  props: {
    'FooterNotes': {
      required: true,
      type: Array as () => string[]
    }
  },
  setup(props) {
    const notesDetails = ref<HTMLDetailsElement | null>(null);
    const filteredFooterNotes = ref<string[]>(props.FooterNotes);

    onMounted(() => {
      const addAsterisks = async ():Promise<void> => {
        let arrayOfParagraphs:ChildNode[];
        if(!(notesDetails.value instanceof HTMLElement)){return};
        
        await nextTick(); //wait until the next DOM update cycle before applying continuing
        arrayOfParagraphs = Array.from(notesDetails.value.childNodes).filter((el:Node) => {return el.nodeName === 'P' || (el.nodeName === '#text' && el.textContent?.trim() !== '')});

        arrayOfParagraphs.forEach((el, index) => {el.textContent = `${"*".repeat(index + 1)}${el.textContent}`});

        return;
      }; addAsterisks();
    });

    watch(() => props.FooterNotes, (newFooterNotes) => {
      filteredFooterNotes.value = newFooterNotes.filter(entry => {return entry !== ""});
    });

    return {
      notesDetails,
      filteredFooterNotes
    }
  },
})
</script>


<style scoped>
  details p, :slotted(p) {
    margin-bottom: 8px;
  }

  summary {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    font-weight: bold;
    color: var(--font_color-title);
    transition: 200ms;
    cursor: pointer;
  }

  details[open] summary {
    padding-bottom: 4px;
    border-bottom: 2px solid #00000030;
    margin-bottom: 16px;
  }

  i {
    font-size: 24px;
    transition: 200ms;
  }
  
  details[open] i {
    transform: rotate(180deg);
  }

  :slotted(p:last-of-type) {
    margin-bottom: 0px;
  }
</style>