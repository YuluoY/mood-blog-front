<template>
  <div class="y-homeSidebar">
    <el-card class="y-homeSidebar__card y-card__info" v-if="isPersonalShow" shadow="hover">
      <div class="y-card__avatar y-w-100 y-flex y-f-justify-center">
        <img
          class="y-card__image y-b-radius-50"
          v-lazy="getImageUrl(userStore.avatar)"
          alt="avatar"
        />
      </div>
      <div class="y-card__username y-w-100 y-text-center y-mt-10">
        <span>{{ userStore.username }}</span>
      </div>
      <div class="y-card__bio y-w-100 y-text-center y-mt-10 y-fs-12">
        <span>{{ userStore.bio }}</span>
      </div>
      <div class="y-card__social y-w-100 y-text-center y-mt-10" v-if="userStore.socializes">
        <el-link
          v-for="(key, index) in Object.keys(userStore.socializes)"
          :key="`${key}-${index}`"
          class="y-card__sociali__link"
          icon="el-icon-s-promotion"
          :underline="false"
          :href="userStore.socializes[key]"
          target="_blank"
        >
          {{ key }}
        </el-link>
      </div>
      <div class="y-card__item y-flex y-f-row y-mt-10 y-text-center">
        <div class="y-card_articleCount y-flex-1 y-flex y-f-col">
          <span>{{ articleStore.total }}</span>
          <span>文章</span>
        </div>
        <div class="y-card_categoryCount y-flex-1 y-flex y-f-col">
          <span>{{ categoryStroe.categories.length }}</span>
          <span>分类</span>
        </div>
        <div class="y-card_commentCount y-flex-1 y-flex y-f-col">
          <span>{{ tagStore.tags.length }}</span>
          <span>标签</span>
        </div>
      </div>
    </el-card>

    <!-- <el-card class="y-homeSidebar__card y-card__love y-mt-20">
      <template #header>
        <div>热门文章</div>
      </template>
    </el-card>
    <el-card class="y-homeSidebar__card y-card__love y-mt-20">
      <template #header>
        <div>最新评论</div>
      </template>
    </el-card> -->
    <el-card class="y-homeSidebar__card y-card__tags y-mt-20" v-if="isTagCloudShow" shadow="hover">
      <template #header>
        <div>标签云</div>
      </template>
      <el-tag
        v-for="tag in tagStore.tags"
        :key="tag.id"
        :color="tag.tagColor"
        :style="{
          cursor: 'pointer',
          color: 'white',
        }"
        @click="() => handleTagClick(tag)"
        class="y-mb-10 y-mr-4"
      >
        {{ tag.tagName }}
      </el-tag>
    </el-card>

    <el-card class="y-homeSidebar__card y-mt-20" v-if="isLoveShow" shadow="hover">
      <template #header>
        <div>我们</div>
      </template>
      <div class="y-flex y-f-row">
        <div class="y-card__hsy y-w-100 y-overflow-hidden y-b-radius-50">
          <img
            v-lazy="`https://q.qlogo.cn/headimg_dl?dst_uin=859018342&spec=100`"
            loading="lazy"
            alt="she"
          />
        </div>
        <div class="y-card__heart y-w-100 y-ml-10 y-mr-10">
          <img v-lazy="heart" loading="lazy" alt="heart" />
        </div>
        <div class="y-card__hyl y-w-100 y-overflow-hidden y-b-radius-50">
          <img
            v-lazy="`https://q.qlogo.cn/headimg_dl?dst_uin=568055454&spec=100`"
            loading="lazy"
            alt="me"
          />
        </div>
      </div>
      <div class="y-card__loveTime y-text-center y-mt-10">
        <span>{{ mainStore.sidebar.loveTime }}</span>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useArticleStore } from '@/store/articleStore.ts'
import { useUserStore } from '@/store/userStore.ts'
import { getImageUrl } from '@/utils/core.ts'
import { useMainStore } from '@/store/mainStore.ts'
import heart from '@/assets/images/heart.webp'
import { injectStyle } from '@/utils/dom.ts'
import { useTagStore } from '@/store/tagStore.ts'
import { ITag } from '@/types/api/tag.ts'
import { useCategoryStore } from '@/store/categoryStore.ts'

export interface IHomeSidebarProps {
  isLoveShow: boolean
  isTagCloudShow: boolean
  isPersonalShow: boolean
}

const router = useRouter()
const mainStore = computed(() => useMainStore())
const userStore = computed(() => useUserStore())
const articleStore = computed(() => useArticleStore())
const tagStore = computed(() => useTagStore())
const categoryStroe = computed(() => useCategoryStore())

await tagStore.value.fetchTags()
await categoryStroe.value.fetchCategories()

const props = withDefaults(defineProps<Partial<IHomeSidebarProps>>(), {
  isLoveShow: true,
  isTagCloudShow: true,
  isPersonalShow: true,
})

const handleTagClick = (tag: ITag) => {
  router.push({
    name: 'Tag',
    params: {
      name: tag.tagName,
    },
  })
}

onMounted(() => {
  if (props.isLoveShow) {
    const loveTime = document.querySelector('.y-card__loveTime span') as HTMLElement
    if (loveTime) {
      injectStyle(loveTime, '-webkit-background-clip', 'text')
    }
  }
})
</script>
<style scoped lang="scss">
@include be(card, image) {
  width: 5em;
  height: 5em;
}

.y-card__loveTime span {
  background: linear-gradient(to right, #f00, #00f);
  color: transparent;
}

.y-card_categoryCount {
  border-left: dashed 1px var(--el-color-info-light-3);
  border-right: dashed 1px var(--el-color-info-light-3);
}
</style>
