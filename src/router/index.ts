import {RouteRecordRaw, createRouter, createWebHistory, RouterOptions} from 'vue-router'
import { promission } from './promission.ts'

const HomeView = () => import('@/views/Home/index.ts')
const ArticleView = () => import('@/views/Article/index.ts')
const WriteView = () => import('@/views/Write/index.ts')
const AboutView = () => import('@/views/About/index.ts')
const LogView = () => import('@/views/Log/index.ts')
const SettingView = () => import('@/views/Setting/index.ts')

const Page404View = () => import('@/views/404.vue')

const ArticleReadView = () => import('@/views/Article/components/Read/index.ts')

export const staticRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { roles: ['visitor'], title: 'Home', icon: 'home-view', affix: true, cover:'' },
  },
  {
    path: '/article',
    name: 'Article',
    component: ArticleView,
    meta: { roles: ['visitor'], title: 'Article', icon: 'article-view', affix: true },
  },
  {
    path: '/article/read/:id',
    name: 'ArticleRead',
    component: ArticleReadView,
    meta: { roles: ['visitor'], title: 'Read', icon: 'read-view', affix: false },
  },
  {
    path: '/write',
    name: 'Write',
    component: WriteView,
    meta: { roles: ['user'], title: 'Write', icon: 'write-view', affix: true },
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { roles: ['visitor'], title: 'About', icon: 'about-view', affix: true },
  },
  // {
  //   path: '/log',
  //   name: 'Log',
  //   component: LogView,
  //   meta: { roles: all, title: 'Log', icon: 'log-view', affix: true },
  // },
  {
    path: '/setting',
    name: 'Setting',
    component: SettingView,
    meta: { roles: ['user'], title: 'Setting', icon: 'setting-view', affix: true },
  },
  {
    path: '/404',
    name: 'page404',
    component: Page404View,
    meta: { roles: ['visitor'], title: '404', icon: '404-view', affix: false },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
  strict: true, // applies to all routes
  linkActiveClass:'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  scrollBehavior: () => ({ left: 0, top: 0 }),
} as RouterOptions)

// 权限校验
promission(router)

export default router
