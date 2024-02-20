import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
import { App } from "vue";
import ParticlesBg from '@/plugins/VueParticles/src/ParticlesBg.vue';

export { ParticlesBg }

export default {
  install: (app: App) => {
    // @ts-ignore
    app.use(Particles, {
      init: async (engine: any) => {
        await loadSlim(engine);
      }
    })
  }
}