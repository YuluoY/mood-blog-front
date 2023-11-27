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

<script setup lang="ts" name="Layout"></script>
