import Vue from 'vue'
import App from './App.vue'
import HelloWorld from 'my-vue-library'

Vue.config.productionTip = false

Vue.use(HelloWorld)
new Vue({
  render: h => h(App),
}).$mount('#app')
