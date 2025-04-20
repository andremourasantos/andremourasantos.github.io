import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/Home.vue';
import WorksView from '../views/Works.vue';
import PortfolioView from '@/views/Portfolio.vue';
import PortfolioProgrammingView from '@/views/Portfolio/Programming.vue';
import PortfolioDesignView from '@/views/Portfolio/Design.vue';
import PortfolioAutomationView from '@/views/Portfolio/Automation.vue';
import ArticleTemplateView from '@/views/ArticleTemplate.vue';

async function getPostPaths() {
  const postModules = import.meta.glob('@/posts/*.md');
  return Object.keys(postModules).map(path => {
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    const slug = filename.replace('.md', '');
    return `/portfolio/${slug}`;
  });
}

async function loadMarkdownPost(folder:string, slug:string) {
  try {
    const post = await import(`@/posts/${folder}/${slug}.md?raw`);
    console.log(0,post.default);
    return post.default;
  } catch (error) {
    console.error('Erro ao carregar o post:', error);
    throw new Error('Post não encontrado');
  }
}

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/trabalhos', name: 'work', component: WorksView },
  { path: '/portfolio', name: 'portfolio', component: PortfolioView },
  { path: '/portfolio/programacao', name: 'portfolio-programming', component: PortfolioProgrammingView },
  { path: '/portfolio/automacao', name: 'portfolio-automation', component: PortfolioAutomationView },
  { path: '/portfolio/design', name: 'portfolio-design', component: PortfolioDesignView },
  { path: '/portfolio/:slug', name: 'portfolio-article', component: ArticleTemplateView, beforeEnter: async (to, from, next) => {
    try {
      const { slug } = to.params;
      const articleText = await loadMarkdownPost('portfolio', slug);
      to.params.articleText = articleText;
      next();
    } catch (error) {
      console.error('Erro ao carregar o artigo:', error);
      next({ name: 'portfolio' });
    }
  }, props: (route) => ({
    articleText: route.params.articleText
  })},
  { path: '/politica-de-privacidade', name: 'pp', component: ArticleTemplateView, beforeEnter: async (to, from, next) => {
    try {
      const articleText = await loadMarkdownPost('pp', 'pp');
      to.params.articleText = articleText;
      next();
    } catch (error) {
      console.error('Erro ao carregar o artigo:', error);
      next({ name: 'home' });
    }
  }, props: (route) => ({
    heroTitle: 'Política de Privacidade',
    heroSubtitle: 'Este site com funcionalidades de terceiros e coleta informações sobre a sua sessão. Confira mais aqui.',
    articleText: route.params.articleText
  }) }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export { router, getPostPaths }
export default router