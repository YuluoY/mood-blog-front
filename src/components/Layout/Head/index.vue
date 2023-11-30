<template>
  <el-affix :offset="0">
    <div class="y-head y-pl-20 y-pr-20">
      <div class="y-head__inner y-flex y-f-row y-f-justify-between y-f-align-center">
        <div class="y-head__left">
          <img v-lazy="getImageUrl('avatar.jpg')" alt="logo" />
        </div>
        <div class="y-head__center">
          <el-menu :default-active="router.currentRoute.value.path" mode="horizontal" router :ellipsis="false">
            <template v-for="route in router.getRoutes()" :key="String(route.name)">
              <el-menu-item class="y-fs-16" :index="route.path" v-if="route.meta.affix">
                {{ $t(`nav.${route.meta.title}`) }}
              </el-menu-item>
            </template>
          </el-menu>
        </div>
        <div class="y-head__right">
          <el-button type="primary">登录</el-button>
        </div>
      </div>
    </div>
  </el-affix>
</template>
<script setup lang="ts" name="Head">
import { getImageUrl } from '@/utils/core.ts'

const router = useRouter();

</script>

<style scoped lang="scss">
@include b(head) {
  box-shadow: var(--el-box-shadow-light);
  background-color: var(--el-bg-color);

  .el-menu--horizontal.el-menu {
    border-bottom: none;
  }

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

    img {
      border-radius: 50%;
    }
  }

  @include e(center) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    .el-menu--horizontal {
      .el-menu-item {
        margin: 0 10px;

        &:not(.is-disabled) {
          &:focus,
          &:hover {
            border-bottom: 2px solid var(--el-menu-active-color);
          }
        }
      }
    }
  }
}
</style>
