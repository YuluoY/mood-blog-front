<template>
  <div class="y-admin__head">
    <div class="y-admin__head--left y-flex">
      <div class="y-left__scale isActive" @click="onScaleAside">
        <svg-icon name="scale-open" v-if="isScaleAside" size="1.5"></svg-icon>
        <svg-icon name="scale-close" v-else size="1.5"></svg-icon>
      </div>
    </div>
    <div class="y-admin__head--right">
      <div class="y-right__avatar" ref="avatarRef" @click="onClickAvatar">
        <img v-lazy="userStore.avatar" />
      </div>
      <el-popover ref="popoverRef" :virtual-ref="avatarRef" trigger="click" virtual-triggering>
        <el-row>
          <el-link
            href="https://github.com/YuluoY/mood-blog-back"
            :underline="false"
            class="y-flex y-f-align-center"
          >
            <svg-icon name="github" class="y-mr-10" size="1.2" />
            <span>GitHub</span>
          </el-link>
        </el-row>
        <el-row>
          <div class="y-quit y-flex y-f-align-center y-mt-10" @click="onQuit">
            <svg-icon name="quit" class="y-mr-10" size="1.2" />
            <span>退出</span>
          </div>
        </el-row>
      </el-popover>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/store/userStore.ts'
import { injectStyle } from '@/utils/dom.ts'

const router = useRouter()
const userStore = computed(() => useUserStore())
const isScaleAside = ref<boolean>(true)

const avatarRef = ref<HTMLDivElement | null>()
const popoverRef = ref<any>()

// 点击头像出现弹窗信息
const onClickAvatar = () => {
  unref(popoverRef)?.popperRef?.delayHide?.()
}

// 退出
const onQuit = () => {
  router.push('/')
}

// 缩放侧边栏
const onScaleAside = (event: Event) => {
  const target = event.target as HTMLDivElement
  const aside = document.querySelector('.y-admin__aside') as HTMLElement
  const asideTop = document.querySelector('.y-aside__top') as HTMLElement
  if (target.classList.contains('isActive')) {
    target.classList.remove('isActive')
    isScaleAside.value = false
    injectStyle(aside, 'width', '50px')
  } else {
    target.classList.add('isActive')
    isScaleAside.value = true
    injectStyle(aside, 'width', '200px')
  }
  injectStyle(asideTop, 'opacity', '0')
  setTimeout(() => injectStyle(asideTop, 'opacity', '1'), 300)
}
</script>

<style scoped lang="scss">
.y-admin__head {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-light);

  .y-admin__head--left {
    .y-left__scale {
      cursor: pointer;

      & * {
        pointer-events: none;
      }

      &.isActive {
        // ...
      }
    }
  }

  .y-admin__head--right {
    .y-right__avatar {
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}

:deep(.y-quit) {
  cursor: pointer;
  transition: color var(--el-transition-duration);

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
