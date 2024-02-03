<template>
  <div class="m-timeline__day" ref="mTimelineDayRef" :data-day="`${year}-${month}-${day}`">
    <i class="m-timeline-day__point">
      {{ day }}
    </i>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    day: string | number
    month: string | number
    year: string | number
    order: 'ASC' | 'DESC'
    index: number
  }>(),
  {
    order: 'DESC',
  }
)
const mTimelineDayRef = ref<HTMLDivElement | null>()
const direction = computed(() => (props.order === 'DESC' ? 'column-reverse' : 'column'))
</script>
<style scoped lang="scss">
.m-timeline__day {
  display: flex;
  flex-direction: v-bind(direction);
  position: relative;

  .m-timeline-day__point {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: absolute;
    left: 20px;
    top: 0;
    transform: translateX(-50%);
    z-index: 2;
    background-color: #000;
    color: white;
  }
}
</style>
