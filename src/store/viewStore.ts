import { create } from "@/api/rest.ts";
import { ICreateView } from "@/types/api/view.ts";
import { DatabaseTableName } from "@/types/core/index.ts";
import { StoreNames } from "./namespace.ts";
import { useGlobalStore } from "./globalStore.ts";
import { useUserStore } from "./userStore.ts";


export const useViewStore = defineStore(StoreNames.View, {


  actions: {
    async addView(data: Partial<ICreateView> = {}) {
      const view: Partial<ICreateView> = {}
      const globalStore = useGlobalStore();
      if (globalStore.loginStatus) {
        view.userid = useUserStore().id;
      } else {
        view.visitorId = globalStore.visitor.id;
      }
      await create<Partial<ICreateView>, any>(DatabaseTableName.VIEW, Object.assign(view, data));
    }
  }
})