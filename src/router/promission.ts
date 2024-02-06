import NProgress from '@/plugins/NProgress/index.ts'
import { RouteLocationNormalized, Router } from 'vue-router'
import { useCategoryStore } from '@/store/categoryStore.ts';

import { dynamicRoutes } from './dynamicRoutes.ts'

let flag = 1;
export const promission = (router: Router) => {

  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
    if (to.name === 'Category') return;
    NProgress.start();
    if (flag === 1) {
      flag++;
      useCategoryStore().registerCategoryRoutes(router);
      next({ ...to, replace: true })
      return;
    }

    next()
  })

  router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    NProgress.done()
  })
}
