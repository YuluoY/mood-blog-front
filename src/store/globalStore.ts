import { defineStore } from 'pinia'
import { StoreNames } from './namespace.ts'


export const useGlobalStore = defineStore(StoreNames.Global, {
  state: () => ({
    ip: '',
    address: '',
    country: '',
    province: '',
    city: '',
    district: '',
    street: '',
    point: { x: '', y: '' },
    adcode: '',

    theme: 'dark',
    lang: 'zh',
    loginStatus: false,
    defaultCover: []
  }),
  getters: {
    getDefaultCover(): string {
      return '//localhost:3000/cover.png';
    },
    getDefaultAvatar(): string {
      return '//localhost:3000/avatar.png'
    }
  },
  actions: {

  },
  persist: {
    key: `mood-${StoreNames.Global}`,
    storage: localStorage,
  },
})
