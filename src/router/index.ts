import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { promission } from './promission.ts';

const HomeView = () => import('@/views/Home/index.ts');
const ArticleView = () => import('@/views/Article/index.ts');
const SpaceView = () => import('@/views/Space/index.ts');
const WriteView = () => import('@/views/Write/index.ts');
const AboutView = () => import('@/views/About/index.ts');
const LogView = () => import('@/views/Log/index.ts');
const Page404View = () => import('@/views/404.vue');

const ArticleReadView = () => import('@/views/Article/components/Read/index.ts');
const SpacePublishView = () => import('@/views/Space/components/Publish/index.ts');

const all = ['superAdmin', 'admin', 'user', 'vipUser', 'visitor'];
const noVisitor = ['superAdmin', 'admin', 'user', 'vipUser'];

export const staticRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { roles: all, title: 'Home', icon: 'home-view' }
  },
  {
    path: '/article',
    name: 'Article',
    component: ArticleView,
    children: [
      {
        path: '/article/read/:id',
        name: 'ArticleRead',
        component: ArticleReadView,
        meta: { roles: all, title: 'Read', icon: 'read-view' }
      },
    ]
  },
  {
    path: '/space',
    name: 'Space',
    component: SpaceView,
    meta: { roles: all, title: 'Space', icon: 'space-view' },
    children: [
      {
        path: '/space/publish',
        name: 'SpacePublish',
        component: SpacePublishView,
        meta: { roles: noVisitor, title: 'Publish', icon: 'publish-view' }
      }
    ]
  },
  {
    path: '/write',
    name: 'Write',
    component: WriteView,
    meta: { roles: noVisitor, title: 'Write', icon: 'write-view' }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { roles: all, title: 'About', icon: 'about-view' }
  },
  {
    path: '/log',
    name: 'Log',
    component: LogView,
    meta: { roles: all, title: 'Log', icon: 'log-view' }
  },
  {
    path: '/404',
    name: 'page404',
    component: Page404View,
    meta: { roles: all, title: '404', icon: '404-view'}
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
  strict: true, // applies to all routes
  linkExactActiveClass: 'router-link-exact-active',
})

// 权限校验
promission(router);

export default router
