import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [new VuexPersistence().plugin],
  state: {
    userData: null,
    dialogLogin: false
  },
  mutations: {
    setDialogLogin(state, value) {
      state.dialogLogin = value;
    },
    setUserData(state, value) {
      state.userData = value;
    }
  },
  actions: {
    openDialogLogin({ commit }) {
      commit('setDialogLogin', true);
    },
    closeDialogLogin({ commit }) {
      commit('setDialogLogin', false);
    },
    saveUserData({ commit }, userData) {
      commit('setUserData', userData);
    },
    logout({ commit }) {
      commit('setDialogLogin', false);
      commit('setUserData', null);
    }
  },
  modules: {
  }
})
