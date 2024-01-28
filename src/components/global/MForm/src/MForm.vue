<template>
  <div class="y-form">
    <el-form ref="ruleFormRef" :model="data" :inline-message="inlineMessage">
      <slot name="prefix"></slot>
      <el-form-item
        v-for="(item, index) in configures"
        :key="`${index}-${String(item.prop)}`"
        :prop="String(item.prop)"
        :label="item.label"
        :label-width="item.labelWidth || '100px'"
        :rules="item.rules"
      >
        <div v-if="item.prop === 'code'" class="y-flex y-align-center">
          <el-input
            :placeholder="item.placeholder"
            :on-blur="item.onBlur"
            :on-change="item.onChange"
            :on-focus="item.onFocus"
            :on-clear="item.onClear"
            :on-input="item.onInput"
            :style="item.style"
            v-model="data[item.prop]"
            class="y-mr-20"
          ></el-input>
          <svg-captcha></svg-captcha>
        </div>
        <el-color-picker
          v-else-if="item.type === 'color'"
          v-model="data[item.prop]"
        ></el-color-picker>
        <el-switch v-else-if="item.type === 'switch'" v-model="data[item.prop]"></el-switch>
        <m-upload
          v-else-if="item.type === 'upload'"
          :imageUrl="data[item.prop]"
          @onChangeImageUrl="(val: string) => (data[item.prop] = val)"
        ></m-upload>
        <el-select
          v-else-if="item.type === 'select'"
          v-model="data[item.prop]"
          :multiple="item.multiple"
          :filterable="item.filterable"
          :allow-create="item.allowCreate"
          :default-first-option="item.defaultFirstOption"
          :style="item.style"
        >
          <el-option
            v-for="o in item.options"
            :key="o.value"
            :label="o.label"
            :value="o.value"
          ></el-option>
          <template #tag>
            <el-tag v-for="color in data[item.prop]" :key="color.value" :color="color" />
          </template>
        </el-select>
        <el-input
          v-else
          v-model="data[item.prop]"
          :style="item.style"
          :type="item.type || 'text'"
          :autocomplete="item.autocomplete"
          :placeholder="item.placeholder"
          :prefix-icon="item.prefixIcon"
          :suffix-icon="item.suffixIcon"
          :disabled="item.disabled"
          :resize="item.resize"
          :clearable="item.clearable"
          :rows="item.rows"
          :show-word-limit="item.showWordLimit"
          :max-length="item.maxLength"
          :min-length="item.minLength"
          :formatter="item.formatter"
          :parser="item.parser"
          :readonly="item.readonly"
          :tabindex="item.tabindex"
          :validate-event="item.validateEvent"
          :input-style="item.inputStyle"
          :show-password="item.showPassword"
          :autosize="item.autoSize"
          :on-blur="item.onBlur"
          :on-change="item.onChange"
          :on-focus="item.onFocus"
          :on-clear="item.onClear"
          :on-input="item.onInput"
        ></el-input>
      </el-form-item>
      <slot name="suffix"></slot>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="MFrom">
import type { FormInstance } from 'element-plus'
import { MFormItemConfig, MFormProps } from '../types/index.ts'

const props = withDefaults(defineProps<MFormProps<any>>(), {})

const data = reactive(props.formData)
const configures = reactive<MFormItemConfig[]>(props.formConfigures)

const ruleFormRef = ref<FormInstance>()

const validator = async (): Promise<boolean> => {
  if (!ruleFormRef.value) return
  const res = (await ruleFormRef.value.validate((valid) => valid)) as boolean
  // eslint-disable-next-line consistent-return
  return res
}

const formDataWatcher = watch(
  props.formData,
  (newVal) => {
    Object.assign(data, newVal)
  },
  { deep: true }
)

onBeforeUnmount(() => {
  formDataWatcher()
})

defineExpose({
  validator,
  data,
})
</script>
<style scoped>
:deep(.el-tag__content) {
  display: inline-flex;
}
</style>
