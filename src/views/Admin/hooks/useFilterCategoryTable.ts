import { MTableBaseMap } from "@/components/global/MTable/types/index.ts";
import { ICategory } from "@/types/api/category.ts";
import { dateFormat } from "@/utils/dayjs.ts";
import { removeCategory, restoreCategory } from '@/api/category.ts'
import { ElNotification } from "element-plus";

export const useFilterCategoryTable = (tableData: ICategory[]) => {
  const filterTableData = reactive([]);

  const categoryTableMap: Partial<MTableBaseMap<keyof ICategory>>[] = [
    {
      prop: 'id',
      label: 'id'
    },
    {
      prop: 'cateName',
      label: '分类名称',
    },
    {
      prop: 'deletedAt',
      label: '状态',
      type: 'switch',
      onSwitchChange: async (row: ICategory & { status?: boolean }) => {
        if (row.status) {
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
    filterTableData.push(...tableData.map((category: ICategory & { status?: Ref<boolean> }) => {
      category.createdAt = dateFormat(category.createdAt);
      if (category.deletedAt) {
        category.deletedAt = dateFormat(category.deletedAt);
      }
      category.status = ref(!category.deletedAt)
      return category;
    }))
  }


  return {
    filterTableData,
    categoryTableMap
  }

}