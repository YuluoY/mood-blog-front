<template>
  <div class="m-comment__row" :id="item.id">
    <div class="m-comment__row--inner">
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
            <span v-else :style="{ fontSize: `${nicknameFontSize}em` }">{{ item.nickname }}</span>
          </div>
          <el-space class="m-comment__info--date">
            <svg-icon name="date" />
            <span>{{ dateFormat(item.createdAt) }}</span>
          </el-space>
          <el-space class="m-comment__info--ip" v-if="province">
            <svg-icon name="address" />
            <span>{{ province }}</span>
          </el-space>
          <el-space class="m-comment__info--windows" v-if="windowsOS">
            <svg-icon name="windows" />
            <span>{{ windowsOS }}</span>
          </el-space>
          <el-space class="m-comment__info--browser" v-if="browser">
            <svg-icon name="browser" />
            <span>{{ browser }}</span>
          </el-space>
          <el-space class="m-comment__info--reply" :style="{ marginLeft: 'auto' }">
            <el-button link type="primary" @click="() => onClickReply(item)">回复</el-button>
          </el-space>
        </div>
        <div class="m-comment__content" :style="{ fontSize: `${contentFontSize}em` }">
          <p>
            <a v-if="item.reply?.id" :href="`#${item.reply?.id}`" class="y-pr-10">
              @{{ item.reply?.nickname }}
            </a>
            <span>{{ item.content }}</span>
          </p>
        </div>
        <el-space class="m-comment__footer">
          <el-tag v-if="item.isTop" type="danger" effect="dark">置顶</el-tag>
          <el-tag v-if="item.isAuthorLike" effect="dark">作者赞过</el-tag>
        </el-space>
        <div class="m-comment__reply" v-if="item.isReply">
          <MCommentForm
            :reply-comment="item"
            @handle-publish-new-comment="handlePublishNewComment"
          ></MCommentForm>
        </div>
      </div>
    </div>
    <div class="m-comment__sub" v-if="item?.children">
      <template v-for="child in item.children" :key="child.id">
        <MCommentDisplayItem
          class="m-comment__sub--row"
          :item="child"
          :is-sub="true"
        ></MCommentDisplayItem>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { dateFormat } from '@/utils/dayjs.ts'
import { IComment } from '@/types/api/comment.ts'

const props = withDefaults(
  defineProps<{
    item: IComment
    nicknameFontSize?: string | number
    contentFontSize?: string | number
    isSub?: boolean
  }>(),
  {
    nicknameFontSize: 1.3,
    contentFontSize: 1.1,
    isSub: false,
  }
)
const commentList = inject('commentList') as IComment[]
const isShowMainCommentFrom = inject('isShowMainCommentFrom') as Ref<boolean>
const handlePublishNewComment = inject('handlePublishNewComment') as any

// 点击回复评论后端操作，页面上只能出现一个表单
const onClickReply = (item: IComment) => {
  if (item.isReply) {
    isShowMainCommentFrom.value = true
    item.isReply = false
    return
  }

  function changeRelpy(list: IComment[]) {
    list.forEach((comment) => {
      comment.isReply = false
      if (comment.children?.length) {
        changeRelpy(comment.children as IComment[])
      }
    })
  }

  changeRelpy(commentList)

  item.isReply = !item.isReply
  isShowMainCommentFrom.value = !item.isReply
}

const avatar = computed(() => `${props.item.avatar}&t=${Date.now()}`)

const province = computed(() => props.item?.visitor?.province || props.item?.user?.province)
const windowsOS = computed(() => props.item?.visitor?.windowsOS || props.item?.user?.windowsOS)
const browser = computed(() => props.item?.visitor?.browser || props.item?.user?.browser)
</script>
<style scoped lang="scss">
.m-comment__row {
  padding: 20px 10px;

  .m-comment__sub {
    margin-left: 30px;
    padding-left: 30px;
    border-left: solid 1px var(--el-border-color);
  }

  .m-comment__row--inner {
    display: flex;

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

        .m-comment__info--nicknamne {
          display: flex;
          align-items: end;
        }

        .m-comment__info--reply {
          margin-right: 0;
        }
      }

      .m-comment__content {
        flex: 1;
        padding: 6px 0;

        p {
          word-break: break-word;
        }
      }

      .m-comment__footer {
        display: flex;
      }

      .m-comment__reply {
        padding-top: 20px;
      }
    }
  }
}
</style>
