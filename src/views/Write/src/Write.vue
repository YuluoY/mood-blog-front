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
    />
    <el-dialog v-model="isVisiableDialog">
      <template #header>
        <h3>{{ $t('writeView.save') }}</h3>
      </template>
      <template #default>
        <YForm :form-data="form" :form-configures="publishFormConfigure">
          <template #suffix>
            <el-form-item label="封面" prop="cover" label-width="100">
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
        </YForm>
      </template>
      <template #footer>
        <el-button type="primary" @click="onSubmitForm">{{ $t('writeView.submit') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="Write">
import { ExposeParam, MdEditor } from 'md-editor-v3'
import { useUserStore } from '@/store/userStore.ts'
import { useEditor } from '../hooks/index.ts'

const editorRef = ref<ExposeParam | null>()
const uploadRef = ref<{ submit: Function; abort: Function; handleRemove: Function } | null>()
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

  // upload
  dialogImageUrl,
  dialogVisible,
  disabled,
  handleRemove,
  handlePictureCardPreview,
  handleExceed,
  handleSuccess,
  handleError
} = useEditor({
  editorRef,
  uploadRef,
  useUserStore,
})
</script>

<style lang="scss" scoped>
@include b(write) {
  width: 100%;
  height: 100%;
}

@include be(write, editor) {
  width: 100%;
  height: 100%;
}
</style>
