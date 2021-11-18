import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'About',
    component: () => import('@/views/About')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/layout/index')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
