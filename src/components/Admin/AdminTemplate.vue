<template>
  <el-card v-if="$slots.add || $slots.del || $slots.update" class="y-mb-20">
    <div class="y-operate__area y-flex">
      <div class="y-add__btn y-mr-20" v-if="$slots.add">
        <el-button type="primary" @click="emit('onChangeAddVisible')">
          {{ addBtnText }}
        </el-button>
        <slot name="add"></slot>
      </div>
      <div class="y-del__btn y-mr-20" v-if="$slots.del">
        <el-button type="danger" @click="emit('onChangeDelVisible')">{{ delBtnText }}</el-button>
        <slot name="del"></slot>
      </div>
      <div class="y-modify__btn" v-if="$slots.modify">
        <el-button type="warning" @click="emit('onChangeModifyVisible')">
          {{ updateBtnText }}
        </el-button>
        <slot name="modify"></slot>
      </div>
    </div>
  </el-card>
  <el-card v-if="$slots?.search" class="y-mb-20"></el-card>
  <el-card v-if="$slots?.table" class="y-mb-20">
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
  updateBtnText: string
}
withDefaults(defineProps<Partial<IAdminTemplateProps>>(), {
  num: 1,
  pageSize: 100,
  small: true,
  background: true,
  addBtnText: '新增',
  delBtnText: '删除',
  updateBtnText: '修改',
})
defineEmits(['onChangeAddVisible', 'onChangeDelVisible', 'onChangeModifyVisible'])
const { emit } = getCurrentInstance()

const handleSizeChange = (val: number) => {
  // emit('handleSizeChange')
  console.log('size change', val)
}

const handleCurrentChange = (val: number) => {
  console.log('current change', val)
}
</script>
<style scoped lang="scss"></style>
