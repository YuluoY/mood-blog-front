import { defineStore } from 'pinia'
import { dateDiffNow } from "@/utils/dayjs.ts";
import { getCount, getIp, getPositionByIp } from '@/api/rest.ts';
import { DatabaseTableName, IBaiduMapPosition } from '@/types/core/index.ts';
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
                await useArticleStore().fetchArticlesByPage();
            }
        },
        async fetchIp() {
            const globalStore = useGlobalStore();
            if (globalStore.visitor.ip) return;
            const res = await getIp<{ ip: string }>();
            globalStore.visitor.ip = res.data.ip;
        },
        async fetchPosition(ip: string = '') {
            const globalStore = useGlobalStore();
            if (globalStore.visitor.address) return;
            ip = ip || globalStore.visitor.ip;
            let pos = await getPositionByIp<IBaiduMapPosition>(ip as string);
            Object.assign(globalStore.visitor, pos.data);
        },
        async fetchCounts() {
            const globalStore = useGlobalStore();
            const res = await getCount<{ visitorCount: string, viewCount: string }>(DatabaseTableName.VISITOR)
            globalStore.visitorCount = Number(res.data.visitorCount || 0);
            globalStore.viewCount = Number(res.data.viewCount || 0);
        }
    },
})
