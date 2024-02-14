<template>
  <div class="m-comment__row" :id="item.id">
    <div class="m-comment__left">
      <div class="m-comment__left--avatar">
        <img v-lazy="avatar" :alt="item.nickname" />
      </div>
    </div>
    <div class="m-comment__right">
      <div class="m-comment__info">
        <div class="m-comment__info--nicknamne">
          <el-link
            :href="item.website"
            type="default"
            target="_blank"
            v-if="item.website"
            :style="{ fontSize: `${nicknameFontSize}em` }"
          >
            {{ item.nickname }}
          </el-link>
          <span v-else>{{ item.nickname }}</span>
        </div>
        <el-space class="m-comment__info--date">
          <svg-icon name="date" />
          <span>{{ dateFormat(item.createdAt) }}</span>
        </el-space>
        <el-space class="m-comment__info--ip">
          <svg-icon name="address" />
          <span>{{ item.visitor.province }}</span>
        </el-space>
        <el-space class="m-comment__info--windows">
          <svg-icon name="windows" />
          <span>{{ item.visitor.windowsOS }}</span>
        </el-space>
        <el-space class="m-comment__info--browser">
          <svg-icon name="browser" />
          <span>{{ item.visitor.browser }}</span>
        </el-space>
        <el-space class="m-comment__info-right" :style="{ marginLeft: 'auto' }">
          <el-button link type="primary" @click="isReply = !isReply">回复</el-button>
        </el-space>
      </div>
      <div class="m-comment__content" :style="{ fontSize: `${contentFontSize}em` }">
        <p>{{ item.content }}</p>
      </div>
      <el-space class="m-comment__footer">
        <el-tag v-if="item.isTop" type="danger" effect="dark">置顶</el-tag>
        <el-tag v-if="item.children.find((c) => c.user.username === 'yuluo')" effect="dark">
          作者赞过
        </el-tag>
      </el-space>
      <div class="m-comment__reply" v-if="isReply">
        <MCommentArea></MCommentArea>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IComment } from '@/types/api/comment.ts'
import { dateFormat } from '@/utils/dayjs.ts'

const props = withDefaults(
  defineProps<{
    item: IComment
    nicknameFontSize?: string | number
    contentFontSize?: string | number
  }>(),
  {
    nicknameFontSize: 1.3,
    contentFontSize: 1.1,
  }
)

const isReply = ref(false)

const avatar = computed(() => `${props.item.avatar}&t=${Date.now()}`)
</script>
<style scoped lang="scss">
.m-comment__row {
  display: flex;
  padding: 20px 10px;

  .m-comment__left {
    .m-comment__left--avatar {
      width: 55px;
      height: 55px;
      border-radius: 10px;
      overflow: hidden;
    }
  }

  .m-comment__right {
    display: flex;
    flex-direction: column;
    padding-left: 20px;

    .m-comment__info {
      display: flex;

      & > div {
        margin-right: 20px;
      }
    }

    .m-comment__content {
      flex: 1;
      padding: 6px 0;
    }

    .m-comment__footer {
      display: flex;
    }

    .m-comment__reply {
      padding-top: 20px;
    }
  }
}
</style>
