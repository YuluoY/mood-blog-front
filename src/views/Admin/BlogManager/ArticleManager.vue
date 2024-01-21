<template>
  <div class="y-articleManager">
    <AdminTemplate>
      <template #add></template>

      <template #table>
        <MTable :table-data="tableData" :column-label-map="columnLabelMap">
          <template #pagination>
            <MPagination :total="total"/>
          </template>
        </MTable>
      </template>
    </AdminTemplate>
  </div>
</template>
<script setup lang="ts">
import { getArticlesByPage } from '@/api/article.ts'
import { IArticle } from '@/types/api/article.ts'
import { useFilterArticleTable } from '@/views/Admin/hooks/useFilterArticleTable.ts'

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
</script>
<style scoped lang="scss"></style>
