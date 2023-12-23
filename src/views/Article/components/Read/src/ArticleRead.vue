<template>
  <div class="y-article__read y-flex y-f-align-center y-f-col">
    <div class="y-read__hero">
      <img v-lazy="article.cover" alt="封面" />
    </div>
    <div class="y-read__inner y-flex y-f-justify-center y-w-80">
      <div class="y-read__catalog y-mr-20">
        <MdCatalog :editor-id="article.title" :scroll-element="scrollElement" />
      </div>
      <div class="y-read__content">
        <MdPreview :editorId="article.title" v-model="article.content" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="ArticleRead">
import { MdPreview, MdCatalog } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

import { useArticleRead } from '@/views/Article/components/Read/hooks/index.ts'

const scrollElement = document.documentElement
const { article } = useArticleRead()
</script>

<style lang="scss" scoped>
@include be(read, inner) {
  padding: 20px;
}

@include be(read, hero) {
  width: 100vw;
  height: 60vh;
  overflow: hidden;
  position: relative;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }
}

@include be(read, catalog) {
  width: 300px;
}

@include be(read, content) {
  width: calc(100% - 300px);
}

</style>
