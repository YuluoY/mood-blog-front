<template>
  <div class="vue-particles" v-if="isShow">
    <vue-particles id="tsparticles" :options="configs" />
  </div>
</template>
<script setup lang="ts" name="ParticlesBg">
const isShow = ref(true)

watch(useRoute(),
  () => {
    isShow.value = false
    nextTick(() => {
      isShow.value = true
    })
  }
)

const configs = {
  background: {
    color: {
      value: '#fff',
    },
  },
  fpsLimit: 100,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      bubble: {
        distance: 300,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 3,
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#409EFF',
    },
    links: {
      color: '#409EFF',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: 'bounce',
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 150,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'star',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}
</script>
<style scoped lang="scss"></style>
