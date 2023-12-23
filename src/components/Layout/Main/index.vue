<template>
  <div class="y-main">
    <slot></slot>
  </div>
</template>
<script setup lang="ts" name="Main"></script>

<style lang="scss" scoped>
@include b(main){
  width: 100%;
}
</style>
