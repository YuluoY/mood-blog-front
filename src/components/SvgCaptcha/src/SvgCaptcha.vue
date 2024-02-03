<template>
  <div class="svg-captcha y-cursor-p" @click="() => refresh()" v-if="svgHTML">
    <div
      class="svg-captcha__inner y-flex y-f-justify-center y-f-align-center"
      v-html="svgHTML"
    ></div>
  </div>
</template>
<script setup lang="ts" name="SvgCaptcha">
import { useCaptcha } from '../hooks/index.ts'

const { svgHTML, refresh } = useCaptcha()

defineExpose({
  svgHTML,
  refresh,
})
</script>
