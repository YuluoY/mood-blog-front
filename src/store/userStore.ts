import { defineStore } from 'pinia'
import { StoreNames } from './namespace.ts'

export const userStore = defineStore(StoreNames.User, {
  state: () => ({
    username: ' yuluo '
  }),
  getters: {

  },
  actions: {

  },
  persist: {
    key: StoreNames.User,
    storage: localStorage,
  },
})
