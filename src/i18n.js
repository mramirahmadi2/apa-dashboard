import en from "../src/assets/i18n/en.json"
import pe from "../src/assets/i18n/pe.json"
import VueI18n from "vue-i18n"
import Vue from "vue"
Vue.use(VueI18n);
export default new VueI18n({
    locale: localStorage.getItem('lang') || 'en',
    messages: {
        en: en,
        pe: pe,

    }

})