import Vue from 'vue'
import App from './App.vue'
import router from './router';
import { store } from './store/store'
import axios from 'axios';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Notifications from 'vue-notification'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("en", en);

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Notifications)

Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("access_token");
  config.headers.common["Authorization"] = `Bearer ${token}`;
  return config;
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
