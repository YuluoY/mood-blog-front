import { getImageUrl } from '@/utils/core.ts';
import { App } from 'vue';
import VueLazyload from 'vue-lazyload';

export default {
  install: function install(app: App) {
    app.use(VueLazyload, {
      preLoad: 1.3,
      error:getImageUrl('error.png'),
      loading: getImageUrl('loading.gif'),
      attempt: 1
    });
  }
};