import nprogress from '@/plugins/nprogress/index.ts'
import { RouteLocationNormalized } from 'vue-router'
import router from './index.ts'

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
  nprogress.start()
  next()
})

router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  nprogress.done()
})
