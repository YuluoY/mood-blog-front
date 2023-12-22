<template>
  <div class="y-homeSidebar">
    <el-card class="y-homeSidebar__card">
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
      <div class="y-card__item">
        <div class="y-card_articleCount">{{ articleStore.total }}</div>
        <div class="y-card_categoryCount"></div>
        <div class="y-card_commentCount"></div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useArticleStore } from '@/store/articleStore.ts'
import { useUserStore } from '@/store/userStore.ts'
import { getImageUrl } from '@/utils/core.ts'

const userStore = computed(() => useUserStore())
const articleStore = computed(() => useArticleStore())
console.log(articleStore)
</script>
<style scoped lang="scss">
@include be(card, image) {
  width: 5em;
  height: 5em;
}
</style>
