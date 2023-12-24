<template>
  <div class="y-about__content--row">
    <div class="y-row__title">
      <h1>{{ title }}</h1>
    </div>
    <div class="y-row__content" v-if="$slots.default">
      <slot></slot>
    </div>
    <div class="y-row__content" v-else>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script setup lang="ts" name="AboutContentRow">
import 'md-editor-v3/lib/preview.css';

withDefaults(defineProps<{
  title?: string
  content?: string
}>(), {
  title: '标题',
  content: ''
})

</script>

<style scoped lang="scss">
@include be(row, title) {
  width: 100%;
  height: auto;
  border-bottom: solid 1px #ccc;
  padding-left: 20px;
  position: relative;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top:0;
    width: 5px;
    height: 100%;
    background-color: #409eff;
  }
}

@include be(row, content) {
  width: 100%;
  height: auto;
  padding: 20px;
}
</style>