
import { props } from '@/plugins/MProgress/types';
<template>
  <div class="m-upload">
    <el-upload action="#" list-type="picture-card" :auto-upload="false">
      <el-icon><svg-icon name="plus"/></el-icon>

      <template #file="{ file }">
        <m-upload-image :url="file.url" @handle-remove="handleRemove" @handle-download="handleDownload"></m-upload-image>
        <!-- <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
              <el-icon><svg-icon name="zoom-in" /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <el-icon><svg-icon name="download"/></el-icon>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <el-icon><svg-icon name="delete"/></el-icon>
            </span>
          </span>
        </div> -->
      </template>
    </el-upload>

    <el-dialog v-model="dialogVisible" width="400">
      <template #header v-if="imageName">{{ imageName }}</template>
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="MUpload">
import type { UploadFile } from 'element-plus'

interface MUploadProps {
  imageUrl: string
  imageName: string
}

const props = withDefaults(defineProps<Partial<MUploadProps>>(), {

})

const dialogImageUrl = ref(props.imageUrl)
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}
</script>
<style scoped lang="scss"></style>
