import { createRouter, createWebHashHistory } from 'vue-router'

// Pages
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Services from './pages/Services.vue'
import Products from './pages/Products.vue'
import ProductDetail from './pages/ProductDetail.vue'
import Gallery from './pages/Gallery.vue'
import News from './pages/News.vue'
import ArticleDetail from './pages/ArticleDetail.vue'
import Contact from './pages/Contact.vue'
import Quote from './pages/Quote.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Accueil' }
  },
  {
    path: '/a-propos',
    name: 'About',
    component: About,
    meta: { title: 'À propos' }
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: { title: 'Services' }
  },
  {
    path: '/produits',
    name: 'Products',
    component: Products,
    meta: { title: 'Produits' }
  },
  {
    path: '/produits/:slug',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { title: 'Détail Produit' }
  },
  {
    path: '/actualites',
    name: 'News',
    component: News,
    meta: { title: 'Actualités' }
  },
  {
    path: '/article/:slug',
    name: 'ArticleDetail',
    component: ArticleDetail,
    meta: { title: 'Détail Article' }
  },
  {
    path: '/galerie',
    name: 'Gallery',
    component: Gallery,
    meta: { title: 'Galerie' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: 'Contact' }
  },
  {
    path: '/devis',
    name: 'Quote',
    component: Quote,
    meta: { title: 'Devis' }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

// Scroll to top on every route change
router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
