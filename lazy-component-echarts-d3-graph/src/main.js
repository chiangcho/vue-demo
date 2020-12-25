import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' // In Dev
import 'element-ui/lib/theme-chalk/index.css' // In Dev
import { i18n } from 'xcom-cboard'
import 'xcom-cboard/dist/xcom-cboard.common.lib.js'
import 'xcom-cboard/src/utils/initEcharts.js'

import numbro from 'numbro'
import req from 'xcom-cboard/src/utils/http/request'
import api from 'xcom-cboard/src/utils/http/api'
import about from '@/views/About.vue'

import { lazyLoadComponent } from './views/ImportUtils'
Vue.component('hello-world', about)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$numbro = numbro
Vue.prototype.$req = req
Vue.prototype.$api = api
window.$lazyLoadComponent = lazyLoadComponent
Vue.prototype.$lazyLoadComponent = lazyLoadComponent
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
