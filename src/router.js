import { createRouter, createWebHistory } from 'vue-router'
import { auth } from './lib/firebase'

// Pages
import Home from './pages/Home.vue'
const About = () => import('./pages/About.vue')
const Services = () => import('./pages/Services.vue')
const ServiceDetail = () => import('./pages/ServiceDetail.vue')
const Products = () => import('./pages/Products.vue')
const ProductDetail = () => import('./pages/ProductDetail.vue')
const Projects = () => import('./pages/Projects.vue')
const ProjectDetail = () => import('./pages/ProjectDetail.vue')
const Gallery = () => import('./pages/Gallery.vue')
const News = () => import('./pages/News.vue')
const ArticleDetail = () => import('./pages/ArticleDetail.vue')
const Contact = () => import('./pages/Contact.vue')
const Quote = () => import('./pages/Quote.vue')
const Login = () => import('./pages/Login.vue')
const AdminPanel = () => import('./pages/AdminPanel.vue')
const DataImport = () => import('./pages/DataImport.vue')
const AddImagesToGallery = () => import('./pages/AddImagesToGallery.vue')
const ImportProductsPage = () => import('./pages/ImportProductsPage.vue')
const Debug = () => import('./pages/Debug.vue')
const MetaTagsDebug = () => import('./pages/MetaTagsDebug.vue')

// Composants Admin
const AdminNews = () => import('./components/AdminNews.vue')

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
    path: '/service/:slug',
    name: 'ServiceDetail',
    component: ServiceDetail,
    meta: { title: 'Détail Service' }
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
    path: '/projets',
    name: 'Projects',
    component: Projects,
    meta: { title: 'Projets' }
  },
  {
    path: '/projets/:slug',
    name: 'ProjectDetail',
    component: ProjectDetail,
    meta: { title: 'Détail Projet' }
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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Connexion' }
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: { title: 'Tableau de bord Admin', hideLayout: true, requiresAuth: true }
  },
  {
    path: '/admin/news',
    name: 'AdminNews',
    component: AdminNews,
    meta: { title: 'Gestion des Articles', hideLayout: true, requiresAuth: true }
  },
  {
    path: '/admin/import',
    name: 'DataImport',
    component: DataImport,
    meta: { title: 'Import de Données', hideLayout: true, requiresAuth: true }
  },
  {
    path: '/admin/import-gallery',
    name: 'AddImagesToGallery',
    component: AddImagesToGallery,
    meta: { title: 'Importer les Images', hideLayout: true, requiresAuth: true }
  },
  {
    path: '/admin/import-products',
    name: 'ImportProductsPage',
    component: ImportProductsPage,
    meta: { title: 'Importer les Produits', hideLayout: true, requiresAuth: true }
  },
  {
    path: '/debug',
    name: 'Debug',
    component: Debug,
    meta: { title: 'Débogage' }
  },
  {
    path: '/debug-meta-tags',
    name: 'MetaTagsDebug',
    component: MetaTagsDebug,
    meta: { title: 'Test Meta Tags Open Graph' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Middleware de protection des routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth) {
    // Vérifier si l'utilisateur est authentifié
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe() // Arrêter l'écoute après la première vérification
      
      if (user) {
        // Utilisateur authentifié
        next()
      } else {
        // Rediriger vers la page de connexion
        next('/login')
      }
    })
  } else {
    next()
  }
})

// Scroll to top on every route change
router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
