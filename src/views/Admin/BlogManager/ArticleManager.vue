<template>
  <div class="y-articleManager">
    <AdminTemplate>
      <template #add></template>

      <template #table>
        <MTable
          :table-data="tableData"
          :column-label-map="columnLabelMap"
          @handle-delete="handleDelete"
          @handle-edit="handleEdit"
          @handle-edit-confirm="handleEditConfirm"
        >
          <template #edit>
            <MForm
              ref="articleEditFormRef"
              :form-configures="articleEditFormConfigures"
              :form-data="articleEditFormData"
            ></MForm>
          </template>
          <template #pagination>
            <MPagination :total="total" />
          </template>
        </MTable>
      </template>
    </AdminTemplate>
  </div>
</template>
<script setup lang="ts">
import { getArticlesByPage, removeArticle } from '@/api/article.ts'
import MForm from '@/components/global/MForm/index.ts'
import { MFormItemConfig } from '@/components/global/MForm/types/index.ts'
import { IArticle } from '@/types/api/article.ts'
import { useFilterArticleTable } from '@/views/Admin/hooks/useFilterArticleTable.ts'
import { ElMessage, ElMessageBox } from 'element-plus'

const articleEditFormConfigures: MFormItemConfig<IArticle>[] = [
  { prop: 'title', label: '标题' },
  { prop: 'cover', label: '封面', type: 'upload' },
  { prop: 'description', label: '描述', type: 'textarea' },
  { prop: 'isTop', label: '置顶', type: 'switch' },
  { prop: 'isRecommend', label: '推荐', type: 'switch' },
]
const articleEditFormData = reactive<Partial<IArticle>>({
  title: '',
  cover:'',
  description: '',
  isTop: null,
  isRecommend: null,
})
const articleEditFormRef = ref<InstanceType<typeof MForm>>()

const tableData = reactive([])
const columnLabelMap = reactive([])

const page = ref(1)
const limit = ref(10)
const total = ref(0)

const res = await getArticlesByPage(page.value, limit.value, {
  withDeleted: true,
})
if (res.success) {
  total.value = res.data.total
  const { filterTableData, articleTableMap } = useFilterArticleTable(res.data.list as IArticle[])
  tableData.push(...filterTableData)
  columnLabelMap.push(...articleTableMap)
}

const handleEdit = (index: number, row: Partial<IArticle>) => {
  Object.assign(articleEditFormData, row)
  console.log(articleEditFormData)
}
const handleEditConfirm = (editorDialogVisible: Ref<boolean>) => {
  articleEditFormRef.value.validator().then((vaildte: boolean) => {
    console.log(vaildte)
  })
  editorDialogVisible.value = !editorDialogVisible.value
}

const handleDelete = (index: number, row: IArticle, deleteTableRowCb: Function) => {
  ElMessageBox({
    type: 'warning',
    title: '警告',
    message: `此操作将会删除文章《${row.title}》相关数据，且不能恢复，确认执行删除吗？`,
  }).then(async () => {
    const r = await removeArticle(row.id, true)
    if (r.success) {
      deleteTableRowCb()
      ElMessage({
        type: 'success',
        message: `文章《${row.title}》已被彻底删除！`,
      })
    }
  })
}
</script>
<style scoped lang="scss"></style>
