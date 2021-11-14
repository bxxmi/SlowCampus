import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Editinfo from './Editinfo'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
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
      path: '/editInfo',
      component: Editinfo
    },
  ]
})
