<template>
  <div class="y-head y-pl-20 y-pr-20">
    <div class="y-head__inner y-flex y-f-row y-f-justify-between y-f-align-center">
      <div class="y-head__left">
        <img v-lazy="getImageUrl(userStore.avatar)" alt="logo" />
        <span>{{ userStore.username }}</span>
      </div>
      <div class="y-head__center">
        <slot name="Nav" :routes="router.getRoutes()" :currentRoute="router.currentRoute"></slot>
      </div>
      <div class="y-head__right">
        <el-button v-auth="`123`" v-show="!userStore.id" type="primary" @click="handleLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Head">
import { useUserStore } from '@/store/userStore.ts'
import { getImageUrl } from '@/utils/core.ts'

const userStore = useUserStore()

const router = useRouter()
const props = withDefaults(
  defineProps<{
    loginRef: Ref | null
  }>(),
  {
    loginRef: null,
  }
)

const com = reactive({
  loginRef: props.loginRef,
})

const handleLogin = () => {
  com.loginRef?.showLogin()
}

const watchEffectInstance = watchEffect(() => {
  com.loginRef = props.loginRef
})

onUnmounted(() => {
  watchEffectInstance()
})
</script>

<style scoped lang="scss">
@include b(head) {
  box-shadow: var(--el-box-shadow-light);
  background-color: var(--el-bg-color);

  @include e(seat) {
    width: 100%;
    height: 100%;
  }

  @include e(inner) {
    padding: 10px 0;
  }

  @include e(left) {
    width: 3.5em;
    height: 3.5em;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
