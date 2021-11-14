import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import ProductDetail from '~/components/ProductDetail'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/productDetail/:id',
      component: ProductDetail
    }
  ]
})
