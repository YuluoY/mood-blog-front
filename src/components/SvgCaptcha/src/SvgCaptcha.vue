<template>
  <div class="svg-captcha y-flex y-f-jcc y-f-acc y-cursor-pointer" @click="() => reflush()">
    <div class="svg-captcha__inner" v-html="svgHTML"></div>
  </div>
</template>
<script setup lang="ts" name="SvgCaptcha">
import { useCaptcha } from '../hooks/index.ts';

const {
  svgHTML,
  init,
  reflush
} = useCaptcha();

init();
</script>
