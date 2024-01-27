<template>
  <div class="m-upload">
    <el-upload
      v-model:file-list="fileList"
      :action="action"
      :auto-upload="autoUpload"
      :list-type="listType"
      :limit="limit"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      ref="elUploadRef"
    >
      <el-icon><svg-icon name="plus" /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible" width="400">
      <template #header v-if="imageName">{{ imageName }}</template>
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="MUpload">
import type { UploadProps, UploadUserFile, ElUpload } from 'element-plus'

interface MUploadProps {
  imageUrl: string
  imageName: string
  limit: number
  autoUpload: boolean
  action: string
  listType: 'text' | 'picture' | 'picture-card'
  previewImages: UploadUserFile[]
}

defineEmits(['onChangeImageUrl'])

const props = withDefaults(defineProps<Partial<MUploadProps>>(), {
  limit: 1,
  autoUpload: false,
  action: `${import.meta.env.VITE_BASE_URL}/file/localUpload`,
  listType: 'picture-card',
  previewImages: () => [],
})

const elUploadRef = ref<InstanceType<typeof ElUpload>>()
const dialogImageUrl = ref(props.imageUrl)
const dialogVisible = ref(false)

const fileList = ref<UploadUserFile[]>([
  {
    name: props.imageName,
    url: dialogImageUrl.value,
  },
  ...props.previewImages,
])

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const imageUrlWatcher = watch(
  () => props.imageUrl,
  (newVal) => {
    fileList.value = [
      {
        name: props.imageName,
        url: newVal,
      },
      ...props.previewImages,
    ]
  },
  { deep: true }
)

onBeforeUnmount(() => {
  imageUrlWatcher()
})

defineExpose({
  fileList,
  dialogImageUrl,
  dialogVisible,
  elUploadRef,
})
</script>
<style scoped lang="scss"></style>
