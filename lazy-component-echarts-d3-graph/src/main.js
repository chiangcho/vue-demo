import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { lazyLoadComponent } from './views/ImportUtils'

Vue.config.productionTip = false
window.$lazyLoadComponent = lazyLoadComponent
Vue.prototype.$lazyLoadComponent = lazyLoadComponent
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
