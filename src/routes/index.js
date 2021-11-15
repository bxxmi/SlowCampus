import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import ProductDetail from '~/components/ProductDetail'
import CreateProduct from './CreateProduct'
import MyPage from '~/routes/MyPage'


export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/productDetail/:id',
      component: ProductDetail
    },
    {
      path: '/createProduct',
      component: CreateProduct
    },
    {
      path: '/mypage',
      component: MyPage
    }
  ]
})
