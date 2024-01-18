<template>
  <div class="y-head y-pl-40 y-pr-40">
    <div class="y-head__inner y-flex y-f-row y-f-justify-between y-f-align-center">
      <div class="y-head__left y-flex y-f-align-center">
        <div class="y-head__avatar y-mr-10">
          <img v-lazy="getImageUrl(userStore.avatar)" alt="logo" />
        </div>
        <div class="y-head__usename" v-if="userStore.username">
          <span>{{ firstToUpperCase(userStore.username) }}'s Blog</span>
        </div>
      </div>
      <div class="y-head__right y-flex y-f-align-center">
        <div class="y-head__right--search">
          <slot name="Search"></slot>
        </div>
        <div class="y-head__right--nav">
          <slot name="Nav" :routes="router.getRoutes()" :currentRoute="router.currentRoute"></slot>
        </div>
        <div class="y-head__right--login y-pl-20">
          <slot name="Login"></slot>
          <el-button
            v-auth="`123`"
            v-show="!userStore.id"
            type="primary"
            plain
            @click="handleLogin"
          >
            <span>登录</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Head">
import { useUserStore } from '@/store/userStore.ts'
import { getImageUrl, firstToUpperCase } from '@/utils/core.ts'

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
  position: sticky;
  top: 0;
  z-index: 9;
  box-shadow: var(--el-box-shadow-light);
  background-color: var(--el-bg-color);

  @include e(inner) {
    padding: 5px 10px;
  }

  @include e(avatar) {
    width: 3.5em;
    height: 3.5em;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
