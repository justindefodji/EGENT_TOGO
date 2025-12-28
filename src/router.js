import { createRouter, createWebHistory } from 'vue-router'

// Pages
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Services from './pages/Services.vue'
import Gallery from './pages/Gallery.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/a-propos',
    name: 'About',
    component: About
  },
  {
    path: '/services-produits',
    name: 'Services',
    component: Services
  },
  {
    path: '/galerie',
    name: 'Gallery',
    component: Gallery
  }
]

const router = createRouter({
  history: createWebHistory('/EGENT_TOGO/'),
  routes
})

export default router
