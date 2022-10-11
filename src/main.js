import Vue from 'vue'
import i18n from './i18n';
import router from './router';
import store from './store';
import App from './App.vue';
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

new Vue({
    i18n,
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')