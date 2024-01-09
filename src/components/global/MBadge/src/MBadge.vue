<template>
  <div
    class="m-badge"
    :style="{
      margin: '10px',
    }"
  >
    <a
      class="m-badge__link m-badge__inner"
      :target="target"
      :href="href"
      :style="{
        display: 'inline-flex',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: `${radius}px`,
      }"
    >
      <div
        class="m-badge__inner--left"
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2px 8px',
          fontSize: `${size}em`,
          backgroundColor: leftColor,
        }"
      >
        <span>{{ leftText }}</span>
      </div>
      <div
        class="m-badge__inner--right"
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2px 8px',
          fontSize: `${size}em`,
          backgroundColor: rightColor,
        }"
      >
        <span>{{ rightText }}</span>
      </div>
    </a>
  </div>
</template>
<script setup lang="ts" name="MBadge">
withDefaults(
  defineProps<{
    leftText?: string
    rightText?: string
    leftColor?: string
    rightColor: string
    radius?: string
    href?: string
    target?: '_blank' | '_self'
    size?: string
  }>(),
  {
    leftText: '',
    rightText: '',
    leftColor: '#5F5F5F',
    rightColor: '#5CCB34',
    radius: '3',
    href: '#',
    target: '_blank',
    size: '.8',
  }
)
</script>

<style lang="scss" scoped>
.m-badge__inner--left,
.m-badge__inner--right {
  color: var(--el-color-white);
}
</style>
