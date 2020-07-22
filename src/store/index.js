import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: true
  },
  mutations: {
    DARK_MODE(state) {
      state.mode = !state.mode
    }
  },
  actions: {
    darkMode({ commit }) {
      commit('DARK_MODE')
    }
  },
  modules: {}
});