<template>
    <div class="y-form">
        <el-form :model="formData" :inline-message="inlineMessage">
            <slot name="prefix"></slot>
            <el-form-item
                v-for="(item, index) in formConfigures" :key="`${index}-${item.prop}`"
                :prop="item.prop"
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
                        v-model="formData[item.prop]" class="y-mr-20"></el-input>
                    <svg-captcha></svg-captcha>
                </div>
                <el-input 
                    v-else 
                    v-model="formData[item.prop]" 
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
                    :on-blur="item.onBlur"
                    :on-change="item.onChange"
                    :on-focus="item.onFocus"
                    :on-clear="item.onClear"
                    :on-input="item.onInput"
                    >
                </el-input>
            </el-form-item>
            <slot name="suffix"></slot>
        </el-form>
    </div>
</template>

<script setup lang="ts" name="YFrom">
import { IYFormProps } from '../types/index.ts';

withDefaults(defineProps<IYFormProps<any>>(), {})

</script>
