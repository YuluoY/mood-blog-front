<template>
  <div class="m-table">
    <el-table :data="tableDataCopy" :border="border" :stripe="stripe" style="width: 100%">
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
          <el-switch
            v-else-if="c.type === 'delSwitch'"
            v-model="row['switchStatus']"
            @change="async () => c.onDelSwitchChange && await c.onDelSwitchChange(row)"
          ></el-switch>
          <el-switch
            v-else-if="c.type === 'switch'"
            v-model="row[c.prop]"
            @change="async () => c.onSwitchChange && await c.onSwitchChange(row)"
          ></el-switch>
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
    <el-dialog v-model="editDialogVisible" v-if="$slots.edit">
      <template #header>
        <span>编辑</span>
      </template>
      <slot name="edit"></slot>
      <template #footer>
        <el-button type="primary" @click="handleEditConfirm">确认</el-button>
      </template>
    </el-dialog>
    <slot v-if="$slots.pagination" name="pagination"></slot>
  </div>
</template>
<script setup lang="ts">
import { MTableBaseMap, MTableProps } from '../types/index.ts'

defineEmits(['handleEdit', 'handleEditConfirm', 'handleDelete'])

const props = withDefaults(defineProps<Partial<MTableProps>>(), {
  isPagination: true,
  border: false,
  stripe: false,
  columnLabelMap: () => [] as Partial<MTableBaseMap>[],
  tableData: () => [],
})
const { emit } = getCurrentInstance()

const tableDataCopy = reactive<any[]>(JSON.parse(JSON.stringify(props.tableData)))

const editDialogVisible = ref(false)

const handleEdit = <T = any,>(index: number, row: T): void => {
  editDialogVisible.value = !editDialogVisible.value
  emit('handleEdit', index, row)
}
const handleEditConfirm = () => {
  emit('handleEditConfirm', editDialogVisible)
}
const handleDelete = <T = any,>(index: number, row: T): void => {
  emit('handleDelete', index, row, () => tableDataCopy.splice(index, 1))
}

defineExpose({
  editDialogVisible,
})
</script>
<style scoped lang="scss">
:deep(.el-table) {
  .cell {
    text-align: center;
  }
}
</style>
