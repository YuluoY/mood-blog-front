import { MTableBaseMap } from "@/components/global/MTable/types/index.ts";
import { ICategory } from "@/types/api/category.ts";
import { dateFormat } from "@/utils/dayjs.ts";
import { removeCategory, restoreCategory } from '@/api/category.ts'
import { ElNotification } from "element-plus";

export const useFilterCategoryTable = (tableData: ICategory[]) => {
  const filterTableData = reactive([]);

  const categoryTableMap: Partial<MTableBaseMap<keyof (ICategory & { cateColorVal: string })>>[] = [
    { prop: 'id', label: 'id' },
    { prop: 'cateName', label: '名称' },
    { prop: 'cateAlias', label: '别名' },
    { prop: 'cateColor', label: '颜色', type: 'color', width: '100' },
    { prop: 'cateColorVal', label: '颜色值' },
    {
      prop: 'deletedAt',
      label: '状态',
      type: 'delSwitch',
      onDeldelSwitchChange: async (row: ICategory & { switchStatus?: boolean }) => {
        if (row.switchStatus) {
          const res = await restoreCategory(row.id);
          if (res.success) {
            ElNotification({
              type: 'success',
              title: '提示',
              message: `分类"${row.cateName}"已成功启用！`
            })
          }
        } else {
          const res = await removeCategory(row.id)
          if (res.success) {
            ElNotification({
              type: 'warning',
              title: '警告',
              message: `分类"${row.cateName}"已关闭使用！`
            })
          }
        }
      }
    },
    {
      prop: 'createdAt',
      label: '创建时间',
      type: "date"
    }
  ]

  if (tableData.length) {
    filterTableData.push(...tableData.map((category: ICategory & { switchStatus?: Ref<boolean>, cateColorVal?: string }) => {
      category.createdAt = dateFormat(category.createdAt);
      if (category.deletedAt) {
        category.deletedAt = dateFormat(category.deletedAt);
      }
      category.switchStatus = ref(!category.deletedAt);
      category.cateColorVal = category.cateColor;
      return category;
    }))
  }


  return {
    filterTableData,
    categoryTableMap
  }

}