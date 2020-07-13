import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: false
  },
  mutations: {
    DARK_MODE({ state }, mode) {
      state.mode = !mode
    }
  },
  actions: {
    darkMode({ commit }, mode) {
      commit('DARK_MODE', mode)
    }
  },
  modules: {}
});