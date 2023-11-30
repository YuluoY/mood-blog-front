import NProgress from '@/plugins/NProgress/index.ts'

import { RouteLocationNormalized, Router } from 'vue-router'

export const promission = (router: Router) => {
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
    NProgress.start()
    next()
  })

  router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    NProgress.done()
  })
}
