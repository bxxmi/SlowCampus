import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import ProductDetail from './ProductDetail'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/productDetail/:id',
      component: ProductDetail
    }
  ]
})
