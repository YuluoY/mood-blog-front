import { MTableBaseMap } from "@/components/global/MTable/types/index.ts"
import { dateFormat } from "@/utils/dayjs.ts"

interface MTableBaseData {
  [key: string]: any
  deletedAt?: string
  createdAt?: string
  updatedAt?: string
}

export const useFilterBaseData = <T extends MTableBaseData>(tableData: T | T[]) => {
  const data: T[] = [];
  const swtichRow = ref();

  const filterOperate = (item: T & { switchStatus?: Ref<boolean> }) => {
    item.createdAt = dateFormat(item.createdAt);
    item.updatedAt = dateFormat(item.updatedAt);
    if (item.deletedAt) {
      item.deletedAt = dateFormat(item.deletedAt);
    }
    item.switchStatus = ref(!item.deletedAt)
    return item;
  }

  if (tableData) {
    if (Array.isArray(tableData) && tableData.length) {
      data.push(...tableData.map((item: T & { switchStatus?: Ref<boolean> }) => filterOperate(item)))
    } else {
      data.push(filterOperate(tableData as T));
    }
  }

  const onDelSwitchChange = (row: T) => {
    swtichRow.value = row;
  }

  const switchChange = (cb: Function) => {
    // watch默认如果监听的对象没有数据一样，就不执行回调，但使用deep可以深度监听，不仅是数据
    const switchRowWatcher = watch(() => swtichRow.value, async (newVal) => {
      await cb(newVal)
    }, { deep: true });
    onUnmounted(() => switchRowWatcher())
  }

  const baseTableMap: Partial<MTableBaseMap<keyof T>>[] = [
    { prop: 'deletedAt', label: '状态', type: 'delSwitch', onDelSwitchChange },
    { prop: 'createdAt', label: '创建时间', type: 'date' },
    { prop: 'updatedAt', label: '最近更新', type: 'date' }
  ]

  return {
    data,
    baseTableMap,
    switchChange
  }
}