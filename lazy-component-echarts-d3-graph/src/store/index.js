import Vue from 'vue'
import Vuex from 'vuex'
import { StoreConfig as config, StoreDashboard as dashboard, StoreMenu as menu, StoreParams as params, StoreWidget as widget } from 'xcom-cboard'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    config,
    dashboard,
    menu,
    params,
    widget
  }
})
