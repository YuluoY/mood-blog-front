<template>
  <div class="m-comment__area">
    <el-input
      type="textarea"
      v-model.trim="value"
      @input="handleChange"
      :rows="rows"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :show-word-limit="showWordLimit"
    ></el-input>
  </div>
</template>
<script setup lang="ts">
export interface MCommentAreaProps {
  modelValue: string
  rows: number
  placeholder: string
  maxLength: string | number
  showWordLimit: boolean
}

defineEmits(['modelValue:update'])
const { emit } = getCurrentInstance()
const props = withDefaults(defineProps<Partial<MCommentAreaProps>>(), {
  modelValue: '',
  rows: 8,
  placeholder: '请开始你的表演~',
  maxLength: 1000,
  showWordLimit: true,
})

const value = ref(props.modelValue)

watchEffect(() => {
  value.value = props.modelValue
})

const handleChange = () => {
  emit('modelValue:update', value.value)
}

defineExpose({
  content: value.value,
})
</script>
<style scoped lang="scss"></style>
