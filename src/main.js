import Vue from 'vue'
import App from './App.vue'
// import xcom from 'xcom-components'
import {HelloWorld} from 'xcom-components'
import 'xcom-components/dist/xcom-components.css'

Vue.config.productionTip = false
// Vue.use(xcom)
Vue.component('HelloWorld',HelloWorld)

new Vue({
  render: h => h(App),
}).$mount('#app')
