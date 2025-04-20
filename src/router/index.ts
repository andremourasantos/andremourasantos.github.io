import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/Home.vue';
import WorksView from '../views/Works.vue';
import PortfolioView from '../views/Portfolio.vue';
import PortfolioProgrammingView from '@/views/Portfolio/Programming.vue';
import PortfolioDesignView from '@/views/Portfolio/Design.vue';
import PortfolioAutomationView from '@/views/Portfolio/Automation.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/trabalhos', name: 'work', component: WorksView },
  { path: '/portfolio', name: 'portfolio', component: PortfolioView },
  { path: '/portfolio/programacao', name: 'portfolio-programming', component: PortfolioProgrammingView },
  { path: '/portfolio/automacao', name: 'portfolio-automation', component: PortfolioAutomationView },
  { path: '/portfolio/design', name: 'portfolio-design', component: PortfolioDesignView },
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