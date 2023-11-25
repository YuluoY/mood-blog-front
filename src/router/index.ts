import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/Home.vue')
const Page404View = () => import('@/views/404.vue')

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/404',
    name: 'page404',
    component: Page404View,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true, // applies to all routes
})

export default router
