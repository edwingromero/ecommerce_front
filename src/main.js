require('./bootstrap');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'




import axios from 'axios';


Vue.prototype.axios = axios;

axios.defaults.baseURL = 'https://ecommerce_back.test/api';

let storage = localStorage.getItem('vuex') ? JSON.parse(localStorage.getItem('vuex')) : null;
if(storage!=null && storage.token != ''){
  axios.defaults.headers.common['Authorization'] = 'Bearer '+storage.token.access_token; 
}

import createAuthRefreshInterceptor from 'axios-auth-refresh';


// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => axios.post('https://ecommerce_back.test/api/refresh',{},{
  headers: { Authorization: `Bearer ${store.state.token.access_token}` }
}).then(tokenRefreshResponse => {
    store.commit('setToken',tokenRefreshResponse.data);
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.access_token;
    return Promise.resolve();
});

// Instantiate the interceptor
createAuthRefreshInterceptor(axios, refreshAuthLogic);


// Make a call. If it returns a 401 error, the refreshAuthLogic will be run, 
// and the request retried with the new token






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
