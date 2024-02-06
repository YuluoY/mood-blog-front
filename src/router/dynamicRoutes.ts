import { RouteRecordRaw } from 'vue-router'

const AdminView = () => import('@/views/Admin/index.ts')

const dynamicRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    children: []
  }
]


export { dynamicRoutes }
