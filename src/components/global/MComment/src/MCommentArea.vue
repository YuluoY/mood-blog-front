<template>
  <div class="m-comment__area">
    <el-input type="textarea" v-model="value" @change="handleChange" :rows="rows"></el-input>
  </div>
</template>
<script setup lang="ts">
export interface MCommentAreaProps {
  modelValue?: string
  rows: number
}

defineEmits(['modelValue:update'])
const { emit } = getCurrentInstance()
const props = withDefaults(defineProps<Partial<MCommentAreaProps>>(), {
  modelValue: '',
  rows: 5,
})

const value = ref(props.modelValue)

const handleChange = () => {
  emit('modelValue:update', value)
}
</script>
<style scoped lang="scss"></style>
