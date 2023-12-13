<template>
  <div class="y-write">
    <MdEditor
      ref="editorRef"
      class="y-write__editor"
      v-model="form.content"
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
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :limit="1"
                @change="handleChange"
                @exceed="handleExceed"
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
                        @click="handleDownload(file)"
                      >
                        <el-icon><svg-icon name="download" /></el-icon>
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
        <el-button type="primary">{{ $t('writeView.submit') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="Write">
import { ExposeParam, MdEditor } from 'md-editor-v3'
import { useEditor } from '../hooks/index.ts'

const editorRef = ref<ExposeParam | null>();

const {
  form,
  editorOptions,
  onSave,
  isVisiableDialog,
  publishFormConfigure,

  // upload
  dialogImageUrl,
  dialogVisible,
  disabled,
  handleRemove,
  handlePictureCardPreview,
  handleDownload,
  handleExceed,
  handleChange
} = useEditor({
  editorRef,
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
