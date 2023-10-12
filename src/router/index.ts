import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import WebDev from '../views/WebDev.vue';
import Marketing from '../views/Marketing.vue';
import PrivacyPolicy from '../views/PrivacyPolicy.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {title: 'Página Inicial | André Moura Santos'},
    component: HomeView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: {name: 'home'}
  },
  {
    path: '/desenvolvimento-web',
    name: 'webDev',
    meta: {title: 'Desenvolvimento Web'},
    component: WebDev
  },
  {
    path: '/marketing-digital',
    name: 'marketing',
    meta: {title: 'Marketing Digital'},
    component: Marketing
  },
  {
    path: '/politica-de-privacidade',
    name: 'pp',
    meta: {title: 'Política de Privacidade'},
    component: PrivacyPolicy
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {top:0}
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string;
  next();
})

export default router
