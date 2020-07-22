import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: true
  },
  mutations: {
    DARK_MODE(state, mode) {
      mode = !mode
    }
  },
  actions: {
    darkMode({ commit }, mode) {
      commit('DARK_MODE', mode)
    }
  },
  modules: {}
});