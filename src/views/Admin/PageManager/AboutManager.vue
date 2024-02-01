<template>
  <div class="y-aboutManager">
    <el-card shadow="hover">
      <el-form v-model="formData">
        <el-form-item prop="title" label="标题">
          <el-input
            width="100px"
            placeholder="请输入标题"
            autofocus
            :style="{ width: '500px' }"
          ></el-input>
        </el-form-item>
        <el-form-item prop="isComment" label="评论">
          <el-switch v-model="formData.isComment"></el-switch>
        </el-form-item>
        <el-form-item prop="content" label="正文">
          <MdEditor v-model="formData.content"></MdEditor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const formData = reactive({
  title: '',
  content: '',
  isComment: false,
})

</script>
<style scoped lang="scss"></style>
