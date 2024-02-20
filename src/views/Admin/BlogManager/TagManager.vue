<template>
  <div class="y-tagManager">
    <AdminTemplate @on-add-dialog-click="onAddDialogClick">
      <template #add>
        <MForm ref="tagFormRef" :form-data="formData" :form-configures="formConfigures"></MForm>
      </template>

      <template #table>
        <MTable :table-data="tableData" :column-label-map="tableMap" @handle-delete="handleDelete">
          <template #pagination>
            <MPagination :page="page" :limit="limit" :total="total"></MPagination>
          </template>
        </MTable>
      </template>
    </AdminTemplate>
  </div>
</template>
<script setup lang="ts">
import { ITag, ICreateTag } from '@/types/api/tag.ts'
import { addTag, getTagByPage, removeTag } from '@/api/tag.ts'
import { MFormItemConfig } from '@/components/global/MForm/types/index.ts'
import MForm from '@/components/global/MForm/index.ts'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useFilterTagTable } from '../hooks/useFilterTagTable.ts'

const formData = reactive<ICreateTag>({
  tagName: '',
  tagColor: '#000000',
})
const formConfigures = reactive<MFormItemConfig<ICreateTag>[]>([
  {
    prop: 'tagName',
    label: '标签名称',
    rules: [{ required: true, message: '标签名称不能为空！', trigger: 'blur' }],
  },
  { prop: 'tagColor', label: '标签颜色', type: 'color' },
])
const tagFormRef = ref<InstanceType<typeof MForm>>()

const tableData = reactive([])
const tableMap = reactive([])

const page = ref(1)
const limit = ref(10)
const total = ref(0)

const res = await getTagByPage(page.value, limit.value, {
  withDeleted: true,
})

if (res.success) {
  total.value = res.data.total
  const { filterTableData, tagTableMap } = useFilterTagTable(res.data.list as ITag[])
  tableData.push(...filterTableData)
  tableMap.push(...tagTableMap)
}

const onAddDialogClick = (closeDialogCb: Function) => {
  tagFormRef.value.validator().then(async (validate: boolean) => {
    if (validate) {
      const r = await addTag(formData)
      if (r.success) {
        ElMessage({
          type: 'success',
          message: `标签“<span style='color:${formData.tagColor}'>${formData.tagName}</span>”创建成功！`,
          dangerouslyUseHTMLString: true,
        })
        formData.tagName = ''
        formData.tagColor = ''
        closeDialogCb()
      }
    }
  })
}

const handleDelete = (_index: number, row: ITag, deleteRowCb: Function) => {
  ElMessageBox({
    type: 'warning',
    title: '警告',
    message: `此操作会将标签<span style='color:${row.tagColor}'>“${row.tagName}”</span>彻底删除，确认执行操作吗？`,
    dangerouslyUseHTMLString: true,
  }).then(async () => {
    const r = await removeTag(row.id, true)
    if (r.success) {
      ElMessage({
        type: 'success',
        message: `标签“<span style='color:${row.tagColor}'>${row.tagName}</span>”删除成功！`,
        dangerouslyUseHTMLString: true,
      })
      deleteRowCb();
    }
  })
}
</script>
<style scoped lang="scss"></style>
