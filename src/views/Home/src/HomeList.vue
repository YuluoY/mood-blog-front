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
interface IWaterfallItem {
  id: number
  width: number
  height: number
  background: string
}

withDefaults(
  defineProps<{
    waterfallData: IWaterfallItem[]
  }>(),
  {}
)

const waterfall = ref<HTMLElement | null>(null)

const instance = getCurrentInstance();

onMounted(() => {
  // 获取waterfall的



  const waterfallItems = instance.refs as Record<string, HTMLElement>;

})

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
