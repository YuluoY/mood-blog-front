<template>
  <div class="y-login">
    <el-dialog class="y-login__dialog" v-model="loginVisiable" width="30%">
      <template #header>
        <div class="y-text-center">
          <span>{{ $t('head.login.welcome', { username: username }) }}</span>
        </div>
      </template>
      <YForm :formConfigures="formConfigures" :formData="loginForm"></YForm>
      <template #footer>
        <el-button type="primary" @click="submitFrom">{{ $t('head.login.submit') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="Login">
import { userStore } from '@/store/userStore.ts';
import { useLogin } from '../hooks/index.ts'

const {
  username
} = userStore();
const { loginVisiable, showLogin, loginForm, submitFrom, formConfigures } = useLogin();

defineExpose({
  loginVisiable,
  showLogin,
})
</script>
<style scoped lang="scss"></style>
