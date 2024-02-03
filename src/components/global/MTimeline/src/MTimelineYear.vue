<template>
  <el-collapse
    :model-value="modelValue"
    :style="{
      borderBottom: 'unset',
    }"
  >
    <div class="m-timeline__year" :data-year="year">
      <el-collapse-item :title="year.toString()" :name="year">
        <template #title>
          <h2
            class="m-timeline__title"
            :style="{
              fontFamily: 'fantasy',
              fontSize: '2em',
            }"
          >
            {{ title }}
          </h2>
        </template>
        <slot></slot>
      </el-collapse-item>
    </div>
  </el-collapse>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    year: string | number
    modelValue: string[] | number[]
    order: 'ASC' | 'DESC'
    title: string
  }>(),
  {
    order: 'DESC',
  }
)
const direction = computed(() => (props.order === 'DESC' ? 'column-reverse' : 'column'))
</script>
<style scoped lang="scss">
:deep(.el-collapse-item) {
  .el-collapse-item__content {
    display: flex;
    flex-direction: v-bind(direction);
  }

  .el-collapse-item__header {
    margin-bottom: 20px;
  }
}

:deep(.el-collapse) {
  border-bottom: unset;
}
</style>
