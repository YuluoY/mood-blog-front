import NProgress from '@/plugins/NProgress/index.ts'
import { RouteLocationNormalized, Router, RouteRecordRaw } from 'vue-router'
import { useCategoryStore } from '@/store/categoryStore.ts'

// import { useGlobalStore } from '@/store/globalStore.ts'
import { useUserStore } from '@/store/userStore.ts'
import { TypeRole } from '@/types/core/index.ts'
import { dynamicRoutes } from './dynamicRoutes.ts'

// 对 分类 的效果特殊处理
function processCategoryClickEffect(to: RouteLocationNormalized, _from: RouteLocationNormalized) {
  const categoryLinkEl = document.querySelector('a[href="/category"]')
  if (!categoryLinkEl) return
  if (to.path.indexOf('/category/') > -1) {
    categoryLinkEl.classList.add('y-router__link--active')
  } else {
    categoryLinkEl.classList.remove('y-router__link--active')
  }
}

function filterRouteByRole(routes: readonly RouteRecordRaw[], role: TypeRole) {
  if (!routes.length) return routes
  const newRoles = []
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    if (route.meta.roles.includes(role)) {
      newRoles.push(route)
    }
    if (route?.children && route.children.length) {
      const children = [...route.children]
      route.children.length = 0
      route.children.push(...filterRouteByRole(children, role))
    }
  }
  return newRoles
}

let flag = 1
export const promission = (router: Router) => {
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
    if (to.name === 'Category') return
    processCategoryClickEffect(to, from)

    // const { loginStatus } = useGlobalStore();
    const userStore = useUserStore()
    const categoryStore = useCategoryStore()
    const categoryRoute = router.getRoutes().find((route) => route.name === 'Category')
    if (categoryStore.categories.length !== categoryRoute.children.length) {
      categoryStore.registerCategoryRoutes(router)
    }

    NProgress.start()
    if (flag++ === 1) {
      categoryStore.registerCategoryRoutes(router)

      const filterRoutes = filterRouteByRole(dynamicRoutes, userStore.role as TypeRole)
      filterRoutes.forEach((route) => !router.hasRoute(route.name) && router.addRoute(route))

      next({ ...to, replace: true })
      return
    }

    next()
  })

  router.afterEach((_to: RouteLocationNormalized, _from: RouteLocationNormalized) => {
    NProgress.done()
  })
}
