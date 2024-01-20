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
        <MTable></MTable>
      </template>
    </AdminTemplate>
  </div>
</template>
<script setup lang="ts">
import MForm from '@/components/global/MForm/index.ts'
import { MFormItemConfig } from '@/components/global/MForm/types/index.ts'
import { ICreateCategory } from '@/types/api/category.ts'

const addFormConfigures: MFormItemConfig[] = [
  {
    prop: 'name',
    label: '分类名称',
    rules: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }],
  },
]
const addFormData = reactive<ICreateCategory>({
  name: '',
})

const mFormRef = ref<InstanceType<typeof MForm>>()
const onAddDialogClick = (cb: Function) => {
  mFormRef.value.validator().then((res) => {
    if (res) {
      console.log('发送添加请求', addFormData)
      cb();
    }
  })
}
</script>
<style scoped lang="scss"></style>
