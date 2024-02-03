<template>
  <div class="y-login">
    <el-dialog class="y-login__dialog" v-model="loginVisiable" width="20%">
      <template #header>
        <div class="y-text-center">
          <h2>{{ $t('head.login.welcome') }}</h2>
        </div>
      </template>
      <div class="y-login_form">
        <div
          class="y-login_input y-flex y-f-row y-w-100 y-f-align-center"
          v-for="key in Object.keys(loginForm)"
          :key="key"
        >
          <el-input
            class="y-pt-10 y-pb-10"
            type="primary"
            v-model="loginForm[key]"
            :placeholder="$t(`head.login.${key}`)"
            :showPassword="key === 'password'"
          ></el-input>
          <svg-captcha class="y-ml-10" v-if="key === 'code'"></svg-captcha>
        </div>
      </div>

      <template #footer>
        <el-button type="primary" @click="() => submitFrom()">
          {{ $t('head.login.submit') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="Login">
import SvgCaptcha from '@/components/SvgCaptcha/index.ts'
import { useLogin } from '../hooks/index.ts'

const { loginVisiable, showLogin, loginForm, submitFrom } = useLogin()

defineExpose({
  loginVisiable,
  showLogin,
})
</script>
<style scoped lang="scss"></style>
