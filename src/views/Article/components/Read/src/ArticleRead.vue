<template>
  <div class="y-article__read y-flex y-f-align-center y-f-col">
    <ArticleReadHero :article="article" />
    <div class="y-read__inner y-flex y-f-justify-center y-w-80">
      <div class="y-read__catalog y-mr-20">
        <div class="y-catalog__title">文章目录</div>
        <div class="y-catalog__inner y-flex y-f-col">
          <el-link
            v-for="(t, index) in toc"
            :class="index === 0 ? 'el-link--active' : ''"
            :data-level="t.level"
            :key="t.anchor"
            :href="t.anchor"
          >
            <b class="y-link__side--bar"></b>
            <b class="y-link__bottom--bar"></b>
            <span>{{ t.text }}</span>
          </el-link>
        </div>
        <div class="y-read__progress y-text-center">阅读进度：{{ progress }}%</div>
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
import { getStyle, injectStyle } from '@/utils/dom.ts'
import { useCatalog } from '../hooks/useCatalog.ts'
import ArticleReadHero from './ArticleReadHero.vue';

const { article } = useArticleRead()

const { toc, progress } = useCatalog({
  selector: '.y-read__catalog',
  referSelector: '.y-read__inner',
  catalogLinkSelector: '.el-link',
  html: article.value.content,
})

const progressWatcher = watch(
  () => progress.value,
  () => {
    const progressEl = document.querySelector('.y-read__progress') as HTMLElement
    if (progress.value > 0) {
      injectStyle(progressEl, {
        bottom: `-${getStyle(progressEl, 'height')}`,
        opacity: 1,
      })
    } else {
      injectStyle(progressEl, {
        bottom: 0,
        opacity: 0,
      })
    }
  }
)

onUnmounted(() => {
  progressWatcher()
})
</script>

<style lang="scss" scoped>

@include be(read, inner) {
  padding: 20px;
  position: relative;
}

@include be(read, catalog) {
  width: 250px;
  height: auto;
  box-sizing: content-box;
  position: absolute;
  top: 20px;
  left: 0;
  z-index: 1;

  .y-read__progress {
    padding: 6px;
    background-color: var(--el-bg-color-page);
    color: var(--el-text-color-primary);
    border-radius: 4px;
    position: absolute;
    bottom: 0;
    z-index: -2;
    width: 100%;
    opacity: 0;
    transition:
      bottom 0.6s ease,
      opacity 0.9s ease;
  }

  .y-catalog__title {
    font-size: 1.4em;
    padding: 20px;
    border-bottom: solid 1px var(--el-bg-color-page);
  }

  .y-catalog__inner {
    box-sizing: content-box;
    padding: 20px;
    max-height: 500px;
    overflow: auto;

    .el-link--active {
      color: var(--el-link-hover-text-color);

      .y-link__bottom--bar,
      .y-link__side--bar {
        display: block !important;
      }
    }

    .el-link {
      box-sizing: content-box;
      position: relative;

      b.y-link__bottom--bar,
      b.y-link__side--bar {
        position: absolute;
        display: none;
        background-color: var(--el-color-primary);
      }

      b.y-link__bottom--bar {
        width: 100%;
        height: 1px;
        left: 0;
        bottom: 0;
      }

      b.y-link__side--bar {
        left: -20px;
        top: calc(100% - 80%);
        width: 3px;
        height: 80%;
      }

      &:hover b.y-link__side--bar,
      &:hover b.y-link__bottom--bar {
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
  width: calc(100% - 250px);
  margin-left: 250px;
}

.y-read__content,
.y-read__catalog {
  box-shadow: var(--el-box-shadow-light);
  background-color: var(--el-bg-color);
}
</style>
