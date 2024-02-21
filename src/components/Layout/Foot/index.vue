<template>
  <div class="y-foot">
    <div class="y-foot__inner">
      <div class="y-flex y-f-justify-center y-f-align-center y-mt-10 y-f-w">
        <div class="running-time">
          <span>小破站已运行：{{ runningTime }}</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="ip-count">
          <span>访问人数：{{ globalStore.visitorCount }}</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="view-count">
          <span>访问次数：{{ globalStore.viewCount }}</span>
        </div>
      </div>
      <div class="y-flex y-f-justify-center y-f-align-center y-mt-10 y-f-w">
        <div class="copyright">
          <span class="y-mr-10">Copyright &copy; 2024 -</span>
          <a href="/">Yuluo's Blog</a>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="resp">
          <span>
            本网站由
            <a href="https://portal.qiniu.com/" target="_blank"><img src="/src/assets/images/qiniu.png" loading="lazy" alt="七牛云" /></a>
            提供云存储服务
          </span>
        </div>
        <!-- <el-divider direction="vertical"></el-divider> -->
        <!-- <div class="record">
          <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021111111号</a>
        </div> -->
      </div>
      <div class="y-foot__badge--box y-flex y-f-justify-center y-f-w y-mt-6">
        <MBadge left-text="MBlog" right-text="Open Source" right-color="#5CCB34" target="_self" />
        <MBadge
          left-text="Powered"
          right-text="Nestjs"
          right-color="#E0234E"
          href="https://github.com/nestjs/nest"
        />
        <MBadge
          left-text="SPA"
          right-text="Vue.js"
          right-color="#35B378"
          href="https://github.com/vuejs/core"
        />
        <MBadge
          left-text="UI"
          right-text="Elelment Plus"
          right-color="#409EFF"
          href="https://github.com/element-plus/element-plus"
        />
        <MBadge
          left-text="VPS & DNS"
          right-text="Aluyun"
          right-color="#FF7E12"
          href="https://www.aliyun.com/"
        />
        <MBadge
          left-text="Protocol"
          right-text="MIT"
          right-color="#3DA639"
          href="https://opensource.org/license/mit/"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Foot">
import { useGlobalStore } from '@/store/globalStore.ts'
import { dateDiffNow } from '@/utils/dayjs.ts'

const runningTime = ref(dateDiffNow('2023-12-23 00:00:00'))
const runningTimer = ref(null)
const globalStore = useGlobalStore()

onMounted(() => {
  clearInterval(runningTimer.value)
  runningTimer.value = setInterval(() => {
    runningTime.value = dateDiffNow('2023-12-23 00:00:00')
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(runningTimer.value)
})
</script>

<style lang="scss" scoped>
.y-foot {
  padding: 20px;
  text-align: center;
  background-color: var(--el-color-info-light-9);
  margin-top: auto;

  .resp {
    span {
      display: inline-flex;
      align-items: center;

      img{
        width: 4rem;
        height: 1rem;
      }
    }
  }
}
</style>
