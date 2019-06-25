import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import global from "./global";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
  state: {
    loading: true,
    cityName: "定位中.."
  },
  modules: {
    global
  },
  mutations: {
    gm_SET_LOADING(state, loading) {
      state.loading = loading;
    },
    update(state, config) {
      Object.keys(config).map((item, key) => {
        state[item] = config[item]
      })
    }
  },
  actions: {
    ga_SET_LOADING({ commit }, loading) {
      commit("gm_SET_LOADING", loading);
    }
  },
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
export default store;
