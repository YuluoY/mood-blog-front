<template>
  <div class="m-upload__image">
    <img class="el-upload-list__item-thumbnail" :src="url" alt="" />
    <span class="el-upload-list__item-actions">
      <span class="el-upload-list__item-preview" @click="$emit('handlePictureCardPreview')">
        <el-icon><svg-icon name="zoom-in" /></el-icon>
      </span>
      <span class="el-upload-list__item-delete" @click="$emit('handleDownload')">
        <el-icon><svg-icon name="download" /></el-icon>
      </span>
      <span class="el-upload-list__item-delete" @click="$emit('handleRemove')">
        <el-icon><svg-icon name="delete" /></el-icon>
      </span>
    </span>
  </div>
</template>
<script setup lang="ts">
defineEmits(['handlePictureCardPreview', 'handleDownload', 'handleRemove'])

withDefaults(
  defineProps<Partial<{
    url: string
  }>>(),
  {}
)
</script>
<style scoped lang="scss"></style>
