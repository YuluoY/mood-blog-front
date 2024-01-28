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
import { ElMessage, ElMessageBox } from 'element-plus'
import { useFilterCategoryTable } from '../hooks/useFilterCategoryTable.ts'

const addFormConfigures: MFormItemConfig<ICategory>[] = [
  {
    prop: 'cateName',
    label: '名称',
    labelWidth: '70',
    placeholder: '请输入分类名称',
    rules: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }],
  },
  {
    prop: 'cateAlias',
    label: '别名',
    labelWidth: '70',
    placeholder: '请输入分类别名（地址名）',
    rules: [{ required: true, message: '分类别名不能为空', trigger: 'blur' }],
  },
  {
    prop: 'cateColor',
    label: '颜色',
    type: 'color',
    labelWidth: '70',
    placeholder: '请输入分类颜色',
  },
]
const addFormData = reactive<ICreateCategory>({
  cateName: '',
  cateAlias: '',
  cateColor: '#000000',
})

const mFormRef = ref<InstanceType<typeof MForm>>()

const tableData = reactive([]) // 表格数据
const columnLabelMap = reactive([]) // 表格列映射

const onAddDialogClick = (closeDialogCb: Function) => {
  mFormRef.value.validator().then(async (vaildte: boolean) => {
    if (vaildte) {
      const r = await addCategory(addFormData)
      if (r.success) {
        addFormData.cateName = ''
        closeDialogCb()
      }
    }
  })
}

const res = await getCategorys<ICategory[]>()
if (res.success) {
  const { filterTableData, categoryTableMap } = useFilterCategoryTable(res.data)
  columnLabelMap.push(...categoryTableMap)
  tableData.push(...filterTableData)
}

const handleDelete = (index: number, row: ICategory, onDeleteTableRowCb: Function) => {
  ElMessageBox({
    type: 'warning',
    title: '警告',
    message: `此操作会将分类"${row.cateName}"相关数据删除，且不能恢复，确认执行删除吗？`,
  }).then(async () => {
    const r = await removeCategory(row.id, true)
    if (r.success) {
      ElMessage({
        type: 'success',
        message: `分类"${row.cateName}"已被删除！`,
      })
      onDeleteTableRowCb()
    }
  })
}
</script>
<style scoped lang="scss"></style>
