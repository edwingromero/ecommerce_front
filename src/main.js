window.axios = require('axios');
window.axios.defaults.baseURL = 'https://ecommerce_back.test/api';

window._ = require('lodash');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'




Vue.filter('str_limit', function (value, size) {
  if (!value) return '';
  value = value.toString();

  if (value.length <= size) {
    return value;
  }
  return value.substr(0, size) + '...';
});

import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
