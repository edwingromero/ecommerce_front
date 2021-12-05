import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{},
    token:''
  },
  mutations: {
    setToken(state,payload){
      state.token = payload;
    },
    setUser(state,payload){
      state.user = payload;
    },
    logOut(state){
      state.user = {};
      state.token = '';
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
