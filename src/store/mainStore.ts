import { defineStore } from 'pinia'
import { StoreNames } from './namespace.ts'

export const mainStore = defineStore(StoreNames.Main, {
  state: () => ({
    theme: 'dark',
    lang: 'en',
    isLogin: false,
    token: '',
  }),
  getters: {
    getTheme(state) {
      return state.theme
    },
  },
  actions: {
    setTheme(theme: string) {
      this.theme = theme
    },
  },
  persist: {
    key: 'mainStore',
    storage: localStorage,
  },
})
