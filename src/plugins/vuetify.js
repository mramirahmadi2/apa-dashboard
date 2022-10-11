import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueI18n from 'vue-i18n';
import light from './vuetify/them'
Vue.use(Vuetify);
Vue.use(VueI18n);
export default new Vuetify({
  theme: {
    themes: { light },
  },
})

  