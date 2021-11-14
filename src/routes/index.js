import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import Detail from './Detail'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
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
      path: '/detail/:id',
      component: Detail
    }
  ]
})
