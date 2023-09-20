import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import WebDev from '../views/WebDev.vue';
import Marketing from '../views/Marketing.vue';
import PrivacyPolicy from '../views/PrivacyPolicy.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/desenvolvimento-web',
    name: 'webDev',
    component: WebDev
  },
  {
    path: '/marketing-digital',
    name: 'marketing',
    component: Marketing
  },
  {
    path: '/politica-de-privacidade',
    name: 'pp',
    component: PrivacyPolicy
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
