<template>
  <el-card v-if="$slots.add || $slots.del || $slots.update" class="y-mb-20" shadow="hover">
    <template #header>
      <span>{{ operateAreaTitle }}</span>
    </template>
    <div class="y-operate__area y-flex">
      <div class="y-add__btn y-mr-20" v-if="$slots.add">
        <el-button type="primary" @click="onChangeAddDialogVisible">
          {{ addBtnText }}
        </el-button>
        <el-dialog v-model="dialogVisible.add" :title="addBtnText" width="30%">
          <slot name="add" :onChangeDialogVisible="onChangeAddDialogVisible"></slot>
          <template #footer>
            <el-button
              type="primary"
              @click="
                () => {
                  emit('onAddDialogClick', onChangeAddDialogVisible)
                }
              "
            >
              确认
            </el-button>
          </template>
        </el-dialog>
      </div>
      <div class="y-del__btn y-mr-20" v-if="$slots.del">
        <el-button type="danger" @click="onChangeDelDialogVisible">{{ delBtnText }}</el-button>
        <el-dialog v-model="dialogVisible.del" :title="delBtnText" width="30%">
          <slot name="del" :onChangeDialogVisible="onChangeDelDialogVisible"></slot>
          <template #footer>
            <el-button
              type="primary"
              @click="
                () => {
                  onChangeDelDialogVisible()
                  emit('onDelDialogClick')
                }
              "
            >
              确认
            </el-button>
          </template>
        </el-dialog>
      </div>
      <div class="y-modify__btn" v-if="$slots.modify">
        <el-button type="warning" @click="onChangeModifyDialogVisible">
          {{ modifyBtnText }}
        </el-button>
        <el-dialog v-model="dialogVisible.modify" :title="modifyBtnText" width="30%">
          <slot name="del" :onChangeDialogVisible="onChangeModifyDialogVisible"></slot>
          <template #footer>
            <el-button
              type="primary"
              @click="
                () => {
                  onChangeModifyDialogVisible()
                  emit('onModifyDialogClick')
                }
              "
            >
              确认
            </el-button>
          </template>
        </el-dialog>
      </div>
    </div>
  </el-card>
  <el-card v-if="$slots?.search" class="y-mb-20" shadow="hover">
    <template #header>
      <span>{{ searchAreaTitle }}</span>
    </template>
  </el-card>
  <el-card v-if="$slots?.table" class="y-mb-20" shadow="hover">
    <template #header>
      <span>{{ tableAreaTitle }}</span>
    </template>
    <slot name="table"></slot>
  </el-card>
</template>
<script setup lang="ts">
interface IAdminTemplateProps {
  num: number
  pageSize: number
  small: boolean
  background: boolean
  addBtnText: string
  delBtnText: string
  modifyBtnText: string
  operateAreaTitle: string
  searchAreaTitle: string
  tableAreaTitle: string
}
withDefaults(defineProps<Partial<IAdminTemplateProps>>(), {
  num: 1,
  pageSize: 100,
  small: true,
  background: true,
  addBtnText: '新增',
  delBtnText: '删除',
  modifyBtnText: '修改',
  operateAreaTitle: '操作区',
  searchAreaTitle: '查询区',
  tableAreaTitle: '数据区',
})
const { emit } = getCurrentInstance()

defineEmits([
  'onAddDialogClick',
  'onDelDialogClick',
  'onModifyDialogClick',
  'handleSizeChange',
  'handleCurrentChange',
])

const dialogVisible = reactive({
  add: false,
  del: false,
  modify: false,
})
const onChangeAddDialogVisible = () => {
  dialogVisible.add = !dialogVisible.add
}
const onChangeDelDialogVisible = () => {
  dialogVisible.del = !dialogVisible.del
}
const onChangeModifyDialogVisible = () => {
  dialogVisible.modify = !dialogVisible.modify
}

// const handleSizeChange = (val: number) => {
//   emit('handleSizeChange', val)
// }

// const handleCurrentChange = (val: number) => {
//   emit('handleCurrentChange', val)
// }
</script>
<style scoped lang="scss"></style>
