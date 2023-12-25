<template>
  <div class="y-article__read y-flex y-f-align-center y-f-col">
    <MHero classname="read" :image-url="article.cover"></MHero>
    <div class="y-read__inner y-flex y-f-justify-center y-w-80">
        <div class="y-read__catalog y-mr-20">
          <div class="y-catalog__inner y-flex y-f-col">
            <h1>文章目录</h1>
            <el-link v-for="t in toc" :data-level="t.level" :key="t.anchor" :href="t.anchor">
              <span class="y-link__bar"></span>
              {{ t.text }}
            </el-link>
          </div>
        </div>
      <div class="y-read__content">
        <MdPreview :editorId="'article_id'" v-model="article.content" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="ArticleRead">
import { MdPreview } from 'md-editor-v3'

import { useArticleRead } from '@/views/Article/components/Read/hooks/index.ts'

const { article, toc } = useArticleRead()
</script>

<style lang="scss" scoped>
@include be(read, inner) {
  padding: 20px;
  position: relative;
}

@include be(read, hero) {
  width: 100vw;
  height: 60vh;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }
}

@include be(read, catalog) {
  width: 300px;
  height: auto;
  box-sizing: content-box;
  position: sticky;
  top: 0;

  .y-catalog__inner {
    box-sizing: content-box;
    padding: 20px;

    .el-link {
      box-sizing: content-box;
      position: relative;

      .y-link__bar {
        content: '';
        position: absolute;
        left: -20px;
        top: 0;
        width: 3px;
        height: 100%;
        display: none;
        background-color: var(--el-color-primary);
      }

      &:hover .y-link__bar {
        display: block;
      }
    }
  }

  [data-level] {
    display: inline;
    padding: 10px 0;
  }

  [data-level='1'] {
    padding-left: 0;
  }

  [data-level='2'] {
    padding-left: 20px;
  }

  [data-level='3'] {
    padding-left: 40px;
  }
}

@include be(read, content) {
  width: calc(100% - 300px);
}

.y-read__content,
.y-catalog__inner {
  box-shadow: var(--el-box-shadow-light);
  background-color: var(--el-bg-color);
}
</style>
