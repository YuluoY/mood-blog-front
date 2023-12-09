<template>
  <div class="y-homeList">
    <div class="y-homeList__waterfall" ref="waterfall">
      <el-card
        class="y-homeList__item"
        v-for="item in waterfallData"
        :ref="`waterfallItem${item.id}`"
        :key="item.id"
        :style="{
          width: item.width + 'px',
          height: item.height + 'px',
          background: item.background,
        }"
      ></el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWaterfall } from '../hooks/waterfall.ts'
import { IWaterfallItem } from '../types/index.ts'

const props = withDefaults(
  defineProps<{
    waterfallData: IWaterfallItem[]
  }>(),
  {}
)

useWaterfall({
  containerClass: 'y-homeList__waterfall',
});
</script>
<style scoped lang="scss">
@include b(homeList) {
  width: 100%;
  height: 100%;
}

@include be(homeList, waterfall) {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

@include be(homeList, item) {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  box-shadow: var(--el-box-shadow-light);
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: var(--el-box-shadow);
  }
}
</style>
