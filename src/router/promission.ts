import NProgress from '@/plugins/NProgress/index.ts'

import { RouteLocationNormalized, Router } from 'vue-router'
// import { dynamicRoutes } from './dynamicRoutes.ts'

export const promission = (router: Router) => {
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
    if(to.name === 'Category') return;
    NProgress.start();
    // dynamicRoutes.forEach(route => router.addRoute(route));
    next()
  })

  router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    NProgress.done()
  })
}
