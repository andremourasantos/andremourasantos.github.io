<template>
  <footer>
    <section>
      <div>
        <router-link :to="{name: 'home'}" class="title">André S.</router-link>
        <p>O profissional de Marketing Digital com foco em Growth Marketing, ajudando Pequenas e Médias Empresas a crescer de forma sustentável por meio de estratégias data-driven.</p>
      </div>
      <div class="links">
        <div>
          <p>Navegação</p>
          <ul>
            <li><router-link :to="{name: 'home'}">Página inicial</router-link></li>
            <li><router-link :to="{name: 'work'}">Trabalhos</router-link></li>
            <li><router-link :to="{name: 'portfolio'}">Portfólio</router-link></li>
          </ul>
        </div>
        <div>
          <p>Redes sociais</p>
          <ul>
            <li><a href="https://www.linkedin.com/in/andremourasantos/" target="_blank" ref="external">LinkedIn</a></li>
            <li><a href="https://github.com/andremourasantos/" target="_blank" ref="external">GitHub</a></li>
          </ul>
        </div>
        <div>
          <p>Outros</p>
          <ul>
            <li><router-link :to="{name: 'pp'}">Política de Privacidade</router-link></li>
            <li><a href="https://drive.google.com/uc?export=download&id=1EJv_E5uhfrejo767NsfOq_7fjo3uj3_v" download="Curriculo de André Moura Santos.pdf" target="_blank">Baixar currículo</a></li>
          </ul>
        </div>
      </div>
    </section>
    <p>Site desenvolvido por mim, ©2021-2025.</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    

    return {}
  }
})
</script>

<style scoped>
  footer {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 16px;
    gap: var(--padding_4x);
    align-items: center;
    justify-items: center;
    background-color: #F5F5F5;
    padding: var(--padding_8x) 0 var(--padding_8x) 0;
    box-shadow: 0px 0px 0px 100vw #F5F5F5;
    clip-path: inset(0 -100vw 0 -100vw);
  }

  footer > section {
    width: 100%;
    display: grid;
    grid-template-columns: 320px 1fr;
    align-items: start;
    justify-items: center;
    gap: var(--padding_10x);
  }

  footer > section * {
    list-style: none;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
  }

  .links {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: var(--padding_4x);
  }

  .links p {
    font-weight: bold;
    margin-bottom: var(--padding_04x);
  }

  .links li {
    margin-bottom: var(--padding_04x);
  }

  .links a {
    text-decoration: none;
    color: inherit;
  }

  .links a:hover{
    text-decoration: underline;
  }

  .links li:last-of-type {
    margin-bottom: 0;
  }

  @media screen and (max-width: 1056px) {
    footer section {
      grid-template-columns: 1fr;
      gap: var(--padding_5x);
    }

    .links {
      justify-content: flex-start;
    }
  }

  @media screen and (max-width: 672px) {
    .links {
      flex-direction: column;
    }
  }
</style>