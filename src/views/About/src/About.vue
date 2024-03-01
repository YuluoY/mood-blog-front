<template>
  <div class="y-about">
    <div class="y-about__inner">
      <AboutContent>
        <AboutContentRow title="关于我"></AboutContentRow>
      </AboutContent>
    </div>
  </div>
</template>

<script setup lang="ts" name="About">
import AboutContent from "@/views/About/src/AboutContent.vue";
import AboutContentRow from "@/views/About/src/AboutContentRow.vue";


</script>


<style lang="scss" scoped>
@include b(about) {
  width: 100%;
  height: auto;
}

@include be(about, inner) {
  display: flex;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  justify-content: center;
}

@include be(about, content) {
  width: 70%;
  height: auto;
}
</style>
