import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import Login from './Login'
import Auth from './Auth'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/auth',
      component: Auth
    },
  ]
})
