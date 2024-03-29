import { RouteRecordRaw, createRouter, createWebHistory, RouterOptions } from 'vue-router'
import { promission } from './promission.ts'

const HomeView = () => import('@/views/Home/index.ts')
const AboutView = () => import('@/views/About/index.ts')
// const LogView = () => import('@/views/Log/index.ts')
// const SettingView = () => import('@/views/Setting/index.ts')
const Page404View = () => import('@/views/404.vue')
const ArticleReadView = () => import('@/views/Read/index.ts')
const ArchiveView = () => import('@/views/Archive/index.ts')
const CategoryTemplate = () => import('@/views/Category/index.ts')


export const staticRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { roles: ['visitor'], title: 'Home', icon: 'home-view', affix: true, cover: '' },
  },
  
  {
    path: '/tag/:name',
    name: 'Tag',
    component: () => import('@/views/Tag/index.ts'),
    meta: { roles: ['visitor'], title: 'Tag', icon: 'tag-view', affix: false },
  },
  {
    path: '/category',
    name: 'Category',
    component: CategoryTemplate,
    meta: { roles: ['visitor'], title: 'Category', icon: 'category-view', affix: true },
    children: []
  },
  {
    path: '/article/read/:id',
    name: 'ArticleRead',
    component: ArticleReadView,
    meta: { roles: ['visitor'], title: 'Read', icon: 'read-view', affix: false },
  },
  {
    path: '/archives',
    name: 'Archives',
    component: ArchiveView,
    meta: { roles: ['visitor'], title: 'Archive', icon: 'archive-view', affix: true }
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
  // {
  //   path: '/setting',
  //   name: 'Setting',
  //   component: SettingView,
  //   meta: { roles: ['user'], title: 'Setting', icon: 'setting-view', affix: true },
  // },
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
  // strict: true, // applies to all routes
  linkActiveClass: 'y-router__link--active',
  scrollBehavior: () => ({ left: 0, top: 0 }),
} as RouterOptions)

// 权限校验
promission(router)

export default router
