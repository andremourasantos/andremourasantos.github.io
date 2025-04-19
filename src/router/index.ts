import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/Home.vue';
import WorksView from '../views/Works.vue';
import PortfolioView from '../views/Portfolio.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/trabalhos', name: 'work', component: WorksView },
  { path: '/portfolio', name: 'portfolio', component: PortfolioView },
  { path: '/politica-de-privacidade', name: 'pp', component: PortfolioView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router