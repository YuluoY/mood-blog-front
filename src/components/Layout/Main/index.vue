<template>
  <div class="y-main y-p-20">
    <slot></slot>
  </div>
</template>
<script setup lang="ts" name="Main"></script>

<style lang="scss" scoped>
@include b(main){
  width: 100%;
  height: 100%;
}
</style>
