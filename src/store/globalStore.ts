import { defineStore } from 'pinia'
import { ICreateVisitor, IVisitor } from '@/types/api/visitor.ts';
import { create } from '@/api/rest.ts';
import { DatabaseTableName } from '@/types/core/index.ts';
import { getBrowser, getWindowsOS } from '@/utils/core.ts';
import { StoreNames } from './namespace.ts'


export const useGlobalStore = defineStore(StoreNames.Global, {
  state: () => ({
    visitor: {
      id: '',
      ip: '',
      address: '未知',
      country: '未知',
      province: '未知',
      city: '未知',
      district: '未知',
      street: '未知',
      point: { x: '', y: '' },
      adcode: '',
      userAgent: window.navigator.userAgent,
    },

    theme: 'dark',
    lang: 'zh',
    loginStatus: false,
    defaultCover: [],
    visitorCount: 0,
    viewCount: 0
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
    async initAndCreateVisitor() {
      if (this.loginStatus) return;
      const visitor: Partial<IVisitor> = {
        ...this.visitor,
        browser: getBrowser(this.visitor.userAgent),
        windowsOS: getWindowsOS(this.visitor.userAgent)
      };
      delete visitor.id
      const res = await create<ICreateVisitor, IVisitor>(DatabaseTableName.VISITOR, visitor as ICreateVisitor);
      if (res.success) {
        Object.assign(this.visitor, res.data);
      }
    },

    initVisitor() {
      this.visitor = {
        id: '',
        ip: '',
        address: '',
        country: '',
        province: '',
        city: '',
        district: '',
        street: '',
        point: { x: '', y: '' },
        adcode: '',
        userAgent: window.navigator.userAgent,
      }
    }
  },
  persist: {
    key: `mood-${StoreNames.Global}`,
    storage: localStorage,
  },
})
