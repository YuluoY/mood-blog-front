<template>
  <div class="y-write">
    <MForm
      ref="mFormRef"
      style="padding: 40px"
      :form-data="writeStore.form"
      :form-configures="publishFormConfigure"
    >
      <template #suffix>
        <el-form-item label="封面" prop="cover" label-width="70">
          <el-upload
            ref="uploadRef"
            :action="action"
            :data="extraData"
            :headers="headers"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            @exceed="handleExceed"
            @success="handleSuccess"
            @error="handleError"
            @change="handleChange"
          >
            <el-icon><svg-icon name="plus" /></el-icon>

            <template #file="{ file }">
              <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <el-icon><svg-icon name="zoom-in" /></el-icon>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><svg-icon name="delete" /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>

          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="内容" prop="content" label-width="70">
          <MdEditor
            ref="editorRef"
            class="y-write__editor"
            v-model="writeStore.content"
            :placeholder="$t('writeView.editorPlaceholder')"
            :theme="editorOptions.theme"
            :language="editorOptions.language"
            :show-code-row-number="editorOptions.showCodeRowNumber"
            :preview-theme="editorOptions.previewTheme"
            :code-theme="editorOptions.codeTheme"
            :toolbars="toolbars"
            @on-html-changed="onHtmlChanged"
            @on-upload-img="handleUploadImg"
          >
            <template #defToolbars>
              <Emoji>
                <template #trigger>
                  <svg-icon name="emoji" size="1.2"></svg-icon>
                </template>
              </Emoji>
            </template>
          </MdEditor>
        </el-form-item>
        <el-form-item label-width="70">
          <el-button type="primary" @click="onSubmitForm" class="y-mt-20">
            <svg-icon name="submit-form" class="y-mr-6" color="#fff"></svg-icon>
            <span>{{ $t('writeView.save') }}</span>
          </el-button>
        </el-form-item>
      </template>
    </MForm>
  </div>
</template>

<script lang="ts" setup name="Write">
import MForm from '@/components/global/MForm/index.ts'
import { ExposeParam, MdEditor } from 'md-editor-v3'
import { useUserStore } from '@/store/userStore.ts'
import { Emoji } from '@vavt/v3-extension'
import { useWritePage } from '../hooks/index.ts'
import '@vavt/v3-extension/lib/asset/Emoji.css'
import 'md-editor-v3/lib/style.css'

const editorRef = ref<ExposeParam | null>()
const uploadRef = ref<InstanceType<(typeof import('element-plus'))['ElUpload']>>()
const mFormRef = ref<InstanceType<typeof MForm>>()
// const action = `${import.meta.env.VITE_BASE_URL}/file`
const action = `${import.meta.env.VITE_BASE_URL}/file/localUpload`
const headers = computed(() => {
  return { 'x-csrf-token': useUserStore().csrf_token }
})
const extraData = computed(() => {
  return { user: useUserStore().id }
})

const {
  writeStore,
  editorOptions,
  onHtmlChanged,
  publishFormConfigure,
  onSubmitForm,

  toolbars,

  // upload
  dialogImageUrl,
  dialogVisible,
  disabled,
  handleRemove,
  handlePictureCardPreview,
  handleExceed,
  handleSuccess,
  handleError,
  handleChange,
  handleUploadImg
} = await useWritePage({
  editorRef,
  uploadRef,
  useUserStore,
  mFormRef,
})
</script>

<style lang="scss" scoped>
@include b(write) {
  width: 100%;
  min-height: calc(100vh - 60px);

  .y-write__row {
    margin: 20px;

    .el-input {
      display: inline;
    }

    h2 {
      min-width: 55px;
      display: inline;
      font-size: 1.5em;
      font-weight: 500;
      padding: 20px 0;
    }
  }
}

@include be(write, editor) {
  // width: 100%;
  // min-height: inherit;
}

:deep(.el-form-item__content) {
  padding-right: 20px;
}

:deep(.emojis li) {
  box-sizing: content-box;
}

:deep(.md-editor-preview-wrapper img.medium-zoom-image) {
  display: block;
  margin: 0 auto;
}
</style>
