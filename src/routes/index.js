import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import ProductDetail from '~/components/products/ProductDetail'
import CreateProduct from './CreateProduct'
import MyInfo from '~/components/myPage/MyInfo'
import MyOrder from '~/components/myPage/MyOrder'
import MyAccount from '~/components/myPage/MyAccount'
import Order from '~/routes/Order'
import AfterOrder from '~/routes/AfterOrder'
import ShoppingCart from '~/routes/ShoppingCart'
import AllSoldList from './AllSoldList'

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
      component: ProductDetail,
    },
    {
      path: '/salesList',
      component: AllSoldList
    },
    {
      path: '/createProduct',
      component: CreateProduct
    },
    {
      path: '/myinfo',
      component: MyInfo
    },
    {
      path: '/myorder',
      component: MyOrder
    },
    {
      path: '/myaccount',
      component: MyAccount
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/afterorder',
      component: AfterOrder
    },
    {
      path: '/cart',
      component: ShoppingCart
    }
  ]
})
