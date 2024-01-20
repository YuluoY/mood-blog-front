<template>
  <div class="y-categoryManager">
    <AdminTemplate @onAddDialogClick="onAddDialogClick">
      <template #add>
        <MForm ref="mFormRef" :formData="addFormData" :formConfigures="addFormConfigures"></MForm>
      </template>
      <template #del>
        <span>This is a message</span>
      </template>
      <template #modify>
        <span>This is a message</span>
      </template>

      <template #table>
        <MTable
          @handleDelete="handleDelete"
          :column-label-map="columnLabelMap"
          :table-data="tableData"
        ></MTable>
      </template>
    </AdminTemplate>
  </div>
</template>
<script setup lang="ts">
import MForm from '@/components/global/MForm/index.ts'
import { MFormItemConfig } from '@/components/global/MForm/types/index.ts'
import { ICreateCategory, ICategory } from '@/types/api/category.ts'
import { addCategory, getCategorys, removeCategory } from '@/api/category.ts'
import { ElMessage } from 'element-plus'
import { useFilterCategoryTable } from '../hooks/useFilterCategoryTable.ts'

const addFormConfigures: MFormItemConfig[] = [
  {
    prop: 'cateName',
    label: '分类名称',
    rules: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }],
  },
]
const addFormData = reactive<ICreateCategory>({
  cateName: '',
})

const mFormRef = ref<InstanceType<typeof MForm>>()
const onAddDialogClick = (closeDialogCb: Function) => {
  mFormRef.value.validator().then(async (vaildte: boolean) => {
    if (vaildte) {
      const res = await addCategory(addFormData)
      if (res.success) {
        addFormData.cateName = ''
        closeDialogCb()
      }
    }
  })
}
const tableData = reactive([])
const columnLabelMap = reactive([])
const res = await getCategorys<ICategory[]>()

if (res.success) {
  const { filterTableData, categoryTableMap } = useFilterCategoryTable(res.data)
  columnLabelMap.push(...categoryTableMap)
  tableData.push(...filterTableData)
}

const handleDelete = (index: number, row: ICategory) => {
  removeCategory(row.id, true).then((r) => {
    if (r.success) {  
      ElMessage({
        type:'success',
        message:`分类"${row.cateName}"已被删除！`
      })
    }
  })
}
</script>
<style scoped lang="scss"></style>
