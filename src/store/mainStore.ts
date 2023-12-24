import { defineStore } from 'pinia'
import { IArticle } from '@/types/api/article.ts';
import { dateDiffNow } from "@/utils/dayjs.ts";
import { StoreNames } from './namespace.ts'
import { useArticleStore } from './articleStore.ts';


export const useMainStore = defineStore(StoreNames.Main, {
    state: () => ({
        sidebar: {
            loveTime: dateDiffNow('2022-11-30 13:14:00')
        }
    }),
    getters: {

    },
    actions: {
        async logined() {
            // 登录完成后的一些处理
            const { pathname } = window.location;
            if (pathname === 'Home' || pathname === '/') {
                await useArticleStore().fetchArticlesByPage<IArticle>();
            }
        }
    },
    persist: {
        key: `mood-${StoreNames.Main}`,
        storage: localStorage,
    },
})
