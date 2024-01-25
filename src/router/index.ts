import { RouteRecordRaw, createRouter, createWebHistory, RouterOptions } from 'vue-router'
import { promission } from './promission.ts'

const HomeView = () => import('@/views/Home/index.ts')
const WriteView = () => import('@/views/Write/index.ts')
const AboutView = () => import('@/views/About/index.ts')
const LogView = () => import('@/views/Log/index.ts')
const SettingView = () => import('@/views/Setting/index.ts')
const Page404View = () => import('@/views/404.vue')
const ArticleReadView = () => import('@/views/Read/index.ts')
const ArchiveView = () => import('@/views/Archive/index.ts')
const CategoryTemplate = () => import('@/views/Category/index.ts')


// 仪表盘
const DashbardView = () => import('@/views/Admin/Dashboard/index.ts');

// 博客管理
const UserManagerView = () => import('@/views/Admin/BlogManager/UserManager.vue');
const ArticleManagerView = () => import('@/views/Admin/BlogManager/ArticleManager.vue');
const CategoryManagerView = () => import('@/views/Admin/BlogManager/CategoryManager.vue');
const TagManagerView = () => import('@/views/Admin/BlogManager/TagManager.vue');
const CommentManagerView = () => import('@/views/Admin/BlogManager/CommentManager.vue');

// 页面管理
const WebsiteManagerView = () => import('@/views/Admin/PageManager/WebsiteManager.vue');
const FriendManagerView = () => import('@/views/Admin/PageManager/FriendManager.vue');
const AboutManagerView = () => import('@/views/Admin/PageManager/AboutManager.vue');

// 数据统计
const VisitorManagerView = () => import('@/views/Admin/StatManager/VisitorManager.vue');

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
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin/index.ts'),
    children: [
      {
        path: '/admin/dashbard',
        name: 'Dashbard',
        component: DashbardView,
        meta: { title: '仪表盘', icon: 'dashbard-manager' }
      },
      {
        path: '/admin/blogManager',
        redirect: '/admin/articleManager',
        meta: { title: '博客管理', icon: 'blog-manager' },
        children: [
          {
            path: '/admin/userManager',
            name: 'UserManager',
            component: UserManagerView,
            meta: { title: '用户管理', icon: 'user-manager' }
          },
          {
            path: '/admin/articleManager',
            name: 'ArticleManager',
            component: ArticleManagerView,
            meta: { title: '文章管理', icon: 'article-manager' }
          },
          {
            path: '/admin/categoryManager',
            name: 'CategoryManager',
            component: CategoryManagerView,
            meta: { title: '分类管理', icon: 'category-manager' }
          },
          {
            path: '/admin/tagManager',
            name: 'TagManager',
            component: TagManagerView,
            meta: { title: '标签管理', icon: 'tag-manager' }
          },
          {
            path: '/admin/commentManager',
            name: 'CommentManager',
            component: CommentManagerView,
            meta: { title: '评论管理', icon: 'comment-manager' }
          }
        ]
      },
      {
        path: '/admin/pageManager',
        redirect: '/admin/websiteManager',
        meta: { title: '页面管理', icon: 'website-manager' },
        children: [
          {
            path: '/admin/websiteManager',
            name: 'WebsiteManager',
            component: WebsiteManagerView,
            meta: { title: '站点管理', icon: 'website-manager' },
          },
          {
            path: '/admin/friendManager',
            name: 'FriendManager',
            component: FriendManagerView,
            meta: { title: '友链管理', icon: 'friend-manager' },
          },
          {
            path: '/admin/aboutManager',
            name: 'AboutManager',
            component: AboutManagerView,
            meta: { title: '关于我', icon: 'about-manager' },
          }
        ]
      },
      {
        path: '/admin/statManager',
        redirect: '/admin/visitorManager',
        meta: { title: '数据统计', icon: 'data-manager' },
        children: [
          {
            path: '/admin/visitorManager',
            name: 'VisitorManager',
            component: VisitorManagerView,
            meta: { title: '访客统计', icon: 'visitor-manager' }
          }
        ]
      }
    ]
  },
  {
    path: '/tag/:tagName',
    name: 'Tag',
    component: () => import('@/views/Tag/index.ts'),
    meta: { roles: ['visitor'], title: 'Tag', icon: 'tag-view', affix: false },
  },
  {
    path: '/category',
    name: 'Category',
    meta: { roles: ['visitor'], title: 'Category', icon: 'category-view', affix: true },
    children: [
      {
        path: '/category/tech',
        name: 'Tech',
        component: CategoryTemplate,
        meta: { roles: ['visitor'], title: 'Tech', affix: false },
      },
      {
        path: '/category/life',
        name: 'Life',
        component: CategoryTemplate,
        meta: { roles: ['visitor'], title: 'Life', affix: false },
      },
      {
        path: '/category/project',
        name: 'Project',
        component: CategoryTemplate,
        meta: { roles: ['visitor'], title: 'Project', affix: false },
      },
      {
        path: '/category/note',
        name: 'Note',
        component: CategoryTemplate,
        meta: { roles: ['visitor'], title: 'Note', affix: false },
      },
    ]
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
  linkActiveClass: 'y-router__link--active',
  scrollBehavior: () => ({ left: 0, top: 0 }),
} as RouterOptions)

// 权限校验
promission(router)

export default router
