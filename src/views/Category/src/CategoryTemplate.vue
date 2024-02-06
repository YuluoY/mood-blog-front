<template>
  <div :class="route.name ? `y-category__${route.meta.title.toString()}` : ''">
    <ArticleConditionTemplate
      type-text="类别"
      :is-love-show="false"
      :is-sidebar="true"
    >
  </ArticleConditionTemplate>
  </div>
</template>
<script setup lang="ts">
import ArticleConditionTemplate from '@/views/Template/ArticleConditionTemplate.vue'

const route = useRoute()


</script>
<style scoped lang="scss"></style>
