<template>
  <el-container class="layout">
    <Head></Head>
    <el-container>
      <Main>
        <slot></slot>
      </Main>
      <Foot></Foot>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Head from './Head/index.vue'
import Foot from './Foot/index.vue'
import Main from './Main/index.vue'
</script>
