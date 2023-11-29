<template>
  <el-container class="y-layout" direction="vertical">
    <KeepAlive>
      <Head></Head>
    </KeepAlive>
    <el-container direction="vertical">
      <Hero></Hero>
      <Main>
        <slot></slot>
      </Main>
      <KeepAlive>
        <Foot></Foot>
      </KeepAlive>
    </el-container>
    <KeepAlive>
      <el-backtop :right="50" :bottom="50" />
    </KeepAlive>
  </el-container>
</template>

<script setup lang="ts" name="Layout">
import { getImageUrl } from '@/utils/core.ts';

const cover = `url(${getImageUrl('cover.jpg')})`;
</script>

<style scoped lang="scss">
.y-layout {
  height: 100vh;

  .y-hero {
    width: 100%;
    height: calc(100vh - 150px);
    background-image: v-bind(cover);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .y-main {
    padding: 20px;
  }

  .y-foot {
    padding: 20px;
    text-align: center;
    background-color: var(--el-color-info-light-7);
    margin-top: auto;
  }
}
</style>
