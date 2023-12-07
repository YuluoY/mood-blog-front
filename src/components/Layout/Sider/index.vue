<template>
  <div class="y-sider">
    <div class="y-sider__line y-cursor-p" @click="() => (drawer = !drawer)"></div>
    <el-drawer
      class="y-sider__drawer"
      v-model="drawer"
      title="I am the title"
      :with-header="false"
      direction="ltr"
      size="10%"
    >
      <el-row>
        <el-col>
          <label class="y-flex y-f-align-center">
            <span class="y-mr-10">{{ $t('sider.theme.label') }}</span>
            <el-switch
              v-model="changeThemeFlag"
              class="mt-2"
              :active-text="$t('sider.theme.off')"
              :inactive-text="$t('sider.theme.on')"
              inline-prompt
              size="large"
            />
          </label>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
<script setup lang="ts" name="Sider">
import { switchTheme } from '@/utils/core.ts'

const drawer = ref(false)
const changeThemeFlag = ref(false)

const themeSwitchWatch = watch(changeThemeFlag, () => {
  switchTheme(changeThemeFlag.value ? 'dark' : '')
})

onUnmounted(() => {
  themeSwitchWatch()
})
</script>

<style lang="scss" scoped>
@include b(sider) {
  @include e(line) {
    width: 5px;
    height: 100px;
    border-radius: 50px;
    position: fixed;
    top: 50%;
    transform: translateY(-100%);
    background-color: var(--el-color-primary);
    z-index: 10;

    &:hover {
      background-color: var(--el-color-primary-light-5);
    }
  }
}
</style>
