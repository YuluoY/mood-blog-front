import { defineStore } from 'pinia'
import { getArticlesByPage } from '@/api/article.ts'
import { IArticle } from '@/types/api/article.ts';
import { ElMessage } from 'element-plus';
import { IArticleStoreState } from '@/types/store/articleStore.ts';
import { StoreNames } from './namespace.ts'

export const useArticleStore = defineStore(StoreNames.Article, {
  state: () => ({
    default: {
      page: 1,
      limit: 10
    },
    articleList: [],
    total: 0,
    limit: 0,
    page: 0,
  } as IArticleStoreState),
  getters: {

  },
  actions: {
    setArticleState(key: string, value: any) {
      this.$state[key] = value;
    },
    async fetchArticlesByPage<T extends IArticle>(page?: number, limit?: number) {
      page = page || this.default.page;
      limit = limit || this.default.limit;
      const res = await getArticlesByPage<T>(page, limit, {
        sort: 'createdAt',
        order: 'DESC'
      });
      const { success, data, message } = res;
      if (success) {
        this.articleList = data.list as T[];
        this.total = data.total;
        this.limit = data.limit;
        this.page = data.page;
      } else {
        ElMessage.error(message)
      }
    }
  },
  persist: {
    key: `mood-${StoreNames.Article}`,
    storage: localStorage,
  },
})
