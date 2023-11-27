<template>
  <div class="svg-captcha y-flex y-f-jcc y-f-acc y-cursor-pointer" @click="() => onChangeCaptcha()">
    <div class="svg-captcha__inner" v-html="svg"></div>
  </div>
</template>
<script setup lang="ts" name="SvgCaptcha">
import { getCode } from '@/api/rest.ts'
import { debounce } from '@/utils/core.ts'

const res = await getCode()
const svg = ref('')

const onChangeCaptcha = debounce(async () => {
  const { code, data } = await getCode()
  svg.value = code === 200 ? data : ''
}, 500)

onMounted(() => {
  svg.value = res.code === 200 ? res.data : ''
})
</script>
