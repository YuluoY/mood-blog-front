import { RouteRecordRaw } from 'vue-router'

const AdminView = () => import('@/views/Admin/index.ts')

export const dynamicRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    children: []
  }
]
