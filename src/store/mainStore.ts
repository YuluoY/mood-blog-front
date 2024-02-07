import { defineStore } from 'pinia'
import { IArticle } from '@/types/api/article.ts';
import { dateDiffNow } from "@/utils/dayjs.ts";
import { getIp, getPositionByIp } from '@/api/rest.ts';
import { IBaiduMapPosition } from '@/types/core/index.ts';
import { StoreNames } from './namespace.ts'
import { useArticleStore } from './articleStore.ts';
import { useGlobalStore } from './globalStore.ts';


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
        },
        async fetchIp() {
            const globalStore = useGlobalStore();
            if (globalStore.ip && globalStore.address) return;
            const res = await getIp<{ ip: string }>();
            let pos = await getPositionByIp<IBaiduMapPosition>(res.data.ip as string);

            globalStore.ip = res.data.ip;
            globalStore.address = pos.data.adcode;
            globalStore.country = pos.data.country;
            globalStore.province = pos.data.province;
            globalStore.city = pos.data.city;
            globalStore.district = pos.data.district;
            globalStore.street = pos.data.street;
            globalStore.point = pos.data.point;
            globalStore.adcode = pos.data.adcode;
        },
    },
})
