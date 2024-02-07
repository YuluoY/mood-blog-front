import NProgress from '@/plugins/NProgress/index.ts'
import { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
import { useCategoryStore } from '@/store/categoryStore.ts';

import { dynamicRoutes } from './dynamicRoutes.ts'

let flag = 1;
export const promission = (router: Router) => {

  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
    if (to.name === 'Category') {
      return;
    }
    // eslint-disable-next-line no-use-before-define
    processCategoryEffect(to, from);

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


// 对 分类 的效果特殊处理
function processCategoryEffect(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  const categoryLinkEl = document.querySelector('a[href="/category"]');
  if(!categoryLinkEl) return;
  if (to.path.indexOf('/category/') > -1) {
    categoryLinkEl.classList.add('y-router__link--active')
  } else {
    categoryLinkEl.classList.remove('y-router__link--active')
  }
}