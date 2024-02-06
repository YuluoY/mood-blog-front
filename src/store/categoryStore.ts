import { defineStore } from 'pinia'
import { ICategory } from '@/types/api/category.ts'
import { getCategorys } from '@/api/category.ts';
import { RouteRecordRaw } from 'vue-router';
import { firstToUpperCase } from '@/utils/core.ts';
import { StoreNames } from './namespace.ts'

export const useCategoryStore = defineStore(StoreNames.Category, {
  state: () => ({
    categories: []
  }),
  getters: {
    getCategoryRoutes(): RouteRecordRaw[] {
      return this.categories.map((item: ICategory) => {
        const name = firstToUpperCase(item.cateAlias)
        return {
          path: `/category/${item.cateAlias}`,
          name,
          component: () => import('@/views/Category/index.ts'),
          meta: { roles: ['visitor'], title: name, affix: false, id: item.id },
        } as RouteRecordRaw
      })
    }
  },
  actions: {
    async fetchCategories() {
      const res = await getCategorys<ICategory[]>();
      if (res.success) {
        this.categories = res.data;
      }
    },
    registerCategoryRoutes(router: import('vue-router').Router) {
      const cateParentRoute = router.getRoutes().find((route) => route.name === 'Category');
      this.getCategoryRoutes.forEach(route => {
        if (!router.hasRoute(route.name)) {
          router.addRoute('Category', route)
          cateParentRoute.children.push(route);
        }
      })
    }
  },
  persist: {
    key: `mood-${StoreNames.Category}`,
    storage: localStorage,
  },
})
