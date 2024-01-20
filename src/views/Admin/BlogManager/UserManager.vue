<template>
  <div class="y-userManager">
    <AdminTemplate>
      <template #add>
        <span>This is a message</span>
      </template>
      <template #del>
        <span>This is a message</span>
      </template>
      <template #modify>
        <span>This is a message</span>
      </template>
      <template #search></template>
      <template #table>
        <MTable
          :tableData="tableData"
          :column-label-map="columnLabelMap"
          :filter-table-col="'username'"
        >
          <template #pagination>
            <MPagination :total="total" :page="page" :limit="limit"></MPagination>
          </template>
        </MTable>
      </template>
    </AdminTemplate>
  </div>
</template>
<script setup lang="ts">
import { getUsersByPage } from '@/api/user.ts'
import { IUser } from '@/types/api/user.ts'
import { MTableBaseMap } from '@/components/global/MTable/types/index.ts'
import { useFilterUserTable } from '../hooks/useFilterUserTable.ts'

const page = ref(1)
const limit = ref(10)
const total = ref(0)
const tableData = reactive<object[]>([])
const columnLabelMap = reactive<Partial<MTableBaseMap>[]>([])

const res = await getUsersByPage<IUser>(page.value, limit.value)

if (res.success) {
  total.value = res.data.total
  const { userTableMap, filterTableData } = useFilterUserTable(res.data.list)
  tableData.push(...filterTableData)
  columnLabelMap.push(...userTableMap)
}
</script>
<style scoped lang="scss"></style>
