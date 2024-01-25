import { defineStore } from 'pinia'
import { ICategory } from '@/types/api/category.ts'
import { getCategorys } from '@/api/category.ts';
import { StoreNames } from './namespace.ts'

export const useCategoryStore = defineStore(StoreNames.Category, {
  state: () => ({
    categories: []
  }),
  getters: {

  },
  actions: {
    async fetchCategories() {
      const res = await getCategorys<ICategory[]>();
      if (res.success) {
        this.categories = res.data;
      }
    }
  },
  persist: {
    key: `mood-${StoreNames.Category}`,
    storage: localStorage,
  },
})
