import { RouteRecordRaw } from 'vue-router'

const AdminView = () => import('@/views/Admin/index.ts')

// 仪表盘
const DashbardView = () => import('@/views/Admin/Dashboard/index.ts')

// 博客管理
const UserManagerView = () => import('@/views/Admin/BlogManager/UserManager.vue')
const ArticleManagerView = () => import('@/views/Admin/BlogManager/ArticleManager.vue')
const CategoryManagerView = () => import('@/views/Admin/BlogManager/CategoryManager.vue')
const TagManagerView = () => import('@/views/Admin/BlogManager/TagManager.vue')
const CommentManagerView = () => import('@/views/Admin/BlogManager/CommentManager.vue')

// 页面管理
const WebsiteManagerView = () => import('@/views/Admin/PageManager/WebsiteManager.vue')
const FriendManagerView = () => import('@/views/Admin/PageManager/FriendManager.vue')
const AboutManagerView = () => import('@/views/Admin/PageManager/AboutManager.vue')

// 数据统计
const VisitorManagerView = () => import('@/views/Admin/StatManager/VisitorManager.vue')

const WriteView = () => import('@/views/Write/index.ts')

const dynamicRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/write',
    name: 'Write',
    component: WriteView,
    meta: {
      roles: ['superAdmin', 'admin', 'vipUser', 'user'],
      title: 'Write',
      icon: 'write-view',
      affix: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin/index.ts'),
    meta: { roles: ['superAdmin', 'admin'] },
    children: [
      {
        path: '/admin/dashbard',
        name: 'Dashbard',
        component: DashbardView,
        meta: { title: '仪表盘', icon: 'dashbard-manager', roles: ['superAdmin', 'admin'] },
      },
      {
        path: '/admin/blogManager',
        redirect: '/admin/articleManager',
        meta: { title: '博客管理', icon: 'blog-manager', roles: ['superAdmin', 'admin'] },
        children: [
          {
            path: '/admin/userManager',
            name: 'UserManager',
            component: UserManagerView,
            meta: { title: '用户管理', icon: 'user-manager', roles: ['superAdmin', 'admin'] },
          },
          {
            path: '/admin/articleManager',
            name: 'ArticleManager',
            component: ArticleManagerView,
            meta: { title: '文章管理', icon: 'article-manager', roles: ['superAdmin', 'admin'] },
          },
          {
            path: '/admin/categoryManager',
            name: 'CategoryManager',
            component: CategoryManagerView,
            meta: { title: '分类管理', icon: 'category-manager', roles: ['superAdmin', 'admin'] },
          },
          {
            path: '/admin/tagManager',
            name: 'TagManager',
            component: TagManagerView,
            meta: { title: '标签管理', icon: 'tag-manager', roles: ['superAdmin', 'admin'] },
          },
          {
            path: '/admin/commentManager',
            name: 'CommentManager',
            component: CommentManagerView,
            meta: { title: '评论管理', icon: 'comment-manager', roles: ['superAdmin', 'admin'] },
          },
        ],
      },
      {
        path: '/admin/pageManager',
        redirect: '/admin/websiteManager',
        meta: { title: '页面管理', icon: 'website-manager', roles: ['superAdmin', 'admin'] },
        children: [
          {
            path: '/admin/websiteManager',
            name: 'WebsiteManager',
            component: WebsiteManagerView,
            meta: { title: '站点管理', icon: 'website-manager', roles: ['superAdmin', 'admin'] },
          },
          {
            path: '/admin/friendManager',
            name: 'FriendManager',
            component: FriendManagerView,
            meta: { title: '友链管理', icon: 'friend-manager', roles: ['superAdmin', 'admin'] },
          },
          {
            path: '/admin/aboutManager',
            name: 'AboutManager',
            component: AboutManagerView,
            meta: { title: '关于我', icon: 'about-manager', roles: ['superAdmin', 'admin'] },
          },
        ],
      },
      {
        path: '/admin/statManager',
        redirect: '/admin/visitorManager',
        meta: { title: '数据统计', icon: 'data-manager', roles: ['superAdmin', 'admin'] },
        children: [
          {
            path: '/admin/visitorManager',
            name: 'VisitorManager',
            component: VisitorManagerView,
            meta: { title: '访客统计', icon: 'visitor-manager', roles: ['superAdmin', 'admin'] },
          },
        ],
      },
    ],
  },
]

export { dynamicRoutes }
