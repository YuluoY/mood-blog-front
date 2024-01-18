<template>
  <div class="m-table">
    <el-table :data="filterTableData" :border="border" :stripe="stripe" style="width: 100%">
      <el-table-column
        v-for="(c, index) in columnLabel"
        :key="index"
        :label="c.label"
        :prop="c.prop"
      ></el-table-column>
      <el-table-column align="right" v-if="isSearch">
        <template #header>
          <el-input v-model="search" size="small" placeholder="请输入关键字" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <m-pagination v-if="isPagination"></m-pagination>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { MTableProps } from '../types/index.ts'

const props = withDefaults(defineProps<Partial<MTableProps>>(), {
  isPagination: true,
  border: false,
  stripe: false,
  isSearch: true,
  columnLabel: () => [
    {
      label: '日期',
      prop: 'date',
    },
    {
      label: '名称',
      prop: 'name',
    },
  ],
  tableData: () =>
    Array(10)
      .fill(0)
      .map((_item, index) => {
        return {
          date: '2016-05-03',
          name: `Tom-${index}`,
          address: 'No. 189, Grove St, Los Angeles',
        }
      }),
  filterTableCol: 'name',
})
const search = ref('')
const { emit } = getCurrentInstance()
const filterTableData = computed(() =>
  props.tableData.filter(
    (data) =>
      !search.value ||
      // @ts-ignore
      data[props.filterTableCol]?.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = <T = any,>(index: number, row: T): void => {
  console.log(index, row)
  emit('handleEdit', index, row)
}
const handleDelete = <T = any,>(index: number, row: T): void => {
  console.log(index, row)
  ElMessageBox({
    type: 'warning',
    title: '警告',
    message: '确认删除该条数据吗？',
  }).then((_) => {
    emit('handleDelete', index, row)
  })
}
</script>
<style scoped lang="scss"></style>
