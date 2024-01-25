import { defineStore } from 'pinia'
import { ITag } from '@/types/api/tag.ts'
import { getTags } from '@/api/tag.ts'
import { StoreNames } from './namespace.ts'

export const useTagStore = defineStore(StoreNames.Tag, {
  state: () => ({
    tags: []
  }),
  getters: {

  },
  actions: {
    async fetchTags() {
      const res = await getTags<ITag[]>();
      if (res.success) {
        this.tags = res.data;
      }
    }
  },
  persist: {
    key: `mood-${StoreNames.Tag}`,
    storage: localStorage,
  },
})
