<template>
  <div class="m-timeline__month" :data-month="`${year}-${month}`">
    <i class="m-timeline-month__point">{{ getChineseMonth(month) }}</i>
    <i class="m-timeline-month__line"></i>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { getChineseMonth } from '@/utils/dayjs.ts'

const props = withDefaults(
  defineProps<{
    year: string | number
    month: string | number
    order: 'ASC' | 'DESC'
  }>(),
  {
    order: 'DESC',
  }
)
const direction = computed(() => (props.order === 'DESC' ? 'column-reverse' : 'column'))
</script>
<style scoped lang="scss">
.m-timeline__month {
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: v-bind(direction);
  padding-top: 80px;

  .m-timeline-month__line {
    position: absolute;
    z-index: 1;
    left: 40px;
    top: 0;
    height: 100%;
    width: 1px;
    background-color: var(--el-border-color);
  }

  .m-timeline-month__point {
    position: absolute;
    z-index: 2;
    left: 40px;
    top: 0;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #000;
    color: white;
  }
}
</style>
