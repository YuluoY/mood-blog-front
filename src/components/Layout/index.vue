<template>
  <el-container class="layout" direction="vertical">
    <Head></Head>
    <el-container direction="vertical">
      <Main>
        <slot></slot>
      </Main>
      <Foot></Foot>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="Layout"></script>
