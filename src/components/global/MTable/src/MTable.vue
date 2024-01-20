<template>
  <div class="m-table">
    <el-table :data="tableData" :border="border" :stripe="stripe" style="width: 100%">
      <el-table-column
        v-for="(c, index) in columnLabelMap"
        :key="index"
        :label="c.label"
        :prop="c.prop"
        :width="c.width"
      >
        <template #default="{ row }">
          <img
            v-if="c.type === 'image'"
            :style="{
              width: '40px',
              height: '40px',
            }"
            v-lazy="row[c.prop]"
          />
          <el-link
            v-else-if="c.type === 'link'"
            type="primary"
            :href="row[c.prop]"
            :target="c.extraLink ? '_blank' : '_self'"
          ></el-link>
          <el-tooltip v-else-if="c.tip" :content="c.tip">
            <span>{{ row[c.prop] }}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" v-if="tableData.length">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <slot v-if="$slots.pagination" name="pagination"></slot>
  </div>
</template>
<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { MTableBaseMap, MTableProps } from '../types/index.ts'

const props = withDefaults(defineProps<Partial<MTableProps>>(), {
  isPagination: true,
  border: false,
  stripe: false,
  columnLabelMap: () => [] as Partial<MTableBaseMap>[],
  tableData: () => [],
})
const { emit } = getCurrentInstance()

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
<style scoped lang="scss">
:deep(.el-table) {
  .cell {
    text-align: center;
  }
}
</style>
