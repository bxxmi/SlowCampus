import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import ProductDetail from './ProductDetail'
import ProductList from './ProductList'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/productList',
      component: ProductList
    },
    {
      path: '/productDetail/:id',
      component: ProductDetail
    }
  ]
})
