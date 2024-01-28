<template>
  <div class="y-write">
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
      @on-save="onSave"
      :toolbars="toolbars"
    >
      <template #defToolbars>
        <Emoji>
          <template #trigger>
            <svg-icon name="emoji" size="1.2"></svg-icon>
          </template>
        </Emoji>
      </template>
    </MdEditor>
    <el-dialog v-model="isVisiableDialog">
      <template #header>
        <h3>{{ $t('writeView.save') }}</h3>
      </template>
      <template #default>
        <MForm ref="mFormRef" :form-data="form" :form-configures="publishFormConfigure">
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
          </template>
        </MForm>
      </template>
      <template #footer>
        <el-button type="primary" @click="onSubmitForm">{{ $t('writeView.submit') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="Write">
import MForm from '@/components/global/MForm/index.ts'
import { ExposeParam, MdEditor } from 'md-editor-v3'
import { useUserStore } from '@/store/userStore.ts'
import { Emoji } from '@vavt/v3-extension'
import { useWritePage } from '../hooks/index.ts'
import '@vavt/v3-extension/lib/asset/Emoji.css'

const editorRef = ref<ExposeParam | null>()
const uploadRef = ref<InstanceType<typeof import('element-plus')['ElUpload']>>()
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
  form,
  editorOptions,
  onSave,
  isVisiableDialog,
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
  handleChange
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
}

@include be(write, editor) {
  width: 100%;
  min-height: inherit;
}

:deep(.emojis li) {
  box-sizing: content-box;
}
</style>
