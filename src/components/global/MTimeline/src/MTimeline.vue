<template>
  <div class="m-timeline">
    <el-card class="m-timeline__title y-text-center y-mb-20" shadow="hover">
      <slot name="title" v-if="$slots.title"></slot>
      <h2 v-else>共{{ total }}篇文章</h2>
    </el-card>
    <el-card class="m-timeline__body y-pt-20 y-pb-20" shadow="hover">
      <slot></slot>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { MTimelineProps } from '../types/index.ts'

const props = withDefaults(defineProps<Partial<MTimelineProps>>(), {
  order: 'DESC',
})
const direction = computed(() => (props.order === 'DESC' ? 'column-reverse' : 'column'))
</script>
<style scoped lang="scss">
.m-timeline {
  .m-timeline__title {
    h2 {
      font-size: 2em;
      font-weight: bold;
    }
  }
}

:deep(.el-card__body) {
  padding: 6px 20px;
  display: flex;
  flex-direction: v-bind(direction);
}
</style>
