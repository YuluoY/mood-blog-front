import { defineStore } from 'pinia'
import { StoreNames } from './namespace.ts'


export const useGlobalStore = defineStore(StoreNames.Global, {
  state: () => ({
    theme: 'dark',
    lang: 'zh',
    loginStatus: false,
    defaultCover: []
  }),
  getters: {
    getDefaultCover(): string {
      return '//localhost:3000/cover.png';
    }
  },
  actions: {

  },
  persist: {
    key: `mood-${StoreNames.Global}`,
    storage: localStorage,
  },
})
