<template>
  <div class="y-foot">
    <div>
      <div class="view-count y-pt-10">
        <span>访问量：{{ 0 }}</span>
      </div>
      <div class="running-time y-pt-10">
        <span>小破站已运行：{{ runningTime }}</span>
      </div>
      <div class="record-number y-pt-10">
        <a href="https://beian.miit.gov.cn/" target="_blank">备案号：粤ICP备2021111111号</a>
      </div>
      <div class="copyright y-pt-10">
        <span>Copyright &copy; 2023 Yuluo</span>
        |
        <span>Powered by <a href="https://cn.vuejs.org/" target="_blank">Vue</a> & <a href="https://vitejs.dev/" target="_blank">Vite</a></span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Foot">

import {dateDiffNow} from "@/utils/dayjs.ts";

const runningTime = ref(dateDiffNow('2023-12-23 00:00:00'));
const runningTimer = ref(null);

onMounted(() => {
  clearInterval(runningTimer.value);
  runningTimer.value = setInterval(() => {
    runningTime.value = dateDiffNow('2023-12-23 00:00:00');
  }, 1000);
});

onUnmounted(() => {
  clearInterval(runningTimer.value);
});

</script>

<style lang="scss" scoped>
.y-foot {
  padding: 20px;
  text-align: center;
  background-color: var(--el-color-info-light-9);
  margin-top: auto;
}
</style>
