import { ITag } from "@/types/api/tag.ts";
import { MTableBaseMap } from "@/components/global/MTable/types/index.ts";
import { removeTag, restoreTag } from "@/api/tag.ts";
import { ElNotification } from "element-plus";
import { colorStringToHex } from "@/utils/core.ts";
import { useFilterBaseData } from "./useFilterBaseData.ts"


interface ExtraTagProp {
  tagColorDisplay: string
}

export const useFilterTagTable = (tableData: ITag | ITag[]) => {

  const { data, baseTableMap, delSwitchChange } = useFilterBaseData(tableData);
  const filterTableData = reactive(data.map((item: ITag & Partial<ExtraTagProp>) => {
    item.tagColor = colorStringToHex(item.tagColor).toLocaleUpperCase()
    item.tagColorDisplay = item.tagColor;
    return item;
  }))

  const tagTableMap: Partial<MTableBaseMap<keyof (ITag & Partial<ExtraTagProp>)>>[] = [
    { prop: 'id', label: 'id' },
    { prop: 'tagName', label: '名称' },
    { prop: 'tagColorDisplay', label: '颜色', type: 'color', width: '100' },
    { prop: 'tagColor', label: '哈希值' },
    ...baseTableMap
  ]

  delSwitchChange(async (row: ITag & { switchStatus?: boolean }) => {
    if (row.switchStatus) {
      const res = await restoreTag(row.id);
      if (res.success) {
        ElNotification({
          type: 'success',
          message: `标签“${row.tagName}”已被启用！`
        })
      }
    } else {
      const res = await removeTag(row.id);
      if (res.success) {
        ElNotification({
          type: 'warning',
          message: `标签“${row.tagName}”已被禁用！`
        })
      }
    }
  })


  return {
    filterTableData,
    tagTableMap
  }
}