<template>
  <div class="y-login">
    <el-dialog class="y-login__dialog" v-model="loginVisiable" width="30%">
      <template #header>
        <div class="y-text-center">
          <span>{{ $t('head.login.welcome', { username: '雨落' }) }}</span>
        </div>
      </template>
      <el-form :rules="rules">
        <el-form-item :label="$t('head.login.email')" prop="email" label-width="80">
          <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('head.login.password')" prop="password" label-width="80">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('head.login.captcha')" prop="captcha" label-width="80">
          <div class="y-flex y-align-center">
            <el-input v-model="loginForm.captcha" class="y-mr-20"></el-input>
            <svg-captcha></svg-captcha>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="submitFrom">{{ $t('head.login.submit') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="Login">
import { useLogin } from '../hooks/index.ts'

const { loginVisiable, showLogin, loginForm, submitFrom, rules } = useLogin()

defineExpose({
  loginVisiable,
  showLogin,
})
</script>
<style scoped lang="scss"></style>
