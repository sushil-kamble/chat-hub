import Vue from "vue";
import Vuex from "vuex";
import { real } from "@/firebase/init";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      if (user) {
        real.ref(`users/${user.uid}/`).on("value", snap => {
          commit("SET_USER", {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            timestamp: snap.val().timestamp,
            groups: snap.val().groups
          });
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
});
