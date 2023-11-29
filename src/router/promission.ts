import nprogress from '@/plugins/nprogress/index.ts'
import { RouteLocationNormalized, Router } from 'vue-router'

export const promission = (router: Router) => {
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
    nprogress.start()
    next()
  })

  router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    nprogress.done()
  })
}